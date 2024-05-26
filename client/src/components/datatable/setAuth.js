import axios from 'axios';

export const setAuthToken = (token, role, id) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    if (role) localStorage.setItem('userRole', role);
    if (id) localStorage.setItem('userId', id);
  } else {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
  }
};

export default setAuthToken;
