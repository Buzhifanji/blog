export const data = {
  "key": "v-15788709",
  "path": "/vue3/",
  "title": "vue3",
  "lang": "zh-CN",
  "frontmatter": {
    "description": "",
    "sidebar": "vue3",
    "next": "/vue3/debugging"
  },
  "excerpt": "",
  "headers": [],
  "git": {
    "updatedTime": 1640793008000,
    "contributors": [
      {
        "name": "buzhifanji",
        "email": "buzhifanji@163.com",
        "commits": 1
      }
    ]
  },
  "filePathRelative": "vue3/index.md"
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
