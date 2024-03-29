import PostService from '../services/post.service';
const initialState = { 
  items: [],  //liste de posts
  currentItem: null,  //currentPost
  loadingStatus: null,
  message: ''
}

export const posts = {
  namespaced: true,
  state: initialState,

  actions: {  
    createPost ({ commit }, {post}) {
      commit('setLoadingStatus', 'loading')
      commit('setMessage', '')
      return PostService.createPost(post).then(
        response => {
          commit('setPost', {post})
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
          commit('setPostItems', {items: initialState.items} )
          commit('setLoadingStatus', 'failure')
          commit('setMessage', error.message)
          return Promise.reject(error);
        }
      );
    },
    getOnePost ({ commit }, id) {
      commit('setLoadingStatus', 'loading')
      commit('setCurrentItem', {post: null})
      commit('setMessage', '')
      return PostService.getOnePost(id).then(
        post => {
          commit('setCurrentItem', {post})
          commit('setLoadingStatus', 'success')
          // ça n'existe pas de message de reponse 
          return Promise.resolve(post)
        },
        error => {
          commit('setLoadingStatus', 'failure')
          commit('setMessage', error.message)
          return Promise.reject(error);
        }
      );
    },
    deletePost ({ commit }, id) {
      commit('setLoadingStatus', 'loading')
      commit('setCurrentItem', {post: null})
      return PostService.deletePost(id).then(
        data => {
          commit('setLoadingStatus', 'success')
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
    updatePost ({ commit }, {post}) {
      commit('setLoadingStatus', 'loading')
      commit('setMessage', '')
      return PostService.updatePost(post).then(
        response => {
          commit('updatePost', {post})
          commit('setLoadingStatus', 'success')
          commit('setMessage', response.message)
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
    setPost (state, {post}) {
      state.items.push(post)
    },
    setCurrentItem (state, {post}) {
      state.currentItem = post;
    },
    updatePost (state, {post}) {
      state.items = state.items.map(elem => elem.id === post.id ? post : elem)
    },
    deletePost (state, id) {
      state.items = state.items.filter(elem => elem.id !== id )
    },
    setPostItems (state, {post}) {
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