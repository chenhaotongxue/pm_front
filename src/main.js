import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './permission.js';
/**引入element组件 */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


Vue.config.productionTip = false;

import preventClick from './js/clickStatefrom'  // 根据自己的路径
Vue.use(preventClick)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
