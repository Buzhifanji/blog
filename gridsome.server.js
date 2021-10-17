// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  api.loadSource(({ addCollection, store  }) => {
    // 添加 tag 自定义属性，用于 标识 markdown文章分类属性
    // const blogPosts = addCollection({typeName: 'BlogPost'})
    // blogPosts.addNode({
    //   tag: '1',
    //   path: '/test',
    //   id: '1',
    //   content: '内容'
    // })
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
