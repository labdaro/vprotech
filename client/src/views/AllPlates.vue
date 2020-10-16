<template>
  <v-container fluid>
    <Datatable
      :items="plate_collection"
      :headers="headers"
      :search="search"
      title="History Daily Report"
    />
  </v-container>
</template>

<script>
import { makeGetRequest } from "../Utilities/backend";
import Datatable from "../components/datatables/Datatable";
export default {
  components: {
    Datatable,
  },
  data: () => ({
    polling: null,
    search: "",
    plate_collection: [],
    headers: [
      {
        text: "Product ID",
        value: "product_id",
        align: "left",
      },
      { text: "Product Type", value: "product_type",align: "center", },
      
      { text: "Total Amount", value: "total_amount",align:"center" },
      { text: "Price 1Unit", value: "price_1unit",align: "center", },
      { text: "Total Price", value: "total_price", align: "center" },
       { text: "Date", value: "date",align:"center" },
        { text: "Time", value: "time",align:"center" },
      { text: "Status", value: "status" },
      
      
    ],
  }),
  mounted() {},
  methods: {
    async getAllPlate() {
      const data = await makeGetRequest("/history/all_history");
      this.plate_collection = data;

      this.plate_collection.forEach((x) => {
        x.date = x.date.slice(0, 10);
      });
    },
  },
  computed: {},
  created() {
    this.getAllPlate();
    this.polling = setInterval(this.getAllPlate, 5000);
  },
  beforeDestroy() {
    clearInterval(this.polling);
  },
};
</script>

<style></style>
