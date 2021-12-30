import { defineAsyncComponent } from 'vue'

export default ({ app }) => {
  app.component("home", defineAsyncComponent(() => import("E:/personal-project/blog/docs/.vuepress/components/home.vue")))
}
