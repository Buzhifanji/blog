<template><h1 id="两数之和" tabindex="-1"><a class="header-anchor" href="#两数之和" aria-hidden="true">#</a> 两数之和</h1>
<p>给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。</p>
<p>你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。</p>
<p>你可以按任意顺序返回答案</p>
<p>来源：力扣（LeetCode）链接：https://leetcode-cn.com/problems/two-sum</p>
<h2 id="题解" tabindex="-1"><a class="header-anchor" href="#题解" aria-hidden="true">#</a> 题解</h2>
<ul>
<li>
<p>解题思路：</p>
<ol>
<li>
<p>x + num = target</p>
<p>暴力解法：双重循环，用枚举去查找</p>
</li>
<li>
<p>x = target - num</p>
<p>空间换时间：算出差，然后查找符号差的值</p>
</li>
</ol>
</li>
<li>
<p>边界：</p>
<ol>
<li>数组长度小于2</li>
<li>出现重复的元素,例如：nums = [3, 3]</li>
</ol>
</li>
</ul>
<h3 id="空间换时间" tabindex="-1"><a class="header-anchor" href="#空间换时间" aria-hidden="true">#</a> 空间换时间</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */</span>

<span class="token comment">// @lc code=start</span>
<span class="token doc-comment comment">/**
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span> <span class="token parameter">nums</span>
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> <span class="token parameter">target</span>
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span>
 */</span>
<span class="token keyword">var</span> <span class="token function-variable function">twoSum</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">nums<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 处理异常</span>
    <span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">.</span>length <span class="token operator">&lt;</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> result
    <span class="token punctuation">}</span>
    <span class="token comment">// 转换成 hash</span>
    <span class="token keyword">const</span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    nums<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">el<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        map<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> index<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> nums<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> diffValue <span class="token operator">=</span> target <span class="token operator">-</span> nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>map<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>diffValue<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> j <span class="token operator">=</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>diffValue<span class="token punctuation">)</span>
            <span class="token comment">// 处理 重复元素</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">!==</span> j<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                result <span class="token operator">=</span> j <span class="token operator">></span> i <span class="token operator">?</span> <span class="token punctuation">[</span>i<span class="token punctuation">,</span> j<span class="token punctuation">]</span> <span class="token operator">:</span> <span class="token punctuation">[</span>j<span class="token punctuation">,</span> i<span class="token punctuation">]</span>
                <span class="token keyword">break</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> result
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// @lc code=end</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div></template>
