<template><h1 id="数据结构-链表" tabindex="-1"><a class="header-anchor" href="#数据结构-链表" aria-hidden="true">#</a> 数据结构-链表</h1>
<h2 id="链表的意义" tabindex="-1"><a class="header-anchor" href="#链表的意义" aria-hidden="true">#</a> 链表的意义</h2>
<p>我们学数据结构应该从实际问题出发，在学习链表的时候，应该思考<strong>链表是为了解决什么问题而发明的</strong>。在回答这个问题之前，我们先来思考一下数组的优缺点。</p>
<p>数组中的数据是存储在一块连续的内存空间里，通过数组变量和索引就很快可以计算出数组中每个元素的地址，数组的优点就是读取的时候特别快，时间复杂度为O(1)。因为数组是需要一块连续的内存空间，所以数组在创建的时候就需要把这块连续的空间申请下来，这就相当于把位置占了，我们后面才能在位置里放数据。</p>
<p>如果我们一开始申请的内存空间不够了，我们需要重新申请新的一块更大的空间，然后把之前的数据挪到新申请的空间里去。这个时候，如果存储的数据特别大，比如5百万张数据，内存不够的时候，需要把这5百万的数据移动到新内存里，这就造成了新增的效率低下，最坏的时间复杂度为O(n)，同理删除也存在一样的问题。</p>
<p>另外，处理海量数据的时候数组一开始申请内存空间也是一个难题，比如我们管理一堆票据，可能有一张，也可能有1百万张。内存空间应该申请多少？申请50个G？用户可能只有10张票据，这不就是内存严重浪费了么！申请5个G，数据多的时候，明显不够用了。。。。</p>
<p>所以数组不适合处理动态数量的数据存储，那么有没有处理这种别的数据结构可以有效管理这个不定量的数据呢？有，那么就是链表</p>
<p>在计算机科学中, 一个 **链表 **是数据元素的线性集合, <strong>元素的线性顺序不是由它们在内存中的物理位置给出的</strong>。 相反, <strong>每个元素指向下一个元素。它是由一组节点组成的数据结构,这些节点一起,表示序列</strong>。</p>
<p>关于如何正确学习链表，建议你阅读一下这篇文章：<a href="https://www.zhihu.com/question/31082722/answer/1928249851" target="_blank" rel="noopener noreferrer">用链表的目的是什么？省空间还是省时间？ - invalid s的回答 - 知乎<ExternalLinkIcon/></a></p>
<h2 id="javascript版实现" tabindex="-1"><a class="header-anchor" href="#javascript版实现" aria-hidden="true">#</a> JavaScript版实现</h2>
<h3 id="linkedlistnode" tabindex="-1"><a class="header-anchor" href="#linkedlistnode" aria-hidden="true">#</a> LinkedListNode</h3>
<p>链表节点的类，每个节点都有一个toString方法，支持自定义。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">LinkedListNode</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">value<span class="token punctuation">,</span> next <span class="token operator">=</span> <span class="token keyword">null</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> value
        <span class="token keyword">this</span><span class="token punctuation">.</span>next <span class="token operator">=</span> next
    <span class="token punctuation">}</span>
    <span class="token function">toString</span><span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> callback <span class="token operator">?</span> <span class="token function">callback</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="linkedlist" tabindex="-1"><a class="header-anchor" href="#linkedlist" aria-hidden="true">#</a> LinkedList</h3>
