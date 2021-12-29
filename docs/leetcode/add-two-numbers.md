---
title: 两数相加
author: buzhifanji
tag: data-structure
sidebar: 'data-structure'
---

# 两数相加

给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。

请你将两个数相加，并以相同形式返回一个表示和的链表。

你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

来源：力扣（LeetCode）链接：https://leetcode-cn.com/problems/add-two-numbers

## 解题思路

- 不对齐补零
- 计算进位

## 代码实现

```js
/*
 * @lc app=leetcode.cn id=2 lang=javascript
 *
 * [2] 两数相加
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let curry = 0,
        result, preNode;
    while (l1 || l2 || curry) {
        const val1 = l1 ? l1.val : 0
        const val2 = l2 ? l2.val : 0
        // 计算 和
        let sum = val1 + val2 + curry
        // 计算 进位
        curry = Math.floor(sum / 10)
        sum = sum % 10

        const current = new ListNode(sum)
        if (preNode) {
            preNode.next = current
        } else {
            result = current
        }
        preNode = current

        l1 = l1 ? l1.next : l1
        l2 = l2 ? l2.next : l2
    }

    return result ? result : new ListNode(0)
};
// @lc code=end

```