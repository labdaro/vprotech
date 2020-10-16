<template>
  <v-container class="fill-height">
    <v-row justify="center" class="mt-12">
      <v-col>
        <div class="text-center">
          <span class="blue--text display-4">ស្តុកទំនិញ </span>       
        </div>
      </v-col>
    </v-row>

    <v-row align="center" justify="center" class="mb-12">
      <v-col cols="10" sm="6" md="5">
        <v-card flat>
          <v-card-title class="headline blue--text">
          </v-card-title>

          <v-card-text>
            <v-form ref="login">
              <v-text-field
                label="Username"
                type="text"
                prepend-icon="mdi-account"
                :rules="[
                    v => !!v || 'Username is required'
                 
                  ]"
                required
                v-model="signinUser.email"
              />

              <v-text-field
                label="Password"
                type="password"
                prepend-icon="mdi-lock"
                :rules="[v => !!v || 'Password is required']"
                required
                v-model="signinUser.password"
              />
            </v-form>
          </v-card-text>

          <v-alert color="red" :value="error" icon="close">The email or password is in correct.</v-alert>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn block x-small outlined class="blue--text" @click="signIn">Login</v-btn>
          </v-card-actions>
          <div class="caption font-weight-light text-center mt-8 px-10">
            Copyright © 2020 V-Protech
          </div>
          <div class="text-center">
            <v-btn text icon x-small class>
              <span class="text-lowercase">help</span>
              <v-icon>mdi-help-circle-outline</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { signin } from "../Utilities/backend";
export default {
  props: {
    source: String,
  },
  data() {
    return {
      signinUser: {
        email: null,
        password: null,
      },
      error: false,
    };
  },
  methods: {
    async signIn() {
      if (this.$refs.login.validate()) {
        await signin(this.signinUser);
      } else {
        alert("Please fill the form correctly!");
      }
    },
  },
  created() {},
};
</script>

<style></style>
