---
title: Test
author: buzhifanji
---

# 逐行分析 vue3.2 源码之 reactive 笔记

首先我们阅读vue的版本是3.2.19。

代码地址：https://github.com/vuejs/vue-next/blob/master/packages/reactivity/src/reactive.ts

官方文档地址：https://v3.cn.vuejs.org/api/basic-reactivity.html#reactive

在分析之前，我们得提出问题，vue3是如何实现 reactive？理解了 reactive 也就是理解了 vue3的响应式原理。

## reactive 入口函数

我们从 reative 入口函数走起

```typescript

export function reactive(target: object) {
  // if trying to observe a readonly proxy, return the readonly version.
  // 如果 target 是 只读 的proxy,则返回 target自身
  if (target && (target as Target)[ReactiveFlags.IS_READONLY]) {
    return target
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  )
}

```

## 理解 Target 四个属性

```typescript
// 字符串 常量枚举
export const enum ReactiveFlags {
  SKIP = '__v_skip',
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
  RAW = '__v_raw'
}

// 接口 Target key 是 ReactiveFlags中定义的枚举
export interface Target {
  [ReactiveFlags.SKIP]?: boolean
  [ReactiveFlags.IS_REACTIVE]?: boolean
  [ReactiveFlags.IS_READONLY]?: boolean
  [ReactiveFlags.RAW]?: any
}

```

- __v_skip

通过 测试用例 我们知道，当target 对象上有 __v_skip 属性为true时，此时的target就不是 响应式的。

** *此属性在阅读vnode的时候会被用上*

```js
  test('should not observe objects with __v_skip', () => {
    const original = {
      foo: 1,
      __v_skip: true
    }
    const observed = reactive(original)
    // 判断 是否为 reactive
    expect(isReactive(observed)).toBe(false)
  })
```

- __v_isReactive

  当target上有 __v_isReactive 属性并且为true时，代表此target已经是响应式

- __v_isReadonly

  当target上有 __v_isReadonly属性并且为true时，代表此target是只读，不能进行修改

- __v_raw

  当target上有 __v_raw属性并且为true时，代表此target已经是响应式，并且是 ref类型

vue3中有两种响应式，一种是通过 reative,另一种是 ref。

一图总结

![Alternative text](../../../src/imgs/Target.png)
