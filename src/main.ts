import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import api from "./api/request";
import mock from "./api/mock";
import configs from "./config/index";
import "./utils/flexible";

// 注册组件
// main.ts
import AppHeader from "@/components/AppHeader.vue";
Vue.component("AppHeader", AppHeader);

import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

Vue.prototype.$api = api;
Vue.prototype.$mock = mock;
Vue.prototype.$configs = configs;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
