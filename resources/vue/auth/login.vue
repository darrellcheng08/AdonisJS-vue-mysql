<template>
  <v-app>
    <v-content>
      <v-row dense class="fill-height">
        <v-col lg="8" md="7" class="hidden-sm-and-down panel-left">
          <div class="bubbles-large">
            <img src="/img/vue-logo.png" class="logo-height" />
            <ul class="bg-bubbles">
              <template v-for="(n, i) in 10">
                <li :key="i"></li>
              </template>
            </ul>
            <span class="white--text">Welcome to my website</span>
          </div>
        </v-col>
        <v-col
          class="layout align-center justify-center"
          :class="{ 'panel-left': $vuetify.breakpoint.xsOnly }"
        >
          <div class="bubbles-mobile hidden-sm-and-up">
            <ul class="bg-bubbles">
              <template v-for="(n, i) in 10">
                <li :key="i"></li>
              </template>
            </ul>
          </div>
          <v-col cols="11">
            <v-card
              :flat="$vuetify.breakpoint.smAndUp"
              :class="{
                transparent: $vuetify.breakpoint.smAndUp,
              }"
            >
              <v-card-text>
                <v-form @submit.prevent="submit">
                  <v-row dense column px-3 py-5>
                    <v-col cols="12" class="mb-4">
                      <v-img
                        class="ma-auto"
                        width="170"
                        src="/img/vue-logo.png"
                      ></v-img>
                    </v-col>
                    <v-col cols="12">
                      <div align="center">
                        <h2 class="text--black">Sign In</h2>
                      </div>
                    </v-col>
                    <v-col cols="12" v-if="alert.value">
                      <v-alert
                        class="mt-3"
                        :value="alert.value"
                        :type="alert.color"
                        >{{ alert.text }}</v-alert
                      >
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        type="text"
                        v-model="formData.username"
                        v-validate="'required'"
                        name="Username"
                        label="Username"
                        data-cy="login-username"
                        @keyup.enter="submit"
                        :error-messages="errors.collect('Username')"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        type="password"
                        v-model="formData.password"
                        v-validate="'required'"
                        :error-messages="errors.collect('Password')"
                        name="Password"
                        label="Password"
                        data-cy="login-password"
                        @keyup.enter="submit"
                      ></v-text-field>
                    </v-col>
                    <v-col class="py-3" cols="12">
                      <v-row dense class="ma-0 pa-0">
                        <v-col cols="6">
                          <VCheckbox
                            color="anchor"
                            v-model="formData.remember_me"
                            class="ma-0 pt-0"
                            hide-details
                          >
                            <template #label>
                              <span class="anchor--text" style="font-size: 14px"
                                >Remember me</span
                              >
                            </template>
                          </VCheckbox>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12">
                      <v-btn
                        block
                        color="primary"
                        style="min-height: 40px"
                        ref="loginBtn"
                        :disabled="disabled"
                        @click="login"
                        dark
                      >
                        Login
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
          <span class="font-weight-thin hidden-xs-only powered-text">
            Powered By |
            <a href="https://google.com" target="_blank">Company Corp.</a>
          </span>
        </v-col>

        <v-dialog
          v-model="loading"
          persistent
          max-width="150"
          transition="dialog-transition"
        >
          <v-card>
            <v-card-text class="pt-3 text-center">
              <v-progress-circular
                color="primary"
                indeterminate
              ></v-progress-circular>
              <div class="mt-2">Please wait...</div>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
    </v-content>

    <v-footer class="glass hidden-sm-and-up py-0 pt-1">
      <v-row dense>
        <v-col class="transparent caption">
          <span class="font-weight-thin" style="color: #cecece !important"
            >Powered By |</span
          >
          <a class="white--text" href="https://google.com" target="_blank"
            >Company Corp.</a
          >
        </v-col>
        <v-col class="transparent d-flex justify-end align-center">
          <img class="hidden-md-and-up" src="/img/vue-logo.png" width="100" />
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  layout: "empty",
  data() {
    return {
      formData: {},
      loading: false,
      alert: {},
      disabled: false,
    };
  },
  methods: {
    async login() {
      let vm = this;
      const valid = await vm.$validator.validateAll();
      if (valid) {
        vm.loading = true;
        vm.disabled = true;
        await axios
          .post("/login", vm.formData)
          .then((response) => {
            vm.$cookie.set("api_token", response.api_token);
            vm.alert = {
              value: true,
              text: response.data.message,
              color: "success",
            };
            setTimeout(() => {
              vm.$router.push("/admin/products");
            }, 500);
          })
          .catch((error) => {
            // display error notification
            vm.alert = {
              value: true,
              text: error.response.data.message,
              color: "error",
            };
            vm.disabled = false;
            vm.loading = false;
          });
      } else {
        vm.disabled = false;
        vm.loading = false;
      }
    },
    submit() {
      let vm = this;
      var btn = vm.$refs.loginBtn;
      btn.$el.click();
    },
  },
};
</script>

