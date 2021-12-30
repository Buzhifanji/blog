<template><h1 id="带着问题阅读源码vue3-2-reactive实现原理" tabindex="-1"><a class="header-anchor" href="#带着问题阅读源码vue3-2-reactive实现原理" aria-hidden="true">#</a> 带着问题阅读源码Vue3.2-reactive实现原理</h1>
<p>vue3提供了一个新的API-reactive，用于定义响应式对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code> <span class="token keyword">const</span> book <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span> title<span class="token operator">:</span> <span class="token string">'Vue 3.2 reative 实现原理'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>用法很简单，reactive包裹一个对象，返回的数据就是响应式对了。那么我们的问题来</p>
<ul>
<li>
<p>vue3是如何转变成响应对象的呢？</p>
</li>
<li>
<p>vue3内部数据是如何收集依赖以及更新依赖的？</p>
</li>
</ul>
<h2 id="createreactiveobject的实现" tabindex="-1"><a class="header-anchor" href="#createreactiveobject的实现" aria-hidden="true">#</a> createReactiveObject的实现</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  <span class="token comment">// 存储 reactive对象</span>
  <span class="token keyword">const</span> reactiveMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WeakMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// reactive函数入口</span>
  <span class="token keyword">function</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token parameter">target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token function">createReactiveObject</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> mutableHandlers<span class="token punctuation">,</span> mutableCollectionHandlers<span class="token punctuation">,</span> reactiveMap<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">function</span> <span class="token function">createReactiveObject</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> isReadonly<span class="token punctuation">,</span> baseHandlers<span class="token punctuation">,</span> collectionHandlers<span class="token punctuation">,</span> proxyMap</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// proxyMap 就是 reactiveMap</span>
      <span class="token comment">// target 已经存在 reactiveMap中，此时直接返回存在的数据</span>
      <span class="token comment">// 说明 同一个对象即时多次 reactive 调用，其返回的结果都是同一个响应式对象。</span>
      <span class="token keyword">const</span> existingProxy <span class="token operator">=</span> proxyMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>existingProxy<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> existingProxy<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// 通过 Proxy 代理对象</span>
      <span class="token keyword">const</span> proxy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> targetType <span class="token operator">===</span> <span class="token number">2</span> <span class="token comment">/* COLLECTION */</span> <span class="token operator">?</span> collectionHandlers <span class="token operator">:</span> baseHandlers<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">// 存入 reactiveMap 中</span>
      proxyMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> proxy<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> proxy<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>如果不了解Proxy这个api，可以点击<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy" target="_blank" rel="noopener noreferrer">Proxy<ExternalLinkIcon/></a></p>
