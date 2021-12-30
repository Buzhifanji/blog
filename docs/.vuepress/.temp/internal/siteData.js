export const siteData = {
  "base": "/",
  "lang": "zh-CN",
  "title": "不知凡几",
  "description": "不知凡几 博客",
  "head": [],
  "locales": {
    "/": {
      "lang": "zh-CN",
      "title": "学习计算机笔记",
      "description": "好记性不如烂笔头"
    }
  }
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSiteData) {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ siteData }) => {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  })
}
