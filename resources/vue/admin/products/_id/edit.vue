<template>
  <div>
    <loading v-model="show_loading"></loading>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1">
          Step 1: Product Information
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="step > 2" step="2">
          Step 2: Product Images
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3"> Step 3: Schedule </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <!-- PRODUCT INFORMATION -->
        <v-stepper-content step="1">
          <v-row justify="center">
            <v-col cols="6" xs="12" md="8" sm="12" lg="6">
              <v-card class="mb-3">
                <v-card-text class="pa-3">
                  <v-form data-vv-scope="product-info" class="pb-3">
                    <v-text-field
                      label="Name"
                      v-validate="'required'"
                      :error-messages="errors.collect('product-info.name')"
                      data-vv-name="name"
                      v-model="form.name"
                      required
                    ></v-text-field>

                    <v-autocomplete
                      label="Category"
                      v-model="form.category_id"
                      :items="categories"
                      item-text="name"
                      item-value="id"
                      v-validate="'required'"
                      :error-messages="errors.collect('product-info.category')"
                      data-vv-name="category"
                      required
                    ></v-autocomplete>

                    <v-textarea
                      label="Description"
                      autocomplete="description"
                      v-model="form.description"
                      v-validate="'required'"
                      :error-messages="
                        errors.collect('product-info.description')
                      "
                      data-vv-name="description"
                      required
                    ></v-textarea>
                  </v-form>

                  <v-btn color="primary" @click="validateStep(2)"> Next </v-btn>
                  <v-btn text @click="cancel"> Cancel </v-btn>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-stepper-content>

        <!-- PRODUCT IMAGES -->
        <v-stepper-content step="2">
          <v-row justify="center">
            <v-col cols="6" xs="12" md="8" sm="12" lg="6">
              <v-card class="mb-3">
                <v-card-text class="pa-3">
                  <v-alert dismissible :value="true" type="info">
                    Note: Click the box below to upload an image.
                  </v-alert>
                  <v-form data-vv-scope="product-image" class="pb-4">
                    <v-img
                      @click="pickFile"
                      :src="placeholderImage"
                      aspect-ratio="2.5"
                      contain
                      style="border-radius: 5px"
                    >
                    </v-img>

                    <v-row justify="center">
                      <v-col class="mt-3" cols="3" xs="3" md="3" sm="3" lg="3">
                        <v-btn align="center" color="info" @click="addImage">
                          Add Image
                        </v-btn>
                      </v-col>
                    </v-row>

                    <input
                      type="file"
                      style="display: none"
                      @change="onFilePicked"
                      ref="image"
                      accept="image/*"
                    />

                    <div class="py-3">
                      <strong>Images:</strong>
                      <v-row>
                        <v-col
                          v-for="(image, key) in images"
                          :key="key"
                          class="d-flex child-flex"
                          cols="4"
                        >
                          <v-card>
                            <v-img
                              :src="image.image_url"
                              aspect-ratio="1"
                              class="grey lighten-2"
                            >
                            </v-img>

                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn @click="removeImage(key, image.id)" icon>
                                <v-icon>mdi-delete</v-icon>
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-col></v-row
                      >
                    </div>
                    <span class="error--text">{{ errorText }}</span>
                  </v-form>

                  <!-- ACTIONS -->
                  <v-btn color="primary" @click="validateStep(3)"> Next </v-btn>
                  <v-btn text @click="step = 1"> Back </v-btn>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-stepper-content>

        <!-- SCHEDULE -->
        <v-stepper-content step="3">
          <v-row justify="center">
            <v-col cols="6" xs="12" md="8" sm="12" lg="6">
              <v-card class="mb-3">
                <v-card-text class="pa-3">
                  <v-form data-vv-scope="product-schedule" class="pb-3">
                    <v-text-field
                      label="Date and Time"
                      v-validate="'required'"
                      type="datetime-local"
                      :error-messages="
                        errors.collect('product-schedule.date time')
                      "
                      data-vv-name="date time"
                      v-model="form.date_time"
                      required
                    ></v-text-field>
                  </v-form>

                  <!-- ACTIONS -->
                  <v-btn color="primary" @click="save"> Submit </v-btn>
                  <v-btn text @click="step = 2"> Back </v-btn>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import loading from "@components/Loading.vue";
import ProductDataService from "@services/ProductDataService";

