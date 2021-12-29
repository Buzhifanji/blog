export const data = {
  "key": "v-1fdc186c",
  "path": "/browser/process.html",
  "title": "多进程的浏览器",
  "lang": "zh-CN",
  "frontmatter": {
    "lang": "zh-CN",
    "title": "多进程的浏览器",
    "author": "buzhifanji",
    "tag": "browser",
    "sidebar": "browser"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "区分进程和线程",
      "slug": "区分进程和线程",
      "children": []
    },
    {
      "level": 2,
      "title": "浏览器为什么多进程的？",
      "slug": "浏览器为什么多进程的",
      "children": [
        {
          "level": 3,
          "title": "浏览器中主要的进程",
          "slug": "浏览器中主要的进程",
          "children": []
        }
      ]
    }
  ],
  "git": {
    "updatedTime": null,
    "contributors": []
  },
  "filePathRelative": "browser/process.md"
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
