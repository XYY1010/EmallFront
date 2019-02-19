const state = {
  item: {
    itemId: '',
    price: '',
    stock: '',
  }
}

const getters  = {
  item: state => {
    state.item = JSON.parse(sessionStorage.getItem('item'));
    return state.item;
  }
}

const actions = {

}

const mutations = {
    initItem(state, payload) {
        state.item = payload.item;
        sessionStorage.setItem('item', JSON.stringify(state.item));
    },
    editUser(state, payload) {
        state.item = payload.item;
        sessionStorage.setItem('item', JSON.stringify(state.item));
    }
};
export default {
    state,
    getters,
    actions,
    mutations
};
