<template><h1 id="通俗易懂之-dns-域名解析系统" tabindex="-1"><a class="header-anchor" href="#通俗易懂之-dns-域名解析系统" aria-hidden="true">#</a> 通俗易懂之 DNS 域名解析系统</h1>
<h2 id="dns-是什么" tabindex="-1"><a class="header-anchor" href="#dns-是什么" aria-hidden="true">#</a> DNS 是什么</h2>
<p>一天，你要去好朋友家做客，去之前你是不是得知道好朋友家庭住址，有了这个住址你才知道要去目的地。</p>
<p>相似的，两台计算机想要通信，是不是需要知道对方地址，只有知道你在哪里，我才能找到你，才能建立联系。</p>
<p>每台计算机的地址，有一个专业的称呼，叫做<strong>IP地址</strong>。为了精准定位到具体某一台电脑，IP地址和家庭地址一样，也是唯一的。</p>
<p>IP 地址是一串长长的字符串，它长如下的样子：</p>
<div class="language-linux ext-linux line-numbers-mode"><pre v-pre class="language-linux"><code>183.17.200.174
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>如果你想要记住它，是不是有点难度。那么有没有办法，既可以让我们很容易记住，又可以确保精准找到对方计算机的 IP 地址？</p>
<p>有一种的方案是<strong>别名</strong>。</p>
<p>DNS全称：Domain Name System，域名系统，是一个将域名和 IP 地址相互映射的分布式服务。</p>
<p>简单来讲，DNS相当于一个翻译官，负责将域名翻译成ip地址。</p>
<p>IP 地址是一长串能够唯一地标记网络上的计算机的数字，不方便记忆，所以为了让人们记住的域名，才会引入 DNS 服务，这样用户就可以直接通过域名方法 IP 地址。</p>
<h2 id="域名系统" tabindex="-1"><a class="header-anchor" href="#域名系统" aria-hidden="true">#</a> 域名系统</h2>
<p>域名是一个具有层次的结构，从上到下一次为根域名、顶级域名、二级域名、三级域名..</p>
<p><img src="@source/../src/assets/imgs/domain.png" alt="Alternative text"></p>
<p>以 www.example.com 为例，com 是顶级域名, example 是二级域名, www 是三级域名。</p>
<p>从上图中可以看到，DNS 的存储设计是一个树状结构。</p>
<p>为什么要这样设计？</p>
<blockquote>
<p>根域名服务器存储的不是域名和 IP 的映射关系，而是一个目录</p>
<p>防止单点故障：如果将所有的域名记录都存放到根域名服务器，从存储量上来说，不会非常巨大。要知道一个域名记录——域名、IP 地址和额外少量信息，并不需要大量存储空间。但是如果全世界所有的 DNS 请求都集中在少量的根服务器上，这个访问流量就会过于巨大。而且一旦发生故障，很容易导致大面积瘫痪</p>
<p>平衡地理分布:：因为根服务器较少，所以如果全部都走根服务器，不同客户端距离根服务器距离不同，感受到的延迟也不一样，这样对用户来说不太友好。</p>
</blockquote>
<h2 id="dns-查询过程" tabindex="-1"><a class="header-anchor" href="#dns-查询过程" aria-hidden="true">#</a> DNS 查询过程</h2>
<p>以用户在浏览器中输入 www.lagou.com 为例：</p>
<ol>
<li>
<p>用户输入网址，查询本地 DNS。</p>
</li>
<li>
<p>请求根 DNS 服务器：如果本地 DNS 缓存中找到了对应的 DNS 条目，那么查询就结束了。
如果没有，那么继续往下走</p>
</li>
<li>
<p>根 DNS 服务器返回二级 DNS 服务器的 IP</p>
</li>
<li>
<p>请求二级 DNS 服务器， 二级DNS 服务器中是具体域名的目录。（查询 com）</p>
</li>
<li>
<p>二级 DNS 服务器返回三级 DNS 服务器的 IP。 （查询 lagou）</p>
</li>
<li>
<p>三级 DNS 服务器返回 DNS 记录到本地 DNS 服务器。</p>
</li>
</ol>
<p>查询流程图如下：</p>
<p><img src="@source/../src/assets/imgs/search-domain.png" alt="Alternative text"></p>
<h2 id="域名缓存" tabindex="-1"><a class="header-anchor" href="#域名缓存" aria-hidden="true">#</a> 域名缓存</h2>
<p>在域名服务器解析的时候，使用缓存保存域名和IP地址的映射。</p>
<p>DNS 缓存通常有两种方式:</p>
<ul>
<li>
<p>浏览器缓存：浏览器在获取网站域名的实际 IP 地址后会对其进行缓存，减少网络请求的损耗</p>
</li>
<li>
<p>操作系统缓存：操作系统的缓存其实是用户自己配置的 hosts 文件</p>
</li>
</ul>
<h3 id="浏览器缓存-dns记录" tabindex="-1"><a class="header-anchor" href="#浏览器缓存-dns记录" aria-hidden="true">#</a> 浏览器缓存: DNS记录</h3>
<p>DNS记录具体例子：</p>
<div class="language-liunx ext-liunx line-numbers-mode"><pre v-pre class="language-liunx"><code>; 定义www.example.com的ip地址
www.example.com.     IN     A     139.18.28.5;
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>其中，;是语句块的结尾，也是注释。IN 代表记录用于互联网，是 Intenet 的缩写。A 是记录的类型，A 记录代表着这是一条用于解析 IPv4 地址的记录。</p>
<p>从这条记录可知，www.example.com的 IP 地址是 139.18.28.5</p>
<p>DNS 记录的类型非常多，有 30 多种。其中比较常见的有 A、AAAA、CNAME、MX，以及 NS 等</p>
<h4 id="a-记录" tabindex="-1"><a class="header-anchor" href="#a-记录" aria-hidden="true">#</a> A 记录</h4>
<p>A 记录是域名和 IPv4 地址的映射关系</p>
<h4 id="aaaa-记录" tabindex="-1"><a class="header-anchor" href="#aaaa-记录" aria-hidden="true">#</a> AAAA 记录</h4>
<p>AAAA 记录则是域名和 IPv6 地址的映射关系。</p>
<h4 id="ns-记录" tabindex="-1"><a class="header-anchor" href="#ns-记录" aria-hidden="true">#</a> NS 记录</h4>
<p>NS（Name Server）记录是描述 DNS 服务器网址。</p>
<p><strong>通常 NS 不会只有一个，这是为了保证高可用，一个挂了另一个还能继续服务</strong></p>
<p><strong>通常数字小的 NS 记录优先级更高，也就是 ns1 会优先于 ns2 响应</strong></p>
<p>例子：</p>
<div class="language-liunx ext-liunx line-numbers-mode"><pre v-pre class="language-liunx"><code>a.com.     IN      NS      ns1.a.com.

