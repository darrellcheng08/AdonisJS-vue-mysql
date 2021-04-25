<template>
  <v-navigation-drawer dark permanent app>
    <v-toolbar height="82" color="transparent" flat>
      <!-- LOGO HERE -->
      <v-row justify="center">
        <v-avatar size="80">
          <img src="/img/vue-logo.png" alt="Vue Logo" />
        </v-avatar>
      </v-row>
    </v-toolbar>
    <v-divider></v-divider>
    <!-- USER INFO -->
    <v-list-item>
      <v-list-item-avatar>
        <img src="https://randomuser.me/api/portraits/men/85.jpg" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="title">
          {{ info.name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ info.email }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title" :to="item.url" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: "Products",
          icon: "mdi-package-variant",
          url: "/admin/products",
        },
        {
          title: "Videos",
          icon: "mdi-youtube-tv",
          url: "/admin/videos",
        },
      ],
      info: {},
      right: null,
    };
  },

  async created() {
    let vm = this;
    const { data } = await axios.get(`/get-user-info`);
    vm.info = data;
  },
};
</script>
