import Vue from "vue";
window._ = require("lodash");

import _axios from "axios";

import VueCookie from "vue-cookie";
import vuetify from '@js/plugins/vuetify';
import * as VeeValidate from 'vee-validate';
import ToastSnackBar from "@components/toast-snackbar";
import router from "@routes/admin";

Vue.use(VeeValidate);
Vue.use(VueCookie);
Vue.use(ToastSnackBar);

try {
  window.$ = window.jQuery = require("jquery");
} catch (e) {}

let token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
  window.axios = _axios.create({
    baseURL: window.location.origin + "/api",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRF-TOKEN": token.content,
    },
  });
} else {
  console.error('CSRF token not found.');
}

(async function() {
  if (!VueCookie.get("api_token")) {
    window.location = "/logout";
    return;
  }
  await axios.interceptors.request.use((config) => {
    if (VueCookie.get("api_token") == "undefined") {
      window.location = "/logout";
      return;
    }
    config.headers["Authorization"] = "Bearer " + VueCookie.get("api_token");
    return config;
  });
  await axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response.status === 401) {
        await axios.get("/logout");
      } else if (error.response.status === 403) {
        location.href = "/forbidden";
      } else if (error.response.status === 404) {
        router.replace("/not-found");
      }
    }
  );
})();

import index from "@admin/Index.vue";

const app = new Vue({
  vuetify : vuetify,
  render: h => h(index),
  el: "#app",
});
