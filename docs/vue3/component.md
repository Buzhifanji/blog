---
title: vue3组件
author: buzhifanji
sidebar: 'vue3'
tag: vue3
prev: '/vue3/debugging/'
next: '/docs/settings/'
---

# 理解vue3中的组件

组件是一个抽象的概念，虽然我们会在实际项目中经常写各种各样的组件，但是我们未必真正深入了解过组件。

本文主要讲述什么组件，组件整个处理流程：创建、更新、销毁。

## 组件的表示

在理解组件之前，我们先来理解什么是vnode

### 何为vnode

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

### 何为组件

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
    // 缓存 vnode 节点，表示已经渲染
    container._vnode = vnode;
};
```

这个渲染函数 render 的实现很简单，如果它的第一个参数 vnode 为空，则执行销毁组件的逻辑，否则执行创建或者更新组件的逻辑。

## 组件的处理：processComponent

vue中在渲染vnode的时候，当vnode不为空的时候，调用 path 这个函数，我们先来看看 path 里关于组件的处理逻辑:
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
                else {
                    warn$1('Invalid VNode type:', type, `(${typeof type})`);
                }
        }
    };
```
vue为什么不直接调用处理组件的逻辑，而是通过 path 这个函数进入处理组件逻辑？

patch 对应中文的意思是打补丁，在调用 processComponent 函数之前，会先判断新旧 vnode，如果相同节点，那么直接返回不用；如果新旧节点的节点类型不同，则会销毁旧节点。处理好各种情况后，才进入 processComponent，这样 processComponent 就能专门处理组件逻辑了。

patch函数的作用一个是复用相同逻辑，二是尽量让处理组件的逻辑的单一。

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

### 挂载组件：mountComponent

我们接着来看挂载组件的 mountComponent 函数的实现：
```js
    const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
        // 创建组件实例
        const instance = (initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense));

        if (isKeepAlive(initialVNode)) {
            // 组件缓存
        }
        // 设置组件实例，例如处理 props、slots
        setupComponent(instance);

        if (instance.asyncDep) {
            // 异步组件
        }
        // 设置并运行带副作用的渲染函数
        setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);
    };
```

可以看出，挂载组件 mountComponent 这个函数主要做了三件事情：创建组件实例、设置组件实例、设置并运行带副作用的渲染函数，我们接下来详情分析这个三个步骤

#### 创建组件实例：createComponentInstance
我们接下来看看 createComponentInstance 这个函数的实现：
```js
  function createComponentInstance(vnode, parent, suspense) {
      const type = vnode.type;
      // 如果是根组件的话的 组件的上下文是自身，否则继承父组件的上下文
      const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
      const instance = {
          vnode,
          type,
          parent,
          appContext,
          root: null,
          next: null,
          subTree: null,
          update: null,
          scope: new EffectScope(true /* detached */),
          render: null,
          provides: parent ? parent.provides : Object.create(appContext.provides),
          renderCache: [],
          // local resovled assets
          components: null,
          directives: null,
          // resolved props and emits options
          propsOptions: normalizePropsOptions(type, appContext),
          emitsOptions: normalizeEmitsOptions(type, appContext),
          // emit
          emit: null,
          emitted: null,
          // props default value
          propsDefaults: EMPTY_OBJ,
          // inheritAttrs
          inheritAttrs: type.inheritAttrs,
          // state
          ctx: EMPTY_OBJ,
          data: EMPTY_OBJ,
          props: EMPTY_OBJ,
          attrs: EMPTY_OBJ,
          slots: EMPTY_OBJ,
          refs: EMPTY_OBJ,
          setupState: EMPTY_OBJ,
          setupContext: null,
          // suspense related
          suspense,
          suspenseId: suspense ? suspense.pendingId : 0,
          asyncDep: null,
          asyncResolved: false,
          // lifecycle hooks
          // not using enums here because it results in computed properties
          isMounted: false,
          isUnmounted: false,
          isDeactivated: false,
          bc: null,
          c: null,
          bm: null,
          m: null,
          bu: null,
          u: null,
          um: null,
          bum: null,
          da: null,
          a: null,
          rtg: null,
          rtc: null,
          ec: null,
          sp: null
      };
      instance.root = parent ? parent.root : instance;
      instance.emit = emit.bind(null, instance);
      return instance;
  }
```

