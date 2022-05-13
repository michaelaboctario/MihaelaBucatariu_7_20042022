import axios from 'axios';
const API_URL = 'http://localhost:3000/api/users/';
import authHeader from './auth-header';

class UserService {
  getAllUser() {
    return axios
      .get(API_URL, { headers: authHeader() })
      .then(response => response.data);
  }
  getOneUser(id) {
    return axios
      .get(`${API_URL}${id}`, { headers: authHeader() })
      .then(response => response.data);
  }
  updateUser(user) {
    return axios
      .put(`${API_URL}${user.id}`, user, { headers: authHeader() })
      .then(response => response.data);
  }
  deleteUser(id) {
    return axios
      .delete(`${API_URL}${id}`, { headers: authHeader() })
      .then(response => response.data);
  } 
}

export default new UserService();

