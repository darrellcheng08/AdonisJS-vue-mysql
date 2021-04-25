window.Vue = require("vue");

import * as VeeValidate from 'vee-validate';
import VueCookie from "vue-cookie";
import axios from "axios";
import vuetify from '@js/plugins/vuetify';
import Login from "@auth/login";

import { router, VueRouter } from "@js/auth-routes";

Vue.use(VueCookie);
Vue.use(VueRouter);
Vue.use(VeeValidate);

Vue.config.productionTip = false;

window.axios = axios;
router.afterEach((to, from) => {
  if (to.hash) {
    router.push(to.path + "?backurl=" + to.hash.substr(1));
  }
});

new Vue({
  vuetify,
  router,
  el: "#app",
});

new Vue({
  router,
  render: (h) => h(Login),
}).$mount("#app");