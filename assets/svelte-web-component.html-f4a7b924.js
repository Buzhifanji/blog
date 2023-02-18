const e=JSON.parse('{"key":"v-36b59a3c","path":"/HTML/svelte-web-component.html","title":"如何将 svelte 打包成 web-component 组件库。","lang":"zh-CN","frontmatter":{"title":"如何将 svelte 打包成 web-component 组件库。","date":"2023-01-07T13:57:26.000Z","category":["fontend"],"tag":["svelte","web component"]},"headers":[{"level":2,"title":"为什么是svelte","slug":"为什么是svelte","link":"#为什么是svelte","children":[]},{"level":2,"title":"项目构建","slug":"项目构建","link":"#项目构建","children":[{"level":3,"title":"搭建示例","slug":"搭建示例","link":"#搭建示例","children":[]},{"level":3,"title":"示例配置","slug":"示例配置","link":"#示例配置","children":[]}]},{"level":2,"title":"打包成 web component","slug":"打包成-web-component","link":"#打包成-web-component","children":[]},{"level":2,"title":"处理 ts","slug":"处理-ts","link":"#处理-ts","children":[]}],"git":{"createdTime":1676711270000,"updatedTime":1676711270000,"contributors":[{"name":"buzhifanji","email":"buzhifanji@163.com","commits":1}]},"readingTime":{"minutes":2.33,"words":698},"filePathRelative":"HTML/svelte-web-component.md","localizedDate":"2023年1月7日","excerpt":"<p>笔者最近开源了一个组件库<a href=\\"https://www.npmjs.com/package/render-big-data\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">render-big-data</a>，用于渲染大数据。本质上是<code>虚拟列表</code>，按需渲染数据。市面上已经有很多类似的组件，但都是针对具体某个框架。依托于具体框架，就会面临两个问题。其一是框架升级改动过于大，组件库就很可能需要重新实现一遍，比如vue2升级到vue3。其二是框架被别的框架所取代，比如jQuery，组件库自然也要重新实现。</p>\\n<p><code>web component</code>是浏览器原生组件，现如今主流框架都支持它。<code>web component</code>组件简单直接，符合直觉，不用加载任何外部模块，代码量小。基于<code>web component</code>就可以解决上述两个问题，可以达到一劳永逸的效果。</p>"}');export{e as data};
