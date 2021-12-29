export const data = {
  "key": "v-afbaab78",
  "path": "/vue3/vue3.2-reactivity.html",
  "title": "Vue3.2-reactive实现原理",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "Vue3.2-reactive实现原理",
    "author": "buzhifanji",
    "tag": "vue3",
    "sidebar": "vue3"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "createReactiveObject的实现",
      "slug": "createreactiveobject的实现",
      "children": []
    },
    {
      "level": 2,
      "title": "get的实现： createGetter",
      "slug": "get的实现-creategetter",
      "children": [
        {
          "level": 3,
          "title": "get中处理数组情况：createArrayInstrumentations",
          "slug": "get中处理数组情况-createarrayinstrumentations",
          "children": []
        },
        {
          "level": 3,
          "title": "依赖收集：track",
          "slug": "依赖收集-track",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "set的实现： createSetter",
      "slug": "set的实现-createsetter",
      "children": [
        {
          "level": 3,
          "title": "更新依赖：trigger",
          "slug": "更新依赖-trigger",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "总结",
      "slug": "总结",
      "children": []
    },
    {
      "level": 2,
      "title": "自问自答系列：",
      "slug": "自问自答系列",
      "children": []
    }
  ],
  "git": {
    "updatedTime": null,
    "contributors": []
  },
  "filePathRelative": "vue3/vue3.2-reactivity.md"
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
