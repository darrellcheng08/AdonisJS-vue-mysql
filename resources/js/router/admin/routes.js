function Index() {
  return import(/* webpackChunkName: "Index" */ '@admin/Index.vue')
}
function Navigation() {
  return import(/* webpackChunkName: "Navigation" */ '@admin/Navigation.vue')
}
function products_index() {
  return import(
    /* webpackChunkName: "products-index" */ '@admin/products/index.vue'
  )
}
function users_index() {
  return import(/* webpackChunkName: "users-index" */ '@admin/users/index.vue')
}
function videos_index() {
  return import(
    /* webpackChunkName: "videos-index" */ '@admin/videos/index.vue'
  )
}
function products_add() {
  return import(
    /* webpackChunkName: "products-add" */ '@admin/products/add.vue'
  )
}
function users_add() {
  return import(/* webpackChunkName: "users-add" */ '@admin/users/add.vue')
}
function products__id_edit() {
  return import(
    /* webpackChunkName: "products-id-edit" */ '@admin/products/_id/edit.vue'
  )
}
function users__id_edit() {
  return import(
    /* webpackChunkName: "users-id-edit" */ '@admin/users/_id/edit.vue'
  )
}

export default [
  {
    name: 'Index',
    path: '/Index',
    component: Index,
  },
  {
    name: 'Navigation',
    path: '/Navigation',
    component: Navigation,
  },
  {
    name: 'products',
    path: '/products',
    component: products_index,
  },
  {
    name: 'users',
    path: '/users',
    component: users_index,
  },
  {
    name: 'videos',
    path: '/videos',
    component: videos_index,
  },
  {
    name: 'products-add',
    path: '/products/add',
    component: products_add,
  },
  {
    name: 'users-add',
    path: '/users/add',
    component: users_add,
  },
  {
    name: 'products-id-edit',
    path: '/products/:id/edit',
    component: products__id_edit,
  },
  {
    name: 'users-id-edit',
    path: '/users/:id/edit',
    component: users__id_edit,
  },
]
