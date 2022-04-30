import PostService from '../services/post.service';
const initialState = []

export const posts = {
  namespaced: true,
  state: initialState,

  actions: {  
    createPost ({ commit }, post) {
      return PostService.createPost(post).then(
        response => {
          commit('setPost', {post} )
          return Promise.resolve(response.data)
        },
        error => {
          console.log(error)
          //commit('registerFailure');
          return Promise.reject(error)
        }
      );
    },
    getAllPost ({ commit }) {
      return PostService.getAllPost().then(
        post => {
          //console.log("PostService.getAllPost")
          //console.log(post)
          commit('setPostItems', {post} )
          return Promise.resolve(post)
        },
        error => {
          //console.log(error)
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    setPost (state, { post }) {
      //console.log(state)
      //console.log(post)
      state.push(post)
    },
    setPostItems (state, { post }) {
      //console.log("setPostItems")
      //console.log(post)
      state.items = post
      //console.log(state)
    },
  }
}