可以看出组件的实例就是个JS对象，这个包含了很多属性，这与我们前面介绍组件这个抽象概念是一致的。

#### 设置组件实例：setupComponent
组件实例创建完后，我再来看看 setupComponent 函数的实现：
```js
  function setupComponent(instance, isSSR = false) {
      isInSSRComponentSetup = isSSR;
      const { props, children } = instance.vnode;
      const isStateful = isStatefulComponent(instance);
      // 处理 组件的props
      initProps(instance, props, isStateful, isSSR);
      // 处理 组件的slots
      initSlots(instance, children);
      // 处理 组件其他属性、例如 创建 render 函数
      const setupResult = isStateful
          ? setupStatefulComponent(instance, isSSR)
          : undefined;
      isInSSRComponentSetup = false;
      return setupResult;
  }
```
setupComponent 用来**维护组件的上下文**，例如 initProps 处理我们熟悉的 组件传入的数据，initSlots 处理组件的slots。

#### 设置运行带副作用的渲染函数 setupRenderEffect

最后我们来看看 运行带副作用的渲染函数 setupRenderEffect 的实现：
```js
const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        if (el && hydrateNode) {
            //  hydrateNode
        } else {
          // 渲染组件生成子树 vnode
          const subTree = (instance.subTree = renderComponentRoot(instance))
          // 把子树 vnode 挂载到 container 中
          patch(null,subTree,container,anchor,instance,parentSuspense,sSVG)
          // 保留渲染生成的子树根 DOM 节点
          initialVNode.el = subTree.el
        }
        instance.isMounted = true
      } else {
        // 更新组件

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
    }

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
}

```
setupRenderEffect 主要做了三件事情：挂载组件、更新组件、创建并且运行响应式的副作用渲染函数。我们接下来会这个三件事情逐一分析。

我们先分析挂载组件，另外两件事情，我们稍后分析。

##### 挂载组件

进入挂载组件逻辑，意味着初始化渲染，此时主要做两件事情**渲染组件生成 subTree、把 subTree 挂载到 container 中**

细心的你会注意 setupRenderEffect 其中一个 initialVNode，而在函数内部会重新生成一个 subTree，它们两具体指是什么呢？

**理解 subTree和initialVNode**

我们先定义一个组件：
```html
// 组件节点
<hello-world :msg="'hi'"></hello-world>

// 组件内部的模板
<template>
  <div>
    <p>{{msg}} World</p>
  </div>
</template>
```
其中描述组件节点信息的是 initialVNode，描述组件内部的模板内容是 subTree。

渲染组件生成子树 vnode后，会把它挂载到 container 中，而挂载的调用的函数 就是我们前面讲的 path 这个函数。

此时 path 函数内部会执行 processElement 这个函数，也是处理虚拟 DOM 相关的逻辑了。

### 更新组件：updateComponent

我们来看看更新组件updateComponent的代码实现：

