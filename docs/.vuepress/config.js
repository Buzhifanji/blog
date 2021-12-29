const path = require('path')
const autoGetSidebarOptionBySrcDir = require('./sidebar.js')

// =========== 配置每个主题的 sidebar ===================


const commonSideBar = {
    children: [
        { text: '数据结构与算法', link: '/data-structure/' }
    ]
}
const sidebar = [
    { text: '数据结构与算法', link: '/data-structure/' }
]
// 数据结构与算法
const dataStructure = [
    {
        text: '数据结构与算法',
        children: [
            { text: '序言', link: '/data-structure/', children: [] },
            { text: '链表', link: 'linked-list', children: [] },
        ]
    }
]
module.exports = {
    lang: 'zh-CN',
    title: '不知凡几',
    description: '不知凡几 博客',
    // debug: true,
    themeConfig: {
        logo: 'https://vuejs.org/images/logo.png',
        navbar: [
            { text: '首页', link: '/' }
        ],
        sidebar: autoGetSidebarOptionBySrcDir()
    },
    plugins: [
        ['@vuepress/plugin-search'],
        ['@vuepress/plugin-back-to-top'],
        [
            '@vuepress/register-components',
            {
                componentsDir: path.resolve(__dirname, './components'),
            },
        ],
    ],
    locales: {
        '/': {
            lang: 'zh-CN',
            title: '学习计算机笔记',
            description: '好记性不如烂笔头',
        },
    },
}