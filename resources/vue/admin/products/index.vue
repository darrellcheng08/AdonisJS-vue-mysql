<template>
  <div>
    <loading v-model="show_loading"></loading>
    <v-row>
      <v-col cols="3">
        <v-text-field
          label="Search (Name or Description)"
          v-model="filters.search"
          prepend-icon="mdi-magnify"
          @click:clear="
            filters.search = '';
            filterData();
          "
          @keyup.enter="filterData"
          hide-details
          clearable
        >
        </v-text-field>
      </v-col>
      <v-col cols="3">
        <v-autocomplete
          label="Category"
          v-model="filters.category_id"
          :items="categories"
          item-text="name"
          item-value="id"
          @click:clear="
            filters.category_id = '';
            filterData();
          "
          hide-details
          clearable
        ></v-autocomplete>
      </v-col>
      <v-col cols="2">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              @click="filterData"
              v-bind="attrs"
              v-on="on"
              fab
              dark
              small
              color="success"
            >
              <v-icon dark> mdi-magnify </v-icon>
            </v-btn>
          </template>
          <span>Filter</span>
        </v-tooltip>
      </v-col>
      <v-col cols="4" class="pb-0">
        <v-btn class="float-right" color="info" to="/dashboard/product/add">
          Create Product
        </v-btn>
      </v-col>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="products"
          :items-per-page="10"
          class="elevation-1"
        >
          <template v-slot:item.actions="{ item }">
            <v-btn color="primary" @click="editItem(item.id)" fab x-small dark>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              color="error"
              @click="showDeleteDialog(item.id)"
              fab
              x-small
              dark
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-toolbar color="warning" dark>
          <v-icon>mdi-alert</v-icon>
          <div class="pl-3 text-h5">Warning</div></v-toolbar
        >
        <v-card-text>
          <div class="pa-4 text-h6">
            Are you sure you want to delete this product?
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="dialog = false">Close</v-btn>
          <v-btn color="error" @click="deleteItem">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import loading from "@components/Loading.vue";
import ProductDataService from "@services/ProductDataService";

export default {
  components: { loading },
  data() {
    return {
      headers: [
        { text: "Name", value: "name" },
        { text: "Description", value: "description" },
        { text: "Category", sortable: false, value: "category.name" },
        { text: "Date", value: "date_time" },
        { text: "Actions", value: "actions" },
      ],
      dialog: false,
      show_loading: false,
      form: {},
      filters: {},
      products: [],
      categories: [],
    };
  },

  async created() {
    let vm = this;
    vm.show_loading = true;
    await vm.getProducts();
    await vm.getCategory();
    vm.show_loading = false;
  },

  methods: {
    editItem(id) {
      this.$router.push(`/dashboard/product/${id}/edit`);
    },

    showDeleteDialog(id) {
      let vm = this;
      vm.dialog = true;
      vm.form.id = id;
    },

    async deleteItem() {
      let vm = this;
      vm.show_loading = true;
      ProductDataService.delete(vm.form.id)
        .then((response) => {
          vm.$toast("Product successfully deleted.", "success");
          await vm.getProducts();
          vm.dialog = false;
          vm.show_loading = false;
        })
        .catch((e) => {
          vm.$toast(e, "error");
          vm.show_loading = false;
        });
    },

    async filterData() {
      let vm = this;
      vm.show_loading = true;
      await vm.getProducts();
      vm.show_loading = false;
    },

    async getProducts() {
      let vm = this;
      ProductDataService.getAll()
        .then((response) => {
          vm.products = response.data;
        })
        .catch((e) => {
          vm.$toast(e, "error");
        });
    },

    async getCategory() {
      const { data } = await axios.get("/categories");
      this.categories = data;
    },
  },
};
</script>
