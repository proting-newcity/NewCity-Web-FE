import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://api.alvanm.my.id/";
axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';