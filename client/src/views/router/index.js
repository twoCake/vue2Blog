import VueRouter from "vue-router";
import routes from "./routes"
import Vue from "vue"
// 应用插件
Vue.use(VueRouter)
const router = new VueRouter({
  routes,
  mode: "history"
})

router.afterEach((to, from) => {
  if (to.meta.pageTitle) {
    document.title = to.meta.pageTitle;
  }
})

export default router
