import PostsService from '../services/posts.service';
const initialState = []

export const posts = {
  namespaced: true,
  state: initialState,

  actions: {  
    createPost ({ commit }, post) {
      //console.log(state.auth)
      //console.log(post)
      return PostsService.createPost(post).then(
        response => {
          //console.log(response)
          commit('setPost', { post } )
          return Promise.resolve(response.data);
        },
        error => {
          console.log(error)
          //commit('registerFailure');
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    setPost (state, { post }) {
      console.log(state)
      console.log(post)
      state.push(post)
    },
  }
}