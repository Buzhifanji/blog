<template><h1 id="ssl-error-syscall-in-connection-to-github-com-443" tabindex="-1"><a class="header-anchor" href="#ssl-error-syscall-in-connection-to-github-com-443" aria-hidden="true">#</a> SSL_ERROR_SYSCALL in connection to github.com:443</h1>
<p>git 提交代码的时候报错：SSL_ERROR_SYSCALL in connection to github.com:443 处理方案：</p>
<div class="language-linux ext-linux line-numbers-mode"><pre v-pre class="language-linux"><code>    git config --global http.sslBackend &quot;openssl&quot;
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="参考来源-https-blog-csdn-net-w5688414-article-details-99816109" tabindex="-1"><a class="header-anchor" href="#参考来源-https-blog-csdn-net-w5688414-article-details-99816109" aria-hidden="true">#</a> 参考来源： https://blog.csdn.net/w5688414/article/details/99816109</h2>
</template>
