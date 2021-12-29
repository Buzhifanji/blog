export const data = {
  "key": "v-29efc799",
  "path": "/vue3/vue3.2-computed.html",
  "title": "Vue3.2-computed实现原理",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "Vue3.2-computed实现原理",
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
      "children": [
        {
          "level": 3,
          "title": "computed的执行顺序",
          "slug": "computed的执行顺序",
          "children": []
        }
      ]
    }
  ],
  "git": {
    "updatedTime": null,
    "contributors": []
  },
  "filePathRelative": "vue3/vue3.2-computed.md"
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
