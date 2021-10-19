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
function baseCreateRenderer(options) {
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
    createApp: createAppAPI(render)
  }
}

```
我们先用ensureRenderer来创建延时渲染器，这样做的好处是，当用户只依赖响应式包的时候，ensureRenderer就不会被执行，ensureRenderer不执行渲染器就不会被创建，因此可以通过tree-shaking的方式移除核心渲染逻辑相关的代码。

vue3定义渲染器，是为了跨平台渲染做准备的，现在我们只关注vue3初始化的时候做了什么事情，在这里我可以简单理解把渲染器理解为包含平台渲染核心逻辑的对象。

创建渲染器的同时还创建了hydrate，它了DOM的更新、卸载、移动等等相关操作逻辑。hydrate是为了同构渲染做准备的，目前我们不关注这部分逻辑。在这里可以简单把hydrate理解为把服务端渲染的静态HTML具有交互能力的对象。

了解完render、hydrate后，我们来看看createApp的代码逻辑

```js
function createAppAPI(render) {
  // createApp createApp 方法接受的两个参数：根组件的对象和 prop
  return function createApp(rootComponent, rootProps = null) {
    // 创建根组件的上下文
    const context = createAppContext();
    const app = {
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      get config() {}, // 读取 app.config
      set confgit() {}, // 更改 app.config
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








### 2. 重写 app.mount 方法

