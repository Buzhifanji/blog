import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";import{o as l,c as d,a as i,b as a,d as e,e as c,r as o}from"./app.950abc15.js";const r={},u=e("\u672C\u6587\u662F "),v={href:"https://missing.csail.mit.edu/2020/",target:"_blank",rel:"noopener noreferrer"},m=e("The Missing Semester of Your CS Education"),b=e("\u7684\u5B66\u4E60\u7B14\u8BB0\u3002"),h=c(`<h2 id="\u4F7F\u7528-shell" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528-shell" aria-hidden="true">#</a> \u4F7F\u7528 shell</h2><p>\u5F53\u6211\u4EEC\u6253\u5F00\u7EC8\u7AEF\u7684\u65F6\u5019\uFF0C\u4F1A\u770B\u5230\u5982\u4E0B\u6A21\u6837\u7684\u7EC8\u7AEF\u63D0\u793A\u7B26</p><div class="language-console ext-console line-numbers-mode"><pre class="language-console"><code>missing:~$ 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u800C\u81EA\u5DF1\u5B66\u4E60\u7528\u7684 linux \u7CFB\u7EDF\u4E0B\u6253\u5F00\u7684\u7EC8\u7AEF\u663E\u793A\u5982\u4E0B</p><div class="language-console ext-console line-numbers-mode"><pre class="language-console"><code>buzhi@DESKTOP-I6CEGBD:~$ 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>\u67E5\u770B\u65E5\u671F</li></ul><div class="language-console ext-console line-numbers-mode"><pre class="language-console"><code>missing:~$ date
2022\u5E74 08\u6708 07\u65E5 \u661F\u671F\u65E5 11:22:55 CST
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u6253\u5370\u5B57\u7B26</li></ul><div class="language-console ext-console line-numbers-mode"><pre class="language-console"><code>missing:~$ echo hello
hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6253\u5370\u5B57\u7B26\u652F\u6301\u5355\u5F15\u53F7<code>&#39;</code>\u548C\u53CC\u5F15\u53F7<code>&quot;</code>,\u4E5F\u652F\u6301\u8F6C\u79FB\u5B57\u7B26<code>\\</code></p><div class="language-console ext-console line-numbers-mode"><pre class="language-console"><code>missing:~$ echo hello\\ world
missing:~$ echo &#39;hello world&#39;
missing:~$ echo &quot;hello world&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u73AF\u5883\u53D8\u91CF</li></ul><div class="language-console ext-console line-numbers-mode"><pre class="language-console"><code>missing:~$ echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u628A\u4E0A\u9762\u77E5\u8BC6\u4E32\u8054\u8D77\u6765\uFF0C\u7406\u89E3shell \u662F\u5982\u4F55\u77E5\u9053\u53BB\u54EA\u91CC\u627E <code>date</code> \u548C <code>echo</code>\u7684\u3002</p><p>shell \u662F\u4E00\u4E2A\u7F16\u7A0B\u73AF\u5883\uFF0C\u6240\u4EE5\u5B83\u5177\u5907\u53D8\u91CF\u3001\u6761\u4EF6\u3001\u5FAA\u73AF\u548C\u51FD\u6570\u3002\u5F53\u6211\u4EEC\u5728 shell \u4E2D\u6267\u884C\u547D\u4EE4\u65F6\uFF0C\u5B9E\u9645\u662F\u5728\u6267\u884C\u4E00\u6BB5shell\u53EF\u4EE5\u89E3\u91CA\u6267\u884C\u7684\u7B80\u77ED\u4EE3\u7801\u3002</p><p>\u5982\u679C\u6267\u884C\u7684\u6307\u4EE4\u4E0D\u662Fshell\u5B9A\u4E49\u7684\u7F16\u7A0B\u5173\u952E\u5B57\uFF0C\u90A3\u4E48\u5C31\u4F1A\u53BB\u54A8\u8BE2 <mark>\u73AF\u5883\u53D8\u91CF<code>$PATH</code></mark></p><ul><li>\u786E\u5B9A\u67D0\u4E2A\u7A0B\u5E8F\u540D\u4EE3\u8868\u7684\u662F\u54EA\u4E2A\u5177\u4F53\u7684\u7A0B\u5E8F</li></ul><div class="language-console ext-console line-numbers-mode"><pre class="language-console"><code>missing:~$ which echo
/bin/echo

