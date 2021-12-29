---
title: diff 1
author: buzhifanji
sidebar: 'vue3'
tag: vue3
prev: '/vue3/debugging/'
next: '/docs/settings/'
---

# vue3组件更新流程

在 vnode 到真实 DOM 是如何转变的 一文中，梳理了组件渲染的本质：把各种类型的vnode渲染中真实的 DOM。组件是有组件模板、组件描述对象和数据构成，数据的变化会影响组件的变化。组件渲染的时候会创建一个带副作用的渲染函数：setupRenderEffect。当组件数据发生变化的时候，会执行这个函数来触发组件更新流程。接下来，我们重点分析这个函数中的组件更新流程。

## setupRenderEffect 更新过程
```js
const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
    const componentUpdateFn = () => {
        if (!instance.isMounted) {
            // 渲染组件
        } else {
            // // 更新组件
            let { next, vnode } = instance;
            // next 表示新的组件 vnode
            if (next) {
                next.el = vnode.el;
                // 更新组件 vnode 节点信息
                updateComponentPreRender(instance, next, optimized);
            } else {
                next = vnode;
            }
            // 省略 声明钩子函数

            // 渲染新的子树 vnode
            const nextTree = renderComponentRoot(instance);
            // 缓存旧的子树 vnode
            const prevTree = instance.subTree;
            // 更新子树 vnode
            instance.subTree = nextTree;
            // 组件更新核心逻辑，根据新旧子树 vnode 做 patch
            patch(prevTree, nextTree,
            // 如果在 teleport 组件中父节点可能已经改变，那么直接在容器找旧树 DOM 元素的父节点
            hostParentNode(prevTree.el),
            // 参考节点在 fragment 的情况可能改变，所以直接找旧树 DOM 元素的下一个节点
            getNextHostNode(prevTree), instance, parentSuspense, isSVG);

            next.el = nextTree.el;
        }
    };
    // 创建响应式的副作用渲染函数
    const effect = new ReactiveEffect(
      componentUpdateFn,
      () => queueJob(instance.update),
      instance.scope // track it in component's effect scope
    )
    // 手动绑定 副作用渲染函数 的this
    const update = (instance.update = effect.run.bind(effect) as SchedulerJob)

    // 执行 副作用渲染函数
    update()
};
```
从代码中可以看出，组件更新主要了做了三件事情：**更新组件 vnode 节点**，**渲染新的子树 vnode**，**根据新旧子树 vnode 执行 patch 逻辑。**

- 更新组件 vnode 节点

    next是判断组件实例中是否有新的组件 vnode，有就更新组件 vnode。具体为什么这么做，稍后讲到 updateComponent 更新组件的时候会具体分析。

- 渲染新的子树

    当数据发生变化时，模板需要更新。重新生成子树，为接下来 path 做准备。

- path

    对比新旧子树 vnode，根据不同点，找到合适的方式更新 DOM。

## 核心逻辑：patch 流程

接下来，我们就来看看 path 函数的实现：

```js
const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = isHmrUpdating ? false : !!n2.dynamicChildren) => {
    // 如果存在新旧节点, 且新旧节点类型不同，则销毁旧节点
    if (n1 && !isSameVNodeType(n1, n2)) {
        anchor = getNextHostNode(n1);
        unmount(n1, parentComponent, parentSuspense, true);
        // n1 设置为 null 保证后续都走 mount 逻辑
        n1 = null;
    }

    switch (type) {
        case Text:
            // 处理文本节点
            break;
        case Comment$1:
            // 处理注释节点
            break;
        case Static:
            // 处理静态节点
            break;
        case Fragment:
                // 处理 Fragment 元素
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

            }
            else if (shapeFlag & 128 /* SUSPENSE */) {
                // 处理 SUSPENSE

            }

    }
};

function isSameVNodeType (n1, n2) {
  // n1 和 n2 节点的 type 和 key 都相同，才是相同节点
  return n1.type === n2.type && n1.key === n2.key
}
```
path执行的时候，会先判断新旧节点是否为 相同的 vnode 类型，如果不同，则销毁旧节点，挂载新节点。

例如：旧节点为 div，新节点是 p。path函数执行的逻辑是：删除旧节点 div，挂载 新节点 p。

如果是相同的节点类型，那么要走 更新流程（diff）。在vue3，更新流程会根据节点类型，执行对应的更新操作。

组件更新执行 processComponent，普通节点更新执行 processElement。

我们目前只分析这两种情况，忽略其它节点类型的更新情况。

### processComponent

我们先来看看更新组件的代码实现：

```js
const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
  if (n1 == null) {
    // 挂载组件
  }
  else {
    // 更新子组件
    updateComponent(n1, n2, parentComponent, optimized)
  }
}
const updateComponent = (n1, n2, parentComponent, optimized) => {
  const instance = (n2.component = n1.component)
  // 根据新旧子组件 vnode 判断是否需要更新子组件
  if (shouldUpdateComponent(n1, n2, parentComponent, optimized)) {
    if (instance.asyncDep &&
        !instance.asyncResolved) {
        // 异步组件

        // 如果异步组件，在待使用的状态，那么只更新 props 和 slots
        // 如果 异步组件，使用中，那么 执行 updateComponentPreRender 更新组件
        updateComponentPreRender(instance, n2, optimized);
        return;
    } else {
        // 更新 普通组件

        // 新的子组件 vnode 赋值给 instance.next
        instance.next = n2;
        // 子组件也可能因为数据变化被添加到更新队列里了，移除它们防止对一个子组件重复更新
        invalidateJob(instance.update);
        // 执行子组件的副作用渲染函数
        instance.update();
    }
  }
  else {
    // 不需要更新，只复制属性
    n2.component = n1.component
    n2.el = n1.el
  }
}
```

更新组件逻辑，主要通过执行 updateComponent 来更新子组件。updateComponent 执行的时候会先执行 shouldUpdateComponent 函数，来判断是否需要更新子组件。如果不需要更新，那么只是简单的复制属性；如果更新，则会进入组件更新流程，不过需要注意的是，同步和异步组件处理流程，存在差异。

- shouldUpdateComponent 这个函数来判断组件是否需要更新，其函数内部，主要通过检测和对比组件 vnode 中的 props、chidren、dirs、transiton 等属性，来决定子组件是否需要更新。这是很好理解的，因为在一个组件的子组件是否需要更新，我们主要依据子组件 vnode 是否存在一些会影响组件更新的属性变化进行判断，如果存在就会更新子组件

- invalidateJob 这个函数是用来处理只更新当前组件的数据变化。当组件发生发生变化的时候，子组件也可能会改变，vue3通过任务队列机制，防止重复更新子组件。

当为普通组件的时候，会先执行invalidateJob（instance.update）避免子组件由于自身数据变化导致的重复更新，然后又执行了子组件的副作用渲染函数 instance.update 来主动触发子组件的更新。

### processElement