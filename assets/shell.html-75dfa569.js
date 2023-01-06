import{_ as s,X as n,Y as d,Z as l,$ as e,a0 as a,a1 as c,F as o}from"./framework-2bee7a6e.js";const r={},u={href:"https://missing.csail.mit.edu/2020/",target:"_blank",rel:"noopener noreferrer"},v=c(`<h2 id="初始-shell" tabindex="-1"><a class="header-anchor" href="#初始-shell" aria-hidden="true">#</a> 初始 shell</h2><p>当我们打开终端的时候，会看到如下模样的终端提示符</p><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code>missing:~$ 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>而我自己学习用的 linux 系统下打开的终端显示如下</p><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code>buzhi@DESKTOP-I6CEGBD:~$ 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>查看日期</li></ul><p>在终端输入 <code>date</code> 就能查看日期</p><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code>missing:~$ date
2022年 08月 07日 星期日 11:22:55 CST
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>打印字符</li></ul><p>打印字符使用 <code>echo</code>命令</p><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code>missing:~$ echo hello
hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果打印字符很长的时候，可以用单引号<code>&#39;</code>和双引号<code>&quot;</code>包裹起来。</p><p>如果有打印特殊字符的需求，可以使用转移字符<code>\\</code></p><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code>missing:~$ echo hello\\ world
missing:~$ echo &#39;hello world&#39;
missing:~$ echo &quot;hello world&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>环境变量</li></ul><p>环境变量这个名字很属性，因为多次在 window 系统中配置过环境变量。</p><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code>missing:~$ echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>把上面知识串联起来，理解 shell 是如何工作的，也就是说 shell 是怎么知道去哪里找 <code>date</code> 和 <code>echo</code>的。</p><p>首先shell 是一个编程环境，所以它具备变量、条件、循环和函数。当我们在 shell 中执行命令时，实际是在执行一段shell可以解释执行的简短代码。</p><p>其次当我们输入date的时候，shell会判断这个date是不是定义的编程关键字。如果是，就会解释这段代码，反之，那么就会去咨询 ==环境变量<code>$PATH</code>==，查询是否对于的编程环境，如果查询到就解释执行，反之抛出异常。</p><ul><li>确定某个程序名代表的是哪个具体的程序</li></ul><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code>missing:~$ which echo
/bin/echo

missing:~$ which date
/bin/date
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>绕过 $PATH</li></ul><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code>missing:~$ /bin/echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="在shell中导航" tabindex="-1"><a class="header-anchor" href="#在shell中导航" aria-hidden="true">#</a> 在shell中导航</h2><p>在 Linux 文件系统，如果某个路径以 / 开头，那么它是一个 <em>绝对路径</em>，其他的都是 <em>相对路径</em> 。</p><ul><li>当前工作目录</li></ul><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code>missing:~$ pwd
/home/missing
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>切换目录</li></ul><p>在路径中，. 表示的是当前目录，而 .. 表示上级目录</p><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code>missing:~$ pwd
/home/missing

// 跳转到指定的绝对路径
missing:~$ cd /home
missing:/home$ pwd
/home

// 返回上一级
missing:/home$ cd ..
missing:/$ pwd
/

// 跳转到指定的相对路径
missing:/$ cd ./home
missing:/home$ pwd
/home

// 进入到路径下的某个字路径
missing:/home$ cd missing
missing:~$ pwd
/home/missing

// 相对路径
missing:~$ ../../bin/echo hello
hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>一般来说，当我们运行一个程序时，如果我们没有指定路径，则该程序会在当前目录下执行</strong></p><ul><li>查看当前路径下的文件</li></ul><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code>missing:~$ ls
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>查看指定路径下的文件</li></ul><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code>missing:~$ ls -l /home
总用量 4
drwxr-x--- 5 buzhi buzhi 4096  7月 18 16:08 buzhi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>重命名或移动文件</li></ul><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code>missing:~$ mv hello.txt hi.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>拷贝文件</li></ul><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code>missing:~$ cp hello.txt hi1.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>删除文件</li></ul><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code>missing:~$ rm hi1.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>新建文件夹</li></ul><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code>missing:~$ mkdir test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>删除文件夹</li></ul><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code>missing:~$ rmdir test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>查看程序参数、输入输出的信息</li></ul><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code>missing:~$ man ls
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>清空shell</li></ul><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code>missing:~$ Ctrl + L
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="创建程序链接" tabindex="-1"><a class="header-anchor" href="#创建程序链接" aria-hidden="true">#</a> 创建程序链接</h2><p>通过 <code>&lt; file</code> 和 <code>&gt; file</code>将程序的输入和输出流重定向到文件</p><p>新建一个hello.txt,这个文件的内容是hello</p><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code>echo hello &gt; hello.txt
missing:~$ cat hello.txt
hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>把hello.txt文件的内容全部复制到hello2.txt上(与 cp 命令一样)</p><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code>missing:~$ cat &lt; hello.txt &gt; hello2.txt
missing:~$ cat hello2.txt
hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>向 hello2.txt 添加内容</p><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code>missing:~$ cat &lt; hello.txt &gt;&gt; hello2.txt
missing:~$ cat hello2.txt
hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,58);function m(t,g){const i=o("ExternalLinkIcon");return n(),d("div",null,[l("p",null,[e("本文是 "),l("a",u,[e("The Missing Semester of Your CS Education"),a(i)]),e("的学习笔记。shell是个工具，想要熟练掌握工具的使用，就应该重复练习，而对于初学者的话，应该掌握shell的基本使用，在理解基本使用基础上，尽可能的使用shell。")]),v])}const h=s(r,[["render",m],["__file","shell.html.vue"]]);export{h as default};
