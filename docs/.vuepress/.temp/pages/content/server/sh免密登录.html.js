export const data = {
  "key": "v-5dbcbff6",
  "path": "/content/server/sh%E5%85%8D%E5%AF%86%E7%99%BB%E5%BD%95.html",
  "title": "Test",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "Test",
    "author": "Dora"
  },
  "excerpt": "",
  "headers": [],
  "git": {},
  "filePathRelative": "content/server/sh免密登录.md"
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
