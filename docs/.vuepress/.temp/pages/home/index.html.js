export const data = {
  "key": "v-14b0a7d7",
  "path": "/home/",
  "title": "首页",
  "lang": "zh-CN",
  "frontmatter": {
    "home": true
  },
  "excerpt": "",
  "headers": [],
  "git": {},
  "filePathRelative": "home/README.md"
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
