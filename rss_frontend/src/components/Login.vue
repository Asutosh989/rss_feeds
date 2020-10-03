<template>
  <div style="height: 100%" class="d-flex align-center">
    <v-card width="400" class="mx-auto my-auto">
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="user.username"
          label="Username"
          type="text"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="user.password"
          label="Password"
          type="password"
          outlined
        ></v-text-field>
        <v-btn
          width="100%"
          color="primary"
          :loading="showLoading"
          @click="signIn"
          >Login</v-btn
        >
      </v-card-text>
    </v-card>
    <v-snackbar :color="color" v-model="showSnackbar">{{
      this.snackbarMsg
    }}</v-snackbar>
  </div>
</template>

<script>
import Api from "@/api";

export default {
  name: "Login",

  data: () => ({
    user: {
      username: "",
      password: "",
    },
    snackbarMsg: "",
    color: "",
    showSnackbar: false,
    showLoading: false,
  }),
  methods: {
    signIn() {
      Api.login(this.user)
        .then((response) => {
          this.color = "success";
          this.snackbarMsg = response.data;
          this.showSnackbar = true;
          this.showLoading = true;
          setTimeout(() => {
            this.showLoading = false;
            this.$router.push("/dashboard");
          }, 2000);
        })
        .catch((error) => {
          // const errorStatusCode = error.response.status;
          this.color = "error";
          this.snackbarMsg = error.response.data;
          this.showSnackbar = true;
          this.showLoading = true;
          setTimeout(() => {
            this.showLoading = false;
            this.$router.push("/");
          }, 1500);
        });
    },
    goToDashboard() {
      this.$router.push("/dashboard");
    },
  },
};
</script>
