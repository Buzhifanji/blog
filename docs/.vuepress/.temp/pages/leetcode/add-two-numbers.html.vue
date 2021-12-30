<template><h1 id="两数相加" tabindex="-1"><a class="header-anchor" href="#两数相加" aria-hidden="true">#</a> 两数相加</h1>
<p>给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。</p>
<p>请你将两个数相加，并以相同形式返回一个表示和的链表。</p>
<p>你可以假设除了数字 0 之外，这两个数都不会以 0 开头。</p>
<p>来源：力扣（LeetCode）链接：https://leetcode-cn.com/problems/add-two-numbers</p>
<h2 id="解题思路" tabindex="-1"><a class="header-anchor" href="#解题思路" aria-hidden="true">#</a> 解题思路</h2>
<ul>
<li>不对齐补零</li>
<li>计算进位</li>
</ul>
<h2 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现" aria-hidden="true">#</a> 代码实现</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">/*
 * @lc app=leetcode.cn id=2 lang=javascript
 *
 * [2] 两数相加
 */</span>

<span class="token comment">// @lc code=start</span>
<span class="token doc-comment comment">/**
 * Definition for singly-linked list.
 * function ListNode(val, next) <span class="token punctuation">{</span>
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * <span class="token punctuation">}</span>
 */</span>
<span class="token doc-comment comment">/**
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>ListNode<span class="token punctuation">}</span></span> <span class="token parameter">l1</span>
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>ListNode<span class="token punctuation">}</span></span> <span class="token parameter">l2</span>
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>ListNode<span class="token punctuation">}</span></span>
 */</span>
<span class="token keyword">var</span> <span class="token function-variable function">addTwoNumbers</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">l1<span class="token punctuation">,</span> l2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> curry <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>
        result<span class="token punctuation">,</span> preNode<span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>l1 <span class="token operator">||</span> l2 <span class="token operator">||</span> curry<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> val1 <span class="token operator">=</span> l1 <span class="token operator">?</span> l1<span class="token punctuation">.</span>val <span class="token operator">:</span> <span class="token number">0</span>
        <span class="token keyword">const</span> val2 <span class="token operator">=</span> l2 <span class="token operator">?</span> l2<span class="token punctuation">.</span>val <span class="token operator">:</span> <span class="token number">0</span>
        <span class="token comment">// 计算 和</span>
        <span class="token keyword">let</span> sum <span class="token operator">=</span> val1 <span class="token operator">+</span> val2 <span class="token operator">+</span> curry
        <span class="token comment">// 计算 进位</span>
        curry <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>sum <span class="token operator">/</span> <span class="token number">10</span><span class="token punctuation">)</span>
        sum <span class="token operator">=</span> sum <span class="token operator">%</span> <span class="token number">10</span>

        <span class="token keyword">const</span> current <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span>sum<span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>preNode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            preNode<span class="token punctuation">.</span>next <span class="token operator">=</span> current
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            result <span class="token operator">=</span> current
        <span class="token punctuation">}</span>
        preNode <span class="token operator">=</span> current

        l1 <span class="token operator">=</span> l1 <span class="token operator">?</span> l1<span class="token punctuation">.</span>next <span class="token operator">:</span> l1
        l2 <span class="token operator">=</span> l2 <span class="token operator">?</span> l2<span class="token punctuation">.</span>next <span class="token operator">:</span> l2
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> result <span class="token operator">?</span> result <span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// @lc code=end</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br></div></div></template>
