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
      if (isFunction(getterOrOptions)) {
          getter = getterOrOptions;
          setter = () => {
                  console.warn('Write operation failed: computed value is readonly');
              }
              ;
      }
      else {
          getter = getterOrOptions.get;
          setter = getterOrOptions.set;
      }
      //
      const cRef = new ComputedRefImpl(getter, setter, isFunction(getterOrOptions) || !getterOrOptions.set);
      if (debugOptions) {
          cRef.effect.onTrack = debugOptions.onTrack;
          cRef.effect.onTrigger = debugOptions.onTrigger;
      }
      return cRef;
  }
```