export default {
  components: {
    loading,
  },
  data: () => ({
    step: 1,
    errorText: "",
    placeholderImage: "/img/default-image.png",
    form: {},
    categories: [],
    images: [],
    image_file: "",
    image_files: [],
    delete_images: [],
    show_loading: false,
  }),

  async created() {
    let vm = this;
    await vm.initialize();
    await vm.getCategory();
  },

  computed: {
    async valid() {
      let vm = this;
      return await vm.$validator.validateAll("product-info");
    },
    async valid2() {
      let vm = this;
      return (await vm.images.length) > 0;
    },
    async valid3() {
      let vm = this;
      return await vm.$validator.validateAll("product-schedule");
    },
  },

  methods: {
    async initialize() {
      let vm = this;
      let id = this.$route.params.id;
      ProductDataService.get(id)
        .then((response) => {
          vm.form = response.data;
          let date = new Date(vm.form.created_at).toISOString().substr(0, 11);
          vm.form.created_at =
            date +
            new Date(vm.form.created_at).getHours() +
            ":" +
            new Date(vm.form.created_at).getMinutes();
          // vm.images = vm.form.images;
        })
        .catch((e) => {
          vm.$toast(e, "error");
        });
    },

    async getCategory() {
      const { data } = await axios.get("/categories");
      this.categories = data;
    },

    addImage() {
      let vm = this;
      if (vm.image_file) {
        vm.image_files.push(vm.image_file);
        vm.images.push({ image_url: vm.placeholderImage });
        vm.image_file = "";
        vm.placeholderImage = "/img/default-image.png";
      } else {
        vm.$toast("Please select an image file.", "error");
      }
    },

    removeImage(index, id) {
      let vm = this;
      vm.delete_images.push(id);
      vm.images.splice(index, 1);
    },

    async onFilePicked(e) {
      let vm = this;
      const files = e.target.files;

      if (files.length == 0) {
        vm.form.file = null;
        return;
      }
      if (files[0].type.substr(0, 5) != "image") {
        vm.form.file = null;
        vm.errorText = "File must be an image";
        return;
      }

      var reader = new FileReader();
      reader.onload = function (e) {
        vm.$emit("input", e.target.result);
      };
      reader.readAsDataURL(files[0]);
      vm.placeholderImage = URL.createObjectURL(files[0]);
      vm.image_file = files[0];
      vm.errorText = "";
    },

    pickFile() {
      this.$refs.image.click();
    },

    async save() {
      let vm = this;
      if (!(await vm.valid)) {
        vm.step = 1;
        return;
      } else if (vm.images.length == 0) {
        vm.step = 2;
        vm.$toast("Product image file is required", "warning");
        return;
      } else if (!(await vm.valid3)) {
        vm.step = 3;
        return;
      } else {
        vm.show_loading = true;
        const formData = new FormData();
        formData.append("id", vm.$route.params.id);
        formData.append("name", vm.form.name);
        formData.append("description", vm.form.description);
        formData.append("category_id", vm.form.category_id);
        formData.append("date_time", vm.form.date_time);
        if (vm.delete_images) {
          $.each(vm.delete_images, function (key, id) {
            formData.append(`delete_images[${key}]`, id);
          });
        }
        if (vm.image_files) {
          $.each(vm.image_files, function (key, image) {
            formData.append(`images[${key}]`, image);
          });
        }

        ProductDataService.update(formData)
          .then((response) => {
            vm.$toast("Product successfully updated.", "success");
            vm.$router.push("/dashboard/products");
          })
          .catch((e) => {
            vm.$toast(e, "error");
            vm.show_loading = false;
          });
      }
    },

    // validating each step form
    async validateStep(step) {
      let vm = this;

      const next = () => {
        if (step == 0) {
          vm.step = vm.step + 1;
        } else {
          vm.step = step;
        }
      };
      if (vm.step == 1) {
        if (await vm.valid) {
          if (step == 2 && (await vm.valid2) && (await vm.valid3)) {
            next();
          } else {
            next();
          }
        }
      } else if (vm.step == 2) {
        if (await vm.valid2) {
          if (step == 3 && (await vm.valid3)) {
            next();
          } else {
            next();
          }
        }
        if (vm.image_file) {
          vm.addImage();
        }
        vm.$toast("Product image file is required", "warning");
      } else if (vm.step == 3) {
        if (await vm.valid3) {
          next();
        }
      }
    },

    cancel() {
      this.$router.go(-1);
    },
  },
};
</script>
