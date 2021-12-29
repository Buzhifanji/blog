---
title: 序言
author: buzhifanji
tag: data-structure
---

# 序言

## 介绍
这一系列主要记录自己用JavaScript实现数据结构的笔记。

数据结构和算法光看是学不会的，需要自己手动去实现一遍，理解每一行的代码的意思，重写一变测试用例。

个人仓单代码地址[javascript-algorithms](https://github.com/Buzhifanji/CS-Notes/tree/main/code/javascript-algorithms)

**声明**：这一系列并不是原创，主要参考来源[JavaScript 算法与数据结构](https://github.com/trekhleb/javascript-algorithms/blob/master/README.zh-CN.md)

## 对比方法的复用：Comparator

### 方法介绍

介绍一下实现对比的类，我们在实现数据结构的时候，都会实例化这个类。

- static defaultCompareFunction 默认比对方法。0 相等；-1 小于；1 大于
- equal 是否相等
- lessThan 小于
- greaterThan 大于
- lessThanOrEqual 小于等于
- greaterThanOrEqual 大于等于
- reverse 翻转比对函数

### 代码实现

```js
export default class Comparator {
    /**
     * Constructor
     * @param {*} {function(a: *, b: *)} [compareFunction]
     * 默认是 数字/字符串 对比函数，另外支持自定义对比函数
     *
     */
    constructor(compareFunction) {
        this.compare = compareFunction || Comparator.defaultCompareFunction
    }

    /**
     * 默认
     * @param {(string|number)} a
     * @param {(string|number)} b
     * @returns
     */
    static defaultCompareFunction(a, b) {
        if (a === b) {
            return 0
        }

        return a < b ? -1 : 1
    }

    /**
     * 相等
     * @param {*} a
     * @param {*} b
     * @returns {boolean}
     */
    equal(a, b) {
        return this.compare(a, b) === 0
    }

    /**
     * 小于
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
    lessThan(a, b) {
        return this.compare(a, b) < 0
    }

    /**
     * 大于
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
    greaterThan(a, b) {
        return this.compare(a, b) > 0
    }

    /**
     * 小于等于
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
    lessThanOrEqual(a, b) {
        return this.lessThan(a, b) || this.equal(a, b)
    }

    /**
     * 大于等于
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
    greaterThanOrEqual(a, b) {
        return this.greaterThan(a, b) || this.equal(a, b)
    }

    /**
     * 翻转对比函数
     */
    reverse() {
        const compareOriginal = this.compare
        this.compare = (a, b) => compareOriginal(b, a)
    }
}
```

### 测试用例
代码地址：[Comparator.test.js](https://github.com/Buzhifanji/CS-Notes/blob/main/code/javascript-algorithms/src/utils/comparator/test/Comparator.test.js)