import UserService from '../services/user.service';
const initialState = { 
  userItems: [],  //liste de posts
  userCurrentItem: null,  //currentPost
  loadingStatus: null,
  message: ''
}

export const users = {
  namespaced: true,
  state: initialState,
  actions: {
    getAllUser ({ commit }) {
      commit('setLoadingStatus', 'loading')
      commit('setMessage', '')
      return UserService.getAllUser().then(
        user => {
          commit('setUserItems', {user})
          commit('setLoadingStatus', 'success')
          commit('setMessage', user.message)
          return Promise.resolve(user)
        },
        error => {
          commit('setUserItems', {userItems: initialState.userItems} )
          commit('setLoadingStatus', 'failure')
          commit('setMessage', error.message)
          return Promise.reject(error);
        }
      );
    },

  },
  mutations: {
    setUserItems (state, {user}) {
      state.userItems = user
    },
    setLoadingStatus (state, status) {
      state.loadingStatus = status
    },
    setMessage (state, message) {
      state.message = message
    }
  },
  getters: {
    getAllUser(state) {
      return state.userItems;
    },
  }
};
