import axios from 'axios';

const API_URL = 'http://localhost:3000/api/posts/';

class PostService {
  createPost(post) {
    return axios
      .post(API_URL, post)
      .then(response => response.data);
  }
  getAllPost() {
    return axios
      .get(API_URL)
      .then(response => response.data);
  }
}

export default new PostService();
