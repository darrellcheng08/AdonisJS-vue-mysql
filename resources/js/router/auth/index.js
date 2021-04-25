import Vue from "vue";
import VueRouter from "vue-router";

import routes from "./routes";
// import layout from "@layouts/auth";
// const Error = () => import("@errors/Error404");

// const Error = ()=> import('@components/Error');
Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    ...routes,
  ],
});