```js
const updateComponent = (n1, n2, parentComponent, optimized) => {
  const instance = (n2.component = n1.component)
  // 根据新旧子组件 vnode 判断是否需要更新子组件
  if (shouldUpdateComponent(n1, n2, parentComponent, optimized)) {
    if (instance.asyncDep &&
        !instance.asyncResolved) {
        // 异步组件
        // 异步组件处于 pending 状态

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
shouldUpdateComponent 这个函数来判断组件是否需要更新，其函数内部，主要通过检测和对比组件 vnode 中的 props、chidren、dirs、transiton 等属性，来决定子组件是否需要更新。这是很好理解的，因为在一个组件的子组件是否需要更新，我们主要依据子组件 vnode 是否存在一些会影响组件更新的属性变化进行判断，如果存在就会更新子组件。

当更新组件的时候，会把新节点 n2 赋值给 实例中的 next 属性

更新组件的主流程是：新建 subTree,通过 path 对比 新建的 subTree。我们

在 新建 subTree 之前，如果 next 为 true 的话，就会执行 updateComponentPreRender 更新组件 vnode 节点信息。这是 vue3 更新组件的策略，我们接下来看看 updateComponentPreRender 函数实现：


####


另外，创建响应式的副作用函数，会很抽象。我们可以简单理解 实例化ReactiveEffect会生成 副作用 effcet 函数。副作用，这里你可以简单地理解为，当组件的数据发生变化时，effect 函数包裹的内部渲染函数 componentEffect 会重新执行一遍，从而达到重新渲染组件的目的。关于 ReactiveEffect 我们在后面阅读响应式相关的代码时候在深入分析。

**初始渲染主要做两件事情：渲染组件生成 subTree、把 subTree 挂载到 container 中。**

从组件的实例可以看出，每个组件都会有对应的 render 函数，即使你写 template，也会编译成 render 函数，而 renderComponentRoot 函数就是去执行 render 函数创建整个组件树内部的 vnode，把这个 vnode 再经过内部一层标准化，就得到了该函数的返回结果：子树vnode。

渲染生成子树 vnode 后，接下来就是继续调用 patch 函数把子树 vnode 挂载到 container 中了。

### path: 普通 DOM 元素

我们分析完 path 组件的流程，接下来，我们再看看 path 普通 DOM 元素的 processElement 函数的实现：

```js
const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    isSVG = isSVG || n2.type === 'svg';
    if (n1 == null) {
        //  //挂载元素节点
        mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
        //更新元素节点
        patchElement(n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
};
```
这个函数逻辑与 processComponent 函数的处理逻辑类似：如果 n1 为 null，走挂载元素节点的逻辑，否则走更新元素节点逻辑。

我们接着来看挂载元素的 mountElement 函数的实现：
```js
const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { type, props, shapeFlag, transition, patchFlag, dirs } = vnode;
    {
        // 创建 DOM 元素节点
        el = vnode.el = hostCreateElement(vnode.type, isSVG, props && props.is, props);

        if (shapeFlag & 8 /* TEXT_CHILDREN */) {
            // 处理子节点是纯文本的情况
            hostSetElementText(el, vnode.children);
        } else if (shapeFlag & 16 /* ARRAY_CHILDREN */) {
            // 处理子节点是数组的情况
            mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== 'foreignObject', slotScopeIds, optimized);
        }
        // 处理 props，比如 class、style、event 等属性
        if (props) {
            for (const key in props) {
                if (key !== 'value' && !isReservedProp(key)) {
                    hostPatchProp(el, key, null, props[key], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
                }
            }
        }
        // 处理 css作用域
        setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    }
    // 把创建的 DOM 元素节点挂载到 container 上
    hostInsert(el, container, anchor);
};
```
可以看出，挂载元素主要做了五件事情：创建 DOM 元素节点、处理文本或者数组的子节点、处理props、处理css作用域、挂载 DOM 元素到 container 上。

DOM 元素是通过 hostCreateElement 方法创建的，这一个平台相关的方法，在 Web 环境中对应的的是：
```js
function createElement(tag, isSVG, is) {
  isSVG ? document.createElementNS(svgNS, tag)
    : document.createElement(tag, is ? { is } : undefined)
}
```
它调用了底层的 DOM API document.createElement 创建元素。

同样的如果子节点是文本节点，则执行 hostSetElementText 方法，它在 Web 环境下通过设置 DOM 元素的 textContent 属性设置文本：
```js
function setElementText(el, text) {
  el.textContent = text
}
```
处理props、处理css作用域，我们目前不做分析。

我接下来看看，处理子节点是数组的情况,执行 mountChildren 方法：
```js
const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start = 0) => {
    for (let i = start; i < children.length; i++) {
        // 对子节点 预处理（优化）
        const child = (children[i] = optimized
            ? cloneIfMounted(children[i])
            : normalizeVNode(children[i]));
        // 递归 patch 挂载 child
        patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
};
```
子节点的挂载逻辑同样很简单，遍历 children 获取到每一个 child，然后递归执行 patch 方法挂载每一个 child。

这里需要注意的是，递归 patch 是**深度优先遍历树**的方式。

处理完所有子节点后，最后通过 hostInsert 方法把创建的 DOM 元素节点挂载到 container 上。