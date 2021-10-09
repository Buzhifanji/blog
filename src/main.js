<<<<<<< HEAD
import naive from 'naive-ui'
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(naive).mount('#app')
=======
// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import './css/index.css'
import 'prismjs/themes/prism.css'

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
}
>>>>>>> 2d4b5a44ce022c51c0a8432499569a07a6d7e680
