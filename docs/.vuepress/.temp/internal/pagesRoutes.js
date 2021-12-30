import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-8daa1a0e","/",{"title":"首页"},["/index.html","/README.md"]],
  ["v-24e1b800","/browser/",{"title":"序言"},["/browser/index.html","/browser/index.md"]],
  ["v-1fdc186c","/browser/process.html",{"title":"多进程的浏览器"},["/browser/process","/browser/process.md"]],
  ["v-9914532a","/code-snippet/copy.html",{"title":"copy"},["/code-snippet/copy","/code-snippet/copy.md"]],
  ["v-bfde678e","/code-snippet/",{"title":"copy-all"},["/code-snippet/index.html","/code-snippet/index.md"]],
  ["v-6a610e4e","/data-structure/link.html",{"title":"链表"},["/data-structure/link","/data-structure/link.md"]],
  ["v-2ca1ff4d","/data-structure/linked-list.html",{"title":"链表"},["/data-structure/linked-list","/data-structure/linked-list.md"]],
  ["v-8845e9f4","/data-structure/",{"title":"序言"},["/data-structure/index.html","/data-structure/README.md"]],
  ["v-13524ed7","/data-structure/stack.html",{"title":"栈"},["/data-structure/stack","/data-structure/stack.md"]],
  ["v-355f7e82","/design-pattern/easy-factory-method.html",{"title":"简单工厂模式"},["/design-pattern/easy-factory-method","/design-pattern/easy-factory-method.md"]],
  ["v-74473916","/git/",{"title":"git 443"},["/git/index.html","/git/index.md"]],
  ["v-6a16da4c","/github/github-action.html",{"title":"Github Action 快速入门"},["/github/github-action","/github/github-action.md"]],
  ["v-1dbd2406","/leetcode/add-two-numbers.html",{"title":"两数相加"},["/leetcode/add-two-numbers","/leetcode/add-two-numbers.md"]],
  ["v-5a725284","/leetcode/longest-substring-without-repeating-characters.html",{"title":"无重复字符的最长子串"},["/leetcode/longest-substring-without-repeating-characters","/leetcode/longest-substring-without-repeating-characters.md"]],
  ["v-177ac720","/leetcode/two-sum.html",{"title":"两数之和"},["/leetcode/two-sum","/leetcode/two-sum.md"]],
  ["v-0357f12a","/network/DNS.html",{"title":"DNS"},["/network/DNS","/network/DNS.md"]],
  ["v-0000a0a2","/server/sh%E5%85%8D%E5%AF%86%E7%99%BB%E5%BD%95.html",{"title":"Test"},["/server/sh免密登录.html","/server/sh%E5%85%8D%E5%AF%86%E7%99%BB%E5%BD%95","/server/sh免密登录.md","/server/sh%E5%85%8D%E5%AF%86%E7%99%BB%E5%BD%95.md"]],
  ["v-502cbd45","/vue3/component.html",{"title":"vue3组件"},["/vue3/component","/vue3/component.md"]],
  ["v-7b183fbd","/vue3/createApp.html",{"title":"createApp"},["/vue3/createApp","/vue3/createApp.md"]],
  ["v-4decc9f4","/vue3/debugging.html",{"title":"代码调试"},["/vue3/debugging","/vue3/debugging.md"]],
  ["v-ff5c0954","/vue3/diff1.html",{"title":"diff 1"},["/vue3/diff1","/vue3/diff1.md"]],
  ["v-15788709","/vue3/",{"title":"vue3"},["/vue3/index.html","/vue3/index.md"]],
  ["v-6ac1c256","/vue3/vnode-dom.html",{"title":"vnode to DOM"},["/vue3/vnode-dom","/vue3/vnode-dom.md"]],
  ["v-65f0c9ef","/vue3/vue3.2-component.html",{"title":"vue3.2组件使用实例"},["/vue3/vue3.2-component","/vue3/vue3.2-component.md"]],
  ["v-29efc799","/vue3/vue3.2-computed.html",{"title":"Vue3.2-computed实现原理"},["/vue3/vue3.2-computed","/vue3/vue3.2-computed.md"]],
  ["v-afbaab78","/vue3/vue3.2-reactivity.html",{"title":"Vue3.2-reactive实现原理"},["/vue3/vue3.2-reactivity","/vue3/vue3.2-reactivity.md"]],
  ["v-72cca34e","/vue3/vue3.2-ref.html",{"title":"Vue3.2-ref实现原理"},["/vue3/vue3.2-ref","/vue3/vue3.2-ref.md"]],
  ["v-3706649a","/404.html",{},["/404"]],
]

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, meta, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta,
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path,
      }))
    )
    return result
  },
  [
    {
      name: "404",
      path: "/:catchAll(.*)",
      component: Vuepress,
    }
  ]
)
