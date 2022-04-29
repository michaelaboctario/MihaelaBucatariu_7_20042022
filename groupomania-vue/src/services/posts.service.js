import axios from 'axios';

const API_URL = 'http://localhost:3000/api/posts/';

class PostsService {
  createPost(post) {
    return axios
      .post(API_URL, post)
      .then(response => response.data);
  }
}

export default new PostsService();
