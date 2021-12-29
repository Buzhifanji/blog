<template><p>生成公钥和私钥
公钥放在服务器上，私钥放在自己电脑上</p>
<p>使用 scp 的时候路径不能有中文</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code># 生成密钥对
ssh<span class="token operator">-</span>keygen

# 把公钥放到服务器上
scp
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></template>
