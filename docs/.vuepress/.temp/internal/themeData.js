export const themeData = {
  "logo": "https://vuejs.org/images/logo.png",
  "navbar": [
    {
      "text": "首页",
      "link": "/"
    }
  ],
  "sidebar": {
    "/data-structure/": [
      {
        "text": "数据结构与算法",
        "children": [
          "/data-structure/README.md",
          "/data-structure/link.md",
          "/data-structure/linked-list.md",
          "/data-structure/stack.md"
        ]
      }
    ],
    "/browser/": [
      {
        "text": "浏览器",
        "children": [
          "/browser/index.md",
          "/browser/process.md"
        ]
      }
    ],
    "/leetcode/": [
      {
        "text": "leetcode",
        "children": [
          "/leetcode/add-two-numbers.md",
          "/leetcode/longest-substring-without-repeating-characters.md",
          "/leetcode/two-sum.md"
        ]
      }
    ],
    "/vue3/": [
      {
        "text": "vue3",
        "children": [
          "/vue3/component.md",
          "/vue3/createApp.md",
          "/vue3/debugging.md",
          "/vue3/diff1.md",
          "/vue3/index.md",
          "/vue3/vnode-dom.md",
          "/vue3/vue3.2-component.md",
          "/vue3/vue3.2-computed.md",
          "/vue3/vue3.2-reactivity.md",
          "/vue3/vue3.2-ref.md"
        ]
      }
    ],
    "/code-snippet/": [
      {
        "text": "代码片段",
        "children": [
          "/code-snippet/copy.md",
          "/code-snippet/index.md"
        ]
      }
    ],
    "/design-pattern/": [
      {
        "text": "设计模式",
        "children": [
          "/design-pattern/easy-factory-method.md"
        ]
      }
    ]
  },
  "locales": {
    "/": {
      "selectLanguageName": "English"
    }
  },
  "darkMode": true,
  "repo": null,
  "selectLanguageText": "Languages",
  "selectLanguageAriaLabel": "Select language",
  "sidebarDepth": 2,
  "editLink": true,
  "editLinkText": "Edit this page",
  "lastUpdated": true,
  "lastUpdatedText": "Last Updated",
  "contributors": true,
  "contributorsText": "Contributors",
  "notFound": [
    "There's nothing here.",
    "How did we get here?",
    "That's a Four-Oh-Four.",
    "Looks like we've got some broken links."
  ],
  "backToHome": "Take me home",
  "openInNewWindow": "open in new window",
  "toggleDarkMode": "toggle dark mode",
  "toggleSidebar": "toggle sidebar"
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
