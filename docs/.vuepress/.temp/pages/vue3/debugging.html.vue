<template><h1 id="vue3-2源码阅读笔记——代码调试" tabindex="-1"><a class="header-anchor" href="#vue3-2源码阅读笔记——代码调试" aria-hidden="true">#</a> Vue3.2源码阅读笔记——代码调试</h1>
<h2 id="下载源码" tabindex="-1"><a class="header-anchor" href="#下载源码" aria-hidden="true">#</a> 下载源码</h2>
<p>vue3目前一直在更新，所以会不同的版本，那么我们如何选择自己想要的版本进行阅读呢？GitHub中提供了打tags功能，它这里列出了不同版本号的代码。</p>
<p><img src="@source/../src/assets/imgs/vue-tags.png" alt="Alternative text"></p>
<p>我们在tags列表找到<a href="https://github.com/vuejs/vue-next/releases/tag/v3.2.0" target="_blank" rel="noopener noreferrer">v3.2.0版本<ExternalLinkIcon/></a>,然后下载source code。</p>
<p><img src="@source/../src/assets/imgs/vue3.2-source.png" alt="Alternative text"></p>
<p>下载完成之后，解压用vscode打开，然后在终端执行 npm i，下载相关依赖数据。</p>
<h2 id="构建代码" tabindex="-1"><a class="header-anchor" href="#构建代码" aria-hidden="true">#</a> 构建代码</h2>
<p>把 package.json的dev属性修改成如下,因为修改后可以生产sourceMap文件了，有了这个代码，我们就可以debugger调试代码了。</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token property">"dev"</span><span class="token operator">:</span> <span class="token string">"node scripts/dev.js --sourcemap"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>修改好后，在终端执行命令</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>npm run dev
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="调试例子" tabindex="-1"><a class="header-anchor" href="#调试例子" aria-hidden="true">#</a> 调试例子</h2>
<p>我们刚才打包好的代码存放在 packages/vue/dist 目录里。然后我们在 packages/vue/examples 新建我们的demo文件。例子如下图</p>
<p><img src="@source/../src/assets/imgs/vue-debugging.png" alt="Alternative text"></p>
<p>在浏览器里打开这个文件，我们就可以调试代码了。</p>
</template>