<p>vue3通过 Proxy 这个api，把普通对象转换成响应式对象。在vue2中是的defineProperty这个api把普通对象转换成响应式对象，这个api存在缺陷，例如不能代理数组，当响应式对象添加属性的时候，就不是响应式对象了。</p>
<h2 id="get的实现-creategetter" tabindex="-1"><a class="header-anchor" href="#get的实现-creategetter" aria-hidden="true">#</a> get的实现： createGetter</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  <span class="token comment">// get 的实现</span>
  <span class="token keyword">const</span> get <span class="token operator">=</span> <span class="token function">createGetter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">function</span> <span class="token function">createGetter</span><span class="token punctuation">(</span><span class="token parameter">isReadonly <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span> shallow <span class="token operator">=</span> <span class="token boolean">false</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> receiver</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 处理数组</span>
          <span class="token keyword">const</span> targetIsArray <span class="token operator">=</span> <span class="token function">isArray</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isReadonly <span class="token operator">&amp;&amp;</span> targetIsArray <span class="token operator">&amp;&amp;</span> <span class="token function">hasOwn</span><span class="token punctuation">(</span>arrayInstrumentations<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token keyword">return</span> Reflect<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>arrayInstrumentations<span class="token punctuation">,</span> key<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
          <span class="token comment">// 处理 对象</span>
          <span class="token keyword">const</span> res <span class="token operator">=</span> Reflect<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span><span class="token punctuation">;</span>

          <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isReadonly<span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token comment">// 开始收集 依赖</span>
              <span class="token function">track</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> <span class="token string">"get"</span> <span class="token comment">/* GET */</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>

          <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isObject</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token comment">// 处理嵌套的对象：例如 {id: 1, value: {name: '嵌套', age: 18}}</span>
              <span class="token comment">// 注意此处 相对于vue2，此处延迟代理</span>
              <span class="token comment">// 首页 proxy 这个api只会代理第一层的数据。然后我们只有在读取数据，触发get，才会把嵌套的对象转换成响应式数据</span>
              <span class="token comment">// vue2的处理 创建get的时候，通过递归把所有数据都全部转换响应式对象</span>
              <span class="token keyword">return</span> isReadonly <span class="token operator">?</span> <span class="token function">readonly</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">reactive</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
          <span class="token keyword">return</span> res<span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><h3 id="get中处理数组情况-createarrayinstrumentations" tabindex="-1"><a class="header-anchor" href="#get中处理数组情况-createarrayinstrumentations" aria-hidden="true">#</a> get中处理数组情况：createArrayInstrumentations</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  <span class="token keyword">function</span> <span class="token function">createArrayInstrumentations</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> instrumentations <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
      <span class="token comment">// 处理 查询数据的 api</span>
      <span class="token punctuation">[</span><span class="token string">'includes'</span><span class="token punctuation">,</span> <span class="token string">'indexOf'</span><span class="token punctuation">,</span> <span class="token string">'lastIndexOf'</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">key</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          instrumentations<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token comment">//toRaw 从Reactive或Ref中得到原始数据</span>
              <span class="token comment">// toRaw作用 做一些不想被监听的事情(提升性能)</span>
              <span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token function">toRaw</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> l <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> l<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                  <span class="token function">track</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> <span class="token string">"get"</span> <span class="token comment">/* GET */</span><span class="token punctuation">,</span> i <span class="token operator">+</span> <span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span>
              <span class="token comment">// we run the method using the original args first (which may be reactive)</span>
              <span class="token keyword">const</span> res <span class="token operator">=</span> arr<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token keyword">if</span> <span class="token punctuation">(</span>res <span class="token operator">===</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token operator">||</span> res <span class="token operator">===</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                  <span class="token comment">// if that didn't work, run it again using raw values.</span>
                  <span class="token keyword">return</span> arr<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>toRaw<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span>
              <span class="token keyword">else</span> <span class="token punctuation">{</span>
                  <span class="token keyword">return</span> res<span class="token punctuation">;</span>
              <span class="token punctuation">}</span>
          <span class="token punctuation">}</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">// 处理 数组更改的 api</span>
      <span class="token punctuation">[</span><span class="token string">'push'</span><span class="token punctuation">,</span> <span class="token string">'pop'</span><span class="token punctuation">,</span> <span class="token string">'shift'</span><span class="token punctuation">,</span> <span class="token string">'unshift'</span><span class="token punctuation">,</span> <span class="token string">'splice'</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">key</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          instrumentations<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token comment">// 开启依赖收集</span>
              <span class="token function">pauseTracking</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token comment">// 变更的数据</span>

              <span class="token comment">//toRaw 从Reactive或Ref中得到原始数据</span>
              <span class="token comment">// toRaw作用 做一些不想被监听的事情(提升性能)</span>
              <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token function">toRaw</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token comment">// 关闭依赖收集</span>
              <span class="token function">resetTracking</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token keyword">return</span> res<span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> instrumentations<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div><p>数组树上比较特殊，'push', 'pop', 'shift', 'unshift', 'splice' 这个五个api会更改数组本身，</p>
<p>includes', 'indexOf', 'lastIndexOf'这个三个api是查询的数据，存在查询的时候数组已经变更的情况</p>
<h3 id="依赖收集-track" tabindex="-1"><a class="header-anchor" href="#依赖收集-track" aria-hidden="true">#</a> 依赖收集：track</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  <span class="token comment">// 此处又有了 一个 WeakMap</span>
  <span class="token keyword">const</span> targetMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WeakMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// set 存 effct</span>
  <span class="token keyword">const</span> <span class="token function-variable function">createDep</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">effects</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> dep <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span>effects<span class="token punctuation">)</span><span class="token punctuation">;</span>
      dep<span class="token punctuation">.</span>w <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
      dep<span class="token punctuation">.</span>n <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> dep<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token keyword">function</span> <span class="token function">track</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> type<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 与上面 createReactiveObject 处理有点类似</span>
      <span class="token comment">// 防止重复收集</span>
      <span class="token keyword">let</span> depsMap <span class="token operator">=</span> targetMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>depsMap<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          targetMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> <span class="token punctuation">(</span>depsMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// 查找 target 中的 key,第一次的话 会默认一个空的set</span>
      <span class="token keyword">let</span> dep <span class="token operator">=</span> depsMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>dep<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          depsMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token punctuation">(</span>dep <span class="token operator">=</span> <span class="token function">createDep</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// 收集 副作用 effect</span>
      <span class="token function">trackEffects</span><span class="token punctuation">(</span>dep<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
    <span class="token keyword">function</span> <span class="token function">trackEffects</span><span class="token punctuation">(</span><span class="token parameter">dep<span class="token punctuation">,</span> debuggerEventExtraInfo</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> shouldTrack <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>shouldTrack<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 把当前 activeEffect 存入 set 中的</span>
          <span class="token comment">// activeEffect 是 ReactiveEffect 的实例对象，它长这样子：</span>
          <span class="token comment">//      {</span>
          <span class="token comment">//          fn: Function,</span>
          <span class="token comment">//          scheduler: scheduler,</span>
          <span class="token comment">//          active: true,</span>
          <span class="token comment">//          deps: [],</span>
          <span class="token comment">//          run() {},</span>
          <span class="token comment">//          stop() {},</span>
          <span class="token comment">//      }</span>

          dep<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>activeEffect<span class="token punctuation">)</span><span class="token punctuation">;</span>
          activeEffect<span class="token punctuation">.</span>deps<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>dep<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br></div></div><p>存储数据有点绕，先是 用WeakMap存target，其中key是target，value是 Map</p>
<p>Map 的key是 target 中的key，value是 Set</p>
<p>Set里面存的是 当前 activeEffect</p>
<h2 id="set的实现-createsetter" tabindex="-1"><a class="header-anchor" href="#set的实现-createsetter" aria-hidden="true">#</a> set的实现： createSetter</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  <span class="token comment">// set 的实现</span>
  <span class="token keyword">const</span> set <span class="token operator">=</span> <span class="token function">createSetter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">function</span> <span class="token function">createSetter</span><span class="token punctuation">(</span><span class="token parameter">shallow <span class="token operator">=</span> <span class="token boolean">false</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">set</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> receiver</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 获取旧值</span>
          <span class="token comment">//toRaw 从Reactive或Ref中得到原始数据</span>
          <span class="token comment">// toRaw作用 做一些不想被监听的事情(提升性能)</span>

          <span class="token keyword">let</span> oldValue <span class="token operator">=</span> target<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>shallow<span class="token punctuation">)</span> <span class="token punctuation">{</span>
              value <span class="token operator">=</span> <span class="token function">toRaw</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
              oldValue <span class="token operator">=</span> <span class="token function">toRaw</span><span class="token punctuation">(</span>oldValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isArray</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isRef</span><span class="token punctuation">(</span>oldValue<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token function">isRef</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                  oldValue<span class="token punctuation">.</span>value <span class="token operator">=</span> value<span class="token punctuation">;</span>
                  <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
          <span class="token comment">// 获取 key，主要处理数组 NaN - 特殊情况</span>
          <span class="token keyword">const</span> hadKey <span class="token operator">=</span> <span class="token function">isArray</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isIntegerKey</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
              <span class="token operator">?</span> <span class="token function">Number</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span> <span class="token operator">&lt;</span> target<span class="token punctuation">.</span>length
              <span class="token operator">:</span> <span class="token function">hasOwn</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token comment">// 设置新值</span>
          <span class="token keyword">const</span> result <span class="token operator">=</span> Reflect<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span><span class="token punctuation">;</span>

          <span class="token comment">// 确保依赖的数据源是同一个 对象</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>target <span class="token operator">===</span> <span class="token function">toRaw</span><span class="token punctuation">(</span>receiver<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>hadKey<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                  <span class="token comment">// 新增数据</span>
                  <span class="token comment">// 更新依赖</span>
                  <span class="token function">trigger</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> <span class="token string">"add"</span> <span class="token comment">/* ADD */</span><span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span>
              <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">hasChanged</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> oldValue<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                  <span class="token comment">// 变更数据</span>
                  <span class="token comment">// 更新依赖</span>
                  <span class="token function">trigger</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> <span class="token string">"set"</span> <span class="token comment">/* SET */</span><span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> oldValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
          <span class="token keyword">return</span> result<span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br></div></div><p>set 的时候比较简单，获取key，设置新值。如果是新增数据，触发新增依赖，如果更改数据，触发变更依赖。</p>
<h3 id="更新依赖-trigger" tabindex="-1"><a class="header-anchor" href="#更新依赖-trigger" aria-hidden="true">#</a> 更新依赖：trigger</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  <span class="token keyword">function</span> <span class="token function">trigger</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> type<span class="token punctuation">,</span> key<span class="token punctuation">,</span> newValue<span class="token punctuation">,</span> oldValue<span class="token punctuation">,</span> oldTarget</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 从 存储 target中的WeakMap 获取目标对象</span>
      <span class="token keyword">const</span> depsMap <span class="token operator">=</span> targetMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>depsMap<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// never been tracked</span>
          <span class="token keyword">return</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// 数组 暂存依赖数据</span>
      <span class="token keyword">let</span> deps <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">===</span> <span class="token string">"clear"</span> <span class="token comment">/* CLEAR */</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 清空依赖</span>
          deps <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span>depsMap<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token operator">===</span> <span class="token string">'length'</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isArray</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 处理数组 通过 length 变更的情况</span>
          depsMap<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">dep<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
              <span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token operator">===</span> <span class="token string">'length'</span> <span class="token operator">||</span> key <span class="token operator">>=</span> newValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                  deps<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>dep<span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">else</span> <span class="token punctuation">{</span>
          <span class="token comment">// 通过 schedule runs 的情况</span>
          <span class="token comment">// schedule runs for SET | ADD | DELETE</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token operator">!==</span> <span class="token keyword">void</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              deps<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>depsMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
          <span class="token comment">// also run for iteration key on ADD | DELETE | Map.SET</span>
          <span class="token keyword">switch</span> <span class="token punctuation">(</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token keyword">case</span> <span class="token string">"add"</span> <span class="token comment">/* ADD */</span><span class="token operator">:</span>
                  <span class="token comment">//</span>
                  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isArray</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                      deps<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>depsMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token constant">ITERATE_KEY</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isMap</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                          deps<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>depsMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token constant">MAP_KEY_ITERATE_KEY</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                      <span class="token punctuation">}</span>
                  <span class="token punctuation">}</span>
                  <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isIntegerKey</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                      <span class="token comment">// new index added to array -> length changes</span>
                      deps<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>depsMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'length'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                  <span class="token punctuation">}</span>
                  <span class="token keyword">break</span><span class="token punctuation">;</span>
              <span class="token keyword">case</span> <span class="token string">"delete"</span> <span class="token comment">/* DELETE */</span><span class="token operator">:</span>
                  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isArray</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                      deps<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>depsMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token constant">ITERATE_KEY</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isMap</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                          deps<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>depsMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token constant">MAP_KEY_ITERATE_KEY</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                      <span class="token punctuation">}</span>
                  <span class="token punctuation">}</span>
                  <span class="token keyword">break</span><span class="token punctuation">;</span>
              <span class="token keyword">case</span> <span class="token string">"set"</span> <span class="token comment">/* SET */</span><span class="token operator">:</span>
                  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isMap</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                      deps<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>depsMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token constant">ITERATE_KEY</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                  <span class="token punctuation">}</span>
                  <span class="token keyword">break</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">const</span> eventInfo <span class="token operator">=</span> <span class="token punctuation">{</span> target<span class="token punctuation">,</span> type<span class="token punctuation">,</span> key<span class="token punctuation">,</span> newValue<span class="token punctuation">,</span> oldValue<span class="token punctuation">,</span> oldTarget <span class="token punctuation">}</span>
          <span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>deps<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>deps<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token punctuation">{</span>
                  <span class="token comment">// 执行 更新依赖 effect</span>
                  <span class="token function">triggerEffects</span><span class="token punctuation">(</span>deps<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> eventInfo<span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">else</span> <span class="token punctuation">{</span>
          <span class="token comment">// 收集的依赖不是只有一个的情况</span>
          <span class="token comment">// 一种情况是数据清空</span>
          <span class="token comment">// 另外一种是存在多个依赖</span>
          <span class="token keyword">const</span> effects <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
          <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> dep <span class="token keyword">of</span> deps<span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token keyword">if</span> <span class="token punctuation">(</span>dep<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                  effects<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token operator">...</span>dep<span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
          <span class="token punctuation">{</span>
              <span class="token function">triggerEffects</span><span class="token punctuation">(</span><span class="token function">createDep</span><span class="token punctuation">(</span>effects<span class="token punctuation">)</span><span class="token punctuation">,</span> eventInfo<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
    <span class="token keyword">function</span> <span class="token function">triggerEffects</span><span class="token punctuation">(</span><span class="token parameter">dep<span class="token punctuation">,</span> debuggerEventExtraInfo</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> effect <span class="token keyword">of</span> <span class="token function">isArray</span><span class="token punctuation">(</span>dep<span class="token punctuation">)</span> <span class="token operator">?</span> dep <span class="token operator">:</span> <span class="token punctuation">[</span><span class="token operator">...</span>dep<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>effect <span class="token operator">!==</span> activeEffect <span class="token operator">||</span> effect<span class="token punctuation">.</span>allowRecurse<span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token comment">// 开发环境调试使用，跟踪依赖数据</span>
              <span class="token keyword">if</span> <span class="token punctuation">(</span>effect<span class="token punctuation">.</span>onTrigger<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                  effect<span class="token punctuation">.</span><span class="token function">onTrigger</span><span class="token punctuation">(</span><span class="token function">extend</span><span class="token punctuation">(</span><span class="token punctuation">{</span> effect <span class="token punctuation">}</span><span class="token punctuation">,</span> debuggerEventExtraInfo<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span>
              <span class="token comment">// scheduler 调动更新</span>
              <span class="token comment">// 组件更新, doWatch, computed设置这个属性</span>
              <span class="token keyword">if</span> <span class="token punctuation">(</span>effect<span class="token punctuation">.</span>scheduler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                  effect<span class="token punctuation">.</span><span class="token function">scheduler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span>
              <span class="token keyword">else</span> <span class="token punctuation">{</span>
                  <span class="token comment">// 最后是 effect run</span>
                  effect<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br></div></div><p>更新依赖有点复杂</p>
<p>首先是从 targetMap 找到target对应的数据，没有找到就不会更新依赖，直接返回。</p>
<p>如果找到了则声明一个数组 deps 存储依赖数据，接下就是处理依赖数据的流程了</p>
<p>如果是 clear, 则 deps 置空</p>
<p>如果是 通过length更改数据 的情况，则遍历数组，把小于 newValue 的索引push到deps 数组中</p>
<p><strong>如果 key 不等于 void 0，（这是常用的地方：schedule runs），则是把depsMap.get(key) push到deps数组中</strong></p>
<p>剩余是处理迭代器中add、set、delete 的逻辑了。</p>
<p>处理好依赖后，则会调用 triggerEffects，它会把每一个依赖中的 effect 哪出来执行一遍</p>
<p>effect.onTrigger 这个属性等后续 深入组件更新、doWatch原理、compute原理的时候会需要用上这个属性</p>
<p>如果effect上有 onTrigger这属性，则先执行effect.onTrigger</p>
<p>上面完成后，如果effect上有scheduler属性，则会执行effect.schedule，否则会执行effect.run</p>
<p>scheduler 是为了提供我想要让你什么时候执行就什么时候执行的能力，也就是可以自己调度的能力。</p>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<p>vue3通过Proxy和reflect这两个api把普通对象转换成响应式对象。</p>
<p>当数据读取的时候，会触发get收集依赖，收集存储在一个WeakMap中，其中key是target（目标对象），value是一个Map数据结构，这个Map的key是我们读取数据对应的key（target的key），value是一个Set数据结构。Set存储的是activeEffect。</p>
<p>当数据变更的时候，会触发set更新依赖，更新依赖的时候，会先去WeakMap中找到target对应的数据，找到后经过一番依赖数据标准后，遍历依赖，执行依赖的每一个activeEffect</p>
<h2 id="自问自答系列" tabindex="-1"><a class="header-anchor" href="#自问自答系列" aria-hidden="true">#</a> 自问自答系列：</h2>
<ul>
<li>为什么用weakMap 存储响应式对象？</li>
</ul>
<p>用weakMap的用处防止内存泄漏，当变量的引用不存在的时候，自动会清楚内存；缓存响应式数据是为了防止重复收集</p>
<ul>
<li>依赖数据存储分别用了 weakMap、Map、Set三种数据结构存储，为什么要这样设计呢？</li>
</ul>
<p>用weakMap与上面原因一样，一是防止内存泄漏，二是防止重复收集</p>
<p>用Map存储而不是用Object，是因为map的键可以是任意值，而Object 的键必须是一个 String 或是Symbol</p>
<p>用Set当然是为了去重了，Set存储的是数据不能重复的。</p>
</template>
