---
title: Shell 工具与脚本
date: 2022-08-07 11:31:50
category:
  - 工具
tag:
  - shell
---

本文是 [The Missing Semester of Your CS Education](https://missing.csail.mit.edu/2020/)的学习笔记。shell是个工具，想要熟练掌握工具的使用，就应该重复练习，而对于初学者的话，应该掌握shell的基本使用，在理解基本使用基础上，尽可能的使用shell。

## 初始 shell

当我们打开终端的时候，会看到如下模样的终端提示符

```console
missing:~$ 
```
而我自己学习用的 linux 系统下打开的终端显示如下

```console
buzhi@DESKTOP-I6CEGBD:~$ 
```

- 查看日期
  
在终端输入 `date` 就能查看日期
```console
missing:~$ date
2022年 08月 07日 星期日 11:22:55 CST
```

- 打印字符
  
打印字符使用 `echo`命令
```console
missing:~$ echo hello
hello
``` 
如果打印字符很长的时候，可以用单引号`'`和双引号`"`包裹起来。

如果有打印特殊字符的需求，可以使用转移字符`\`

```console
missing:~$ echo hello\ world
missing:~$ echo 'hello world'
missing:~$ echo "hello world"
``` 

- 环境变量

环境变量这个名字很属性，因为多次在 window 系统中配置过环境变量。
```console
missing:~$ echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
``` 
把上面知识串联起来，理解 shell 是如何工作的，也就是说 shell 是怎么知道去哪里找 `date` 和 `echo`的。

首先shell 是一个编程环境，所以它具备变量、条件、循环和函数。当我们在 shell 中执行命令时，实际是在执行一段shell可以解释执行的简短代码。

其次当我们输入date的时候，shell会判断这个date是不是定义的编程关键字。如果是，就会解释这段代码，反之，那么就会去咨询 ==环境变量`$PATH`==，查询是否对于的编程环境，如果查询到就解释执行，反之抛出异常。

- 确定某个程序名代表的是哪个具体的程序
```console
missing:~$ which echo
/bin/echo

missing:~$ which date
/bin/date
```

- 绕过 $PATH
```console
missing:~$ /bin/echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
```

## 在shell中导航

在 Linux 文件系统，如果某个路径以 / 开头，那么它是一个 *绝对路径*，其他的都是 *相对路径* 。

- 当前工作目录
```console
missing:~$ pwd
/home/missing
``` 
- 切换目录

在路径中，. 表示的是当前目录，而 .. 表示上级目录

```console
missing:~$ pwd
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
``` 

**一般来说，当我们运行一个程序时，如果我们没有指定路径，则该程序会在当前目录下执行**

- 查看当前路径下的文件
```console
missing:~$ ls
``` 

- 查看指定路径下的文件
```console
missing:~$ ls -l /home
总用量 4
drwxr-x--- 5 buzhi buzhi 4096  7月 18 16:08 buzhi
``` 

- 重命名或移动文件
```console
missing:~$ mv hello.txt hi.txt
``` 
- 拷贝文件
```console
missing:~$ cp hello.txt hi1.txt
``` 

- 删除文件
```console
missing:~$ rm hi1.txt
``` 

- 新建文件夹
```console
missing:~$ mkdir test
``` 

- 删除文件夹
```console
missing:~$ rmdir test
``` 

- 查看程序参数、输入输出的信息
```console
missing:~$ man ls
```

- 清空shell
```console
missing:~$ Ctrl + L
```

## 创建程序链接

通过 `< file` 和 `> file`将程序的输入和输出流重定向到文件


新建一个hello.txt,这个文件的内容是hello
```console
echo hello > hello.txt
missing:~$ cat hello.txt
hello
``` 

把hello.txt文件的内容全部复制到hello2.txt上(与 cp 命令一样)
```console
missing:~$ cat < hello.txt > hello2.txt
missing:~$ cat hello2.txt
hello
``` 
向 hello2.txt 添加内容
```console
missing:~$ cat < hello.txt >> hello2.txt
missing:~$ cat hello2.txt
hello
``` 
