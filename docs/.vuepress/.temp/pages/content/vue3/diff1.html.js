export const data = {
  "key": "v-67affa80",
  "path": "/content/vue3/diff1.html",
  "title": "diff 1",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "diff 1",
    "author": "buzhifanji",
    "sidebar": "vue3",
    "tag": "vue3",
    "prev": "/vue3/debugging/",
    "next": "/docs/settings/"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "setupRenderEffect 更新过程",
      "slug": "setuprendereffect-更新过程",
      "children": []
    },
    {
      "level": 2,
      "title": "核心逻辑：patch 流程",
      "slug": "核心逻辑-patch-流程",
      "children": [
        {
          "level": 3,
          "title": "processComponent",
          "slug": "processcomponent",
          "children": []
        },
        {
          "level": 3,
          "title": "processElement",
          "slug": "processelement",
          "children": []
        }
      ]
    }
  ],
  "git": {},
  "filePathRelative": "content/vue3/diff1.md"
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
