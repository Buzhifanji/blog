// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: '不知凡几',
  siteDescription: '笔记', // 网站的基本介绍，有利于搜索引擎
  plugins: [],
  outputDir: 'dist',
  siteUrl: '',
  pathPrefix: 'blog',
  plugins: [
    {
      use: '@gridsome/source-filesystem', // 插件
      options: {
        typeName: 'BlogPost', // 类型，对应GraphQL中的查询
        path: 'blog/**/*.md', // 文件路径
      }
    },
    
  ],
  // transformers: {
  //   remark: {
  //     // global remark options
  //   }
  // }
}
