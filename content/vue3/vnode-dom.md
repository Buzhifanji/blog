---
title: vnode to DOM
author: buzhifanji
sidebar: 'vue3'
tag: vue3
prev: '/vue3/debugging/'
next: '/docs/settings/'
---

# vnode 到真实 DOM 是如何转变的？

## 何为vnode
vnode 本质上是用来描述 DOM 的 JavaScript 对象，它在 Vue.js 中可以描述不同类型的节点，比如普通元素节点、组件节点等。

普通元素节点我们很熟悉，例如，我们在HTML定义一个 button 标签来写一个按钮：
```html
    <button class="btn" style="color: blue">我是个按钮</button>
```
相对应我们可以用 vnode 来表示 button 标签
```js
const vnode = {
  type: 'button',
  props: {
    class: 'btn',
    style: {
      color: 'blue',
    }
  },
  children: '我是个按钮'
}
```
其中，type 属性来表示 DOM 的标签类型，props 属性来表示 DOM 的一些附件信息，比如 style、class等等,children属性表示 DOM 的子节点，它也可以是一个 vnode 数组。
## 何为组件

组件是一个抽象的概念，它是对一颗 DOM 树的抽象。

举个例子，我们现在在页面定义一个组件节点：

```html
 <my-component></my-componnet>
```
这段代码，并不会在页面渲染一个 my-component 标签,而它具体渲染成什么，取决于你怎么编写 MyComponent 组件的模板。比如，MyComponent 组件内部的模板定义是这样定义的：

```html
<template>
  <div>
    <h2>我是个组件</h2>
  </div>
</template>
```
可以看出，模板内部最终会在页面上渲染一个 div,内部包含一个 h2 标签，用来显示 我是个组件 文本。

所以，从表现上来看，组件的模板决定了组件生成的 DOM 标签，而在 Vue.js 内部，一个组件想要真正的渲染生成 DOM，还需要经历“**创建 vnode - 渲染 vnode - 生成 DOM**” 这几个步骤

那么问题来了，vnode 和组件有什么关系呢？

我们现在知道 vnode 可以用于描述一个真实的 DOM 的对象，它同样也可以用来描述组件。例如，我们在模板中引入一个组件标签   custom-component：

```html
<custom-component msg="test"></custom-component>
```
我们可以用 vnode 这样表示 custom-component 组件标签：
```js
const CustomComponent = {
  // 在这里定义组件对象
}
const vnode = {
  type: CustomComponent,
  props: {
    msg: 'test'
  }
}
```

组件 vnode 其实是对**抽象事物的描述**，这是因为我们并不会在页面上真正渲染一个 custom-component 标签，而是渲染组件内部定义的 HTML 标签。

## vnode 分类
vue内部针对 vnode 做了详细的分类，我们来看看 vue3定义的 VnodeType 类型接口：
```ts
export type VNodeTypes =
  | string
  | VNode
  | Component // 注释节点
  | typeof Text // 文本节点
  | typeof Static // 静态节点
  | typeof Comment
  | typeof Fragment
  | typeof TeleportImpl
  | typeof SuspenseImpl
```
vue 定义那么多的类型有什么意义呢？
## 核心渲染流程：创建 vnode 和渲染 vnode

我们在 createApp 一文中讲述了，vue3在初始化应用的时候，会创建一个 app 对象，其中 app.mount 函数内部流程大致如下：
```js
mount(rootContainer, isHydrate, isSVG) {
    // 创建根组件的 vnode
    const vnode = createVNode(rootComponent, rootProps)
    // 渲染 vnode
    render(vnode, rootContainer, isSVG);
}
```

### 创建 vnode
vnode 是通过 函数 createVNode 创建的，我们来看一下这个函数的大致实现：
```js
function createVNode(type, props = null ,children = null) {
    // 如果 传入的 本身是 vnode 类型，则克隆这个 vnode, 并且返回
    if (isVNode(type)) {
        const cloned = cloneVNode(type, props, true /* mergeRef: true */);
        if (children) {
            // 标准化子节点，把不同数据类型的 children 转成数组或者文本类型
            normalizeChildren(cloned, children);
        }
        return cloned;
    }
  if (props) {
    // 处理 props 相关逻辑，标准化 class 和 style
  }

  // 对 vnode 类型信息编码
  const shapeFlag = isString(type)
    ? 1 /* ELEMENT */
    : isSuspense(type)
      ? 128 /* SUSPENSE */
      : isTeleport(type)
        ? 64 /* TELEPORT */
        : isObject(type)
          ? 4 /* STATEFUL_COMPONENT */
          : isFunction(type)
            ? 2 /* FUNCTIONAL_COMPONENT */
            : 0

    const vnode = {
        type,
        props,
        shapeFlag,
        // 一些其他属性
    }
    // 标准化子节点，把不同数据类型的 children 转成数组或者文本类型
    normalizeChildren(vnode, children)
    return vnode
}
```
通过上述代码可以看到，其实 createVNode 做的事情很简单，就是：对 props 做标准化处理、对 vnode 的类型信息编码、创建 vnode 对象，标准化子节点 children。

