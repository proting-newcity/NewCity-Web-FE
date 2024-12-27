import "./assets/main.css";
import "bootstrap/dist/css/bootstrap.css";
import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./axios";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPen, faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
library.add(faPen, faTrashAlt, faPlus);

const pinia = createPinia();

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.use(pinia);

app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";
