import PostService from '../services/post.service';
const initialState = { 
  items: [], 
  loadingStatus: null,
  message: ''
}

export const posts = {
  namespaced: true,
  state: initialState,

  actions: {  
    createPost ({ commit }, post) {
      commit('setLoadingStatus', 'loading')
      commit('setMessage', '')
      return PostService.createPost(post).then(
        response => {
          commit('setPost', {post} )
          commit('setLoadingStatus', 'success')
          commit('setMessage', response.message)
          return Promise.resolve(post)
        },
        error => {
          commit('setLoadingStatus', 'failure')
          commit('setMessage', error.message)
          return Promise.reject(error)
        }
      );
    },
    getAllPost ({ commit }) {
      commit('setLoadingStatus', 'loading')
      commit('setMessage', '')
      return PostService.getAllPost().then(
        post => {
          commit('setPostItems', {post} )
          commit('setLoadingStatus', 'success')
          commit('setMessage', post.message)
          return Promise.resolve(post)
        },
        error => {
          commit('setPostItems', initialState )
          commit('setLoadingStatus', 'failure')
          commit('setMessage', error.message)
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    setPost (state, { post }) {
      state.items.push(post)
    },
    setPostItems (state, { post }) {
      state.items = post
    },
    setLoadingStatus (state, status) {
      state.loadingStatus = status
    },
    setMessage (state, message) {
      state.message = message
    }
  }
}