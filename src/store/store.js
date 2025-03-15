import { createStore } from 'vuex';

const store = createStore({
    state: {
        checkLogin: false
    },
    mutations: {
        setLoginState(state, isLoggedIn) {
            state.checkLogin = isLoggedIn;
        }
    },
    actions: {
        login({ commit }, token) {
            // 保存 token 到 localStorage
            localStorage.setItem('token', token);
            commit('setLoginState', true);
        },
        logout({ commit }) {
            localStorage.removeItem('token');
            commit('setLoginState', false);
        }
    }
});

export default store;
