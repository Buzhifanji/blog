// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

// =========== 配置每个主题的 sidebar ===================

// 数据结构
const dataStructure = {
    name: 'data-structure',
    sections: [{
        title: '数据结构',
        items: [
            '/data-structure/',
            '/data-structure/linked-list/',
        ]
    }, ]
}

// vue
const vue = {
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
            '/vue3/vue3-2-component/',
            '/vue3/vue3-2-ref/',
            '/vue3/vue3-2-reactivity/',
        ]
    }, ]
}

// 设计模式
const designPattern = {
    name: 'design-pattern',
    sections: [{
        title: '设计模式',
        items: [
            '/design-pattern/creational-patterns/easy-factory-method/',
        ]
    }, ]
}

// 网络
const network = {
    name: 'network',
    sections: [{
        title: '计算机网络',
        items: [
            '/network/dns/',
        ]
    }, ]
}

// 代码片段
const codeSnippet = {
    name: 'code-snippet',
    sections: [{
        title: '代码片段',
        items: [
            '/copy/',
        ]
    }, ]
}

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
        sidebar: [vue, designPattern, dataStructure, network, codeSnippet]
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