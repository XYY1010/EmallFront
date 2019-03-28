import Vue from 'vue';
import BootstrapVue from "bootstrap-vue";
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './routes/router';
import iView from 'iview';
import store from './vuex';
import axios from './axios_config.js';
import 'iview/dist/styles/iview.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(BootstrapVue);
Vue.use(ElementUI);
Vue.use(iView);

Object.defineProperty(Vue.prototype, '$axios', { value: axios });

// router.beforeEach((to, from, next) => {
//
//   // 如果进入登录页面，则清空 user 信息
//   if (to.path == '/login') {
//     sessionStorage.removeItem('user');
//   }
//
//   // 从 session 中获取 user 的信息
//   let user=sessionStorage.getItem('user');
//
//   // 如果没有登录，则回到登录页面
//   if (!user && to.path !=='/login'&&to.path !=='/register') {
//     next({ path: '/login' });
//   } else {
//     next();
//   }
// });

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  console.log("start");
  next();
});

router.afterEach(route => {
  iView.LoadingBar.finish();
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
