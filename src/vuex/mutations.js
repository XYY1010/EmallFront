// 设置加载状态
export const SET_LOAD_STATUS = (state, status) => {
  state.isLoading = status;
};

// 设置商品列表(搜索)
export const SET_GOODS_LIST = (state, data) => {
  state.goodsList = data.goodsList;
  state.asItems = data.asItems;
};

// 设置商品列表排序
export const SET_GOODS_ORDER_BY = (state, data) => {
  state.orderBy = data;
};