import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false, // 是否展示loading动画
    orderBy: 'sale', // 根据什么字段排序
    asItems: [], // 广告
    goodsList: [], // 商品列表
  },
  getters,
  actions,
  mutations
});
