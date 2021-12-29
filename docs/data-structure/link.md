---
title: 链表
author: buzhifanji
tag: data-structure
---

# 数据结构-链表数据结构

关于如何正确学习链表：用链表的目的是什么？省空间还是省时间？ - invalid s的回答 - 知乎
https://www.zhihu.com/question/31082722/answer/1928249851

# typescript实现链表
```ts
// 节点类型
export interface LinkNode<T> {
    value: T,
    next: LinkNode<T> | null
}

class Node<T> implements LinkNode<T> {
    value: T;
    next: null | Node<T>
    constructor(value: T) {
        this.value = value;
    }
}

class Link<T> {
    add(value: T) { // 向链表尾部添加一个新元素
        const node = new Node<T>(value)
        if (this.head === null) {
            // 头部没有，表示第一次插入
            this.head = node
            this.foot = node
            this.count = 1
        } else {
            this.foot.next = node
            this.foot = node
            this.count++
        }
    },
    delete() {

    }
}

```