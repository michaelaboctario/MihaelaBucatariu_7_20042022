import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:3000/api/posts/';

class PostService {
  createPost(post) {
    return axios
      .post(API_URL, { headers: authHeader() }, post)
      .then(response => response.data);
  }
  getAllPost() {
    return axios
      .get(API_URL)
      .then(response => response.data);
  }
  getOnePost(id) {
    const url = `${API_URL}${id}`;
    console.log(url)
    return axios
      .get(`${API_URL}${id}`)
      .then(response => response.data);
  }
  updatePost(post) {
    const url = API_URL+`${post.id}`;
    console.log(url)
    return axios
      .put(API_URL+`${post.id}`, post)
      .then(response => response.data);
  }
}

export default new PostService();
