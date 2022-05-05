import axios from 'axios';
const API_URL = 'http://localhost:3000/api/posts/';
import authHeader from './auth-header';
class CommentService {
  createComment({comment, postId}) {
    console.log({ headers: authHeader() });
    return axios
      .post(`${API_URL}${postId}/comments`, comment, { headers: authHeader() })
      .then(response => response.data);
  }
  getAllComment({postId}) {
    return axios
      .get(`${API_URL}${postId}/comments`, { headers: authHeader() })
      .then(response => response.data);
  }
}

export default new CommentService();
