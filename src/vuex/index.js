import Vue from 'vue';
import Vuex from 'vuex';
// 用户
import user from './user';
// 商品
import item from './item';
// 购物车
 import shoppingcart from './shoppingcart';

import sellItems from './sellItems';

import orders from './orders';

import address from './address';

Vue.use(Vuex);
const state={
  items:[]
}
const store=new Vuex.Store({
  state,
  modules: {
    user,
    item,
    orders,
    address,
    shoppingcart,
    sellItems
  }
});
export default store;
