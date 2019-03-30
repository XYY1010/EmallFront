const state = {
    user: {
        userId: '',
        userName: '',
        password: '',
        phone: '',
        address: '',
        email: '',
        avatarSrc: ''
    }
}
const getters = {
    user: state => {
        state.user = JSON.parse(sessionStorage.getItem('user'));
        return state.user;
    }
}
const actions = {

}

const mutations = {
    initUser(state, payload) {
        state.user = payload.user;
        sessionStorage.setItem('user', JSON.stringify(state.user));
    },
    editUser(state, payload) {
      for (var variable in payload.user) {
        state.user[variable] = payload.user[variable];
      }
      sessionStorage.setItem('user', JSON.stringify(state.user));
    }
};
export default {
    state,
    getters,
    actions,
    mutations
};
