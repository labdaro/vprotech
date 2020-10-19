
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
      <template v-slot:item.product_type="{ item }">
        <v-card>
          <v-card-text class="my-1 plate_format text-center">
            <v-row>
              <span class="black--text font-weight-bold pa-2 mx-auto">{{ item.product_type }}</span>
            </v-row>
          </v-card-text>
        </v-card>
      </template>
      <template v-slot:item.product_id="{item}">
        <v-chip small :color="`${item.product_id}`" :class="`v-chip--active  red--text`">{{ item.product_id }}</v-chip>
      </template>
      <template v-slot:item.view="{ item }">
        <Dialogs :item="item" :end="end" :start="start"/>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import Dialogs from '../Dialogs'
import { mdiPlus as add, mdiEye as view, mdiTrashCan as remove } from "@mdi/js";
export default {
  props: {
    end: String,
    start:String,
    items: Array,
    headers: Array,
    title: String
  },
    components: {
    Dialogs,
  },
  data: () => ({
    search:'',
    add,
    view,
    remove,
    dialog: false,
  }),
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