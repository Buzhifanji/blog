import { searchProPlugin } from "vuepress-plugin-search-pro";
import { docsearchPlugin } from "@vuepress/plugin-docsearch";
import { googleAnalyticsPlugin } from "@vuepress/plugin-google-analytics";
import { defineUserConfig } from "vuepress";
import theme from "./theme";

export default defineUserConfig({
  lang: "zh-CN", // 网站语言，默认为中文
  title: "Buzhifanji", // 网站标题
  description: "Buzhifanji博客",  // 网站描述
  theme,
  base: "/blog/",  // 网站路径默认为主域名。如果网站部署在子路径下，比如 xxx.com/yyy，那么 base 应该被设置为 "/yyy/"
  plugins: [
    // algolia 全文搜索：没设置爬虫的话，需删除 docsearchPlugin 区块以使用节点搜索
    // docsearchPlugin({
    //   indexName: "newzone",
    //   appId: "M4EXXEZIEG",
    //   apiKey: "fd8891a9c4cc21e0ef4f11bf44f7a11e",
    // }),
    // 本地搜索，删除上方 docsearchPlugin 区块后生效
    searchProPlugin({
      // 索引全部内容
      indexContent: true,
    }),
    // 谷歌分析 ID
    googleAnalyticsPlugin({
      id: "G-RWKZTY2P9R", // 待设置 id https://v2.vuepress.vuejs.org/zh/reference/plugin/google-analytics.html#id
    }),
  ],
});
