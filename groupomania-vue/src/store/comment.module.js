import CommentService from '../services/comment.service';
const initialState = { 
  postId: null,
  commentItems: [],  //liste de comments
  loadingStatus: null,
  message: ''
}

export const comments = {
  namespaced: true,
  state: initialState,

  actions: {  
    createComment ({ commit }, { comment, postId }) {
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
          commit('setCommentItems', {comment, postId})
          commit('setLoadingStatus', 'success')
          commit('setMessage', '')
          return Promise.resolve(comment)
        },
        error => {
          commit('setCommentItems', { comment: initialState.commentItems, postId: null} )
          commit('setLoadingStatus', 'failure')
          commit('setMessage', error.message)
          return Promise.reject(error)
        }
      );
    },
    deleteComment ({ commit }, id) {
      console.log("deleteComment id", id)
      commit('setLoadingStatus', 'loading')
      commit('setMessage', '')
      return CommentService.deleteComment(id).then(
        data => {
          commit('setLoadingStatus', 'success')
          commit('deleteComment', id)
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
    setComment (state, {comment, postId}) {
      if(state.postId === postId) {
        state.commentItems.push(comment)
      }
      else { 
        state.commentItems = [comment]
      }
    },
    setCommentItems (state, {comment, postId}) {
      state.postId = postId
      state.commentItems = comment
    },
    deleteComment (state, id) {
      state.commentItems = state.commentItems.filter(elem => elem.id !== id )
    },
    setLoadingStatus (state, status) {
      state.loadingStatus = status
    },
    setMessage (state, message) {
      state.message = message
    }
  }
}