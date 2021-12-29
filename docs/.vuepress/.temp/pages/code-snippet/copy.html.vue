<template><h1 id="js复制文字到剪切板" tabindex="-1"><a class="header-anchor" href="#js复制文字到剪切板" aria-hidden="true">#</a> JS复制文字到剪切板</h1>
<ul>
<li>JS代码实现：</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">copy</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>navigator<span class="token punctuation">.</span>clipboard<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// clipboard api 复制</span>
            navigator<span class="token punctuation">.</span>clipboard<span class="token punctuation">.</span><span class="token function">writeText</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> textarea <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'textarea'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>textarea<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 隐藏此输入框</span>
            textarea<span class="token punctuation">.</span>style<span class="token punctuation">.</span>position <span class="token operator">=</span> <span class="token string">'fixed'</span><span class="token punctuation">;</span>
            textarea<span class="token punctuation">.</span>style<span class="token punctuation">.</span>clip <span class="token operator">=</span> <span class="token string">'rect(0 0 0 0)'</span><span class="token punctuation">;</span>
            textarea<span class="token punctuation">.</span>style<span class="token punctuation">.</span>top <span class="token operator">=</span> <span class="token string">'10px'</span><span class="token punctuation">;</span>
            <span class="token comment">// 赋值</span>
            textarea<span class="token punctuation">.</span>value <span class="token operator">=</span> text<span class="token punctuation">;</span>
            <span class="token comment">// 选中</span>
            textarea<span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 复制</span>
            document<span class="token punctuation">.</span><span class="token function">execCommand</span><span class="token punctuation">(</span><span class="token string">'copy'</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 移除输入框</span>
            document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">removeChild</span><span class="token punctuation">(</span>textarea<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div></template>
