import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    // Apply the token to every request header
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('accessToken', token);
  } else {
    // Delete the token from the request header
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('accessToken');
  }
};

export default setAuthToken;
