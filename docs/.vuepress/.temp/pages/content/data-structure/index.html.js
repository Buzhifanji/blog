export const data = {
  "key": "v-07b31270",
  "path": "/content/data-structure/",
  "title": "序言",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "序言",
    "author": "buzhifanji",
    "tag": "data-structure",
    "sidebar": "data-structure"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "介绍",
      "slug": "介绍",
      "children": []
    },
    {
      "level": 2,
      "title": "对比方法的复用：Comparator",
      "slug": "对比方法的复用-comparator",
      "children": [
        {
          "level": 3,
          "title": "方法介绍",
          "slug": "方法介绍",
          "children": []
        },
        {
          "level": 3,
          "title": "代码实现",
          "slug": "代码实现",
          "children": []
        },
        {
          "level": 3,
          "title": "测试用例",
          "slug": "测试用例",
          "children": []
        }
      ]
    }
  ]
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
