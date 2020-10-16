<template>
  <v-container fluid>
    <v-tabs color="green" grow v-model="tab">
      <v-tab class>Import Product</v-tab>
      <v-tab class>Export Product</v-tab>
    </v-tabs>

    <RegisterPlateDialog
      :dialog="registerKnownPlatesDialog"
      title="Import Product"
      :closeDialog="closeRegisterKnownPlatesDialog"
      :fields="fields_known"
      :data="registerInfo"
      :submit="registerKnownPlates"
    />
    <RegisterPlateDialog
      :dialog="registerBadPlatesDialog"
      title="Export Product"
      :closeDialog="closeRegisterBadPlatesDialog"
      :fields="fields_bad"
      :data="registerInfo"
      :submit="registerBadPlates"
    />

    <EditPlateDialog
      :dialog="knownPlatesDialog"
      title="Imports Product"
      :closeDialog="closeKnownPlatesDialog"
      :fields="fields_known"
      :data="viewingPlate"
      :submit="submitKnownPlates"
      :deletePlate="deleteKnownPlate"
    />
    <EditPlateDialog
      :dialog="badPlatesDialog"
      title="Exports"
      :closeDialog="closeBadPlatesDialog"
      :fields="fields_bad"
      :data="viewingPlate"
      :submit="submitBadPlates"
      :deletePlate="deleteBadPlate"
    />
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <ManagementDataTable
          :items="knownPlates"
          :headers="headers"
          btnColor="blue"
          :openDialog="openKnownPlatesDialog"
          :openRegisterDialog="openRegisterKnownPlatesDialog"
          :deletePlate="deleteKnownPlate"
        />
      </v-tab-item>
      <v-tab-item>
        <ManagementDataTable
          :items="badPlates"
          :headers="headers"
          btnColor="red"
          :openDialog="openBadPlatesDialog"
          :openRegisterDialog="openRegisterBadPlatesDialog"
          :deletePlate="deleteBadPlate"
        />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import ManagementDataTable from "../components/datatables/ManagementDataTable";
import EditPlateDialog from "../components/Dialogs/EditPlateDialog";
import RegisterPlateDialog from "../components/Dialogs/RegisterPlateDialog";
import {
  makeGetRequest,
  makePostRequest,
  makeDeleteRequest,
  makeEditRequest,
} from "../Utilities/backend";
export default {
  components: {
    RegisterPlateDialog,
    ManagementDataTable,
    EditPlateDialog,
  },
  data: () => ({
    tab: null,
    headers: [
      {
        text: "Product Type",
        value: "id",
        align: "center",
      },
      { text: "Product ID", value: "product_id" },
      { text: "Total Amount", value: "total_amount" },
      { text: "Price 1Unit($)", value: "price_1unit" },
      { text: "Total Price($)", value: "total_price" },
      { text: "Date", value: "date" },
      { text: "Status", value: "status" },
      { text: "View", value: "view" },
    ],
    fields_known: [
      "product_id",
      "product_type",
      "total_amount",
      "price_1unit",
      "total_price",
      "date",
      "status"
    ],
    fields_bad: [
        "product_id",
      "product_type",
      "total_amount",
      "price_1unit",
      "total_price",
      "date",
      "status"
    ],
    knownPlates: [],
    badPlates: [],
    registerKnownPlatesDialog: false,
    registerBadPlatesDialog: false,
    viewingPlate: {},
    registerInfo: {},
    knownPlatesDialog: false,
    badPlatesDialog: false,
  }),
  methods: {
    // show data
    async getKnownPlates() {
      const data = await makeGetRequest("/imports/all_imports");
      console.log(data);
      this.knownPlates = data;
      this.knownPlates.forEach((x) => {
        x.date = x.date.slice(0, 10);
      });
    },
    async getBadPlates() {
      const data = await makeGetRequest("/exports/all_exports");
      this.badPlates = data;
       this.badPlates.forEach((x) => {
        x.date = x.date.slice(0, 10);
      });
    },
    // register known plate
    openRegisterKnownPlatesDialog() {
      this.registerInfo = {};
      this.registerKnownPlatesDialog = true;
    },

    async registerKnownPlates() {
      await makePostRequest("/imports/insert", this.registerInfo);
      this.getKnownPlates();
      this.registerKnownPlatesDialog = false;
    },
    closeRegisterKnownPlatesDialog() {
      this.registerKnownPlatesDialog = false;
    },
    // register bad plate
    openRegisterBadPlatesDialog() {
      this.registerInfo = {};
      this.registerBadPlatesDialog = true;
    },
    async registerBadPlates() {

      await makePostRequest("/exports/insert", this.registerInfo);
      this.getBadPlates();
      this.registerBadPlatesDialog = false;
    },
    closeRegisterBadPlatesDialog() {
      this.registerBadPlatesDialog = false;
    },

    // edit known plate
    openKnownPlatesDialog(item) {
      this.viewingPlate = item;
      this.knownPlatesDialog = true;
    },
    async submitKnownPlates(item) {
      {
        await makeEditRequest(`/known_plates/${item._id}`, this.viewingPlate);
        this.knownPlatesDialog = false;
      }
    },
    closeKnownPlatesDialog() {
      this.knownPlatesDialog = false;
    },

    // edit bad plate
    openBadPlatesDialog(item) {
      this.viewingPlate = item;
      this.badPlatesDialog = true;
    },
    async submitBadPlates(item) {
      await makeEditRequest(`/bad_plates/${item._id}`, this.viewingPlate);
      this.badPlatesDialog = false;
    },
    closeBadPlatesDialog() {
      this.badPlatesDialog = false;
    },

    // delete known plate
    async deleteKnownPlate(id) {
      let response = confirm(
        "Are you sure you want to delete this Licence Plate?"
      );
      if (response) {
        await makeDeleteRequest(`/known_plates/${id}`);
        this.getKnownPlates();
      }
    },

    // delete bad plate
    async deleteBadPlate(id) {
      let response = confirm(
        "Are you sure you want to delete this Licence Plate?"
      );
      if (response) {
        await makeDeleteRequest(`/bad_plates/${id}`);
        this.getBadPlates();
      }
    },
  },
  created() {
    this.getKnownPlates();
    this.getBadPlates();
  },
};
</script>

<style></style>
