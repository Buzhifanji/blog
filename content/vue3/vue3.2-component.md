---
title: vue3.2组件使用实例
author: buzhifanji
sidebar: 'vue3'
tag: vue3
---

# vue3.2组件使用实例

最近笔者在研究vue3，vue3.2相比vue3.0提供了一个特别方便的语法糖

```js
<script setup></script>
```
一个新的语法糖就会一定的学习成本。

vue3.0的组件使用实例：

```js
import Example from './example.vue;

export default defineComponent({
    components: { Example }
})

```
可以看出vue3.0的时候，vue会定义好模板，我们往里面添加数据即可。

也许，你会有这样的疑问，我就引入组件，然后就可以使用组件，这样能实现么？

vue3.2提供的语法糖就实现了这个功能。我接下来看看，vue3.2的三种组件的具体使用例子。

## 普通组件

**示例：**

```vue
<template>
    <!-- 使用组件 -->
    <Example />
</template>
<script setup>
// 引入组件
import Example from './example.vue;
</script>
```
以前需要引入、填入模板位置、使用，现在省略了填入模板位置，两步即可实现了。

## 动态组件

**示例：**

```vue
<template>
    <!-- 使用组件 -->
    <component :is="DynamicComponent"></component>
</template>
<script setup>
// 引入动态组件
import DynamicComponent from './dynamicComponent.vue;

</script>
```
同样只需要引入就可以使用

## 异步组件

vue3.2并没有提供异步组件的使用例子。以下示例是笔者自身摸索出来的，如有问题，欢迎指正。

**示例1：**

```vue
<template>
    <!-- 使用组件 -->
    <component :is="AsyncComponent"></component>
</template>
<script setup>
import { defineAsyncComponent } from 'vue';
// 定义异步组件
const AsyncComponent: defineAsyncComponent(() => import('./asyncComponent.vue'))

</script>
```
上述只满足了一个异步组件，但是我有多个异步组件的情况，该如何处理？

**示例2：**

```vue
<template>
    <button @click="btnClick">click</button>
    <!-- 使用组件 -->
    <component v-if="currentTabComponent" :is="currentTabComponent"></component>
</template>
<script setup>
import { defineAsyncComponent, shallowRef } from 'vue';
// 定义异步组件
const components = {
    AsyncComponent: defineAsyncComponent(() => import('./asyncComponent.vue'))
}
const currentTabComponent = shallowRef('')

// 切换异常组件
function btnClick() {
    // 异步组件，用对象嵌套，就可以用 字符 去匹配异步组件了。
    currentTabComponent.value = currentTabComponent.value ? '' : components['AsyncComponent']
}
</script>
```
注意：

- 加上 v-if="currentTabComponent" 是为了处理异常 [Vue warn]: Invalid vnode type when creating vnode: . ，因为我们一开currentTabComponent是为空的。
- 使用 shallowRef 这个api，而不是 ref，是为了处理异常 Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.。我们这里使用浅代理即可，不需要使用深层代理，这样做可以提供性能。

