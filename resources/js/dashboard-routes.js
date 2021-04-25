import VueRouter from "vue-router";
// users
import UserIndex from "@dashboard/users/index";
import UserAdd from "@dashboard/users/add";
import UserEdit from "@dashboard/users/edit";
// products
import ProductIndex from "@dashboard/products/index";
import ProductAdd from "@dashboard/products/add";
import ProductEdit from "@dashboard/products/edit";
// videos
import VideoIndex from "@dashboard/videos/index";

const router = new VueRouter({
  mode: "history",
  routes: [
    // // USERS COMPONENT ROUTES
    // {
    //     name: "User List",
    //     path: "/dashboard/users",
    //     component: UserIndex,
    // },
    // {
    //     name: "User Add",
    //     path: "/dashboard/user/add",
    //     component: UserAdd,
    // },
    // {
    //     name: "User Edit",
    //     path: "/dashboard/user/:id/edit",
    //     component: UserEdit,
    // },
    // PRODUCTS COMPONENT ROUTES
    {
        name: "Product List",
        path: "/dashboard/products",
        component: ProductIndex,
        meta: {
          breadcrumb: "List"
        },
    },
    {
        name: "Product - Create",
        path: "/dashboard/product/add",
        component: ProductAdd,
        meta: {
          breadcrumb: "Create"
        },
    },
    {
        name: "Product - Edit",
        path: "/dashboard/product/:id/edit",
        component: ProductEdit,
        meta: {
          breadcrumb: "Edit"
        },
    },
    // VIDEO ROUTES
    {
      name: "Videos",
      path: "/dashboard/videos",
      component: VideoIndex,
    },
  ],
});

export { router, VueRouter };
