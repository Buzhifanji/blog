---
title: 链表
author: buzhifanji
tag: data-structure
sidebar: 'data-structure'
---

# 数据结构-链表

## 链表的意义

我们学数据结构应该从实际问题出发，在学习链表的时候，应该思考**链表是为了解决什么问题而发明的**。在回答这个问题之前，我们先来思考一下数组的优缺点。

数组中的数据是存储在一块连续的内存空间里，通过数组变量和索引就很快可以计算出数组中每个元素的地址，数组的优点就是读取的时候特别快，时间复杂度为O(1)。因为数组是需要一块连续的内存空间，所以数组在创建的时候就需要把这块连续的空间申请下来，这就相当于把位置占了，我们后面才能在位置里放数据。

如果我们一开始申请的内存空间不够了，我们需要重新申请新的一块更大的空间，然后把之前的数据挪到新申请的空间里去。这个时候，如果存储的数据特别大，比如5百万张数据，内存不够的时候，需要把这5百万的数据移动到新内存里，这就造成了新增的效率低下，最坏的时间复杂度为O(n)，同理删除也存在一样的问题。

另外，处理海量数据的时候数组一开始申请内存空间也是一个难题，比如我们管理一堆票据，可能有一张，也可能有1百万张。内存空间应该申请多少？申请50个G？用户可能只有10张票据，这不就是内存严重浪费了么！申请5个G，数据多的时候，明显不够用了。。。。


所以数组不适合处理动态数量的数据存储，那么有没有处理这种别的数据结构可以有效管理这个不定量的数据呢？有，那么就是链表

在计算机科学中, 一个 **链表 **是数据元素的线性集合, **元素的线性顺序不是由它们在内存中的物理位置给出的**。 相反, **每个元素指向下一个元素。它是由一组节点组成的数据结构,这些节点一起,表示序列**。

