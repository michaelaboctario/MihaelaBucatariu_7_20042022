import UserService from '../services/user.service';
const initialState = { 
  userItems: [],  //liste de users
  userCurrentItem: null,  //currentUser
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
    getOneUser ({ commit }, id) {
      commit('setLoadingStatus', 'loading')
      commit('setUserCurrentItem', {user: null})
      commit('setMessage', '')
      return UserService.getOneUser(id).then(
        user => {
          commit('setUserCurrentItem', {user})
          commit('setLoadingStatus', 'success')
          // ça n'existe pas de message de reponse 
          return Promise.resolve(user)
        },
        error => {
          commit('setLoadingStatus', 'failure')
          commit('setMessage', error.message)
          return Promise.reject(error);
        }
      );
    },
    updateUser ({ commit }, {user}) {
      console.log("updateUser befor commit")
      console.log(user)
      //console.log(id)
      commit('setLoadingStatus', 'loading')
      commit('setMessage', '')
      return UserService.updateUser(user).then(
        response => {
          commit('updateUser', {user})
          commit('setLoadingStatus', 'success')
          commit('setMessage', response.message)
          return Promise.resolve(user)
        },
        error => {
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
    setUserCurrentItem (state, {user}) {
      console.log("setusercurrentitem", user);
      state.userCurrentItem = user;
    },
    updateUser (state, {user}) {
      console.log("updateUser")
      console.log(state)
      console.log(user)
      state.userItems = state.userItems.map(elem => elem.id === user.id ? user : elem)
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
