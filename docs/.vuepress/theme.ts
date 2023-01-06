import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar";
import sidebar from "./sidebar";

// 主题选项：https://vuepress-theme-hope.github.io/v2/zh/config/theme/layout.html
export default hopeTheme({
  // hostname: "https://vuepress-theme-hope-v2-demo.mrhope.site",

  author: {
    name: "Buzhifanji",
    url: "https://github.com/Buzhifanji",
  },

  iconAssets: "iconfont",

  logo: "/logo.svg",

  repo: "https://github.com/Buzhifanji/blog",
  // 自定义仓库链接文字。默认从 `repo` 中自动推断为 "GitHub" / "GitLab" / "Gitee" / "Bitbucket" 其中之一，或是 "Source"。
  repoLabel: "GitHub",
  // 是否在导航栏内显示仓库链接，默认为 `true`
  repoDisplay: true,
  // 文档存放路径
  docsDir: "docs",

  // navbar
  navbar: navbar,
  // 导航栏布局
  navbarLayout: {
    left: ["Brand"],
    center: [],
    right: ["Links", "Search", "Repo", "Outlook"],
  },
  // sidebar
  sidebar: sidebar,

  // footer: `<a href="https://vuepress-theme-hope.github.io/v2/zh/" target="_blank">vuepress-theme-hope</a>`,

  // displayFooter: true,

  // 页面元数据：贡献者，最后修改时间，编辑链接
  lastUpdated: true,
  contributors: false,
  editLink: false,

  // 深色模式配置
  // darkmode: "disable",
  themeColor: {
    blue: "#2196f3",
    red: "#f26d6d",
    green: "#3eaf7c",
    orange: "#fb9b5f",
  },
  fullscreen: true, // 全屏

  // 页面布局 Frontmatter 配置：https://vuepress-theme-hope.github.io/v2/zh/config/frontmatter/layout.html#pageinfo
  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

  // 主题功能选项：https://vuepress-theme-hope.github.io/v2/zh/config/theme/feature.html
  blog: {
    name: "Buzhifanji",
    description: "一个前端开发者",
    intro: "",
    roundAvatar: true,
    medias: {
      // Baidu: "https://example.com",
      // Bitbucket: "https://example.com",
    },
  },

  hotReload: true, // 开发模式下是否启动热更新，显示所有更改并重新渲染
  // encrypt: {
  //   config: {
  //     "/guide/encrypt.html": ["1234"],
  //   },
  // },

  plugins: {
    blog: {
      excerpt: true,
    },

    // 如果你不需要评论，可以直接删除 comment 配置，
    // 以下配置仅供体验，如果你需要评论，请自行配置并使用自己的环境，详见文档。
    // 为了避免打扰主题开发者以及消耗他的资源，请不要在你的正式环境中直接使用下列配置!!!!!
    comment: {
      /**
       * Using Giscus
       */
      provider: "Giscus",
      repo: "Buzhifanji/blog",
      repoId: "R_kgDOGHSl7w",
      category: "Announcements",
      categoryId: "DIC_kwDOGHSl784CQf-w",
      /**
       * Using Twikoo
       */
      // provider: "Twikoo",
      // envId: "https://twikoo.ccknbc.vercel.app",

      /**
       * Using Waline
       */
      // provider: "Waline",
      // serverURL: "https://vuepress-theme-hope-comment.vercel.app",
      // 部署 Waline：https://waline.js.org/guide/get-started.html
      // pageview: true, // 浏览量统计
      // walineLocales: {
      //   "/": {
      //     // 表情互动提示文字
      //     reactionTitle: "已到达文章底部，欢迎留言、表情互动~",
      //     reaction0: "赞一个",
      //     reaction1: "支持下",
      //     reaction2: "有点酷",
      //     reaction3: "啥玩意",
      //     reaction4: "看不懂",
      //     // Waline 等级标签
      //     admin: "盛年不重来，一日难再晨",
      //     level0: "锻体",
      //     level1: "炼气",
      //     level2: "筑基",
      //     level3: "金丹",
      //     level4: "元婴",
      //     level5: "化神",
      //   },
      // },
    },

    // 组件库
    components: {
      components: ["Badge", "BiliBili", "VideoPlayer", "YouTube"],
    },

    mdEnhance: {
      // enableAll: true,
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
    },
    copyCode: {
      showInMobile: true,
    },

    // rss 属性
    feed: {
      rss: true,
      count: 10,
    },
  },
});
