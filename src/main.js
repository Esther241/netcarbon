import "./assets/main.css";
import axios from "axios";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createVuetify } from "vuetify";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";
import "./assets/main.css";

const app = createApp(App);

const vuetify = createVuetify({
  components,
  directives,
});

axios.defaults.baseURL = "https://api.example.com";
axios.defaults.headers.common["Authorization"] = "Bearer token";

app.config.globalProperties.$axios = axios;

app.use(router);
app.use(vuetify);
app.mount("#app");
