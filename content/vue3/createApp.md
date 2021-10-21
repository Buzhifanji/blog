---
title: createApp
author: buzhifanji
tag: vue3
sidebar: 'vue3'
---

# Vue3.2源码阅读笔记——createApp

createApp 是vue3中的入口函数，通过这个函数来了解vue3初始化时候做了哪些事情。

## 应用程序初始化

在vue3中，会通过如下代码来初始化应用：

```js
// 在 Vue.js 3.0 中，初始化一个应用的方式如下
import { createApp } from 'vue'
import App from './app'
const app = createApp(App)
app.mount('#app')
```

createApp 是vue.js对外暴露的一个函数，我们来看一下它的函数实现：

```js
const createApp = ((...args) => {
  // 创建 app 对象
  const app = ensureRenderer().createApp(...args)
  const { mount } = app
  // 重写 mount 方法
  app.mount = (containerOrSelector) => {
    // ...
  }
  return app
})

```
从代码中可以看出createApp主要做了两件事情：创建 app 对象和重写 app.mount 方法。接下来，我们就具体分析一下它们。

### 1. 创建 app 对象

首先，我们ensureRenderer().createApp()来创建 app 对象，ensureRenderer用来创建一个**渲染器**对象，它的内部代码是这样的：

```js
  // 渲染相关的配置、比如更新属性的方法，操作DOM的方法
  const rendererOptions = extend({ patchProp }, nodeOps);
  let renderer;
  // 创建延时渲染器
  function ensureRenderer() {
      return (renderer || (renderer = createRenderer(rendererOptions)));
  }
  function createRenderer(options) {
      return baseCreateRenderer(options);
  }
function baseCreateRenderer(options, createHydrationFns) {
  function render(vnode, container) {
    // 组件渲染的核心逻辑
  }

  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  let hydrateNode;
  if (createHydrationFns) {
    // SSR 组件操作逻辑
    [hydrate, hydrateNode] = createHydrationFns(internals);
  }

  return {
    render, // 组件渲染
    hydrate,	// SSR
    createApp: createAppAPI(render, hydrate)
  }
}

```
我们先用ensureRenderer来创建延时渲染器，这样做的好处是，当用户只依赖响应式包的时候，ensureRenderer就不会被执行，ensureRenderer不执行渲染器就不会被创建，因此可以通过tree-shaking的方式移除核心渲染逻辑相关的代码。

vue3定义渲染器，是为了跨平台渲染做准备的，现在我们只关注vue3初始化的时候做了什么事情，在这里我可以简单理解把渲染器理解为包含平台渲染核心逻辑的对象。

创建渲染器的同时还创建了hydrate，它了DOM的更新、卸载、移动等等相关操作逻辑。hydrate是为了同构渲染做准备的，目前我们不关注这部分逻辑。在这里可以简单把hydrate理解为把服务端渲染的静态HTML具有交互能力的对象。

baseCreateRenderer函数的参数createHydrationFns有值得时候，会创建SSR渲染器，反之创建通用的渲染器。这个通用渲染器用于PC、H5、微信小程序。而SSR渲染器用于同构渲染。

了解完render、hydrate后，我们来看看createApp的代码逻辑:

```js
function createAppAPI(render) {
  // createApp createApp 方法接收的两个参数：根组件的对象和 prop
  return function createApp(rootComponent, rootProps = null) {
    // 创建根组件的上下文
    const context = createAppContext();
    const app = {
      _uid: uid++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {}, // 读取 app.config
      set config() {}, // 更改 app.config
      use() {}, // 定义 app.use(全局) 使用插件的方法
      mixin() {}, // 定义 app.mixix(全局)  混入逻辑的方法
      component() {}, // 定义 app.component(全局)  存储组件的方法
      directive() {}, // 定义 app.directive(全局)  存错指令的方法
      mount() {}, // 定义 app.mount(全局)  挂载组件方法
      unmount() {}, // 定义 app.unmount(全局)  卸载组件的方法
      provide() {}, // 定义 app.provide(全局)  依赖注入存储对应数据的方法
    }
    return app
  }
}
```

可以看到，createAppAPI方法返回了 createApp 函数，createApp方法接收两个参数：根组件的对象和rootProps，其中rootProps默认为null。

createApp方法内部定义了 app 对象。这个对象创建了_component、_context、_instance等等根组件信息，并且定义了use、mixin、component、directive、mount、unmount、provide全局方法。目前我们不关注这些方法的实现细节，等后续关注具体某个点的时候，再具体分析。例如，分析插件机制的时候，具体来来查看use方法的实现细节。


简单小结：在vue3.2内部通过createRenderer会创建一个渲染器，这个渲染器内部有一个 createApp 方法，它执行createAppAPI返回的函数，接收了 rootComponent 和 rootProps 两个参数。我们在应用层面执行 createApp(App) 方法时，会把 App对象作为跟组件传递给 rootComponent。这样，createApp内部就创建了一个 app 对象。

