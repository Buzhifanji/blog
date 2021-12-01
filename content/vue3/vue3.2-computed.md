---
title: Vue3.2-computed实现原理
author: buzhifanji
tag: vue3
sidebar: 'vue3'
---

# 带着问题阅读源码Vue3.2-computed实现原理

这是带着问题阅读源码第二篇，我们主要了解 computed 这个实现原理

关于 computened 的示例，可以查看官方文档[computed使用例子](https://v3.cn.vuejs.org/api/computed-watch-api.html#computed)

```js
  function computed(getterOrOptions, debugOptions) {
      // 标准化 getter/setter
      let getter;
      let setter;
      // 如果只传入一个函数，表示只设置getter属性，也就是只读，不能修改
      if (isFunction(getterOrOptions)) {
          getter = getterOrOptions;
          setter = () => {
                  console.warn('Write operation failed: computed value is readonly');
              }
              ;
      }
      else {
          // 自定义 get和set
          getter = getterOrOptions.get;
          setter = getterOrOptions.set;
      }
      // 创建 effect
      const cRef = new ComputedRefImpl(getter, setter, isFunction(getterOrOptions) || !getterOrOptions.set);

      // 开发环境 调用computed
      // 官网说明：https://v3.cn.vuejs.org/guide/reactivity-computed-watchers.html#%E8%B0%83%E8%AF%95-computed
      if (debugOptions) {
          // 追踪依赖时候 触发
          cRef.effect.onTrack = debugOptions.onTrack;
          // 更新依赖的是 触发
          cRef.effect.onTrigger = debugOptions.onTrigger;
      }
      return cRef;
  }
```
接下来看看ComputedRefImpl的实现

```js
  class ComputedRefImpl {
      constructor(getter, _setter, isReadonly) {
          this._setter = _setter;
          this.dep = undefined;
          // dirty 这个属性很巧妙，它用于开关是否更新依赖，而打开这个开关会get value 的时候触发的，
          // 其次执行一次就会关闭，只有通过 get value来打开
          this._dirty = true; 
          this.__v_isRef = true;
           // 创建 effect
          this.effect = new ReactiveEffect(getter, () => {
              if (!this._dirty) {
                  // 延迟 执行
                  // get 的时候触发，
                  this._dirty = true;
                  // 更新依赖 
                  // ref 这个api set 的时候，也是调用这个方法更新依赖的
                  triggerRefValue(this);
              }
          });
          this["__v_isReadonly" /* IS_READONLY */] = isReadonly;
      }
      get value() {
          // the computed ref may get wrapped by other proxies e.g. readonly() #3376
          const self = toRaw(this);
          // 收集依赖
          // ref 这个api get 的时候，也是调用这个方法收集依赖
          trackRefValue(self);
          if (self._dirty) {
              // 打开更新依赖的开关
              self._dirty = false;
              // 
              self._value = self.effect.run();
          }
          return self._value;
      }
      set value(newValue) {
          this._setter(newValue);
      }
  }
```

