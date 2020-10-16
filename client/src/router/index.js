import Vue from "vue";
import VueRouter from "vue-router";
import AllPlates from "../views/AllPlates.vue";
import Dashboard from "../views/Dashboard.vue";
import Weekly from "../views/Weekly.vue";
import Management from "../views/Management.vue";
import Login from "../views/Login.vue";
import ExportsProduct from '../views/ExportsProduct'
Vue.use(VueRouter);

const routes = [
  {
    path: "/signin",
    name: "signin",
    component: Login,
  },
  {
    path: "/",
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/all",
    name: "all",
    component: AllPlates,
  },
  {
    path: "/weekly",
    name: "weekly",
    component: Weekly,
  },
  {
    path: "/manage",
    name: "manage",
    component: Management,
  },
  {
    path: "/exports",
    name: "ExportProduct",
    component: ExportsProduct,
  },
]; 

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
