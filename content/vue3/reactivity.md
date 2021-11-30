---
title: 图解 Vue3.2响应式原理
author: buzhifanji
tag: vue3
---

# 带着问题阅读源码Vue3.2-reactive实现原理

vue3提供了一个新的API-reactive，用于定义响应式对象。

```js
 const book = reactive({ title: 'Vue 3.2 reative 实现原理' })
```

用法很简单，reactive包裹一个对象，返回的数据就是响应式对了。那么我们的问题来

- vue3是如何转变成响应对象的呢？

- vue3内部数据是如何收集依赖以及更新依赖的？

## createReactiveObject的实现

```js
  // 存储 reactive对象
  const reactiveMap = new WeakMap();

  // reactive函数入口
  function reactive(target) {
      return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
  }

  function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers, proxyMap) {
      // proxyMap 就是 reactiveMap
      // target 已经存在 reactiveMap中，此时直接返回存在的数据
      // 说明 同一个对象即时多次 reactive 调用，其返回的结果都是同一个响应式对象。
      const existingProxy = proxyMap.get(target);
      if (existingProxy) {
          return existingProxy;
      }
      // 通过 Proxy 代理对象
      const proxy = new Proxy(target, targetType === 2 /* COLLECTION */ ? collectionHandlers : baseHandlers);
      // 存入 reactiveMap 中
      proxyMap.set(target, proxy);
      return proxy;
  }
```
如果不了解Proxy这个api，可以点击[Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

vue3通过 Proxy 这个api，把普通对象转换成响应式对象。在vue2中是的defineProperty这个api把普通对象转换成响应式对象，这个api存在缺陷，例如不能代理数组，当响应式对象添加属性的时候，就不是响应式对象了。

## get的实现： createGetter

```js
  // get 的实现
  const get = createGetter();
  function createGetter(isReadonly = false, shallow = false) {
      return function get(target, key, receiver) {
          // 处理数组
          const targetIsArray = isArray(target);
          if (!isReadonly && targetIsArray && hasOwn(arrayInstrumentations, key)) {
              return Reflect.get(arrayInstrumentations, key, receiver);
          }
          // 处理 对象
          const res = Reflect.get(target, key, receiver);

          if (!isReadonly) {
              // 开始收集 依赖
              track(target, "get" /* GET */, key);
          }

          if (isObject(res)) {
              // 处理嵌套的对象：例如 {id: 1, value: {name: '嵌套', age: 18}}
              // 注意此处 相对于vue2，此处延迟代理
              // 首页 proxy 这个api只会代理第一层的数据。然后我们只有在读取数据，触发get，才会把嵌套的对象转换成响应式数据
              // vue2的处理 创建get的时候，通过递归把所有数据都全部转换响应式对象
              return isReadonly ? readonly(res) : reactive(res);
          }
          return res;
      };
  }
```
### get中处理数组情况：createArrayInstrumentations

```js
  function createArrayInstrumentations() {
      const instrumentations = {};
      // 处理 查询数据的 api
      ['includes', 'indexOf', 'lastIndexOf'].forEach(key => {
          instrumentations[key] = function (...args) {
              //toRaw 从Reactive或Ref中得到原始数据
              // toRaw作用 做一些不想被监听的事情(提升性能)
              const arr = toRaw(this);
              for (let i = 0, l = this.length; i < l; i++) {
                  track(arr, "get" /* GET */, i + '');
              }
              // we run the method using the original args first (which may be reactive)
              const res = arr[key](...args);
              if (res === -1 || res === false) {
                  // if that didn't work, run it again using raw values.
                  return arr[key](...args.map(toRaw));
              }
              else {
                  return res;
              }
          };
      });
      // 处理 数组更改的 api
      ['push', 'pop', 'shift', 'unshift', 'splice'].forEach(key => {
          instrumentations[key] = function (...args) {
              // 开启依赖收集
              pauseTracking();
              // 变更的数据

              //toRaw 从Reactive或Ref中得到原始数据
              // toRaw作用 做一些不想被监听的事情(提升性能)
              const res = toRaw(this)[key].apply(this, args);
              // 关闭依赖收集
              resetTracking();
              return res;
          };
      });
      return instrumentations;
  }
```

数组树上比较特殊，'push', 'pop', 'shift', 'unshift', 'splice' 这个五个api会更改数组本身，

includes', 'indexOf', 'lastIndexOf'这个三个api是查询的数据，存在查询的时候数组已经变更的情况

### 依赖收集：track

```js
  // 此处又有了 一个 WeakMap
  const targetMap = new WeakMap();

  // set 存 effct
  const createDep = (effects) => {
      const dep = new Set(effects);
      dep.w = 0;
      dep.n = 0;
      return dep;
  };
  function track(target, type, key) {
      // 与上面 createReactiveObject 处理有点类似
      // 防止重复收集
      let depsMap = targetMap.get(target);
      if (!depsMap) {
          targetMap.set(target, (depsMap = new Map()));
      }
      // 查找 target 中的 key,第一次的话 会默认一个空的set
      let dep = depsMap.get(key);
      if (!dep) {
          depsMap.set(key, (dep = createDep()));
      }
      // 收集 副作用 effect
      trackEffects(dep);
  }
    function trackEffects(dep, debuggerEventExtraInfo) {
      let shouldTrack = false;
      if (shouldTrack) {
          // 把当前 activeEffect 存入 set 中的
          // activeEffect 是 ReactiveEffect 的实例对象，它长这样子：
          //      {
          //          fn: Function,
          //          scheduler: scheduler,
          //          active: true,
          //          deps: [],
          //          run() {},
          //          stop() {},
          //      }

          dep.add(activeEffect);
          activeEffect.deps.push(dep);
      }
  }
```

存储数据有点绕，先是 用WeakMap存target，其中key是target，value是 Map

Map 的key是 target 中的key，value是 Set

Set里面存的是 当前 activeEffect

## set的实现： createSetter

```js
  // set 的实现
  const set = createSetter();
  function createSetter(shallow = false) {
      return function set(target, key, value, receiver) {
          // 获取旧值
          //toRaw 从Reactive或Ref中得到原始数据
          // toRaw作用 做一些不想被监听的事情(提升性能)

          let oldValue = target[key];
          if (!shallow) {
              value = toRaw(value);
              oldValue = toRaw(oldValue);
              if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
                  oldValue.value = value;
                  return true;
              }
          }
          // 获取 key，主要处理数组 NaN - 特殊情况
          const hadKey = isArray(target) && isIntegerKey(key)
              ? Number(key) < target.length
              : hasOwn(target, key);
          // 设置新值
          const result = Reflect.set(target, key, value, receiver);

          // 确保依赖的数据源是同一个 对象
          if (target === toRaw(receiver)) {
              if (!hadKey) {
                  // 新增数据
                  // 更新依赖
                  trigger(target, "add" /* ADD */, key, value);
              }
              else if (hasChanged(value, oldValue)) {
                  // 变更数据
                  // 更新依赖
                  trigger(target, "set" /* SET */, key, value, oldValue);
              }
          }
          return result;
      };
  }
```

set 的时候比较简单，获取key，设置新值。如果是新增数据，触发新增依赖，如果更改数据，触发变更依赖。

### 更新依赖：trigger

```js
  function trigger(target, type, key, newValue, oldValue, oldTarget) {
      // 从 存储 target中的WeakMap 获取目标对象
      const depsMap = targetMap.get(target);
      if (!depsMap) {
          // never been tracked
          return;
      }
      // 数组 暂存依赖数据
      let deps = [];
      if (type === "clear" /* CLEAR */) {
          // 清空依赖
          deps = [...depsMap.values()];
      }
      else if (key === 'length' && isArray(target)) {
          // 处理数组 通过 length 变更的情况
          depsMap.forEach((dep, key) => {
              if (key === 'length' || key >= newValue) {
                  deps.push(dep);
              }
          });
      }
      else {
          // 通过 schedule runs 的情况
          // schedule runs for SET | ADD | DELETE
          if (key !== void 0) {
              deps.push(depsMap.get(key));
          }
          // also run for iteration key on ADD | DELETE | Map.SET
          switch (type) {
              case "add" /* ADD */:
                  //
                  if (!isArray(target)) {
                      deps.push(depsMap.get(ITERATE_KEY));
                      if (isMap(target)) {
                          deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
                      }
                  }
                  else if (isIntegerKey(key)) {
                      // new index added to array -> length changes
                      deps.push(depsMap.get('length'));
                  }
                  break;
              case "delete" /* DELETE */:
                  if (!isArray(target)) {
                      deps.push(depsMap.get(ITERATE_KEY));
                      if (isMap(target)) {
                          deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
                      }
                  }
                  break;
              case "set" /* SET */:
                  if (isMap(target)) {
                      deps.push(depsMap.get(ITERATE_KEY));
                  }
                  break;
          }
      }
      const eventInfo = { target, type, key, newValue, oldValue, oldTarget }
          ;
      if (deps.length === 1) {
          if (deps[0]) {
              {
                  // 执行 更新依赖 effect
                  triggerEffects(deps[0], eventInfo);
              }
          }
      }
      else {
          // 新增数据 从无到有，
          const effects = [];
          for (const dep of deps) {
              if (dep) {
                  effects.push(...dep);
              }
          }
          {
              triggerEffects(createDep(effects), eventInfo);
          }
      }
  }
    function triggerEffects(dep, debuggerEventExtraInfo) {
      for (const effect of isArray(dep) ? dep : [...dep]) {
          if (effect !== activeEffect || effect.allowRecurse) {
              // 组件更新, doWatch, computed设置这个属性
              if (effect.onTrigger) {
                  effect.onTrigger(extend({ effect }, debuggerEventExtraInfo));
              }
              // scheduler 调动更新
              // doWatch 里面设置
              if (effect.scheduler) {
                  effect.scheduler();
              }
              else {
                  // 最后是 effect run
                  effect.run();
              }
          }
      }
  }
```

更新依赖有点复杂，首先是从 targetMap 找到target对应的数据，没有找到就不会更新依赖，