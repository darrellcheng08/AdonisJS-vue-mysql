<template>
  <v-app>
    <!-- Must have the app property -->
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>
        {{ router_text }}
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn @click="logout" icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- NAVIGATION BAR -->
    <navigation :value="drawer"></navigation>

    <!-- CONTAINER -->
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app :inset="true">
      <span class="px-2 caption ma-auto"
        >&copy; {{ new Date().getFullYear() }} - Company Corp.</span
      >
    </v-footer>
  </v-app>
</template>

<script>
import navigation from "./Navigation.vue";

export default {
  components: { navigation },

  data: () => ({
    drawer: false,
    matched: "",
    router: [],
    router_text: "",
  }),

  created() {
    this.breadCrumbs();
  },

  watch: {
    $route(to, from) {
      this.breadCrumbs();
    },
  },

  methods: {
    logout() {
      window.location = "/logout";
    },

    breadCrumbs() {
      let vm = this;
      let path = this.$route.path;
      let split = path.split("/");
      let string = "";
      vm.router = [];
      for (var i = 0; i < split.length; i++) {
        if (split[i]) {
          string += "/" + split[i];
          vm.matched = string;
          if (vm.$router.match(vm.matched).name) {
            vm.router_text = vm.$router.match(vm.matched).name;
          }
        }
      }
    },
  },
};
</script>
