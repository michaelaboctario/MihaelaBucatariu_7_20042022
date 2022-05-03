import axios from 'axios';
import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/'
});
if(user && user.status.loggedIn) {
  instance.defaults.headers.common.Authorization = user.token
  console.log("instance", instance.defaults.headers.common.Authorization)
} else  {
  instance.defaults.headers.common.Authorization = ""
}

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {         
          instance.defaults.headers.common.Authorization = user.token;
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      instance.defaults.headers.common.Authorization = "";
      AuthService.logout();
      commit('logout');
      return Promise.resolve('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    }
  },
  getters: {
    authUser(state) {
      return state.user.userData;
    },
    tokenAuthUser(state) {
      return state.user.token;
    }
  }
};
