<template>
  <v-container fluid>
    <div>
      <v-row>
        <v-col cols="12" sm="6" lg="3">
          <v-card>
            <v-card-text class="mb-1">
              <div class="display-2 mt-n2 red--text font-weight-bold">
                <span>Export</span> 
              </div>
              <span class="display-2 mt-n2 grey--text font-weight-bold">{{ totalAmountExports  }}</span>
              <div>
              <span class="display-2 mt-n2 grey--text font-weight-bold">{{ totalPriceExports  }}$</span>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                class="mt-6"
                v-model="date"
                label="Pick start date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker range v-model="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="postDateSpan">OK</v-btn>
            </v-date-picker>        
          </v-menu>
          
        </v-col>
      </v-row>
    </div>
    <Datatable
      :start="startDate"
      :end="endDate"
      :items="weeklyPlate"
      :headers="headers"
      :search="search"
      title="Export Report"
    />
  </v-container>
</template>

<script>
import { makePostRequest } from "../Utilities/backend";
import Datatable from "../components/datatables/Datatable";
export default {
  components: {
    Datatable,
  },
  data: () => ({
    startDate:'',
    endDate:'',
    totalStock: 0,
    totalAmountExports:0,
    totalPriceExports:0,
    polling: null,
    weeklyPlate: [],
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    type: "all",
    search: "",
    headers: [
      {
        text: "Product ID",
        align: "center",
        sortable: false,
        value: "id",
      },
      { text: "Product Type", value: "type" },
      { text: "Total Amount", value: "total_amount" },
      { text: "Total Price", value: "total_price" },
      { text: "Status", value: "status", align: "center" },
      { text: "Time", value: "time" },
      { text: "Date", value: "date" },
      { text: "View", value: "view",align: "center" },
    ],
  }),
  methods: {

    async postDateSpan() {
      this.$refs.menu.save(this.date);
      var sortedDate = this.date.sort(function(a, b) {
        var dateA = new Date(a),
          dateB = new Date(b);
        return dateA - dateB;
      });
      this.startDate = sortedDate[0]
      this.endDate = sortedDate[1]
     const data = await makePostRequest("/monthly/all_monthly", {
          startDate: sortedDate[0],
          endDate: sortedDate[1],     
      });
         
      this.weeklyPlate = data.all_monthly
      console.log(data)
      this.totalAmountExports = data.amountExport
      this.totalPriceExports = data.totalPriceExports
      
        
        this.weeklyPlate.forEach((x) => {
        x.date = x.date.slice(0, 10) ;
      });
      this.weeklyPlate = this.weeklyPlate.filter((x)=>{
        return x.status == 'export'
      })
  

    },

  },
  computed: {
  },
  // created() {
  //   this.getAllWeeklyPlate();
  //   setInterval(this.getAllWeeklyPlate, 5000);
  // },
  // beforeDestroy() {
  //   clearInterval(this.polling);
  // }
};
</script>

<style></style>
