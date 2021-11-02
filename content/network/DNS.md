---
title: DNS
author: buzhifanji
tag: network
sidebar: 'network'
---

#  DNS 域名解析系统

## DNS 是什么

DNS全称：Domain Name System，域名系统，是一个将域名和 IP 地址相互映射的分布式服务。

简单来讲，DNS相当于一个翻译官，负责将域名翻译成ip地址。

IP 地址是一长串能够唯一地标记网络上的计算机的数字，不方便记忆，所以为了让人们记住的域名，才会引入 DNS 服务，这样用户就可以直接通过域名方法 IP 地址。

## 域名系统

域名是一个具有层次的结构，从上到下一次为根域名、顶级域名、二级域名、三级域名..

![Alternative text](../../src/assets/imgs/domain.png)

以 www.example.com 为例，com 是顶级域名, example 是二级域名, www 是三级域名。

从上图中可以看到，DNS 的存储设计是一个树状结构。

为什么要这样设计？

> 根域名服务器存储的不是域名和 IP 的映射关系，而是一个目录
>
> 防止单点故障：如果将所有的域名记录都存放到根域名服务器，从存储量上来说，不会非常巨大。要知道一个域名记录——域名、IP 地址和额外少量信息，并不需要大量存储空间。但是如果全世界所有的 DNS 请求都集中在少量的根服务器上，这个访问流量就会过于巨大。而且一旦发生故障，很容易导致大面积瘫痪
>
> 平衡地理分布:：因为根服务器较少，所以如果全部都走根服务器，不同客户端距离根服务器距离不同，感受到的延迟也不一样，这样对用户来说不太友好。

## DNS 查询过程

以用户在浏览器中输入 www.lagou.com 为例：

1. 用户输入网址，查询本地 DNS。

2. 请求根 DNS 服务器：如果本地 DNS 缓存中找到了对应的 DNS 条目，那么查询就结束了。
    如果没有，那么继续往下走
3. 根 DNS 服务器返回二级 DNS 服务器的 IP
4. 请求二级 DNS 服务器， 二级DNS 服务器中是具体域名的目录。（查询 com）
5. 二级 DNS 服务器返回三级 DNS 服务器的 IP。 （查询 lagou）
6. 三级 DNS 服务器返回 DNS 记录到本地 DNS 服务器。

查询流程图如下：

![Alternative text](../../src/assets/imgs/search-domain.png)

## 域名缓存

在域名服务器解析的时候，使用缓存保存域名和IP地址的映射。

DNS 缓存通常有两种方式:

- 浏览器缓存：浏览器在获取网站域名的实际 IP 地址后会对其进行缓存，减少网络请求的损耗

- 操作系统缓存：操作系统的缓存其实是用户自己配置的 hosts 文件

### 浏览器缓存: DNS记录

DNS记录具体例子：

```liunx
; 定义www.example.com的ip地址
www.example.com.     IN     A     139.18.28.5;
```

其中，;是语句块的结尾，也是注释。IN 代表记录用于互联网，是 Intenet 的缩写。A 是记录的类型，A 记录代表着这是一条用于解析 IPv4 地址的记录。

从这条记录可知，www.example.com的 IP 地址是 139.18.28.5

DNS 记录的类型非常多，有 30 多种。其中比较常见的有 A、AAAA、CNAME、MX，以及 NS 等

#### A 记录

A 记录是域名和 IPv4 地址的映射关系

#### AAAA 记录

AAAA 记录则是域名和 IPv6 地址的映射关系。

#### NS 记录

NS（Name Server）记录是描述 DNS 服务器网址。

**通常 NS 不会只有一个，这是为了保证高可用，一个挂了另一个还能继续服务**

**通常数字小的 NS 记录优先级更高，也就是 ns1 会优先于 ns2 响应**

例子：

```liunx
a.com.     IN      NS      ns1.a.com.

a.com.     IN      NS      ns2.a.com.

```
当解析 a.com 地址时，我们看到 a.com 有两个 NS 记录，所以确定最终 a.com 的记录在 ns1.a.com 和 ns2.a.com 上。从设计上看，ns1 和 ns2 是网站 a.com 提供的智能 DNS 服务器，可以提供负载均衡、分布式 Sharding 等服务。比如当一个北京的用户想要访问 a.com 的时候，ns1 看到这是一个北京的 IP 就返回一个离北京最近的机房 IP

#### CNAME 记录

CNAME（Canonical Name Record）用于定义域名的**别名**

```liunx
; 定义www.example.com的别名

a.example.com.          IN     CNAME   b.example.com.
```
这条 DNS 记录定义了 a.example.com 是 b.example.com 的别名。用户在浏览器中输入 a.example.com 时候，通过 DNS 查询会知道 a.example.com 是 b.example.com 的别名，因此需要实际 IP 的时候，会去拿 b.example.com 的 A 记录。

这样用户如果在浏览器中输入 a.example.com 实际打开的就是 b.example.com。因为走的是 DNS 查询的路径，速度很快（因为有缓存），不需要 HTTP 重定向等操作。

当你想把一个网站迁移到新域名，旧域名仍然保留的时候；还有当你想将自己的静态资源放到 CDN 上的时候，CNAME 就非常有用。