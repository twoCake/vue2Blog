import Vue from 'vue'
import App from './App.vue'
// 导入全局样式
import "./styles/global.less"; 
import router from "./views/router/index.js"
import showMessage from './utils/showMessage';
// 导入事件总线
import "./eventBus"
// // 导入模拟数据
// import "./mock/index"
// 引入store
import store from './store';
// 一上来就触发store中的setting/fetchSetting
store.dispatch("setting/fetchSetting")

Vue.prototype.$showMessage = showMessage;

// 配置全局指令
import vLazy from "./directives/lazy.js";
Vue.directive("lazy",vLazy)



Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
