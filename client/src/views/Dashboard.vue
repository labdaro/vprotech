<template>
  <v-container class="folder text-center">
    <div>
      <span class="display-1 font-weight black--text"
        >Stock Collection</span>
        <div class="display-2 font-weight-thin black--text mt-9 mb-9"
        >Camera Type Collection</div>
      <v-row>
        <v-col cols="12" sm="6" lg="3"  v-for="(item,index) in allStock" :key="index">
          <v-card id="total" class @click="type = 'all'">
            <v-card-text class="mb-1">
              <div class="display-2 mt-n2 blue--text font-weight-bold" >
                {{item.product_type}} {{ totalPlates }}
              </div>
              <span class="caption" >Price for 1 unit: {{item.price_1unit}}$ </span>
              <h3>Total Amount: {{item.total_amount}}</h3>
              <h3>Total Price: {{item.total_price}}$</h3>
            </v-card-text>
          </v-card>
        </v-col>
        <!-- <v-col cols="12" sm="6" lg="3">
          <v-card id="known" class @click="type = 'known'">
            <v-card-text class="mb-1">
              <div class="display-2 mt-n2 green--text font-weight-bold">
               HHD {{ knownPlates }}
              </div>
              <span class="caption subheading">Known Plate</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" lg="3">
          <v-card id="unknown" class @click="type = 'unknown'">
            <v-card-text class="mb-1">
              <div class="display-2 mt-n2 orange--text font-weight-bold">
               GPS {{ unknownPlates }}
              </div>
              <span class="caption subheading">Unknown Plate</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" lg="3">
          <v-card id="bad" class @click="type = 'bad'">
            <v-card-text class="mb-1">
              <div class="display-2 mt-n2 red--text font-weight-bold">
              Keyboard  {{ badPlates }}
              </div>
              <span class="caption font-weight-light">Bad Plate</span>
            </v-card-text>
          </v-card>
        </v-col> -->
      </v-row>
    </div>
    <Datatable
      :items="typeOfPlate"
      :headers="headers"
      :search="search"
      title="Stock Available"
    ></Datatable>
  </v-container>
</template>

<script>
import { makeGetRequest } from "../Utilities/backend";
import Datatable from "../components/datatables/Datatable";

export default {
  components: {
    Datatable,
  },

  data() {
    return {
      colors:["red","yellow","blue","red","green","purple"],
      allStock:[],
      polling: null,
      totalPlates: "",
      knownPlates: "",
      unknownPlates: "",
      badPlates: "",
      current_in_plate: [],
      type: "all",
      search: "",
      headers: [
        {
          text: "Product Type",
          value: "id",
          align: "center",
        },
        { text: "Product ID", value: "product_id" },
        { text: "Date", value: "date" },
        { text: "Total Amount", value: "total_amount" },
        { text: "Status", value: "status" },
       
      ],
    };
  },
  methods: {
    async getAllCurrentInPlate() {
      const data = await makeGetRequest("/monthly/all_stock");
      this.current_in_plate = data;
      this.allStock = data
      this.allStock.filter((x)=>{
        x.total_price = x.price_1unit * x.total_amount
        // x.date = x.date.slice(0, 10);
      })

      // this.current_in_plate.forEach((x) => {
      //   x.date = x.date.slice(0, 10);
      // });
      
    },
  },
  created() {
    this.getAllCurrentInPlate();
    this.polling = setInterval(this.getAllCurrentInPlate, 5000);
  },
  beforeDestroy() {
    clearInterval(this.polling);
  },
  mounted() {},
  computed: {
    typeOfPlate() {
      return this[this.type];
    },
    all() {
      return this.current_in_plate;
    },
    known() {
      return this.current_in_plate.filter((e) => e.type === "known");
    },
    unknown() {
      return this.current_in_plate.filter((e) => e.type === "unknown");
    },
    bad() {
      return this.current_in_plate.filter((e) => e.type === "bad");
    },
  },
};
</script>

<style lang="scss" scoped>
.folder {
  border-bottom: 0.5px solid green;
}

#total {
  border: 1px solid blue;
  background: rgba(115, 115, 233, 0);
  cursor: pointer;
}
#unknown {
  border: 1px solid orange;
  background: rgba(228, 171, 65, 0);
  cursor: pointer;
}
#known {
  border: 1px solid green;
  background: rgba(80, 211, 80, 0);
  cursor: pointer;
}
#bad {
  border: 1px solid red;
  background: rgba(185, 121, 121, 0);
  cursor: pointer;
}
.current {
  border: 1px solid green;
  border-radius: 5px;
}
.plate_format {
  border: 1px solid blue;
  background: rgba(115, 115, 233, 0);
}
.plate_info.bad {
  border-left: 3px solid red;
}
.plate_info.unknown {
  border-left: 3px solid orange;
}
.plate_info.known {
  border-left: 3px solid rgb(51, 185, 51);
}
</style>
