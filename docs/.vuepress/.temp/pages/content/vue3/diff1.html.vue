<template><h1 id="vue3组件更新流程" tabindex="-1"><a class="header-anchor" href="#vue3组件更新流程" aria-hidden="true">#</a> vue3组件更新流程</h1>
<p>在 vnode 到真实 DOM 是如何转变的 一文中，梳理了组件渲染的本质：把各种类型的vnode渲染中真实的 DOM。组件是有组件模板、组件描述对象和数据构成，数据的变化会影响组件的变化。组件渲染的时候会创建一个带副作用的渲染函数：setupRenderEffect。当组件数据发生变化的时候，会执行这个函数来触发组件更新流程。接下来，我们重点分析这个函数中的组件更新流程。</p>
<h2 id="setuprendereffect-更新过程" tabindex="-1"><a class="header-anchor" href="#setuprendereffect-更新过程" aria-hidden="true">#</a> setupRenderEffect 更新过程</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">setupRenderEffect</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">instance<span class="token punctuation">,</span> initialVNode<span class="token punctuation">,</span> container<span class="token punctuation">,</span> anchor<span class="token punctuation">,</span> parentSuspense<span class="token punctuation">,</span> isSVG<span class="token punctuation">,</span> optimized</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token function-variable function">componentUpdateFn</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>instance<span class="token punctuation">.</span>isMounted<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 渲染组件</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">// // 更新组件</span>
            <span class="token keyword">let</span> <span class="token punctuation">{</span> next<span class="token punctuation">,</span> vnode <span class="token punctuation">}</span> <span class="token operator">=</span> instance<span class="token punctuation">;</span>
            <span class="token comment">// next 表示新的组件 vnode</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                next<span class="token punctuation">.</span>el <span class="token operator">=</span> vnode<span class="token punctuation">.</span>el<span class="token punctuation">;</span>
                <span class="token comment">// 更新组件 vnode 节点信息</span>
                <span class="token function">updateComponentPreRender</span><span class="token punctuation">(</span>instance<span class="token punctuation">,</span> next<span class="token punctuation">,</span> optimized<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                next <span class="token operator">=</span> vnode<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 省略 声明钩子函数</span>

            <span class="token comment">// 渲染新的子树 vnode</span>
            <span class="token keyword">const</span> nextTree <span class="token operator">=</span> <span class="token function">renderComponentRoot</span><span class="token punctuation">(</span>instance<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 缓存旧的子树 vnode</span>
            <span class="token keyword">const</span> prevTree <span class="token operator">=</span> instance<span class="token punctuation">.</span>subTree<span class="token punctuation">;</span>
            <span class="token comment">// 更新子树 vnode</span>
            instance<span class="token punctuation">.</span>subTree <span class="token operator">=</span> nextTree<span class="token punctuation">;</span>
            <span class="token comment">// 组件更新核心逻辑，根据新旧子树 vnode 做 patch</span>
            <span class="token function">patch</span><span class="token punctuation">(</span>prevTree<span class="token punctuation">,</span> nextTree<span class="token punctuation">,</span>
            <span class="token comment">// 如果在 teleport 组件中父节点可能已经改变，那么直接在容器找旧树 DOM 元素的父节点</span>
            <span class="token function">hostParentNode</span><span class="token punctuation">(</span>prevTree<span class="token punctuation">.</span>el<span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token comment">// 参考节点在 fragment 的情况可能改变，所以直接找旧树 DOM 元素的下一个节点</span>
            <span class="token function">getNextHostNode</span><span class="token punctuation">(</span>prevTree<span class="token punctuation">)</span><span class="token punctuation">,</span> instance<span class="token punctuation">,</span> parentSuspense<span class="token punctuation">,</span> isSVG<span class="token punctuation">)</span><span class="token punctuation">;</span>

            next<span class="token punctuation">.</span>el <span class="token operator">=</span> nextTree<span class="token punctuation">.</span>el<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token comment">// 创建响应式的副作用渲染函数</span>
    <span class="token keyword">const</span> effect <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReactiveEffect</span><span class="token punctuation">(</span>
      componentUpdateFn<span class="token punctuation">,</span>
      <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">queueJob</span><span class="token punctuation">(</span>instance<span class="token punctuation">.</span>update<span class="token punctuation">)</span><span class="token punctuation">,</span>
      instance<span class="token punctuation">.</span>scope <span class="token comment">// track it in component's effect scope</span>
    <span class="token punctuation">)</span>
    <span class="token comment">// 手动绑定 副作用渲染函数 的this</span>
    <span class="token keyword">const</span> update <span class="token operator">=</span> <span class="token punctuation">(</span>instance<span class="token punctuation">.</span>update <span class="token operator">=</span> effect<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>effect<span class="token punctuation">)</span> <span class="token keyword">as</span> SchedulerJob<span class="token punctuation">)</span>

    <span class="token comment">// 执行 副作用渲染函数</span>
    <span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br></div></div><p>从代码中可以看出，组件更新主要了做了三件事情：<strong>更新组件 vnode 节点</strong>，<strong>渲染新的子树 vnode</strong>，<strong>根据新旧子树 vnode 执行 patch 逻辑。</strong></p>
<ul>
<li>
<p>更新组件 vnode 节点</p>
<p>next是判断组件实例中是否有新的组件 vnode，有就更新组件 vnode。具体为什么这么做，稍后讲到 updateComponent 更新组件的时候会具体分析。</p>
</li>
<li>
<p>渲染新的子树</p>
<p>当数据发生变化时，模板需要更新。重新生成子树，为接下来 path 做准备。</p>
</li>
<li>
<p>path</p>
<p>对比新旧子树 vnode，根据不同点，找到合适的方式更新 DOM。</p>
</li>
</ul>
<h2 id="核心逻辑-patch-流程" tabindex="-1"><a class="header-anchor" href="#核心逻辑-patch-流程" aria-hidden="true">#</a> 核心逻辑：patch 流程</h2>
<p>接下来，我们就来看看 path 函数的实现：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">patch</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">n1<span class="token punctuation">,</span> n2<span class="token punctuation">,</span> container<span class="token punctuation">,</span> anchor <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span> parentComponent <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span> parentSuspense <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span> isSVG <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span> slotScopeIds <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span> optimized <span class="token operator">=</span> isHmrUpdating <span class="token operator">?</span> <span class="token boolean">false</span> <span class="token operator">:</span> <span class="token operator">!</span><span class="token operator">!</span>n2<span class="token punctuation">.</span>dynamicChildren</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果存在新旧节点, 且新旧节点类型不同，则销毁旧节点</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>n1 <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token function">isSameVNodeType</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span> n2<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        anchor <span class="token operator">=</span> <span class="token function">getNextHostNode</span><span class="token punctuation">(</span>n1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">unmount</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span> parentComponent<span class="token punctuation">,</span> parentSuspense<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// n1 设置为 null 保证后续都走 mount 逻辑</span>
        n1 <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">switch</span> <span class="token punctuation">(</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> Text<span class="token operator">:</span>
            <span class="token comment">// 处理文本节点</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> Comment$<span class="token number">1</span><span class="token operator">:</span>
            <span class="token comment">// 处理注释节点</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> Static<span class="token operator">:</span>
            <span class="token comment">// 处理静态节点</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> Fragment<span class="token operator">:</span>
                <span class="token comment">// 处理 Fragment 元素</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">default</span><span class="token operator">:</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>shapeFlag <span class="token operator">&amp;</span> <span class="token number">1</span> <span class="token comment">/* ELEMENT */</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 处理普通 DOM 元素</span>
                <span class="token function">processElement</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span> n2<span class="token punctuation">,</span> container<span class="token punctuation">,</span> anchor<span class="token punctuation">,</span> parentComponent<span class="token punctuation">,</span> parentSuspense<span class="token punctuation">,</span> isSVG<span class="token punctuation">,</span> slotScopeIds<span class="token punctuation">,</span> optimized<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>shapeFlag <span class="token operator">&amp;</span> <span class="token number">6</span> <span class="token comment">/* COMPONENT */</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 处理组件</span>
                <span class="token function">processComponent</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span> n2<span class="token punctuation">,</span> container<span class="token punctuation">,</span> anchor<span class="token punctuation">,</span> parentComponent<span class="token punctuation">,</span> parentSuspense<span class="token punctuation">,</span> isSVG<span class="token punctuation">,</span> slotScopeIds<span class="token punctuation">,</span> optimized<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>shapeFlag <span class="token operator">&amp;</span> <span class="token number">64</span> <span class="token comment">/* TELEPORT */</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 处理 TELEPORT</span>

            <span class="token punctuation">}</span>
            <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>shapeFlag <span class="token operator">&amp;</span> <span class="token number">128</span> <span class="token comment">/* SUSPENSE */</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 处理 SUSPENSE</span>

            <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">isSameVNodeType</span> <span class="token punctuation">(</span><span class="token parameter">n1<span class="token punctuation">,</span> n2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// n1 和 n2 节点的 type 和 key 都相同，才是相同节点</span>
  <span class="token keyword">return</span> n1<span class="token punctuation">.</span>type <span class="token operator">===</span> n2<span class="token punctuation">.</span>type <span class="token operator">&amp;&amp;</span> n1<span class="token punctuation">.</span>key <span class="token operator">===</span> n2<span class="token punctuation">.</span>key
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br></div></div><p>path执行的时候，会先判断新旧节点是否为 相同的 vnode 类型，如果不同，则销毁旧节点，挂载新节点。</p>
<p>例如：旧节点为 div，新节点是 p。path函数执行的逻辑是：删除旧节点 div，挂载 新节点 p。</p>
<p>如果是相同的节点类型，那么要走 更新流程（diff）。在vue3，更新流程会根据节点类型，执行对应的更新操作。</p>
<p>组件更新执行 processComponent，普通节点更新执行 processElement。</p>
<p>我们目前只分析这两种情况，忽略其它节点类型的更新情况。</p>
<h3 id="processcomponent" tabindex="-1"><a class="header-anchor" href="#processcomponent" aria-hidden="true">#</a> processComponent</h3>
<p>我们先来看看更新组件的代码实现：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">processComponent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">n1<span class="token punctuation">,</span> n2<span class="token punctuation">,</span> container<span class="token punctuation">,</span> anchor<span class="token punctuation">,</span> parentComponent<span class="token punctuation">,</span> parentSuspense<span class="token punctuation">,</span> isSVG<span class="token punctuation">,</span> optimized</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>n1 <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 挂载组件</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// 更新子组件</span>
    <span class="token function">updateComponent</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span> n2<span class="token punctuation">,</span> parentComponent<span class="token punctuation">,</span> optimized<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> <span class="token function-variable function">updateComponent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">n1<span class="token punctuation">,</span> n2<span class="token punctuation">,</span> parentComponent<span class="token punctuation">,</span> optimized</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> instance <span class="token operator">=</span> <span class="token punctuation">(</span>n2<span class="token punctuation">.</span>component <span class="token operator">=</span> n1<span class="token punctuation">.</span>component<span class="token punctuation">)</span>
  <span class="token comment">// 根据新旧子组件 vnode 判断是否需要更新子组件</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">shouldUpdateComponent</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span> n2<span class="token punctuation">,</span> parentComponent<span class="token punctuation">,</span> optimized<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>instance<span class="token punctuation">.</span>asyncDep <span class="token operator">&amp;&amp;</span>
        <span class="token operator">!</span>instance<span class="token punctuation">.</span>asyncResolved<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 异步组件</span>

        <span class="token comment">// 如果异步组件，在待使用的状态，那么只更新 props 和 slots</span>
        <span class="token comment">// 如果 异步组件，使用中，那么 执行 updateComponentPreRender 更新组件</span>
        <span class="token function">updateComponentPreRender</span><span class="token punctuation">(</span>instance<span class="token punctuation">,</span> n2<span class="token punctuation">,</span> optimized<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 更新 普通组件</span>

        <span class="token comment">// 新的子组件 vnode 赋值给 instance.next</span>
        instance<span class="token punctuation">.</span>next <span class="token operator">=</span> n2<span class="token punctuation">;</span>
        <span class="token comment">// 子组件也可能因为数据变化被添加到更新队列里了，移除它们防止对一个子组件重复更新</span>
        <span class="token function">invalidateJob</span><span class="token punctuation">(</span>instance<span class="token punctuation">.</span>update<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 执行子组件的副作用渲染函数</span>
        instance<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// 不需要更新，只复制属性</span>
    n2<span class="token punctuation">.</span>component <span class="token operator">=</span> n1<span class="token punctuation">.</span>component
    n2<span class="token punctuation">.</span>el <span class="token operator">=</span> n1<span class="token punctuation">.</span>el
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br></div></div><p>更新组件逻辑，主要通过执行 updateComponent 来更新子组件。updateComponent 执行的时候会先执行 shouldUpdateComponent 函数，来判断是否需要更新子组件。如果不需要更新，那么只是简单的复制属性；如果更新，则会进入组件更新流程，不过需要注意的是，同步和异步组件处理流程，存在差异。</p>
<ul>
<li>
<p>shouldUpdateComponent 这个函数来判断组件是否需要更新，其函数内部，主要通过检测和对比组件 vnode 中的 props、chidren、dirs、transiton 等属性，来决定子组件是否需要更新。这是很好理解的，因为在一个组件的子组件是否需要更新，我们主要依据子组件 vnode 是否存在一些会影响组件更新的属性变化进行判断，如果存在就会更新子组件</p>
</li>
<li>
<p>invalidateJob 这个函数是用来处理只更新当前组件的数据变化。当组件发生发生变化的时候，子组件也可能会改变，vue3通过任务队列机制，防止重复更新子组件。</p>
</li>
</ul>
<p>当为普通组件的时候，会先执行invalidateJob（instance.update）避免子组件由于自身数据变化导致的重复更新，然后又执行了子组件的副作用渲染函数 instance.update 来主动触发子组件的更新。</p>
<h3 id="processelement" tabindex="-1"><a class="header-anchor" href="#processelement" aria-hidden="true">#</a> processElement</h3>
</template>
