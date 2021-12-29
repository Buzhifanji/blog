export const data = {
  "key": "v-1751b92f",
  "path": "/content/vue3/vue3.2-ref.html",
  "title": "Vue3.2-ref实现原理",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "Vue3.2-ref实现原理",
    "author": "buzhifanji",
    "tag": "vue3",
    "sidebar": "vue3"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "总结",
      "slug": "总结",
      "children": []
    }
  ],
  "git": {},
  "filePathRelative": "content/vue3/vue3.2-ref.md"
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
