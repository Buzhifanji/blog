---
title: 如何将 svelte 打包成 web-component 组件库。
date: 2023-01-07 13:57:26
category:
  - fontend
tag:
  - svelte
  - web component
---

笔者最近开源了一个组件库[render-big-data](https://www.npmjs.com/package/render-big-data)，用于渲染大数据。本质上是`虚拟列表`，按需渲染数据。市面上已经有很多类似的组件，但都是针对具体某个框架。依托于具体框架，就会面临两个问题。其一是框架升级改动过于大，组件库就很可能需要重新实现一遍，比如vue2升级到vue3。其二是框架被别的框架所取代，比如jQuery，组件库自然也要重新实现。

`web component`是浏览器原生组件，现如今主流框架都支持它。`web component`组件简单直接，符合直觉，不用加载任何外部模块，代码量小。基于`web component`就可以解决上述两个问题，可以达到一劳永逸的效果。

## 为什么是svelte

实现`web component`技术有很多，例如vue、react、anuglar、svelte、stenciljs、lit、纯js等等。但是兼顾开发效率和打包体积的并不多，开发效率影响着开发进度，`web component`是原生组件，如果一个组件过于大，就会消耗更多资源来加载组件。

纯js实现，可以说不用打包，一份js文件代码就是一个`web component`，但开发效率低，需要开发者自己处理的事情多，比如数据响应式。
现在主流框架vue、react、anuglar，开发效率是高，但是弊端是打包后的体积过于大，关于打包体积对比，详情查看[all-the-ways-to-make-a-web-component](https://webcomponents.dev/blog/all-the-ways-to-make-a-web-component/)的Bundle Size Comparison章节。

svelte既有很好的开发效率，也不存在打包体积过于的大弊端。所以svelte是不错的技术选择。svelte和vue有很多相似的地方，即使是没有使用过这个框架，上手难度也不高，开发心智低。

## 项目构建

### 搭建示例

这里采用vite构建工具，选vite是因为开发体验好。推荐使用pnpm，而不是npm，是因为pnpm 下载到node_modules的依赖包下内存比npm小很多。

```console
pnpm create vite
```

然后按照提示，在终端输入信息。

- Project name：vite-project (输入你的项目名称)
- Select a framework：选择Svelte
- Select a variant：选择TypeScript

项目模板已经下载好了，接下来下载依赖包

```console
cd vite-project
pnpm i
```

启动项目

```console
pnpm dev
```

草稿

### 示例配置

在svelte.config.js新增配置属性customElements

```javascript
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),
  customElements: true, // 新增这个属性
}

```

配置svelte


## 打包成 web component



## 处理 ts