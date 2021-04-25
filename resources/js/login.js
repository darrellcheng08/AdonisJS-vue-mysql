window.Vue = require("vue");

import * as VeeValidate from 'vee-validate';
import VueCookie from "vue-cookie";
import axios from "axios";
import store from './store/index'
import vuetify from '@js/plugins/vuetify';
import router from "@routes/auth";

Vue.use(VueCookie);
Vue.use(VeeValidate);

Vue.config.productionTip = false;

window.axios = axios;
router.afterEach((to, from) => {
  if (to.hash) {
    router.push(to.path + "?backurl=" + to.hash.substr(1));
  }
});

const app = new Vue({
  vuetify,
  router,
  store,
  el: "#app",
});