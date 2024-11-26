import "./assets/main.css";
import "bootstrap/dist/css/bootstrap.css";
import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./axios";

const pinia = createPinia();

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

const app = createApp(App);

app.use(router);
app.use(pinia);

app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";
