<template><h1 id="vue3-2源码阅读笔记——createapp" tabindex="-1"><a class="header-anchor" href="#vue3-2源码阅读笔记——createapp" aria-hidden="true">#</a> Vue3.2源码阅读笔记——createApp</h1>
<p>createApp 是vue3中的入口函数，通过这个函数来了解vue3初始化时候做了哪些事情。</p>
<h2 id="应用程序初始化" tabindex="-1"><a class="header-anchor" href="#应用程序初始化" aria-hidden="true">#</a> 应用程序初始化</h2>
<p>在vue3中，会通过如下代码来初始化应用：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 在 Vue.js 3.0 中，初始化一个应用的方式如下</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">'./app'</span>
<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">'#app'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>createApp 是vue.js对外暴露的一个函数，我们来看一下它的函数实现：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> createApp <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// 创建 app 对象</span>
  <span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">ensureRenderer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">createApp</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> mount <span class="token punctuation">}</span> <span class="token operator">=</span> app
  <span class="token comment">// 重写 mount 方法</span>
  app<span class="token punctuation">.</span><span class="token function-variable function">mount</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">containerOrSelector</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> app
<span class="token punctuation">}</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>从代码中可以看出createApp主要做了两件事情：创建 app 对象和重写 app.mount 方法。接下来，我们就具体分析一下它们。</p>
<h3 id="_1-创建-app-对象" tabindex="-1"><a class="header-anchor" href="#_1-创建-app-对象" aria-hidden="true">#</a> 1. 创建 app 对象</h3>
<p>首先，我们ensureRenderer().createApp()来创建 app 对象，ensureRenderer用来创建一个<strong>渲染器</strong>对象，它的内部代码是这样的：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  <span class="token comment">// 渲染相关的配置、比如更新属性的方法，操作DOM的方法</span>
  <span class="token keyword">const</span> rendererOptions <span class="token operator">=</span> <span class="token function">extend</span><span class="token punctuation">(</span><span class="token punctuation">{</span> patchProp <span class="token punctuation">}</span><span class="token punctuation">,</span> nodeOps<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> renderer<span class="token punctuation">;</span>
  <span class="token comment">// 创建延时渲染器</span>
  <span class="token keyword">function</span> <span class="token function">ensureRenderer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">(</span>renderer <span class="token operator">||</span> <span class="token punctuation">(</span>renderer <span class="token operator">=</span> <span class="token function">createRenderer</span><span class="token punctuation">(</span>rendererOptions<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">function</span> <span class="token function">createRenderer</span><span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token function">baseCreateRenderer</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">baseCreateRenderer</span><span class="token punctuation">(</span><span class="token parameter">options<span class="token punctuation">,</span> createHydrationFns</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">function</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token parameter">vnode<span class="token punctuation">,</span> container</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 组件渲染的核心逻辑</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> internals <span class="token operator">=</span> <span class="token punctuation">{</span>
    p<span class="token operator">:</span> patch<span class="token punctuation">,</span>
    um<span class="token operator">:</span> unmount<span class="token punctuation">,</span>
    m<span class="token operator">:</span> move<span class="token punctuation">,</span>
    r<span class="token operator">:</span> remove<span class="token punctuation">,</span>
    mt<span class="token operator">:</span> mountComponent<span class="token punctuation">,</span>
    mc<span class="token operator">:</span> mountChildren<span class="token punctuation">,</span>
    pc<span class="token operator">:</span> patchChildren<span class="token punctuation">,</span>
    pbc<span class="token operator">:</span> patchBlockChildren<span class="token punctuation">,</span>
    n<span class="token operator">:</span> getNextHostNode<span class="token punctuation">,</span>
    o<span class="token operator">:</span> options
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> hydrate<span class="token punctuation">;</span>
  <span class="token keyword">let</span> hydrateNode<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>createHydrationFns<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// SSR 组件操作逻辑</span>
    <span class="token punctuation">[</span>hydrate<span class="token punctuation">,</span> hydrateNode<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">createHydrationFns</span><span class="token punctuation">(</span>internals<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    render<span class="token punctuation">,</span> <span class="token comment">// 组件渲染</span>
    hydrate<span class="token punctuation">,</span>	<span class="token comment">// SSR</span>
    createApp<span class="token operator">:</span> <span class="token function">createAppAPI</span><span class="token punctuation">(</span>render<span class="token punctuation">,</span> hydrate<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br></div></div><p>我们先用ensureRenderer来创建延时渲染器，这样做的好处是，当用户只依赖响应式包的时候，ensureRenderer就不会被执行，ensureRenderer不执行渲染器就不会被创建，因此可以通过tree-shaking的方式移除核心渲染逻辑相关的代码。</p>
<p>vue3定义渲染器，是为了跨平台渲染做准备的，现在我们只关注vue3初始化的时候做了什么事情，在这里我可以简单理解把渲染器理解为包含平台渲染核心逻辑的对象。</p>
<p>创建渲染器的同时还创建了hydrate，它了DOM的更新、卸载、移动等等相关操作逻辑。hydrate是为了同构渲染做准备的，目前我们不关注这部分逻辑。在这里可以简单把hydrate理解为把服务端渲染的静态HTML具有交互能力的对象。</p>
<p>baseCreateRenderer函数的参数createHydrationFns有值得时候，会创建SSR渲染器，反之创建通用的渲染器。这个通用渲染器用于PC、H5、微信小程序。而SSR渲染器用于同构渲染。</p>
<p>了解完render、hydrate后，我们来看看createApp的代码逻辑:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createAppAPI</span><span class="token punctuation">(</span><span class="token parameter">render</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// createApp createApp 方法接收的两个参数：根组件的对象和 prop</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">createApp</span><span class="token punctuation">(</span><span class="token parameter">rootComponent<span class="token punctuation">,</span> rootProps <span class="token operator">=</span> <span class="token keyword">null</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 创建根组件的上下文</span>
    <span class="token keyword">const</span> context <span class="token operator">=</span> <span class="token function">createAppContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token punctuation">{</span>
      _uid<span class="token operator">:</span> uid<span class="token operator">++</span><span class="token punctuation">,</span>
      _component<span class="token operator">:</span> rootComponent<span class="token punctuation">,</span>
      _props<span class="token operator">:</span> rootProps<span class="token punctuation">,</span>
      _container<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
      _context<span class="token operator">:</span> context<span class="token punctuation">,</span>
      _instance<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
      version<span class="token punctuation">,</span>
      <span class="token keyword">get</span> <span class="token function">config</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 读取 app.config</span>
      <span class="token keyword">set</span> <span class="token function">config</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 更改 app.config</span>
      <span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 定义 app.use(全局) 使用插件的方法</span>
      <span class="token function">mixin</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 定义 app.mixix(全局)  混入逻辑的方法</span>
      <span class="token function">component</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 定义 app.component(全局)  存储组件的方法</span>
      <span class="token function">directive</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 定义 app.directive(全局)  存错指令的方法</span>
      <span class="token function">mount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 定义 app.mount(全局)  挂载组件方法</span>
      <span class="token function">unmount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 定义 app.unmount(全局)  卸载组件的方法</span>
      <span class="token function">provide</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 定义 app.provide(全局)  依赖注入存储对应数据的方法</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> app
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><p>可以看到，createAppAPI方法返回了 createApp 函数，createApp方法接收两个参数：根组件的对象和rootProps，其中rootProps默认为null。</p>
<p>createApp方法内部定义了 app 对象。这个对象创建了_component、_context、_instance等等根组件信息，并且定义了use、mixin、component、directive、mount、unmount、provide全局方法。目前我们不关注这些方法的实现细节，等后续关注具体某个点的时候，再具体分析。例如，分析插件机制的时候，具体来来查看use方法的实现细节。</p>
<p>简单小结：在vue3.2内部通过createRenderer会创建一个渲染器，这个渲染器内部有一个 createApp 方法，它执行createAppAPI返回的函数，接收了 rootComponent 和 rootProps 两个参数。我们在应用层面执行 createApp(App) 方法时，会把 App对象作为跟组件传递给 rootComponent。这样，createApp内部就创建了一个 app 对象。</p>
<p>在创建 app 对象过程中，运用了闭包和函数柯里化技巧，很好的实现了参数保留。例如，在执行 app.mount 的时候，并不需要传入渲染器 render，这是因为在执行 createAppAPI 的时候渲染器 render 参数已经被保留下来了。</p>
<h3 id="_2-重写-app-mount-方法" tabindex="-1"><a class="header-anchor" href="#_2-重写-app-mount-方法" aria-hidden="true">#</a> 2. 重写 app.mount 方法</h3>
<p>createApp 内部就创建了一个 app 对象，它会提供 mount 方法，这个方法是用来挂载组件的。既然app对象已经有了 mount 方法，为什么要重写这个方法，而不是把相关逻辑方法 app 对象的 mount 内部来实现呢？</p>
<p>这是因为Vue不仅仅是为 Web 平台服务，它的目标是跨平台渲染。而 createApp 函数内部的 app.mount 方法是一个标准的可跨平台的组件渲染流程</p>
<p>我们先来看看 app对象内部 mount 方法的实现</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  <span class="token function">mount</span><span class="token punctuation">(</span><span class="token parameter">rootContainer<span class="token punctuation">,</span> isHydrate<span class="token punctuation">,</span> isSVG</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isMounted<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 创建根组件的 vnode</span>
          <span class="token keyword">const</span> vnode <span class="token operator">=</span> <span class="token function">createVNode</span><span class="token punctuation">(</span>rootComponent<span class="token punctuation">,</span> rootProps<span class="token punctuation">)</span><span class="token punctuation">;</span>
          vnode<span class="token punctuation">.</span>appContext <span class="token operator">=</span> context<span class="token punctuation">;</span>

          <span class="token punctuation">{</span>
              <span class="token comment">// HMR root reload 热更新</span>
              context<span class="token punctuation">.</span><span class="token function-variable function">reload</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                  <span class="token function">render</span><span class="token punctuation">(</span><span class="token function">cloneVNode</span><span class="token punctuation">(</span>vnode<span class="token punctuation">)</span><span class="token punctuation">,</span> rootContainer<span class="token punctuation">,</span> isSVG<span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
          <span class="token comment">// 利用渲染器渲染 vnode</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>isHydrate <span class="token operator">&amp;&amp;</span> hydrate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token function">hydrate</span><span class="token punctuation">(</span>vnode<span class="token punctuation">,</span> rootContainer<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
              <span class="token function">render</span><span class="token punctuation">(</span>vnode<span class="token punctuation">,</span> rootContainer<span class="token punctuation">,</span> isSVG<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
          <span class="token comment">// 此方法用于挂载根组件，挂载完，就不会在被执行了</span>
          isMounted <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
          app<span class="token punctuation">.</span>_container <span class="token operator">=</span> rootContainer<span class="token punctuation">;</span>
          rootContainer<span class="token punctuation">.</span>__vue_app__ <span class="token operator">=</span> app<span class="token punctuation">;</span> <span class="token punctuation">{</span>
              app<span class="token punctuation">.</span>_instance <span class="token operator">=</span> vnode<span class="token punctuation">.</span>component<span class="token punctuation">;</span>
              <span class="token function">devtoolsInitApp</span><span class="token punctuation">(</span>app<span class="token punctuation">,</span> version<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
          <span class="token keyword">return</span> vnode<span class="token punctuation">.</span>component<span class="token punctuation">.</span>proxy<span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          <span class="token function">warn$1</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">App has already been mounted.\n</span><span class="token template-punctuation string">`</span></span> <span class="token operator">+</span>
              <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">If you want to remount the same app, move your app creation logic </span><span class="token template-punctuation string">`</span></span> <span class="token operator">+</span>
              <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">into a factory function and create fresh app instances for each </span><span class="token template-punctuation string">`</span></span> <span class="token operator">+</span>
              <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">mount - e.g. \`const createMyApp = () => createApp(App)\`</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><p>从代码层面可以看出mount方法只会被执行一次，因为mount执行后isMounted就被设置为ture，下次执行的时候就不会再次进入了。为什么要这样设计呢？因为mount方法只用于挂载根组件，而根组件只能有一个。</p>
<p>说明判断isMounted标识后，接下来就是标准的跨平台渲染流程：先创建 vnode，再渲染 vnode。参数 rootContainer 也可以是不同类型的值，比如，在 Web 平台它是一个 DOM 对象，而在其他平台（比如 Weex 和小程序）中可以是其他类型的值。所以这里面的代码不应该包含任何特定平台相关的逻辑，也就是说这些代码的执行逻辑都是与平台无关的。因此我们需要在外部重写这个方法，来完善 Web 平台下的渲染逻辑。</p>
<p>接下来，我们看看重写后的mount方法做了哪些事情：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  app<span class="token punctuation">.</span><span class="token function-variable function">mount</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">containerOrSelector</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token comment">// 标准化容器</span>
      <span class="token keyword">const</span> container <span class="token operator">=</span> <span class="token function">normalizeContainer</span><span class="token punctuation">(</span>containerOrSelector<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>container<span class="token punctuation">)</span>
          <span class="token keyword">return</span><span class="token punctuation">;</span>
      <span class="token keyword">const</span> component <span class="token operator">=</span> app<span class="token punctuation">.</span>_component<span class="token punctuation">;</span>
      <span class="token comment">// 如果组件没有定义 render 和 template 模板，则取容器的 innerTHML 做为组件的内容</span>
      <span class="token comment">// render 和 template 会优先取 render</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isFunction</span><span class="token punctuation">(</span>component<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>component<span class="token punctuation">.</span>render <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>component<span class="token punctuation">.</span>template<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          component<span class="token punctuation">.</span>template <span class="token operator">=</span> container<span class="token punctuation">.</span>innerHTML<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// 挂载前清空容器内容</span>
      container<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">;</span>
      <span class="token comment">// 真正挂载</span>
      <span class="token keyword">const</span> proxy <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>container<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> container <span class="token keyword">instanceof</span> <span class="token class-name">SVGElement</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>container <span class="token keyword">instanceof</span> <span class="token class-name">Element</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          container<span class="token punctuation">.</span><span class="token function">removeAttribute</span><span class="token punctuation">(</span><span class="token string">'v-cloak'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          container<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'data-v-app'</span><span class="token punctuation">,</span> <span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> proxy<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>首先是通过normalizeContainer标准化容器，为什么要这样做呢?因为这里可以传字符串选择器或者 DOM 对象，如果传入的是字符串选择器，就需要把它转成 DOM 对象，作为最终挂载容器。
然后做了一个 if 判断，如果组件对象没有定义 render 函数和 template 模板，则取容器的 innerHTML 作为组件模板内容。
接着在挂载前清空容器内容，最终再调用 app.mount 的方法走标准的组件渲染流程。</p>
<p>从标准化容器就可以看出，这里重写的逻辑都是和 Web 平台相关的，所以要放在外面实现。此外，这么做的目的是既能让用户在使用 API 时可以更加灵活，也兼容了 Vue.js 2.x 的写法，比如 app.mount 的第一个参数就同时支持选择器字符串和 DOM 对象两种类型</p>
<p><strong>总结</strong>：vue3调用createApp时，先用ensureRenderer来创建延时渲染器，然后调用createAppAPI创建 app 对象，这个对象里提供了use、mixin、component、directive、mount、unmount、provide定义全局数据的方法。app.mount定义了标准的跨平台渲染流程：先创建 vnode，再渲染 vnode。平台不同渲染流程会不同，所以需要根据平台重写渲染相关逻辑。重写后Web 平台的渲染流程是标准化容器、挂载组件。</p>
</template>
