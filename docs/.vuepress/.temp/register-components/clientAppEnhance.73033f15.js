import { defineAsyncComponent } from 'vue'

export default ({ app }) => {
  app.component("home", defineAsyncComponent(() => import("E:/personal-project/my-blog/docs/.vuepress/components/home.vue")))
}
