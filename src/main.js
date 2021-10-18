// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

// import 'prismjs/themes/prism.css'
import DefaultLayout from '~/layouts/Default.vue'
import './css/index.css'
import './css/markdown.css'
// import './css/dark-vue.css'

export default function(Vue, { router, head, isClient }) {
    // Set default layout as a global component
    Vue.component('Layout', DefaultLayout)
}