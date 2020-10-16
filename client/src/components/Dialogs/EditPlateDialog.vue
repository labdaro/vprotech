<template>
  <v-dialog max-width="700" v-model="dialog" persistent v-if="data !== undefined">
    <v-card>
      <v-container>
        <v-card-title class="text-uppercase font-weight-light headline">
          <span class="mr-3">{{ title }}</span>
          <span>
            <v-switch v-model="editMode" label="Edit Mode"></v-switch>
          </span>
          <v-spacer></v-spacer>
          <v-btn icon color="red" @click="deletePlate(data._id)">
            <v-icon>{{ remove }}</v-icon>
          </v-btn>
        </v-card-title>
        
        <v-card v-if="editMode" flat>
          <v-card-text>
            <v-form>
              <v-container>
                <v-row class="ma-n5">
                  <v-col cols="12" md="6" lg="4">
                    <v-text-field
                      class="purple-input"
                      label="Product ID"
                      v-model="data[fields[0]]"
                      :rules="[v => !!v || 'Name is Required']"
                      required
                    />
                  </v-col>

                  <v-col cols="12" md="6" lg="4">
                    <v-text-field
                      class="purple-input"
                      label="Product Type"
                      v-model="data[fields[1]]"
                      :rules="[v => !!v || 'Email is Required']"
                      required
                    />
                  </v-col>
                  <v-col cols="12" md="6" lg="4">
                    <v-text-field
                      class="purple-input"
                      label="Total Amount"
                      v-model="data[fields[2]]"
                      :rules="[v => !!v || 'Phone number is required']"
                      required
                    />
                  </v-col>
                </v-row>
                <v-row class="ma-n5">
                  <v-col cols="12" md="12" lg="5">
                    <v-text-field
                      class="purple-input"
                      label="Price 1Unit"
                      v-model="data[fields[3]]"
                      :rules="[v => !!v || 'Role is required']"
                      required
                    />
                  </v-col>
                  <v-col cols="6" md="3" lg="3">
                    <v-text-field
                      class="purple-input"
                      label="Total Price($)"
                      v-model="data[fields[4]]"
                      :rules="[v => !!v || 'Phone number is required']"
                      required
                    />
                  </v-col>

                  <v-col cols="6" md="3" lg="3">
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

                <v-row class="ma-n5">
                  <v-col cols="10" md="6" lg="6">
                    <v-text-field
                      class="purple-input"
                      label="Status Product"
                      v-model="data[fields[6]]"
                      :rules="[v => !!v || 'Status Product']"
                      required
                    />
                  </v-col>
                </v-row>
            
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions class="mt-n8">
            <v-spacer></v-spacer>
            <v-btn outlined dark class="mx-1" color="primary" @click="submit(data)">Done</v-btn>
            <v-btn outlined dark class="mx-1" color="primary" @click="closeDialog">Cancel</v-btn>
          </v-card-actions>
        </v-card>
        <div v-else>
          <div v-for="(field, i) in fields" :key="i">
            <span class="red--text">{{ field }}</span> :
            <span class="blue--text font-weight-bold">{{ data[field] }}</span>
          </div>
          <v-btn class="mt-8" block outlined dark color="primary" @click="closeDialog">Done</v-btn>
        </div>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
import { mdiTrashCan as remove } from "@mdi/js";
export default {
  props: {
    dialog: Boolean,
    title: String,
    closeDialog: Function,
    fields: Array,
    data: Object,
    submit: Function,
    deletePlate: Function,
  },
  data: () => ({
    dialogCheck: false,
    editMode: false,
    remove,
    plate_english: [
      "PHNOMPENH",
      "KAMPONGSPEU",
      "BATTAMBANG",
      "SIEMREAP",
      "BANTEAYMEANCHEY",
      "KAMPONGCHHNANG",
      "KAMPONGTHOM",
      "KAMPONGCHAM",
      "KAMPOT",
      "KANDAL",
      "KOHKONG",
      "KEP",
      "KRATIE",
      "MONDULKIRI",
      "ODDARMEANCHEY",
      "PAILIN",
      "SIHANOUKVILLE",
      "PREAHVIHEAR",
      "PURSAT",
      "PREYVENG",
      "RATANAKIRI",
      "STUNGTRENG",
      "SVAYRIENG",
      "TAKEO",
      "TBONGKHMUM",
      "CAMBODIA",
    ],
    plate_khmer: [
      "ភ្នំពេញ",
      "កំពង់ស្ពឺ",
      "បាត់ដំបង",
      "សៀមរាប",
      "បន្ទាយមានជ័យ",
      "កំពង់ឆ្នាំង",
      "កំពង់ធំ",
      "កំពង់ចាម",
      "កំពត",
      "កណ្តាល",
      "កោះកុង",
      "កែប",
      "ក្រចេះ",
      "មណ្ឌលគីរី",
      "ឧត្តរមានជ័យ",
      "បៃលិន",
      "ព្រះសីហនុ",
      "ព្រះវិហារ",
      "ពោធិ៍សាត់",
      "ព្រៃវែង",
      "រតនគីរី",
      "ស្ទឹងត្រែង",
      "ស្វាយរៀង",
      "តាកែវ",
      "ត្បូងឃ្មុំ",
      "កម្ពុជា",
    ],
  }),
  methods:{
     date_picker(){

        this.dialogCheck =  false
        
      },
  }
};
</script>

<style></style>
