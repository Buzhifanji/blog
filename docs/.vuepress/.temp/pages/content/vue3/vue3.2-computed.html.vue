<template><h1 id="带着问题阅读源码vue3-2-computed实现原理" tabindex="-1"><a class="header-anchor" href="#带着问题阅读源码vue3-2-computed实现原理" aria-hidden="true">#</a> 带着问题阅读源码Vue3.2-computed实现原理</h1>
<p>这是带着问题阅读源码第二篇，我们主要了解 computed 这个实现原理</p>
<p>关于 computened 的示例，可以查看官方文档<a href="https://v3.cn.vuejs.org/api/computed-watch-api.html#computed" target="_blank" rel="noopener noreferrer">computed使用例子<ExternalLinkIcon/></a></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  <span class="token keyword">function</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token parameter">getterOrOptions<span class="token punctuation">,</span> debugOptions</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 标准化 getter/setter</span>
      <span class="token keyword">let</span> getter<span class="token punctuation">;</span>
      <span class="token keyword">let</span> setter<span class="token punctuation">;</span>
      <span class="token comment">// 如果只传入一个函数，表示只设置getter属性，也就是只读，不能修改</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isFunction</span><span class="token punctuation">(</span>getterOrOptions<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          getter <span class="token operator">=</span> getterOrOptions<span class="token punctuation">;</span>
          <span class="token function-variable function">setter</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                  console<span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">'Write operation failed: computed value is readonly'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span>
              <span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">else</span> <span class="token punctuation">{</span>
          <span class="token comment">// 自定义 get和set</span>
          getter <span class="token operator">=</span> getterOrOptions<span class="token punctuation">.</span>get<span class="token punctuation">;</span>
          setter <span class="token operator">=</span> getterOrOptions<span class="token punctuation">.</span>set<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// 创建 effect</span>
      <span class="token keyword">const</span> cRef <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ComputedRefImpl</span><span class="token punctuation">(</span>getter<span class="token punctuation">,</span> setter<span class="token punctuation">,</span> <span class="token function">isFunction</span><span class="token punctuation">(</span>getterOrOptions<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token operator">!</span>getterOrOptions<span class="token punctuation">.</span>set<span class="token punctuation">)</span><span class="token punctuation">;</span>

      <span class="token comment">// 开发环境 调用computed</span>
      <span class="token comment">// 官网说明：https://v3.cn.vuejs.org/guide/reactivity-computed-watchers.html#%E8%B0%83%E8%AF%95-computed</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>debugOptions<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 追踪依赖时候 触发</span>
          cRef<span class="token punctuation">.</span>effect<span class="token punctuation">.</span>onTrack <span class="token operator">=</span> debugOptions<span class="token punctuation">.</span>onTrack<span class="token punctuation">;</span>
          <span class="token comment">// 更新依赖的是 触发</span>
          cRef<span class="token punctuation">.</span>effect<span class="token punctuation">.</span>onTrigger <span class="token operator">=</span> debugOptions<span class="token punctuation">.</span>onTrigger<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> cRef<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><p>computed 标准化getter/setter 之后，就实例化ComputedRefImpl并返回</p>
<p>接下来看看ComputedRefImpl的实现</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  <span class="token keyword">class</span> <span class="token class-name">ComputedRefImpl</span> <span class="token punctuation">{</span>
      <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">getter<span class="token punctuation">,</span> _setter<span class="token punctuation">,</span> isReadonly</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>_setter <span class="token operator">=</span> _setter<span class="token punctuation">;</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>dep <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
          <span class="token comment">// dirty 这个属性很巧妙，它用于开关是否更新依赖，而打开这个开关会get value 的时候触发的，</span>
          <span class="token comment">// 其次执行一次就会关闭，只有通过 get value来打开</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>_dirty <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>__v_isRef <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
           <span class="token comment">// 创建 effect</span>
           <span class="token comment">// 这里 实例化 ReactiveEffect的时候，会执行 getter 方法一次</span>
           <span class="token comment">// ReactiveEffect 第二个参数 是scheduler</span>
           <span class="token comment">// 依赖数据变更的时候，会调用 scheduler</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>effect <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReactiveEffect</span><span class="token punctuation">(</span>getter<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
              <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>_dirty<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                  <span class="token comment">// 延迟 执行</span>
                  <span class="token comment">// get 的时候触发，</span>
                  <span class="token keyword">this</span><span class="token punctuation">.</span>_dirty <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                  <span class="token comment">// 更新依赖</span>
                  <span class="token comment">// ref 这个api set 的时候，也是调用这个方法更新依赖的</span>
                  <span class="token function">triggerRefValue</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">this</span><span class="token punctuation">[</span><span class="token string">"__v_isReadonly"</span> <span class="token comment">/* IS_READONLY */</span><span class="token punctuation">]</span> <span class="token operator">=</span> isReadonly<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">get</span> <span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// the computed ref may get wrapped by other proxies e.g. readonly() #3376</span>
          <span class="token keyword">const</span> self <span class="token operator">=</span> <span class="token function">toRaw</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token comment">// 收集依赖</span>
          <span class="token comment">// ref 这个api get 的时候，也是调用这个方法收集依赖</span>
          <span class="token function">trackRefValue</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>self<span class="token punctuation">.</span>_dirty<span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token comment">// 打开更新依赖的开关</span>
              self<span class="token punctuation">.</span>_dirty <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
              <span class="token comment">//</span>
              self<span class="token punctuation">.</span>_value <span class="token operator">=</span> self<span class="token punctuation">.</span>effect<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
          <span class="token keyword">return</span> self<span class="token punctuation">.</span>_value<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">set</span> <span class="token function">value</span><span class="token punctuation">(</span><span class="token parameter">newValue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_setter</span><span class="token punctuation">(</span>newValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br></div></div><p>ComputedRefImpl 这个类主要做了两件事情</p>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<p>首先computed 一开始会标准化getter、和setter。如果只传入一个函数就是getter,此时computed的结果不只读的；如果想要修改computed的结果，需要传入定义好的get和set。</p>
<p>处理好getter/setter之后，会实例化 ComputedRefImpl 这个类，并返返回实例化对象。ComputedRefImpl这个类在构造器constructor里的第一个参数是getter，第二个参数是setter.</p>
<h3 id="computed的执行顺序" tabindex="-1"><a class="header-anchor" href="#computed的执行顺序" aria-hidden="true">#</a> computed的执行顺序</h3>
<p>执行顺序有点抽象，我们用实际例子来说明一下</p>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>myapp<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">></span></span>源码学习-computed<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>action<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>click<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>{{numPlus}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">import</span> <span class="token punctuation">{</span> computed<span class="token punctuation">,</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> num <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> numPlus <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> num<span class="token punctuation">.</span>value <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> <span class="token function-variable function">action</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>  num<span class="token punctuation">.</span>value <span class="token operator">+=</span> <span class="token number">2</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div></template>
