<template>
  <v-app>
    <AppBar v-if="$route.name !== 'signin' && userFetched" />
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import auth from "./Utilities/auth";
import AppBar from "./components/Appbar";
export default {
  name: "App",

  components: {
    AppBar
  },

  data: () => ({
    userFetched: false
  }),
  methods: {
    async getUser() {
      if (this.$route.name !== "signin") {
        await this.$store.dispatch("setUser");
        this.userFetched = true;
      }
    }
  },
  created() {
    this.getUser();
    auth();
  }
};
</script>
