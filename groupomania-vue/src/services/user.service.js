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

  // use fetch to send the request, found some problems with axios
  updateUser(formData) {
    const user = JSON.parse(formData.get('user'))
    const url=`${API_URL}/${user.id}`
    return fetch(url, {
      method: "PUT",
      body: formData,
      headers: { ...authHeader(), 'accept': 'application/json'}})
      .then(response => response.data);
  }

  deleteUser(id) {
    return axios
      .delete(`${API_URL}${id}`, { headers: authHeader() })
      .then(response => response.data);
  } 
}

export default new UserService();

