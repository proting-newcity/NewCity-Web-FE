import axios from 'axios';

axios.defaults.baseURL         = 'https://api.alvanm.my.id';
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName  = 'XSRF-TOKEN';
axios.defaults.xsrfHeaderName  = 'X-XSRF-TOKEN';

axios.defaults.headers.common['Accept'] = 'application/json';

export default axios;