<h4 id="constructor" tabindex="-1"><a class="header-anchor" href="#constructor" aria-hidden="true">#</a> constructor</h4>
<p>constructor 构造器定义了LinkedList有三个属性：</p>
<ul>
<li>head：头部节点指针</li>
<li>tail：尾部节点指针</li>
<li>compare：对比函数</li>
</ul>
<p><em>Comparator这个类在序言里介绍，封装了对比的实现</em></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">LinkedList</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>Function<span class="token punctuation">}</span></span> <span class="token optional-parameter"><span class="token punctuation">[</span><span class="token parameter">comparatorFunction</span><span class="token punctuation">]</span></span> 可传入自定义对比函数
     */</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">comparatorFunction</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>head <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token comment">// 头部节点</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>tail <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token comment">// 尾部节点</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>compare <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Comparator</span><span class="token punctuation">(</span>comparatorFunction<span class="token punctuation">)</span> <span class="token comment">// 对比函数</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h4 id="头部插入节点" tabindex="-1"><a class="header-anchor" href="#头部插入节点" aria-hidden="true">#</a> 头部插入节点</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * 头部插入节点
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">value</span>
 * <span class="token keyword">@returns</span> <span class="token class-name"><span class="token punctuation">{</span>LinkedList<span class="token punctuation">}</span></span>
 */</span>
<span class="token function">prepend</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 创建一个新的节点</span>
    <span class="token keyword">const</span> newNode <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedListNode</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>head<span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>head <span class="token operator">=</span> newNode

    <span class="token comment">// 当没有尾部节点的时候，也就是此时是个空链表，需要设置尾节点</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>tail<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>tail <span class="token operator">=</span> newNode
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token keyword">this</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h4 id="尾部插入节点" tabindex="-1"><a class="header-anchor" href="#尾部插入节点" aria-hidden="true">#</a> 尾部插入节点</h4>
<p>尾部插入节点需要注意情况：往空链表里插入节点。此时头尾节点都是空的，需要同时设置头尾节点</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * 尾部插入节点
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">value</span>
 * <span class="token keyword">@returns</span> <span class="token class-name"><span class="token punctuation">{</span>LinkedList<span class="token punctuation">}</span></span>
 */</span>
<span class="token function">append</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> newNode <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedListNode</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>

    <span class="token comment">// 当没有头部节点的时候，也就是此时是个空链表，需要设置头尾节点</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>head <span class="token operator">=</span> newNode
        <span class="token keyword">this</span><span class="token punctuation">.</span>tail <span class="token operator">=</span> newNode

        <span class="token keyword">return</span> <span class="token keyword">this</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 把新节点链接到链表上</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>tail<span class="token punctuation">.</span>next <span class="token operator">=</span> newNode
    <span class="token keyword">this</span><span class="token punctuation">.</span>tail <span class="token operator">=</span> newNode

    <span class="token keyword">return</span> <span class="token keyword">this</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h4 id="删除指定值" tabindex="-1"><a class="header-anchor" href="#删除指定值" aria-hidden="true">#</a> 删除指定值</h4>
<p>删除指定值得需要理解两个点：</p>
<ol>
<li>从开始，连续好几个值是相同的情况</li>
<li>删除的值正好是尾部节点，需要处理尾部节点指针tail的指向</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * 删除指定值
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">value</span>
 * <span class="token keyword">@returns</span>
 */</span>
