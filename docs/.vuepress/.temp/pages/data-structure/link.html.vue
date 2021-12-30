<template><h1 id="数据结构-链表数据结构" tabindex="-1"><a class="header-anchor" href="#数据结构-链表数据结构" aria-hidden="true">#</a> 数据结构-链表数据结构</h1>
<p>关于如何正确学习链表：用链表的目的是什么？省空间还是省时间？ - invalid s的回答 - 知乎
https://www.zhihu.com/question/31082722/answer/1928249851</p>
<h1 id="typescript实现链表" tabindex="-1"><a class="header-anchor" href="#typescript实现链表" aria-hidden="true">#</a> typescript实现链表</h1>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// 节点类型</span>
<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">LinkNode<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span> <span class="token punctuation">{</span>
    value<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">,</span>
    next<span class="token operator">:</span> LinkNode<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span> <span class="token operator">|</span> <span class="token keyword">null</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Node<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span> <span class="token keyword">implements</span> <span class="token class-name">LinkNode<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span> <span class="token punctuation">{</span>
    value<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">;</span>
    next<span class="token operator">:</span> <span class="token keyword">null</span> <span class="token operator">|</span> Node<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span>
    <span class="token function">constructor</span><span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> value<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Link<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span> <span class="token punctuation">{</span>
    <span class="token function">add</span><span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 向链表尾部添加一个新元素</span>
        <span class="token keyword">const</span> node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>head <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 头部没有，表示第一次插入</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>head <span class="token operator">=</span> node
            <span class="token keyword">this</span><span class="token punctuation">.</span>foot <span class="token operator">=</span> node
            <span class="token keyword">this</span><span class="token punctuation">.</span>count <span class="token operator">=</span> <span class="token number">1</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>foot<span class="token punctuation">.</span>next <span class="token operator">=</span> node
            <span class="token keyword">this</span><span class="token punctuation">.</span>foot <span class="token operator">=</span> node
            <span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token operator">++</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token keyword">delete</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div></template>
