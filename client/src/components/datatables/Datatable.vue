// datatable used for All plate and weekly plate

<template>
  <v-card>
    <v-card-title>
      <v-row>
        <v-col cols="12" sm="12" md="8" xl="9">
          <span class="display-1 font-weight-light grey--text">{{title}}</span>
        </v-col>
        <v-col cols="12" sm="12" md="4" xl="3">
          <v-text-field outlined label="Search" v-model="search" dense></v-text-field>
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
              <span class="black--text font-weight-bold pa-2 mx-auto">{{ item.product_type }}</span>
            </v-row>
          </v-card-text>
        </v-card>
      </template>
      <template v-slot:item.type="{item}">
        <v-chip small :color="`${item.type}`" :class="`v-chip--active  red--text`">{{ item.product_id }}</v-chip>
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
    search: String,
    items: Array,
    headers: Array,
    title: String
  },
  data: () => ({
     dialog: false,
    add,
    view,
    remove
  })
};
</script>

<style>
.v-chip.bad {
  background-color: rgb(247, 33, 33);
}
.v-chip.unknown {
  background: rgb(245, 172, 36);
}
.v-chip.known {
  background: rgb(35, 202, 35);
}
</style>