我们现在拥有了这个 vnode 对象，接下来要做的事情就是把它渲染到页面中去。

### 渲染 vnode

接下来，是渲染 vnode 的过程。我们来看一下 render 函数的实现：

```js
const render = (vnode, container, isSVG) => {
    if (vnode == null) {
        // 销毁组件
        if (container._vnode) {
            unmount(container._vnode, null, null, true);
        }
    }
    else {
        // 创建或者更新组件
        patch(container._vnode || null, vnode, container, null, null, null, isSVG);
    }
    // 调用回调 调度器
    flushPostFlushCbs();
    // 缓存 vnode 节点，表示已经渲染
    container._vnode = vnode;
};
```

这个渲染函数 render 的实现很简单，如果它的第一个参数 vnode 为空，则执行销毁组件的逻辑，否则执行创建或者更新组件的逻辑。我们目前忽略 flushPostFlushCbs 这个方法，后面分析 nextTick 原理的时候，在来查看这个函数具体做了什么事情。

### path vnode

接下来，我们看看创建或者更新组件节点的 path 函数的实现：

```js
    const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = isHmrUpdating ? false : !!n2.dynamicChildren) => {
        // 相同节点
        if (n1 === n2) {
            return;
        }
        // 如果存在新旧节点, 且新旧节点类型不同，则销毁旧节点
        if (n1 && !isSameVNodeType(n1, n2)) {
            anchor = getNextHostNode(n1);
            unmount(n1, parentComponent, parentSuspense, true);
            n1 = null;
        }

        switch (type) {
            case Text:
                // 处理文本节点
                processText(n1, n2, container, anchor);
                break;
            case Comment$1:
                // 处理注释节点
                processCommentNode(n1, n2, container, anchor);
                break;
            case Static:
                // 处理静态节点
                if (n1 == null) {
                    mountStaticNode(n2, container, anchor, isSVG);
                }
                else {
                    patchStaticNode(n1, n2, container, isSVG);
                }
                break;
            case Fragment:
                 // 处理 Fragment 元素
                processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                break;
            default:
                if (shapeFlag & 1 /* ELEMENT */) {
                    // 处理普通 DOM 元素
                    processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                }
                else if (shapeFlag & 6 /* COMPONENT */) {
                    // 处理组件
                    processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                }
                else if (shapeFlag & 64 /* TELEPORT */) {
                    // 处理 TELEPORT
                    type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
                }
                else if (shapeFlag & 128 /* SUSPENSE */) {
                    // 处理 SUSPENSE
                    type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
                }
                else {
                    warn$1('Invalid VNode type:', type, `(${typeof type})`);
                }
        }
        // 标识 ref
        if (ref != null && parentComponent) {
            setRef(ref, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
        }
    };
```
patch 本意是打补丁的意思。这个函数有两个功能：

- 根据 vnode 挂载 DOM
- 根据新旧 vnode 更新 DOM

对于初次渲染，我们这里只分析创建过程，更新过程在后面的章节分析。

在创建的过程中，patch 函数接受多个参数，这里我们目前只重点关注前三个：

1. 第一个参数 **n1 表示旧的 vnode**，当 n1 为 null 的时候，表示是一次挂载的过程；


2. 第二个参数 n**2 表示新的 vnode 节点**，后续会根据这个 vnode 类型执行不同的处理逻辑；


3. 第三个参数 **container 表示 DOM 容器**，也就是 vnode 渲染生成 DOM 后，会挂载到 container 下面。


对于渲染的节点，我们这里重点关注两种类型节点的渲染逻辑：对组件的处理和对普通 DOM 元素的处理。

#### path: 组件

我们来看看处理组件的 processComponent 函数的实现：
```js
const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
        // 挂载组件
        mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
    } else {
        // 更新组件
        updateComponent(n1, n2, optimized);
    }
};

```
该函数的逻辑很简单，如果 n1 为 null，则执行挂载组件的逻辑，否则执行更新组件的逻辑。

我们接着来看挂载组件的 mountComponent 函数的实现：

#### path: 普通 DOM 元素
