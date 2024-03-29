---
title: 前端体系知识
date: 2023-02-15 13:57:26
category:
  - fontend
tag:
  - JS
---

整理前端体系知识，一方面可以体系化自己的知识，另一方面做好时刻面试的准备。

## 基础知识

### 原型与继承

JS规范里描述了所有对象，都有一个隐式引用，它就会称为这个对象的**原型**。**原型**就是给其它对象提供共享属性的对象。

原型对象也有自己的隐式引用，有自己的原型对象，如此就会构成对象的原型的原型的原型的链条，直到某个对象的隐式引用为 null，整个链条终止。这个链条就是**原型链**

从数据结构来理解原型链，JS 原型其实是一个隐式的**单向链表**。

- *谈谈你对 JS 原型和原型链的理解？*

**JS 原型**是指为其它对象提供**共享属性**访问的对象。在创建对象时，每个对象都包含一个隐式引用指向它的原型对象或者 null。
原型也是对象，因此它也有自己的原型。这样构成一个**原型链**。

- *原型链有什么作用？*

在访问一个对象的属性时，实际上是在查询原型链。这个对象是原型链的第一个元素，先检查它是否包含属性名，如果包含则返回属性值，否则检查原型链上的第二个元素，以此类推。

- *如何实现原型继承呢*

有两种方式：

一种是通过 Object.create 或者 Object.setPrototypeOf 显式继承另一个对象，将它设置为原型。

另一种是通过 constructor 构造函数，使用 new 关键字实例化时，会自动继承 constructor 的 prototype 对象，作为实例的原型。

那么 constructorA 如何继承 constructorB呢？

在js里的继承，是对象跟对象之间的继承。constructor 的主要用途是初始化对象的属性。

所以两个对象之间的继承，需要分开两个步骤

第一步：编写一个新的 constructor,将两个 constructor 通过 call/apply 的方式合并它们的初始化。合并是按照超类优先的顺序进行。（这里需要注意一点，es6 class 的继承，继承的是方式，而属性会挂载到原型对象上）
第二步：取出超类和子类的原型对象，通过 Object.create/Object.setPrototypeOf 显示原型继承的方式，设置子类的原型为超类原型。

这中风格与 ES6 的class风格的背后 constructor 工作方式是一样的，上述实现起来比较繁琐，因此建议 ES6 提供的 class 和 extends 关键字去实现继承。


#### 原型深度好文

- [进阶必读：深入理解 JavaScript 原型 ](https://juejin.cn/post/6901494216074100750)

### 闭包

#### 是什么

一个函数和对其周围状态（lexical environment，词法环境）的引用捆绑在一起（或者说函数被引用包围），这样的组合就是闭包（closure）

从代码层面上来说，当一个函数内部返回另外一个函数的时候，就会创建闭包。

#### 有什么用

闭包主要有两个作用：

一个是保护，比如创私有变量，定义只要函数内部才能访问的变量；

另一个是保存，正常来说，当一个函数执行完毕后，函数的词法环境会被销毁，也就是说变量会被清楚掉，但闭包，会保存对创建所在的词法环境，这个时候执行的上下文就不好被销毁。变量的生命周期得以延长。

### 异步
#### 回调函数
#### promsie
#### generate
#### async await
### 函数

### 事件循环机制

#### 原型深度好文

js是一门单线程语言，所以同一个时间只能执行一个任务。如果某个任务执行时间太久，就会阻塞后面的任务。为了解决这种任务阻塞问题，js引入了**事件循环机制**。

js脚步执行的时候，遇到同步代码，会将这些同步代码按照执行顺序加入到执行栈中，遇到异步代码，并不是等待执行结果，而是加入任务队列里。

当执行中的同步都执行完毕后，这个时候主线程是空闲状态，主线程会去任务队列里查看是否有任务，如果有，那么主线程会从中取出排在第一位的任务，并将这个任务的对应的回调放入执行中，然后执行其中的同步代码，如何反复，这样就形成了一个无限的循环。上述这个过程就是“js事件循环”


需要注意的是，异步任务是有分类，不同的任务对应着不同的队列:

- 微队列，优先级最高，比如：Promise、MutaionObserver
- 事件队列，优先级其次，js的事件交互
- 延时队列，优先级最低，比如定时器，延时器

这些队列的执行顺序：主线程会查看微队列是有任务，如果没有，则继续查看事件队列，如果也没有，就查看延时队列。

- [详解JavaScript中的Event Loop（事件循环）机制](https://zhuanlan.zhihu.com/p/33058983)

### DOM 事件

- **事件流(三个阶段)**
  - 捕获阶段 目标阶段 冒泡阶段
  
- **Dom事件的捕获过程和冒泡过程**
  - 捕获过程 : window->document->html->body->…->目标元素
  - 冒泡过程 : window<-document<-html<-body<-…<-目标元素(事件代理)


- **Event对象的常见应用**
  - 阻止默认事件 : event.preventDefault()
  - 阻止冒泡时间 : event.stopPropagation()
  - 指定绑定事件 : event.currentTarget()
  - 获取目标 : event.target 
  
### 前端安全
### JS垃圾回收

## vue
### 响应式原理
### 虚拟DOM
### 声明周期

## 浏览器
### 事件循环

### 渲染原理

## 网络

## 其他

### vite 原理
### pnpm
### 微前端
### V8工作流程
### 性能优化

## 说一下前端从请求到响应都经历了什么?