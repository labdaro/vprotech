<template>
  <v-card>
    <v-card-title>
      <v-row>
        <v-col cols="12" sm="12" md="6" xl="6">
          <v-text-field outlined label="Search" v-model="search" dense></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="6" xl="6">
          <v-btn :color="btnColor" dark rounded small @click="openRegisterDialog()">
            <v-icon>{{ add }}</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-data-table
      flat
      :search="search"
      :headers="headers"
      :items="items"
      :items-per-page="5"
      class="elevation-1 px-5"
    >
      <template v-slot:item.id="{ item }">
        <v-card>
          <v-card-text class="my-1 plate_format text-center">
            <v-row>
              <span
                class="blue--text text--darken-4 font-weight-bold mx-auto my-n2"
              >{{ item.product_type }}</span>
            </v-row>
            <v-row>
              <span class="black--text font-weight-bold pa-2 mx-auto">{{ item.plate_number }}</span>
            </v-row>
            <v-row class>
              <span
                class="red--text body-2 font-weight-bold mx-auto my-n2"
              >{{ item.organization_name }}</span>
            </v-row>
          </v-card-text>
        </v-card>
      </template>
      <template v-slot:item.view="{ item }">
        <v-btn icon @click="openDialog(item)">
          <v-icon>{{ view }}</v-icon>
        </v-btn>
        <v-btn icon color="red" x-small @click="deletePlate(item._id)">
          <v-icon>{{ remove }}</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mdiPlus as add, mdiEye as view, mdiTrashCan as remove } from "@mdi/js";
export default {
  props: {
    items: Array,
    headers: Array,
    btnColor: String,
    openDialog: Function,
    openRegisterDialog: Function,
    deletePlate: Function

    // title:String,
  },
  data: () => ({
    search: "",
    add,
    view,
    remove
  })
};
</script>

<style>
.plate_format {
  border: 1px solid blue;
  background: rgba(115, 115, 233, 0);
}
</style>