<span class="token keyword">delete</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">let</span> deletedNode <span class="token operator">=</span> <span class="token keyword">null</span>
    <span class="token comment">// 处理从头部节点开始有几个连续一样的值得情况</span>
    <span class="token comment">// 删除 1</span>
    <span class="token comment">// 1 -> 1 -> 2 -> 4 -> 5  ===>  2 -> 4 -> 5</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>head <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>compare<span class="token punctuation">.</span><span class="token function">equal</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>head<span class="token punctuation">.</span>value<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        deletedNode <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>head
        <span class="token keyword">this</span><span class="token punctuation">.</span>head <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>head<span class="token punctuation">.</span>next
    <span class="token punctuation">}</span>

    <span class="token keyword">let</span> currentNode <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>head

    <span class="token keyword">if</span> <span class="token punctuation">(</span>currentNode <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>currentNode<span class="token punctuation">.</span>next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>compare<span class="token punctuation">.</span><span class="token function">equal</span><span class="token punctuation">(</span>currentNode<span class="token punctuation">.</span>next<span class="token punctuation">.</span>value<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                deletedNode <span class="token operator">=</span> currentNode<span class="token punctuation">.</span>next
                <span class="token comment">// 删除 节点</span>
                currentNode<span class="token punctuation">.</span>next <span class="token operator">=</span> currentNode<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token comment">// 继续 查询下一个节点</span>
                currentNode <span class="token operator">=</span> currentNode<span class="token punctuation">.</span>next
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 处理尾节点 被删除的时候 尾部指针</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>compare<span class="token punctuation">.</span><span class="token function">equal</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>tail<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>tail <span class="token operator">=</span> currentNode
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> deletedNode
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br></div></div><h4 id="查找指定值" tabindex="-1"><a class="header-anchor" href="#查找指定值" aria-hidden="true">#</a> 查找指定值</h4>
<p>节点的值得类型有可能是复杂的，例如是个对象，此时查找的时候需要参入自定义条件的callback函数</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * 查找
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>Object<span class="token punctuation">}</span></span> <span class="token parameter">findParams</span>
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">findParams<span class="token punctuation">.</span>value</span>
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token keyword">function</span><span class="token punctuation">}</span></span> <span class="token optional-parameter"><span class="token punctuation">[</span><span class="token parameter">findParams<span class="token punctuation">.</span>callback</span><span class="token punctuation">]</span></span>
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>LinkedListNode<span class="token punctuation">}</span></span>
 */</span>
<span class="token function">find</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> value <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span> callback <span class="token operator">=</span> <span class="token keyword">undefined</span> <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">let</span> currentNode <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>head

    <span class="token keyword">while</span> <span class="token punctuation">(</span>currentNode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 通过 回调函数 查找value</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>callback <span class="token operator">&amp;&amp;</span> <span class="token function">callback</span><span class="token punctuation">(</span>currentNode<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> currentNode
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">!==</span> <span class="token keyword">undefined</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>compare<span class="token punctuation">.</span><span class="token function">equal</span><span class="token punctuation">(</span>currentNode<span class="token punctuation">.</span>value<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> currentNode
        <span class="token punctuation">}</span>

        currentNode <span class="token operator">=</span> currentNode<span class="token punctuation">.</span>next
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token keyword">null</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><h4 id="删除尾部节点" tabindex="-1"><a class="header-anchor" href="#删除尾部节点" aria-hidden="true">#</a> 删除尾部节点</h4>
<p>删除节点需要注意只有一个节点的情况，此时头尾节点指向都是同一个。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * 删除尾部节点
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>LinkedListNode<span class="token punctuation">}</span></span>
 */</span>
<span class="token function">deleteTail</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>tail<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">const</span> deleteTail <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>tail

    <span class="token comment">// 链表只有一个节点的特殊情况</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>head <span class="token operator">===</span> <span class="token keyword">this</span><span class="token punctuation">.</span>tail<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>head <span class="token operator">=</span> <span class="token keyword">null</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>tail <span class="token operator">=</span> <span class="token keyword">null</span>

        <span class="token keyword">return</span> deleteTail
    <span class="token punctuation">}</span>

    <span class="token keyword">let</span> currentNode <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>head
    <span class="token comment">// 遍历节点，直到找到尾部节点</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>currentNode<span class="token punctuation">.</span>next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>currentNode<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            currentNode<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">null</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            currentNode <span class="token operator">=</span> currentNode<span class="token punctuation">.</span>next
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span>tail <span class="token operator">=</span> currentNode

    <span class="token keyword">return</span> deleteTail
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><h4 id="删除头部节点" tabindex="-1"><a class="header-anchor" href="#删除头部节点" aria-hidden="true">#</a> 删除头部节点</h4>
<p>删除头部节点需要注意只有一个节点的情况，此时head.next为null</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * 删除头部节点
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>LinkedListNode<span class="token punctuation">}</span></span>
 */</span>
