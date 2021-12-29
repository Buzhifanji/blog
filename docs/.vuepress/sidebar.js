const dirTree = require('directory-tree')
const path = require('path')
const fs = require('fs');
const { time } = require('console');
const { isObject } = require('util');

const SRC_PATH = path.resolve(__dirname, "../../docs");

const sideBar = {
    '/data-structure/': [{ text: '数据结构与算法', children: [] }],
    '/browser/': [{ text: '浏览器', children: [] }],
    '/leetcode/': [{ text: 'leetcode', children: [] }],
    '/vue3/': [{ text: 'vue3', children: [] }],
    '/code-snippet/': [{ text: '代码片段', children: [] }],
    '/design-pattern/': [{ text: '设计模式', children: [] }],
}

const linkMap = new Map()

function toSidebarOption(tree = []) {
    return tree.forEach((v) => {
        if (v.name && v.name !== '.vuepress')
            if (v.children && v.children.length) {
                if (!linkMap.has(v.name)) {
                    linkMap.set(v.name, [])
                }
                toSidebarOption(v.children)
            } else {
                // 因为所有的md文件必须放到'docs'文件夹下
                // 所以相对路径就是'docs'后面的部分
                // 最后把扩展名去掉, 就是路由的路径
                const path = v.path.split("docs")[1]
                const key = path.split('/')[1]
                if (linkMap.has(key)) {
                    const arr = linkMap.get(key)
                    if (path.includes('README')) {
                        arr.unshift(path)
                    } else {
                        arr.push(path)
                    }
                }
            }
    });
}

/**
 * @desc 根据 自定义文件夹'docs/src'自动生成vuepress的sidebar选项
 * @param {string} srcPath 自定义文件夹路径,必须在docs文件夹下
 * @returns {object[]}
 */
function autoGetSidebarOptionBySrcDir(srcPath = SRC_PATH) {
    const srcDir = dirTree(srcPath, {
        extensions: /\.md$/,
        normalizePath: true,
    });
    toSidebarOption(srcDir.children)

    for (const [key, value] of linkMap) {
        const temp = `/${key}/`
        if (Reflect.has(sideBar, temp)) {
            sideBar[temp][0].children = value
        }
    }
    return sideBar;
}


module.exports = autoGetSidebarOptionBySrcDir