<template><h1 id="vue3-2组件使用实例" tabindex="-1"><a class="header-anchor" href="#vue3-2组件使用实例" aria-hidden="true">#</a> vue3.2组件使用实例</h1>
<p>最近笔者在研究vue3，vue3.2相比vue3.0提供了一个特别方便的语法糖</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script setup<span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>一个新的语法糖就会一定的学习成本。</p>
<p>vue3.0的组件使用实例：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> Example <span class="token keyword">from</span> '<span class="token punctuation">.</span><span class="token operator">/</span>example<span class="token punctuation">.</span>vue<span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    components<span class="token operator">:</span> <span class="token punctuation">{</span> Example <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>可以看出vue3.0的时候，vue会定义好模板，我们往里面添加数据即可。</p>
<p>也许，你会有这样的疑问，我就引入组件，然后就可以使用组件，这样能实现么？</p>
<p>vue3.2提供的语法糖就实现了这个功能。我接下来看看，vue3.2的三种组件的具体使用例子。</p>
<h2 id="普通组件" tabindex="-1"><a class="header-anchor" href="#普通组件" aria-hidden="true">#</a> 普通组件</h2>
<p><strong>示例：</strong></p>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!-- 使用组件 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Example</span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token comment">// 引入组件</span>
<span class="token keyword">import</span> Example <span class="token keyword">from</span> '<span class="token punctuation">.</span><span class="token operator">/</span>example<span class="token punctuation">.</span>vue<span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>以前需要引入、填入模板位置、使用，现在省略了填入模板位置，两步即可实现了。</p>
<h2 id="动态组件" tabindex="-1"><a class="header-anchor" href="#动态组件" aria-hidden="true">#</a> 动态组件</h2>
<p><strong>示例：</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>template<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 使用组件 <span class="token operator">--</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>component <span class="token operator">:</span>is<span class="token operator">=</span><span class="token string">"DynamicComponent"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>component<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span>
<span class="token operator">&lt;</span>script setup<span class="token operator">></span>
<span class="token comment">// 引入动态组件</span>
<span class="token keyword">import</span> DynamicComponent <span class="token keyword">from</span> '<span class="token punctuation">.</span><span class="token operator">/</span>dynamicComponent<span class="token punctuation">.</span>vue<span class="token punctuation">;</span>

<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>同样只需要引入就可以使用</p>
<h2 id="异步组件" tabindex="-1"><a class="header-anchor" href="#异步组件" aria-hidden="true">#</a> 异步组件</h2>
<p>vue3.2并没有提供异步组件的使用例子。以下示例是笔者自身摸索出来的，如有问题，欢迎指正。</p>
<p><strong>示例1：</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>template<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 使用组件 <span class="token operator">--</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>component <span class="token operator">:</span>is<span class="token operator">=</span><span class="token string">"AsyncComponent"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>component<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span>
<span class="token operator">&lt;</span>script setup<span class="token operator">></span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineAsyncComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span>
<span class="token comment">// 定义异步组件</span>
<span class="token keyword">const</span> AsyncComponent<span class="token operator">:</span> <span class="token function">defineAsyncComponent</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'./asyncComponent.vue'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>上述只满足了一个异步组件，但是我有多个异步组件的情况，该如何处理？</p>
<p><strong>示例2：</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>template<span class="token operator">></span>
    <span class="token operator">&lt;</span>button @click<span class="token operator">=</span><span class="token string">"btnClick"</span><span class="token operator">></span>click<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 使用组件 <span class="token operator">--</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>component v<span class="token operator">-</span><span class="token keyword">if</span><span class="token operator">=</span><span class="token string">"currentTabComponent"</span> <span class="token operator">:</span>is<span class="token operator">=</span><span class="token string">"currentTabComponent"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>component<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span>
<span class="token operator">&lt;</span>script setup<span class="token operator">></span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineAsyncComponent<span class="token punctuation">,</span> shallowRef <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span>
<span class="token comment">// 定义异步组件</span>
<span class="token keyword">const</span> components <span class="token operator">=</span> <span class="token punctuation">{</span>
    AsyncComponent<span class="token operator">:</span> <span class="token function">defineAsyncComponent</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'./asyncComponent.vue'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> currentTabComponent <span class="token operator">=</span> <span class="token function">shallowRef</span><span class="token punctuation">(</span><span class="token string">''</span><span class="token punctuation">)</span>

<span class="token comment">// 切换异常组件</span>
<span class="token keyword">function</span> <span class="token function">btnClick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 异步组件，用对象嵌套，就可以用 字符 去匹配异步组件了。</span>
    currentTabComponent<span class="token punctuation">.</span>value <span class="token operator">=</span> currentTabComponent<span class="token punctuation">.</span>value <span class="token operator">?</span> <span class="token string">''</span> <span class="token operator">:</span> components<span class="token punctuation">[</span><span class="token string">'AsyncComponent'</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>注意：</p>
<ul>
<li>加上 v-if=&quot;currentTabComponent&quot; 是为了处理异常 [Vue warn]: Invalid vnode type when creating vnode: . ，因为我们一开currentTabComponent是为空的。</li>
<li>使用 shallowRef 这个api，而不是 ref，是为了处理异常 Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with <code>markRaw</code> or using <code>shallowRef</code> instead of <code>ref</code>.。我们这里使用浅代理即可，不需要使用深层代理，这样做可以提供性能。</li>
</ul>
</template>