missing:~$ which date
/bin/date
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u7ED5\u8FC7 $PATH</li></ul><div class="language-console ext-console line-numbers-mode"><pre class="language-console"><code>missing:~$ /bin/echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u5728shell\u4E2D\u5BFC\u822A" tabindex="-1"><a class="header-anchor" href="#\u5728shell\u4E2D\u5BFC\u822A" aria-hidden="true">#</a> \u5728shell\u4E2D\u5BFC\u822A</h2><p>\u5728 Linux \u6587\u4EF6\u7CFB\u7EDF\uFF0C\u5982\u679C\u67D0\u4E2A\u8DEF\u5F84\u4EE5 / \u5F00\u5934\uFF0C\u90A3\u4E48\u5B83\u662F\u4E00\u4E2A <em>\u7EDD\u5BF9\u8DEF\u5F84</em>\uFF0C\u5176\u4ED6\u7684\u90FD\u662F <em>\u76F8\u5BF9\u8DEF\u5F84</em> \u3002</p><ul><li>\u5F53\u524D\u5DE5\u4F5C\u76EE\u5F55</li></ul><div class="language-console ext-console line-numbers-mode"><pre class="language-console"><code>missing:~$ pwd
/home/missing
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u5207\u6362\u76EE\u5F55</li></ul><p>\u5728\u8DEF\u5F84\u4E2D\uFF0C. \u8868\u793A\u7684\u662F\u5F53\u524D\u76EE\u5F55\uFF0C\u800C .. \u8868\u793A\u4E0A\u7EA7\u76EE\u5F55</p><div class="language-console ext-console line-numbers-mode"><pre class="language-console"><code>missing:~$ pwd
/home/missing

// \u8DF3\u8F6C\u5230\u6307\u5B9A\u7684\u7EDD\u5BF9\u8DEF\u5F84
missing:~$ cd /home
missing:/home$ pwd
/home

// \u8FD4\u56DE\u4E0A\u4E00\u7EA7
missing:/home$ cd ..
missing:/$ pwd
/

// \u8DF3\u8F6C\u5230\u6307\u5B9A\u7684\u76F8\u5BF9\u8DEF\u5F84
missing:/$ cd ./home
missing:/home$ pwd
/home

// \u8FDB\u5165\u5230\u8DEF\u5F84\u4E0B\u7684\u67D0\u4E2A\u5B57\u8DEF\u5F84
missing:/home$ cd missing
missing:~$ pwd
/home/missing

// \u76F8\u5BF9\u8DEF\u5F84
missing:~$ ../../bin/echo hello
hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u4E00\u822C\u6765\u8BF4\uFF0C\u5F53\u6211\u4EEC\u8FD0\u884C\u4E00\u4E2A\u7A0B\u5E8F\u65F6\uFF0C\u5982\u679C\u6211\u4EEC\u6CA1\u6709\u6307\u5B9A\u8DEF\u5F84\uFF0C\u5219\u8BE5\u7A0B\u5E8F\u4F1A\u5728\u5F53\u524D\u76EE\u5F55\u4E0B\u6267\u884C</strong></p><ul><li>\u67E5\u770B\u5F53\u524D\u8DEF\u5F84\u4E0B\u7684\u6587\u4EF6</li></ul><div class="language-console ext-console line-numbers-mode"><pre class="language-console"><code>missing:~$ ls
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>\u67E5\u770B\u6307\u5B9A\u8DEF\u5F84\u4E0B\u7684\u6587\u4EF6</li></ul><div class="language-console ext-console line-numbers-mode"><pre class="language-console"><code>missing:~$ ls -l /home
\u603B\u7528\u91CF 4
drwxr-x--- 5 buzhi buzhi 4096  7\u6708 18 16:08 buzhi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u67E5\u770B\u7A0B\u5E8F\u53C2\u6570\u3001\u8F93\u5165\u8F93\u51FA\u7684\u4FE1\u606F</li></ul><div class="language-console ext-console line-numbers-mode"><pre class="language-console"><code>missing:~$ man ls
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,34);function g(t,p){const n=o("ExternalLinkIcon");return l(),d("div",null,[i("p",null,[u,i("a",v,[m,a(n)]),b]),h])}var _=s(r,[["render",g],["__file","shell.html.vue"]]);export{_ as default};