<style>
.glass {
  background: #a6a6a654 !important;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
}
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");
.v-content__wrap {
  overflow-x: hidden;
  overflow-y: auto;
}
.bubbles-large {
  position: absolute;
  width: 100%;
  overflow: hidden;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
  flex-direction: column;
}
.bubbles-mobile {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.powered-text {
  position: absolute;
  bottom: 5px;
}

.login-footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -100px;
}
.logo-height {
  height: 100px;
}

section {
  display: flex;
  justify-content: center;
  align-items: center;
}

strong {
  font-size: 1.25em;
  font-weight: 600;
}
.has-text-center {
  text-align: center;
}
button {
  width: 100%;
  background: #5e72e4;
  border: 0;
  color: #fff;
  border-radius: 2px;
  padding: 1em;
}

/* form {
			  margin: 2em auto;
			  display: block;
			} */

.wrapper {
  display: flex;
  max-width: 700px;
  justify-content: center;
  align-items: center;
  border: 1px #dbdbdb solid;
}
.panel-left {
  padding: 1em 2em;
  background-color: #fff;
}
.panel-left {
  position: relative;
  background: #5e72e4;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom right, #5e72e4 0%, #004c88 100%);
  min-height: 420px;
}
.panel-right img {
  position: relative;
  z-index: 999;
}
.logo {
  width: 100%;
  margin-bottom: 3em;
}
.logo img {
  max-width: 100%;
  height: 75px;
  display: block;
  margin: auto;
}
@font-face {
  left: 0;
  font-family: "Roboto, sans-serif";
  font-style: normal;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.card-1 {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.bg-bubbles {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.bg-bubbles li {
  position: absolute;
  list-style: none;
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: rgba(255, 255, 255, 0.15);
  bottom: -160px;
  -webkit-animation: square 25s infinite;
  animation: square 25s infinite;
  transition-timing-function: linear;
}
.bg-bubbles li:nth-child(1) {
  left: 10%;
}
.bg-bubbles li:nth-child(2) {
  left: 20%;
  width: 80px;
  height: 80px;
  -webkit-animation-delay: 2s;
  animation-delay: 2s;
  -webkit-animation-duration: 17s;
  animation-duration: 17s;
}
.bg-bubbles li:nth-child(3) {
  left: 25%;
  -webkit-animation-delay: 4s;
  animation-delay: 4s;
}
.bg-bubbles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  -webkit-animation-duration: 22s;
  animation-duration: 22s;
  background-color: rgba(255, 255, 255, 0.25);
}
.bg-bubbles li:nth-child(5) {
  left: 70%;
}
.bg-bubbles li:nth-child(6) {
  left: 80%;
  width: 120px;
  height: 120px;
  -webkit-animation-delay: 3s;
  animation-delay: 3s;
  background-color: rgba(255, 255, 255, 0.2);
}
.bg-bubbles li:nth-child(7) {
  left: 32%;
  width: 160px;
  height: 160px;
  -webkit-animation-delay: 7s;
  animation-delay: 7s;
}
.bg-bubbles li:nth-child(8) {
  left: 55%;
  width: 20px;
  height: 20px;
  -webkit-animation-delay: 15s;
  animation-delay: 15s;
  -webkit-animation-duration: 40s;
  animation-duration: 40s;
}
.bg-bubbles li:nth-child(9) {
  left: 25%;
  width: 10px;
  height: 10px;
  -webkit-animation-delay: 2s;
  animation-delay: 2s;
  -webkit-animation-duration: 40s;
  animation-duration: 40s;
  background-color: rgba(255, 255, 255, 0.3);
}
.bg-bubbles li:nth-child(10) {
  left: 90%;
  width: 160px;
  height: 160px;
  -webkit-animation-delay: 11s;
  animation-delay: 11s;
}
@-webkit-keyframes square {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(-1000px) rotate(600deg);
    transform: translateY(-1000px) rotate(600deg);
  }
}
@keyframes square {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(-1000px) rotate(600deg);
    transform: translateY(-1000px) rotate(600deg);
  }
}
</style>
