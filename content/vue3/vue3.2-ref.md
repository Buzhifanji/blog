---
title: Vue3.2-ref实现原理
author: buzhifanji
tag: vue3
---

# 带着问题阅读源码Vue3.2-ref实现原理

这是带着问题阅读源码第二篇，我们主要了解 ref 这个实现原理

我们先来 ref 这个api的使用例子

```js
const value = ref('')
```

```js
  function ref(value) {
      return createRef(value);
  }
  function createRef(rawValue, shallow = false) {
      if (isRef(rawValue)) {
          return rawValue;
      }
      return new RefImpl(rawValue, shallow);
  }
```

ref 的实现主要是看 RefImpl 这类

```js
  // 把普通对象转换成响应式对象
  const convert = (val) => isObject(val) ? reactive(val) : val;
  class RefImpl {
      constructor(value, _shallow = false) {
          this._shallow = _shallow;
          this.dep = undefined;
          this.__v_isRef = true;
          this._rawValue = _shallow ? value : toRaw(value);
          // 如果是浅代理，则只会处理 value,反之则会调用 convert
            // convert 会把普通对象 转换响应式对象
          this._value = _shallow ? value : convert(value);
      }
      get value() {
          // 触发依赖收集
          trackRefValue(this);
          return this._value;
      }
      set value(newVal) {
          // 处理 数据源
          newVal = this._shallow ? newVal : toRaw(newVal);
        // 判断数据是否变更
          if (hasChanged(newVal, this._rawValue)) {
              this._rawValue = newVal;
              // 处理value的是个对象的情况
              this._value = this._shallow ? newVal : convert(newVal);
              // 更新依赖
              triggerRefValue(this, newVal);
          }
      }
  }

```

从 RefImpl 这个类的构造函数里可以看出，如果 ref包裹的是个对象，则会调用 reactive 这个api

理解reactive 的原理，就能理解ref 的原理一半了，剩余一半的是处理基本数据类型的情况了。

**当我们访问 ref 的value的时候，会触发get，调用 trackRefValue**

```js
  function trackRefValue(ref) {
      if (isTracking()) {
          // 获取源数据
          ref = toRaw(ref);
          // 如果没 ref.dep，则 ref.dep = new set()
          if (!ref.dep) {
              ref.dep = createDep();
          }
          {
              // 开始收集依赖
              trackEffects(ref.dep, {
                  target: ref,
                  type: "get" /* GET */,
                  key: 'value'
              });
          }
      }
  }
```

收集依赖的逻辑与 reactive 的类似，但没有 reactive 那么复杂，少了查找target和key的过程

主要是 先处理 ref.dep， 然后就执行 把依赖存储到 ref中。

**当我们设置ref的value的时候，会触发set，调用triggerRefValue**

```js
  function triggerRefValue(ref, newVal) {
      // 处理数据源
      ref = toRaw(ref);
      if (ref.dep) {
          {
              // 执行 更新依赖
              triggerEffects(ref.dep, {
                  target: ref,
                  type: "set" /* SET */,
                  key: 'value',
                  newValue: newVal
              });
          }
      }
  }
```
更新依赖比较简单，拿出ref的dep，然后执行即可。

## 总结

ref这个api即可把包裹基本数据类型，也可以包裹引用数据类型。

ref会先设置value的get、set属性，

get的时候会调用trackRefValue，trackRefValue内部调用trackEffects收集依赖并存储到ref.dep中；

set的时候如果value是对象或者数组，则会reative把普通对象转换响应式数据，然后调用triggerRefValue，把ref.dep拿出来交给triggerEffects执行，更新依赖


如果包裹的是引用数据类型，其收集依赖和更新依赖的逻辑还是执行reative这个api。

ref的原理依赖于reactive这个api。

如果ref包裹基本数据类型，更建议shallowRef这个api，会一些判断，不需要去处理引用数据类型这种情况了。