<span class="token function">deleteHead</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">const</span> deleteHead <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>head

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>head<span class="token punctuation">.</span>next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>head <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>head<span class="token punctuation">.</span>next
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 链表只有一个节点的情况</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>head <span class="token operator">=</span> <span class="token keyword">null</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>tail <span class="token operator">=</span> <span class="token keyword">null</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> deleteHead
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h4 id="数组转链表" tabindex="-1"><a class="header-anchor" href="#数组转链表" aria-hidden="true">#</a> 数组转链表</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * 数组转链表
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span> <span class="token parameter">values</span>
 * <span class="token keyword">@returns</span> <span class="token class-name"><span class="token punctuation">{</span>LinkedList<span class="token punctuation">}</span></span>
 */</span>
<span class="token function">fromArray</span><span class="token punctuation">(</span><span class="token parameter">values</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    values<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">value</span> <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> <span class="token keyword">this</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h4 id="链表转数组" tabindex="-1"><a class="header-anchor" href="#链表转数组" aria-hidden="true">#</a> 链表转数组</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * 链表转数组
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>LinkedListNode<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span>
 */</span>
<span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> nodes <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

    <span class="token keyword">let</span> currentNode <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>head
    <span class="token keyword">while</span> <span class="token punctuation">(</span>currentNode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        nodes<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>currentNode<span class="token punctuation">)</span>
        currentNode <span class="token operator">=</span> currentNode<span class="token punctuation">.</span>next
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> nodes
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h4 id="打印节点" tabindex="-1"><a class="header-anchor" href="#打印节点" aria-hidden="true">#</a> 打印节点</h4>
<p>把每个节点的内容已逗号隔开，拼接成字符串</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">toString</span><span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">accur<span class="token punctuation">,</span> node</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token comment">// 第一个 是空字符串，不需要添加逗号</span>
        <span class="token keyword">const</span> isComman <span class="token operator">=</span> accur <span class="token operator">?</span> <span class="token string">','</span> <span class="token operator">:</span> <span class="token string">''</span>
        <span class="token keyword">return</span> accur <span class="token operator">+</span> isComman <span class="token operator">+</span> node<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>callback<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">''</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h4 id="翻转链表" tabindex="-1"><a class="header-anchor" href="#翻转链表" aria-hidden="true">#</a> 翻转链表</h4>
<p>翻转链表是是最难理解的地方。</p>
<p>建议阅读这篇文章：<a href="https://zhuanlan.zhihu.com/p/106050123" target="_blank" rel="noopener noreferrer">图解单链表反转<ExternalLinkIcon/></a></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">reverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> currentNode <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>head
    <span class="token keyword">let</span> prevNode <span class="token operator">=</span> <span class="token keyword">null</span>
    <span class="token keyword">let</span> nextNode <span class="token operator">=</span> <span class="token keyword">null</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>currentNode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 获取当前节点的下一个节点</span>
        nextNode <span class="token operator">=</span> currentNode<span class="token punctuation">.</span>next
        <span class="token comment">// 当前节点的前一个节点指向上一个节点</span>
        currentNode<span class="token punctuation">.</span>next <span class="token operator">=</span> prevNode
        <span class="token comment">// 上一个节点赋值给当前节点</span>
        prevNode <span class="token operator">=</span> currentNode
        <span class="token comment">// 当前节点赋值给下一个节点</span>
        currentNode <span class="token operator">=</span> nextNode
    <span class="token punctuation">}</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span>tail <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>head
    <span class="token keyword">this</span><span class="token punctuation">.</span>head <span class="token operator">=</span> prevNode

    <span class="token keyword">return</span> <span class="token keyword">this</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h2 id="代码地址" tabindex="-1"><a class="header-anchor" href="#代码地址" aria-hidden="true">#</a> 代码地址</h2>
<p>完整实现代码地址：<a href="https://github.com/Buzhifanji/CS-Notes/tree/main/code/javascript-algorithms/src/data-structures/linked-list" target="_blank" rel="noopener noreferrer">linked-list<ExternalLinkIcon/></a></p>
</template>