a.com.     IN      NS      ns2.a.com.

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>当解析 a.com 地址时，我们看到 a.com 有两个 NS 记录，所以确定最终 a.com 的记录在 ns1.a.com 和 ns2.a.com 上。从设计上看，ns1 和 ns2 是网站 a.com 提供的智能 DNS 服务器，可以提供负载均衡、分布式 Sharding 等服务。比如当一个北京的用户想要访问 a.com 的时候，ns1 看到这是一个北京的 IP 就返回一个离北京最近的机房 IP</p>
<h4 id="cname-记录" tabindex="-1"><a class="header-anchor" href="#cname-记录" aria-hidden="true">#</a> CNAME 记录</h4>
<p>CNAME（Canonical Name Record）用于定义域名的<strong>别名</strong></p>
<div class="language-liunx ext-liunx line-numbers-mode"><pre v-pre class="language-liunx"><code>; 定义www.example.com的别名

a.example.com.          IN     CNAME   b.example.com.
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>这条 DNS 记录定义了 a.example.com 是 b.example.com 的别名。用户在浏览器中输入 a.example.com 时候，通过 DNS 查询会知道 a.example.com 是 b.example.com 的别名，因此需要实际 IP 的时候，会去拿 b.example.com 的 A 记录。</p>
<p>这样用户如果在浏览器中输入 a.example.com 实际打开的就是 b.example.com。因为走的是 DNS 查询的路径，速度很快（因为有缓存），不需要 HTTP 重定向等操作。</p>
<p>当你想把一个网站迁移到新域名，旧域名仍然保留的时候；还有当你想将自己的静态资源放到 CDN 上的时候，CNAME 就非常有用。</p>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<p>DNS是域名解析系统，通过 DNS 服务获取IP地址。域名系统是一个分级的分布式系统，整体设计也是一个树状结构。</p>
</template>
