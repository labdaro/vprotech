<template>
  <v-container>
    
    <v-navigation-drawer  dark v-model="drawer"  app v-if="$route.name !== 'login'">
   
      <v-list nav dense class="display-2">
        <div class="text-center">
         <v-avatar
      size="70"
    >
    <v-img src="../assets/vprotech.png"></v-img> <br>
    </v-avatar>
         
        </div>
         <!-- <span class="blue--text">V-Protect</span> -->
         <span class="font-weight-bold blue--text ml-8">V-protech</span>
        <v-divider></v-divider>
       
        <v-list-item v-for="item in items" :key="item.title" link :to="item.url">
          <v-list-item-icon>
            <v-icon color="green">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="subtitle text-uppercase">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar flat app dense color="white" v-if="$route.name !== 'login'">
      
      <v-btn icon @click="drawer = !drawer">
        <v-icon>{{ toggle }}</v-icon>
      </v-btn>

      
       <v-toolbar-title class="grey--text text--darken-2" >
                      <span class=" blue--text font-weight-bold ">V-ProTech</span>
                    <span class="font-weight-bold"> Hivision Camera </span>
              
          </v-toolbar-title> 
      <v-spacer></v-spacer>
      <!-- <v-chip outlined class="mr-2" color="blue">
        <v-icon>{{account}}</v-icon>
        <span>Admin</span>
      </v-chip> -->
      <v-btn outlined color="red" @click="signOut">Sign out</v-btn>
    </v-app-bar>
    <!-- <v-app-bar app flat dense class="white lighten-3">
        <v-app-bar-nav-icon mandatory color="indigo" large @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title class="grey--text text--darken-2" >
                      <span class="font-weight-light">KIT</span>
                    <span class="font-weight-bold"> Attendence Checking</span>
              
          </v-toolbar-title> 
          <v-spacer></v-spacer>
          <v-card flat="" color="grey lighten-3 ma-2">

          <v-btn outlined small color="cyan" class="ma-2" :loading="loader" @click="update_btn">
                      <v-icon @click="reloadPage">fas fa-sync-alt</v-icon>
          </v-btn>
          <v-card flat color="grey lighten-3" class="overline">Update table</v-card>
          </v-card>
          </v-app-bar> -->
    
  </v-container>
</template>

<script>
import {
  mdiViewDashboard as Dashboard,
  mdiFileTable as Management,
  mdiGraphOutline as Weekly,
  mdiServer as All,
  mdiMenu as toggle,
  mdiAccount as account
} from "@mdi/js";
import { signout } from "../Utilities/backend";
export default {
  name: "App",

  components: {},

  data: () => ({
    account,
    toggle,
    miniVariant: false,
    drawer: true,
    items: [
      { title: "Stock Collection", icon: Dashboard, url: "/" },
      { title: "Import/Export Product", icon: Management, url: "/manage" },
      { title: "Monthly Report", icon: Weekly, url: "/weekly" },
      { title: "Export Product", icon: Management, url: "/exports" },
      { title: "Daily Report", icon: All, url: "/all" }
    ]
  }),
  methods: {
    signOut() {
      signout();
    }
  }
};
</script>

<style>
.font-weight-light {
  font-size: 40px;
}
.font-weight-bold{
   font-size: 40px;
}

</style>