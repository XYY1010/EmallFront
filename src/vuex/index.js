import Vue from 'vue';
import Vuex from 'vuex';
// 用户
import user from './user';
// 商品
import item from './item';
// 购物车
 import shoppincart from './shoppingcart';

Vue.use(Vuex);
const state={
  items:[]
}
const store=new Vuex.Store({
  state,
  modules: {
    user,
    item,
    shoppincart
  }
});
export default store;
