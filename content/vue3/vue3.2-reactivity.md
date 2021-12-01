---
title: Vue3.2-reactive实现原理
author: buzhifanji
tag: vue3
sidebar: 'vue3'
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
          // 收集的依赖不是只有一个的情况
          // 一种情况是数据清空
          // 另外一种是存在多个依赖
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

更新依赖有点复杂

首先是从 targetMap 找到target对应的数据，没有找到就不会更新依赖，直接返回。

如果找到了则声明一个数组 deps 存储依赖数据，接下就是处理依赖数据的流程了

如果是 clear, 则 deps 置空

如果是 通过length更改数据 的情况，则遍历数组，把小于 newValue 的索引push到deps 数组中

**如果 key 不等于 void 0，（这是常用的地方：schedule runs），则是把depsMap.get(key) push到deps数组中**

剩余是处理迭代器中add、set、delete 的逻辑了。

处理好依赖后，则会调用 triggerEffects，它会把每一个依赖中的 effect 哪出来执行一遍

effect.onTrigger 这个属性等后续 深入组件更新、doWatch原理、compute原理的时候会需要用上这个属性

如果effect上有 onTrigger这属性，则先执行effect.onTrigger

上面完成后，如果effect上有scheduler属性，则会执行effect.schedule，否则会执行effect.run

scheduler 是为了提供我想要让你什么时候执行就什么时候执行的能力，也就是可以自己调度的能力。

## 总结

vue3通过Proxy和reflect这两个api把普通对象转换成响应式对象。

当数据读取的时候，会触发get收集依赖，收集存储在一个WeakMap中，其中key是target（目标对象），value是一个Map数据结构，这个Map的key是我们读取数据对应的key（target的key），value是一个Set数据结构。Set存储的是activeEffect。

当数据变更的时候，会触发set更新依赖，更新依赖的时候，会先去WeakMap中找到target对应的数据，找到后经过一番依赖数据标准后，遍历依赖，执行依赖的每一个activeEffect
## 自问自答系列：

- 为什么用weakMap 存储响应式对象？

用weakMap的用处防止内存泄漏，当变量的引用不存在的时候，自动会清楚内存；缓存响应式数据是为了防止重复收集

- 依赖数据存储分别用了 weakMap、Map、Set三种数据结构存储，为什么要这样设计呢？

用weakMap与上面原因一样，一是防止内存泄漏，二是防止重复收集

用Map存储而不是用Object，是因为map的键可以是任意值，而Object 的键必须是一个 String 或是Symbol

用Set当然是为了去重了，Set存储的是数据不能重复的。