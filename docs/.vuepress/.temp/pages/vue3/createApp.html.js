export const data = {
  "key": "v-7b183fbd",
  "path": "/vue3/createApp.html",
  "title": "createApp",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "createApp",
    "author": "buzhifanji",
    "tag": "vue3",
    "sidebar": "vue3",
    "prev": "/vue3/debugging/"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "应用程序初始化",
      "slug": "应用程序初始化",
      "children": [
        {
          "level": 3,
          "title": "1. 创建 app 对象",
          "slug": "_1-创建-app-对象",
          "children": []
        },
        {
          "level": 3,
          "title": "2. 重写 app.mount 方法",
          "slug": "_2-重写-app-mount-方法",
          "children": []
        }
      ]
    }
  ],
  "git": {
    "updatedTime": null,
    "contributors": []
  },
  "filePathRelative": "vue3/createApp.md"
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
