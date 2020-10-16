<template>
  <v-dialog v-model="dialog" persistent max-width="700px" v-if="data !== undefined">
    <v-card>
      <v-card-title class="grey lighten-3 font-weight-bold headline blue--text">
        <span>{{title}}</span>
      </v-card-title>

      <v-card-text>

        <v-form>
          <v-container>
            <v-row class="ma-n5">
              <v-col cols="12" md="6" lg="4">
                <v-text-field
                  class="purple-input"
                  label="Product ID"
                  v-model="data[fields[0]]"
                  :rules="[v => !!v || 'Product ID is Required']"
                  required
                />
              </v-col>

              <v-col cols="12" md="6" lg="4">
                <v-text-field
                  class="purple-input"
                  label="Product Type"
                  v-model="data[fields[1]]"
                  :rules="[v => !!v || 'Product Type is Required']"
                  required
                />
              </v-col>
              <v-col cols="12" md="6" lg="4">
                <v-text-field
                  type="number"
                  class="purple-input"
                  label="Amount Product"
                  v-model="data[fields[2]]"
                  :rules="[v => !!v || 'Amount Product is required']"
                  required
                />
              </v-col>
            </v-row>

            <v-row class="ma-n5">
              <v-col cols="10" md="6" lg="6">
                <v-text-field
                  type="number"
                  class="purple-input"
                  label="Price for 1 Unit($)"
                  v-model="data[fields[3]]"
                  :rules="[v => !!v || 'Required']"
                  required
                />
              </v-col>
              <v-col cols="4" md="3" lg="3">
              <template>
                <v-dialog  v-model="dialogCheck" max-width="300" >
                  <v-text-field 
                        :rules="[v => !!v || 'Date Required']"
                        slot="activator" 
                        label="Choose Date"
                        prepend-icon="mdi-calendar"
                          @click.stop="dialogCheck = true"
                          v-model="data[fields[5]]">
                     </v-text-field>
                  <v-date-picker v-model="data[fields[5]]"  @input="date_picker"></v-date-picker>
                </v-dialog>
                </template>
              </v-col>
            </v-row>
          
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions class="mt-n8">
        <v-spacer></v-spacer>
        <v-btn outlined dark class="mx-1 my-2" color="primary" @click="submit">Submit</v-btn>
        <v-btn outlined dark class="mx-1 my-2 mr-5" color="primary" @click="closeDialog">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiTrashCan as remove } from "@mdi/js";
// import { makeGetRequest } from "../Utilities/backend";
export default {
  props: {
    dialog: Boolean,
    title: String,
    closeDialog: Function,
    fields: Array,
    data: Object,
    submit: Function,
  },
  data: () => ({
    date: '',
    dialogCheck: false,
    editMode: false,
    menu: false,
    remove,
  }),
  methods:{
     date_picker(){

        this.dialogCheck =  false
        
      },



    //  async postDateSpan() {
    //   this.$refs.menu.save(this.date);
    //   console.log(this.date);
    //   var sortedDate = this.date.sort(function(a, b) {
    //     var dateA = new Date(a),
    //       dateB = new Date(b);
    //     return dateA - dateB;
    //   });
    //   console.log(sortedDate);
    //   await makeGetRequest("/plate_collection/all_weekly_plate", {
    //     params: {
    //       startDate: sortedDate[0],
    //       endDate: sortedDate[1],
    //     },
    //   });
    // },
  }
};
</script>

<style>
</style>