在创建 app 对象过程中，运用了闭包和函数柯里化技巧，很好的实现了参数保留。例如，在执行 app.mount 的时候，并不需要传入渲染器 render，这是因为在执行 createAppAPI 的时候渲染器 render 参数已经被保留下来了。


### 2. 重写 app.mount 方法

createApp 内部就创建了一个 app 对象，它会提供 mount 方法，这个方法是用来挂载组件的。既然app对象已经有了 mount 方法，为什么要重写这个方法，而不是把相关逻辑方法 app 对象的 mount 内部来实现呢？

这是因为Vue不仅仅是为 Web 平台服务，它的目标是跨平台渲染。而 createApp 函数内部的 app.mount 方法是一个标准的可跨平台的组件渲染流程

我们先来看看 app对象内部 mount 方法的实现

```js
  mount(rootContainer, isHydrate, isSVG) {
      if (!isMounted) {
          // 创建根组件的 vnode
          const vnode = createVNode(rootComponent, rootProps);
          vnode.appContext = context;

          {
              // HMR root reload 热更新
              context.reload = () => {
                  render(cloneVNode(vnode), rootContainer, isSVG);
              };
          }
          // 利用渲染器渲染 vnode
          if (isHydrate && hydrate) {
              hydrate(vnode, rootContainer);
          } else {
              render(vnode, rootContainer, isSVG);
          }
          // 此方法用于挂载根组件，挂载完，就不会在被执行了
          isMounted = true;
          app._container = rootContainer;
          rootContainer.__vue_app__ = app; {
              app._instance = vnode.component;
              devtoolsInitApp(app, version);
          }
          return vnode.component.proxy;
      } else {
          warn$1(`App has already been mounted.\n` +
              `If you want to remount the same app, move your app creation logic ` +
              `into a factory function and create fresh app instances for each ` +
              `mount - e.g. \`const createMyApp = () => createApp(App)\``);
      }
  }
```
从代码层面可以看出mount方法只会被执行一次，因为mount执行后isMounted就被设置为ture，下次执行的时候就不会再次进入了。为什么要这样设计呢？因为mount方法只用于挂载根组件，而根组件只能有一个。

说明判断isMounted标识后，接下来就是标准的跨平台渲染流程：先创建 vnode，再渲染 vnode。参数 rootContainer 也可以是不同类型的值，比如，在 Web 平台它是一个 DOM 对象，而在其他平台（比如 Weex 和小程序）中可以是其他类型的值。所以这里面的代码不应该包含任何特定平台相关的逻辑，也就是说这些代码的执行逻辑都是与平台无关的。因此我们需要在外部重写这个方法，来完善 Web 平台下的渲染逻辑。

接下来，我们看看重写后的mount方法做了哪些事情：
```js
  app.mount = (containerOrSelector) => {
      // 标准化容器
      const container = normalizeContainer(containerOrSelector);
      if (!container)
          return;
      const component = app._component;
      // 如果组件没有定义 render 和 template 模板，则取容器的 innerTHML 做为组件的内容
      // render 和 template 会优先取 render
      if (!isFunction(component) && !component.render && !component.template) {
          component.template = container.innerHTML;
      }
      // 挂载前清空容器内容
      container.innerHTML = '';
      // 真正挂载
      const proxy = mount(container, false, container instanceof SVGElement);
      if (container instanceof Element) {
          container.removeAttribute('v-cloak');
          container.setAttribute('data-v-app', '');
      }
      return proxy;
  };
```
首先是通过normalizeContainer标准化容器，为什么要这样做呢?因为这里可以传字符串选择器或者 DOM 对象，如果传入的是字符串选择器，就需要把它转成 DOM 对象，作为最终挂载容器。
然后做了一个 if 判断，如果组件对象没有定义 render 函数和 template 模板，则取容器的 innerHTML 作为组件模板内容。
接着在挂载前清空容器内容，最终再调用 app.mount 的方法走标准的组件渲染流程。

从标准化容器就可以看出，这里重写的逻辑都是和 Web 平台相关的，所以要放在外面实现。此外，这么做的目的是既能让用户在使用 API 时可以更加灵活，也兼容了 Vue.js 2.x 的写法，比如 app.mount 的第一个参数就同时支持选择器字符串和 DOM 对象两种类型

**总结**：vue3调用createApp时，先用ensureRenderer来创建延时渲染器，然后调用createAppAPI创建 app 对象，这个对象里提供了use、mixin、component、directive、mount、unmount、provide定义全局数据的方法。app.mount定义了标准的跨平台渲染流程：先创建 vnode，再渲染 vnode。平台不同渲染流程会不同，所以需要根据平台重写渲染相关逻辑。重写后Web 平台的渲染流程是标准化容器、挂载组件。
