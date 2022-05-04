import axios from 'axios';
const API_URL = 'http://localhost:3000/api/posts/';
import authHeader from './auth-header';
class PostService {
  createPost(post) {
    console.log({ headers: authHeader() });
    return axios
      .post(API_URL, post, { headers: authHeader() })
      .then(response => response.data);
  }
  getAllPost() {
    return axios
      .get(API_URL, { headers: authHeader() })
      .then(response => response.data);
  }
  getOnePost(id) {
    const url = `${API_URL}${id}`;
    console.log(url)
    return axios
      .get(`${API_URL}${id}`, { headers: authHeader() })
      .then(response => response.data);
  }
  updatePost(post) {
    const url = API_URL+`${post.id}`;
    console.log(url)
    return axios
      .put(API_URL+`${post.id}`, post, { headers: authHeader() })
      .then(response => response.data);
  }
}

export default new PostService();
