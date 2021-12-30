<template><h1 id="序言" tabindex="-1"><a class="header-anchor" href="#序言" aria-hidden="true">#</a> 序言</h1>
<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2>
<p>这一系列主要记录自己用JavaScript实现数据结构的笔记。</p>
<p>数据结构和算法光看是学不会的，需要自己手动去实现一遍，理解每一行的代码的意思，重写一变测试用例。</p>
<p>个人仓单代码地址<a href="https://github.com/Buzhifanji/CS-Notes/tree/main/code/javascript-algorithms" target="_blank" rel="noopener noreferrer">javascript-algorithms<ExternalLinkIcon/></a></p>
<p><strong>声明</strong>：这一系列并不是原创，主要参考来源<a href="https://github.com/trekhleb/javascript-algorithms/blob/master/README.zh-CN.md" target="_blank" rel="noopener noreferrer">JavaScript 算法与数据结构<ExternalLinkIcon/></a></p>
<h2 id="思维导图" tabindex="-1"><a class="header-anchor" href="#思维导图" aria-hidden="true">#</a> 思维导图</h2>
<p><img src="/minds/data-structure.png" alt="思维导图">
<img src="/minds/11.png" alt="思维导图"></p>
<h2 id="对比方法的复用-comparator" tabindex="-1"><a class="header-anchor" href="#对比方法的复用-comparator" aria-hidden="true">#</a> 对比方法的复用：Comparator</h2>
<h3 id="方法介绍" tabindex="-1"><a class="header-anchor" href="#方法介绍" aria-hidden="true">#</a> 方法介绍</h3>
<p>介绍一下实现对比的类，我们在实现数据结构的时候，都会实例化这个类。</p>
<ul>
<li>static defaultCompareFunction 默认比对方法。0 相等；-1 小于；1 大于</li>
<li>equal 是否相等</li>
<li>lessThan 小于</li>
<li>greaterThan 大于</li>
<li>lessThanOrEqual 小于等于</li>
<li>greaterThanOrEqual 大于等于</li>
<li>reverse 翻转比对函数</li>
</ul>
<h3 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现" aria-hidden="true">#</a> 代码实现</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Comparator</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * Constructor
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token punctuation">{</span>function(a: *, b: *)<span class="token punctuation">}</span> [compareFunction]
     * 默认是 数字/字符串 对比函数，另外支持自定义对比函数
     *
     */</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">compareFunction</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>compare <span class="token operator">=</span> compareFunction <span class="token operator">||</span> Comparator<span class="token punctuation">.</span>defaultCompareFunction
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 默认
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token punctuation">(</span>string<span class="token operator">|</span>number<span class="token punctuation">)</span><span class="token punctuation">}</span></span> <span class="token parameter">a</span>
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token punctuation">(</span>string<span class="token operator">|</span>number<span class="token punctuation">)</span><span class="token punctuation">}</span></span> <span class="token parameter">b</span>
     * <span class="token keyword">@returns</span>
     */</span>
    <span class="token keyword">static</span> <span class="token function">defaultCompareFunction</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>a <span class="token operator">===</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token number">0</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> a <span class="token operator">&lt;</span> b <span class="token operator">?</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token operator">:</span> <span class="token number">1</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 相等
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">a</span>
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">b</span>
     * <span class="token keyword">@returns</span> <span class="token class-name"><span class="token punctuation">{</span>boolean<span class="token punctuation">}</span></span>
     */</span>
    <span class="token function">equal</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">compare</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token number">0</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 小于
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">a</span>
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">b</span>
     * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>boolean<span class="token punctuation">}</span></span>
     */</span>
    <span class="token function">lessThan</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">compare</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">0</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 大于
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">a</span>
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">b</span>
     * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>boolean<span class="token punctuation">}</span></span>
     */</span>
    <span class="token function">greaterThan</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">compare</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 小于等于
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">a</span>
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">b</span>
     * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>boolean<span class="token punctuation">}</span></span>
     */</span>
    <span class="token function">lessThanOrEqual</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">lessThan</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">equal</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 大于等于
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">a</span>
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">b</span>
     * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>boolean<span class="token punctuation">}</span></span>
     */</span>
    <span class="token function">greaterThanOrEqual</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">greaterThan</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">equal</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 翻转对比函数
     */</span>
    <span class="token function">reverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> compareOriginal <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>compare
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">compare</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">compareOriginal</span><span class="token punctuation">(</span>b<span class="token punctuation">,</span> a<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br></div></div><h3 id="测试用例" tabindex="-1"><a class="header-anchor" href="#测试用例" aria-hidden="true">#</a> 测试用例</h3>
<p>代码地址：<a href="https://github.com/Buzhifanji/CS-Notes/blob/main/code/javascript-algorithms/src/utils/comparator/test/Comparator.test.js" target="_blank" rel="noopener noreferrer">Comparator.test.js<ExternalLinkIcon/></a></p>
</template>
