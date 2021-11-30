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


```