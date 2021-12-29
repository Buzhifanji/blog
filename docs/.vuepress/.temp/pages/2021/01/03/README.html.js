export const data = {
  "key": "v-8a371558",
  "path": "/2021/01/03/README.html",
  "title": "hello",
  "lang": "zh-CN",
  "frontmatter": {
    "head": [
      [
        "meta",
        {
          "name": "foo",
          "content": "bar"
        }
      ],
      [
        "link",
        {
          "rel": "canonical",
          "href": "foobar"
        }
      ]
    ],
    "date": "2021-01-03T00:00:00.000Z",
    "permalinkPattern": ":year/:month/:day/:slug.html",
    "features": [
      {
        "title": "简洁至上",
        "details": "以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。"
      },
      {
        "title": "Vue 驱动",
        "details": "享受 Vue 的开发体验，可以在 Markdown 中使用 Vue 组件，又可以使用 Vue 来开发自定义主题。"
      },
      {
        "title": "高性能",
        "details": "VuePress 会为每个页面预渲染生成静态的 HTML，同时，每个页面被加载的时候，将作为 SPA 运行。"
      }
    ]
  },
  "excerpt": "",
  "headers": []
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
