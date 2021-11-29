// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
    siteName: 'Home',
    icon: {
        favicon: './src/assets/favicon.png',
        touchicon: './src/assets/favicon.png'
    },
    siteUrl: (process.env.SITE_URL ? process.env.SITE_URL : 'https://example.com'),
    pathPrefix: '/blog',
    settings: {
        web: process.env.URL_WEB || false,
        twitter: process.env.URL_TWITTER || false,
        github: process.env.URL_GITHUB || false,
        nav: {
            links: [ // 配置头部导航栏
                { path: '/vue3/', title: 'vue3' },
                { path: '/design-pattern/creational-patterns/easy-factory-method/', title: '设计模式' },
                { path: '/data-structure/stack/', title: '数据结构与算法' },
                { path: '/network/dns/', title: '网络' },
            ]
        },
        sidebar: [{
                name: 'vue3',
                sections: [{
                    title: '阅读vue3源码',
                    items: [
                        '/vue3/',
                        '/vue3/debugging/',
                        '/vue3/create-app/',
                        '/vue3/component/',
                        '/vue3/vnode-dom/',
                        '/vue3/diff1/',
                    ]
                }, ]
            },
            {
                name: 'design-pattern',
                sections: [{
                    title: '设计模式',
                    items: [
                        '/design-pattern/creational-patterns/easy-factory-method/',
                    ]
                }, ]
            },
            {
                name: 'data-structure',
                sections: [{
                    title: '数据结构与算法',
                    items: [
                        '/data-structure/stack/',
                        '/leetcode/add-two-numbers/',
                        '/leetcode/two-sum/',
                        '/leetcode/longest-substring-without-repeating-characters/',
                    ]
                }, ]
            },
            {
                name: 'network',
                sections: [{
                    title: '计算机网络',
                    items: [
                        '/network/dns/',
                    ]
                }, ]
            },
            {
                name: 'code-snippet',
                sections: [{
                    title: '代码片段',
                    items: [
                        '/copy/',
                    ]
                }, ]
            },
        ]
    },
    plugins: [{
            use: '@gridsome/source-filesystem',
            options: {
                baseDir: './content',
                path: '**/*.md',
                typeName: 'MarkdownPage',
                remark: {
                    externalLinksTarget: '_blank',
                    externalLinksRel: ['noopener', 'noreferrer'],
                    plugins: [
                        '@gridsome/remark-prismjs'
                    ]
                }
            }
        },

        {
            use: 'gridsome-plugin-tailwindcss',
            options: {
                tailwindConfig: './tailwind.config.js',
                purgeConfig: {
                    // Prevent purging of prism classes.
                    whitelistPatternsChildren: [
                        /token$/
                    ]
                }
            }
        },

        {
            use: '@gridsome/plugin-google-analytics',
            options: {
                id: (process.env.GA_ID ? process.env.GA_ID : 'XX-999999999-9')
            }
        },

        {
            use: '@gridsome/plugin-sitemap',
            options: {}
        }

    ]
}