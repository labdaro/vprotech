<template>
  <div class="text-center">
    
    <v-dialog
      v-model="dialog"
      width="800"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon 
        color="red lighten-2"
          dark
          @click="checkProduct(item.product_type,start,end)"
          v-bind="attrs"
          v-on="on">
          <v-icon>{{ view }}</v-icon>
        </v-btn>
      </template>

      <v-card v-if="check">
    
        <v-card-title class="headline grey lighten-2">
          Product Type: {{item.product_type}}         From {{start}} to {{end}}
        </v-card-title>
        <v-container class="grey lighten-5">
            <v-row no-gutters>
              <v-col
                cols="12"
                sm="4"
              >
                <v-card
                  class="pa-2 mr-2"
                  height="300"
                >
                  <h1>In Stock</h1>
                  <div>
                    <h3>Total amount: {{amountStock}}</h3>
                  </div>
                   <div>
                    <h3>Price for 1 unit: {{unit}} $</h3>
                  </div>
                  <div>
                    <h3>Total Price: {{totalPriceStock}}</h3>
                  </div>
                </v-card>
              </v-col>
              <v-col
                cols="12"
                sm="4"
              >
                <v-card
                  height="300"
                  class="pa-2 mr-2"
                >
                  <h1>Import</h1>
                  <div>
                    <h3>Total amount: {{amountImport}} </h3>
                  </div>
                  <div>
                    <h3>Total Price: {{totalPriceImport}}$</h3>
                  </div>
                </v-card>
              </v-col>
              <v-col
                cols="12"
                sm="4"
              >
                <v-card
                  class="pa-2"
                  height="300"
                >
                  <h1>Export</h1>
                  <div>
                    <h3>Total amount: {{amountExport}}</h3>
                  </div>
                  <div>
                    <h3>Total Price:{{totalPriceExport}}$</h3>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { makePostRequest } from "../Utilities/backend";
import { mdiPlus as add, mdiEye as view, mdiTrashCan as remove } from "@mdi/js";
  export default {
      props:['item','end','start'],
    data () {
      return {
        amountStock:0,
        unit:0,
        totalPriceStock:0,
        amountImport:0,
        totalPriceImport:0,
        amountExport:0,
        totalPriceExport:0,
        check:false,
        checkStock:[],
        add,
        view,
        remove,
        dialog: false,
      }
    },
    methods:{
      async checkProduct(product,startDate,endDate) {
        this.check = true
      console.log(product)
      const data = await makePostRequest("/monthly/checkone",{
        product_type: product
      });
      this.checkStock = data;
        this.checkStock.forEach((x) => {
          this.amountStock = x.total_amount
          this.unit = x.price_1unit
          this.totalPriceStock = x.price_1unit * x.total_amount
        });

        const dataExportImport = await makePostRequest("/history/import_export",{
        product_type: product,
        startDate: startDate,
        endDate: endDate
      }); 
      this.checkImport = dataExportImport;
      this.checkExport = dataExportImport
      console.log(this.checkExport)
 
        this.checkExport.forEach((x) => {
          if (x.status =='import'){
            this.amountImport += x.total_amount
            this.totalPriceImport += x.total_price
          }else{
            this.amountExport += x.total_amount
            this.totalPriceExport += x.total_price
          }
          
        });
      
      }

    },


  }
</script>