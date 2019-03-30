const state = {
    addresses: []
};
const getters = {
    getAllAddresses: state => {
        return state.addresses;
    }
}
const actions = {}

const mutations = {
    setAddresses(state, payload) {
      state.addresses = payload.slice(0);
      console.log(payload);
      sessionStorage.setItem('addresses', JSON.stringify(state.shoppingcart));
    }
};
export default {

    state,
    getters,
    //actions,
    mutations
};
