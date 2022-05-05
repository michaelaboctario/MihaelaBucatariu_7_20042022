import CommentService from '../services/comment.service';
const initialState = { 
  postId: null,
  commentItems: [],  //liste de comments
  commentCurrentItem: null,  //currentComment
  loadingStatus: null,
  message: ''
}

export const comments = {
  namespaced: true,
  state: initialState,

  actions: {  
    createComment ({ commit }, { comment, postId }) {
      console.log("createComment befor commit", comment, postId)
      commit('setLoadingStatus', 'loading')
      commit('setMessage', '')
      return CommentService.createComment({ comment, postId }).then(
        response => {
          commit('setComment', {comment, postId})
          commit('setLoadingStatus', 'success')
          commit('setMessage', response.message)
          return Promise.resolve(comment)
        },
        error => {
          commit('setLoadingStatus', 'failure')
          commit('setMessage', error.message)
          return Promise.reject(error)
        }
      );
    },
    getAllComment ({ commit }, {postId}) {
      commit('setLoadingStatus', 'loading')
      commit('setMessage', '')
      return CommentService.getAllComment({postId}).then(
        comment => {
          commit('setItems', {comment})
          commit('setLoadingStatus', 'success')
          commit('setMessage', comment.message)
          return Promise.resolve(comment)
        },
        error => {
          commit('setCommentItems', { commentItems: initialState.commentItems} )
          commit('setLoadingStatus', 'failure')
          commit('setMessage', error.message)
          return Promise.reject(error)
        }
      );
    },
  },
  mutations: {
    setComment (state, {comment, postId}) {
      console.log("setComment", comment, postId);
      if(state.postId === postId) {
        state.commentItems.push(comment)
      }
      else { 
        state.commentItems = [comment]
      }
    },
    setCommentItems (state, {comment}) {
      state.items = comment
    },
    setLoadingStatus (state, status) {
      state.loadingStatus = status
    },
    setMessage (state, message) {
      state.message = message
    }
  }
}