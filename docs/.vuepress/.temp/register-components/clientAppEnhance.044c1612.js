import { defineAsyncComponent } from 'vue'

export default ({ app }) => {
  app.component("home", defineAsyncComponent(() => import("/Users/huangbin/Documents/my_project/blog/docs/.vuepress/components/home.vue")))
}
