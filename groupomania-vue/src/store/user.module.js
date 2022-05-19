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
    updateUser ({ commit }, {formData}) {
      // console.log("updateUser befor commit")
      // console.log(formData.get('user'))
      // console.log(formData.get('image'))
      // console.log(id)
      commit('setLoadingStatus', 'loading')
      commit('setMessage', '')
      return UserService.updateUser(formData).then(
        () => {
          commit('updateUser', {user: JSON.parse(formData.get('user'))})
          commit('setLoadingStatus', 'success')
          //commit('setMessage', response.message)
          return Promise.resolve(formData.user)
        },
        error => {
          commit('setLoadingStatus', 'failure')
          commit('setMessage', error.message)
          return Promise.reject(error);
        }
      );
    },
    deleteUser ({ commit }, id) {
      console.log("deleteUser")
      //console.log(id)
      commit('setLoadingStatus', 'loading')
      commit('setUserCurrentItem', {user: null})
      commit('deleteUser', id)
      commit('setMessage', '')
      return UserService.deleteUser(id).then(
        (data) => {
          commit('setLoadingStatus', 'success')
          commit('setMessage', data.message)
          // ça n'existe pas de message de reponse 
          return Promise.resolve(data.message)
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
      // console.log("updateUser")
      // console.log(state)
      // console.log(user)
      state.userItems = state.userItems.map(elem => elem.id === user.id ? user : elem)
    },
    deleteUser (state, id) {
      // console.log("deleteUser", id)
      // console.log(state)
      state.userItems = state.userItems.filter(elem => elem.id !== id)
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
