---
title: 两数之和
author: buzhifanji
tag: data-structure
sidebar: 'data-structure'
---

# 两数之和

给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案

来源：力扣（LeetCode）链接：https://leetcode-cn.com/problems/two-sum

## 题解

- 解题思路：

    1. x + num = target

        暴力解法：双重循环，用枚举去查找
    2. x = target - num

        空间换时间：算出差，然后查找符号差的值

- 边界：

    1. 数组长度小于2
    2. 出现重复的元素,例如：nums = [3, 3]

### 空间换时间

```js
/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // 处理异常
    let result = []
    if (nums.length < 2) {
        return result
    }
    // 转换成 hash
    const map = new Map()
    nums.forEach((el, index) => {
        map.set(el, index)
    })
    for (let i = 0; i < nums.length; i++) {
        const diffValue = target - nums[i]
        if (map.has(diffValue)) {
            let j = map.get(diffValue)
            // 处理 重复元素
            if (i !== j) {
                result = j > i ? [i, j] : [j, i]
                break
            }
        }
    }
    return result
};
// @lc code=end
```