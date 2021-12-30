<template><h1 id="带着问题阅读源码vue3-2-ref实现原理" tabindex="-1"><a class="header-anchor" href="#带着问题阅读源码vue3-2-ref实现原理" aria-hidden="true">#</a> 带着问题阅读源码Vue3.2-ref实现原理</h1>
<p>这是带着问题阅读源码第二篇，我们主要了解 ref 这个实现原理</p>
<p>我们先来 ref 这个api的使用例子</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token string">''</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  <span class="token keyword">function</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token function">createRef</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">function</span> <span class="token function">createRef</span><span class="token punctuation">(</span><span class="token parameter">rawValue<span class="token punctuation">,</span> shallow <span class="token operator">=</span> <span class="token boolean">false</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isRef</span><span class="token punctuation">(</span>rawValue<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> rawValue<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RefImpl</span><span class="token punctuation">(</span>rawValue<span class="token punctuation">,</span> shallow<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>ref 的实现主要是看 RefImpl 这类</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  <span class="token comment">// 把普通对象转换成响应式对象</span>
  <span class="token keyword">const</span> <span class="token function-variable function">convert</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">val</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">isObject</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token function">reactive</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span> <span class="token operator">:</span> val<span class="token punctuation">;</span>
  <span class="token keyword">class</span> <span class="token class-name">RefImpl</span> <span class="token punctuation">{</span>
      <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">value<span class="token punctuation">,</span> _shallow <span class="token operator">=</span> <span class="token boolean">false</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>_shallow <span class="token operator">=</span> _shallow<span class="token punctuation">;</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>dep <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>__v_isRef <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>_rawValue <span class="token operator">=</span> _shallow <span class="token operator">?</span> value <span class="token operator">:</span> <span class="token function">toRaw</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token comment">// 如果是浅代理，则只会处理 value,反之则会调用 convert</span>
            <span class="token comment">// convert 会把普通对象 转换响应式对象</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>_value <span class="token operator">=</span> _shallow <span class="token operator">?</span> value <span class="token operator">:</span> <span class="token function">convert</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">get</span> <span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 触发依赖收集</span>
          <span class="token function">trackRefValue</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_value<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">set</span> <span class="token function">value</span><span class="token punctuation">(</span><span class="token parameter">newVal</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 处理 数据源</span>
          newVal <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_shallow <span class="token operator">?</span> newVal <span class="token operator">:</span> <span class="token function">toRaw</span><span class="token punctuation">(</span>newVal<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 判断数据是否变更</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">hasChanged</span><span class="token punctuation">(</span>newVal<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_rawValue<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token keyword">this</span><span class="token punctuation">.</span>_rawValue <span class="token operator">=</span> newVal<span class="token punctuation">;</span>
              <span class="token comment">// 处理value的是个对象的情况</span>
              <span class="token keyword">this</span><span class="token punctuation">.</span>_value <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_shallow <span class="token operator">?</span> newVal <span class="token operator">:</span> <span class="token function">convert</span><span class="token punctuation">(</span>newVal<span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token comment">// 更新依赖</span>
              <span class="token function">triggerRefValue</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> newVal<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><p>从 RefImpl 这个类的构造函数里可以看出，如果 ref包裹的是个对象，则会调用 reactive 这个api</p>
<p>理解reactive 的原理，就能理解ref 的原理一半了，剩余一半的是处理基本数据类型的情况了。</p>
<p><strong>当我们访问 ref 的value的时候，会触发get，调用 trackRefValue</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  <span class="token keyword">function</span> <span class="token function">trackRefValue</span><span class="token punctuation">(</span><span class="token parameter">ref</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isTracking</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 获取源数据</span>
          ref <span class="token operator">=</span> <span class="token function">toRaw</span><span class="token punctuation">(</span>ref<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token comment">// 如果没 ref.dep，则 ref.dep = new set()</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>ref<span class="token punctuation">.</span>dep<span class="token punctuation">)</span> <span class="token punctuation">{</span>
              ref<span class="token punctuation">.</span>dep <span class="token operator">=</span> <span class="token function">createDep</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
          <span class="token punctuation">{</span>
              <span class="token comment">// 开始收集依赖</span>
              <span class="token function">trackEffects</span><span class="token punctuation">(</span>ref<span class="token punctuation">.</span>dep<span class="token punctuation">,</span> <span class="token punctuation">{</span>
                  target<span class="token operator">:</span> ref<span class="token punctuation">,</span>
                  type<span class="token operator">:</span> <span class="token string">"get"</span> <span class="token comment">/* GET */</span><span class="token punctuation">,</span>
                  key<span class="token operator">:</span> <span class="token string">'value'</span>
              <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>收集依赖的逻辑与 reactive 的类似，但没有 reactive 那么复杂，少了查找target和key的过程</p>
<p>主要是 先处理 ref.dep， 然后就执行 把依赖存储到 ref中。</p>
<p><strong>当我们设置ref的value的时候，会触发set，调用triggerRefValue</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  <span class="token keyword">function</span> <span class="token function">triggerRefValue</span><span class="token punctuation">(</span><span class="token parameter">ref<span class="token punctuation">,</span> newVal</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 处理数据源</span>
      ref <span class="token operator">=</span> <span class="token function">toRaw</span><span class="token punctuation">(</span>ref<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>ref<span class="token punctuation">.</span>dep<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token punctuation">{</span>
              <span class="token comment">// 执行 更新依赖</span>
              <span class="token function">triggerEffects</span><span class="token punctuation">(</span>ref<span class="token punctuation">.</span>dep<span class="token punctuation">,</span> <span class="token punctuation">{</span>
                  target<span class="token operator">:</span> ref<span class="token punctuation">,</span>
                  type<span class="token operator">:</span> <span class="token string">"set"</span> <span class="token comment">/* SET */</span><span class="token punctuation">,</span>
                  key<span class="token operator">:</span> <span class="token string">'value'</span><span class="token punctuation">,</span>
                  newValue<span class="token operator">:</span> newVal
              <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>更新依赖比较简单，拿出ref的dep，然后执行即可。</p>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<p>ref这个api即可把包裹基本数据类型，也可以包裹引用数据类型。</p>
<p>ref会先设置value的get、set属性，</p>
<p>get的时候会调用trackRefValue，trackRefValue内部调用trackEffects收集依赖并存储到ref.dep中；</p>
<p>set的时候如果value是对象或者数组，则会reative把普通对象转换响应式数据，然后调用triggerRefValue，把ref.dep拿出来交给triggerEffects执行，更新依赖</p>
<p>如果包裹的是引用数据类型，其收集依赖和更新依赖的逻辑还是执行reative这个api。</p>
<p>ref的原理依赖于reactive这个api。</p>
<p>如果ref包裹基本数据类型，更建议shallowRef这个api，会一些判断，不需要去处理引用数据类型这种情况了。</p>
</template>
