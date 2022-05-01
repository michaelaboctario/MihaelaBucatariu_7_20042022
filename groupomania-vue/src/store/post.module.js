import PostService from '../services/post.service';
const initialState = []

export const posts = {
  namespaced: true,
  state: initialState,
  loadingStatus: null,
  message: '',

  actions: {  
    createPost ({ commit }, post) {
      //console.log("create post")
      //console.log(post)
      commit('setLoadingStatus', null)
      commit('setMessage', '')
      PostService.createPost(post).then(
        response => {
          //console.log(response)
          commit('setPost', {post} )
          //commit('setPost', response.data )
          commit('setLoadingStatus', 'success')
          commit('setMessage', response.message)
        },
        error => {
          //console.log(error)
          commit('setLoadingStatus', 'failure')
          commit('setMessage', error.message)
          //return Promise.reject(error)
        }
      );
    },
    getAllPost ({ commit }) {
      commit('setLoadingStatus', null)
      commit('setMessage', '')
      return PostService.getAllPost().then(
        post => {
          commit('setPostItems', {post} )
          commit('setLoadingStatus', 'success')
          commit('setMessage', post.message)
          //return Promise.resolve(post)
        },
        error => {
          //console.log(error)
          commit('setPostItems', initialState )
          commit('setLoadingStatus', 'failure')
          commit('setMessage', error.message)
          //return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    setPost (state, { post }) {
      state.push(post)
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