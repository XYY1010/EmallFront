const state = {
    shoppingcart: []
}
const getters = {
    shoppingcart: state => {
        state.shoppingcart = JSON.parse(sessionStorage.getItem('shoppingcart'));
        return state.shoppingcart;
    }
}
const actions = {

}

const mutations = {
    initShoppingcart(state, payload) {
        state.shoppingcart = payload.slice(0);
        sessionStorage.setItem('shoppingcart', JSON.stringify(state.shoppingcart));
    },
    editShoppingcart(state, payload) {
        state.shoppingcart = payload.shoppingcart;
        sessionStorage.setItem('shoppingcart', JSON.stringify(state.shoppingcart));
    }
};
export default {
    state,
    getters,
    actions,
    mutations
};