关于如何正确学习链表，建议你阅读一下这篇文章：[用链表的目的是什么？省空间还是省时间？ - invalid s的回答 - 知乎](https://www.zhihu.com/question/31082722/answer/1928249851)

## JavaScript版实现

### LinkedListNode

链表节点的类，每个节点都有一个toString方法，支持自定义。

```js
export default class LinkedListNode {
    constructor(value, next = null) {
        this.value = value
        this.next = next
    }
    toString(callback) {
        return callback ? callback(this.value) : `${this.value}`
    }
}
```
### LinkedList

#### constructor
constructor 构造器定义了LinkedList有三个属性：
- head：头部节点指针
- tail：尾部节点指针
- compare：对比函数

```js
class LinkedList {
    /**
     * @param {Function} [comparatorFunction] 可传入自定义对比函数
     */
    constructor(comparatorFunction) {
        this.head = null // 头部节点
        this.tail = null // 尾部节点
        this.compare = new Comparator(comparatorFunction) // 对比函数
    }
}
```

#### 头部插入节点

```js
/**
 * 头部插入节点
 * @param {*} value
 * @returns {LinkedList}
 */
prepend(value) {
    // 创建一个新的节点
    const newNode = new LinkedListNode(value, this.head)
    this.head = newNode

    // 当没有尾部节点的时候，也就是此时是个空链表，需要设置尾节点
    if (!this.tail) {
        this.tail = newNode
    }

    return this
}
```

#### 尾部插入节点

尾部插入节点需要注意情况：往空链表里插入节点。此时头尾节点都是空的，需要同时设置头尾节点

```js
/**
 * 尾部插入节点
 * @param {*} value
 * @returns {LinkedList}
 */
append(value) {
    const newNode = new LinkedListNode(value)

    // 当没有头部节点的时候，也就是此时是个空链表，需要设置头尾节点
    if (!this.head) {
        this.head = newNode
        this.tail = newNode

        return this
    }

    // 把新节点链接到链表上
    this.tail.next = newNode
    this.tail = newNode

    return this
}
```
#### 删除指定值

删除指定值得需要理解两个点：

1. 从开始，连续好几个值是相同的情况
2. 删除的值正好是尾部节点，需要处理尾部节点指针tail的指向

```js
/**
 * 删除指定值
 * @param {*} value
 * @returns
 */
delete(value) {
    if (!this.head) {
        return null
    }

    let deletedNode = null
    // 处理从头部节点开始有几个连续一样的值得情况
    // 删除 1
    // 1 -> 1 -> 2 -> 4 -> 5  ===>  2 -> 4 -> 5
    while (this.head && this.compare.equal(this.head.value, value)) {
        deletedNode = this.head
        this.head = this.head.next
    }

    let currentNode = this.head

    if (currentNode !== null) {
        while (currentNode.next) {
            if (this.compare.equal(currentNode.next.value, value)) {
                deletedNode = currentNode.next
                // 删除 节点
                currentNode.next = currentNode.next.next
            } else {
                // 继续 查询下一个节点
                currentNode = currentNode.next
            }
        }
    }

    // 处理尾节点 被删除的时候 尾部指针
    if (this.compare.equal(this.tail.value), value) {
        this.tail = currentNode
    }

    return deletedNode
}
```
#### 查找指定值

节点的值得类型有可能是复杂的，例如是个对象，此时查找的时候需要参入自定义条件的callback函数

```js
/**
 * 查找
 * @param {Object} findParams
 * @param {*} findParams.value
 * @param {function} [findParams.callback]
 * @return {LinkedListNode}
 */
find({ value = undefined, callback = undefined }) {
    if (!this.head) {
        return null
    }

    let currentNode = this.head

    while (currentNode) {
        // 通过 回调函数 查找value
        if (callback && callback(currentNode.value)) {
            return currentNode
        }

        if (value !== undefined && this.compare.equal(currentNode.value, value)) {
            return currentNode
        }

        currentNode = currentNode.next
    }

    return null
}
```

#### 删除尾部节点

删除节点需要注意只有一个节点的情况，此时头尾节点指向都是同一个。

```js
/**
 * 删除尾部节点
 * @return {LinkedListNode}
 */
deleteTail() {
    if (!this.tail) {
        return null
    }

    const deleteTail = this.tail

    // 链表只有一个节点的特殊情况
    if (this.head === this.tail) {
        this.head = null
        this.tail = null

        return deleteTail
    }

    let currentNode = this.head
    // 遍历节点，直到找到尾部节点
    while (currentNode.next) {
        if (!currentNode.next.next) {
            currentNode.next = null
        } else {
            currentNode = currentNode.next
        }
    }

    this.tail = currentNode

    return deleteTail
}
```

#### 删除头部节点

删除头部节点需要注意只有一个节点的情况，此时head.next为null

```js
/**
 * 删除头部节点
 * @return {LinkedListNode}
 */
deleteHead() {
    if (!this.head) {
        return null
    }

    const deleteHead = this.head

    if (this.head.next) {
        this.head = this.head.next
    } else {
        // 链表只有一个节点的情况
        this.head = null
        this.tail = null
    }

    return deleteHead
}
```

#### 数组转链表

```js
/**
 * 数组转链表
 * @param {*[]} values
 * @returns {LinkedList}
 */
fromArray(values) {
    values.forEach(value => this.append(value))

    return this
}
```

#### 链表转数组
```js
/**
 * 链表转数组
 * @return {LinkedListNode[]}
 */
toArray() {
    const nodes = []

    let currentNode = this.head
    while (currentNode) {
        nodes.push(currentNode)
        currentNode = currentNode.next
    }

    return nodes
}
```

#### 打印节点
把每个节点的内容已逗号隔开，拼接成字符串
```js
toString(callback) {
    return this.toArray().reduce((accur, node) => {
        // 第一个 是空字符串，不需要添加逗号
        const isComman = accur ? ',' : ''
        return accur + isComman + node.toString(callback).toString()
    }, '')
}
```
#### 翻转链表

翻转链表是是最难理解的地方。

建议阅读这篇文章：[图解单链表反转](https://zhuanlan.zhihu.com/p/106050123)
```js
reverse() {
    let currentNode = this.head
    let prevNode = null
    let nextNode = null
    while (currentNode) {
        // 获取当前节点的下一个节点
        nextNode = currentNode.next
        // 当前节点的前一个节点指向上一个节点
        currentNode.next = prevNode
        // 上一个节点赋值给当前节点
        prevNode = currentNode
        // 当前节点赋值给下一个节点
        currentNode = nextNode
    }

    this.tail = this.head
    this.head = prevNode

    return this
}
```
## 代码地址

完整实现代码地址：[linked-list](https://github.com/Buzhifanji/CS-Notes/tree/main/code/javascript-algorithms/src/data-structures/linked-list)