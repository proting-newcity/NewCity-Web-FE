// src/axios.js
import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.baseURL         = 'https://api.alvanm.my.id';
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.headers.common['Accept'] = 'application/json';

axios.interceptors.request.use((config) => {
  const token = Cookies.get('XSRF-TOKEN');
  if (token && config.method && config.method.toLowerCase() !== 'get') {
    config.headers['X-XSRF-TOKEN'] = token;
  }
  return config;
});

export default axios;
