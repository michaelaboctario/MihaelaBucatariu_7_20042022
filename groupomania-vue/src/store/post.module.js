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
          commit('setPostItems', {post})
          commit('setLoadingStatus', 'success')
          commit('setMessage', post.message)
          return Promise.resolve(post)
        },
        error => {
          commit('setPostItems', {posts: initialState.items} )
          commit('setLoadingStatus', 'failure')
          commit('setMessage', error.message)
          return Promise.reject(error);
        }
      );
    },
    getOnePost ({ commit }, id) {
      console.log("getOnePost")
      //console.log(id)
      commit('setLoadingStatus', 'loading')
      commit('setMessage', '')
      return PostService.getOnePost(id).then(
        post => {
          commit('setPost', {post})
          commit('setLoadingStatus', 'success')
          commit('setMessage', post.message)
          return Promise.resolve(post)
        },
        error => {
          commit('setLoadingStatus', 'failure')
          commit('setMessage', error.message)
          return Promise.reject(error);
        }
      );
    },
    updatePost ({ commit }, {post}) {
      console.log("updatePost befor commit")
      console.log(post)
      //console.log(id)
      commit('setLoadingStatus', 'loading')
      commit('setMessage', '')
      return PostService.updatePost(post).then(
        () => {
          commit('updatePost', {post} )
          commit('setLoadingStatus', 'success')
          commit('setMessage', post.message)
          return Promise.resolve(post)
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
    setPost (state, { post }) {
      state.items.push(post)
    },
    updatePost (state, { post }) {
      console.log("updatePost")
      console.log(state)
      console.log(post)
      state.items = state.items.map(elem => elem.id === post.id ? post : elem)
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