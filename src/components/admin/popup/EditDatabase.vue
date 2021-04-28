<template>
  <div class="popup">
    <div class="popup-section section">
      <div>
        <div>
          <div
            v-if="!editReport && !editCategory"
            id="edit-database-popup"
            class="popup-form"
          >
            <h1 id="header" class="header_title">EDIT DATABASE</h1>
            <button id="edit_button" @click="clickEditCategory()">
              EDIT CATEGORIES
            </button>
            <button id="edit_button" @click="clickEditReport()">
              EDIT REPORT
            </button>
            <button id="cancel_button" @click="editReturn()">Cancle</button>
            <img
              @click="close()"
              style="cursor: pointer"
              class="close"
              src="@/assets/icon/icons8-multiply-96.png"
            />
          </div>

          <div v-else class="popup-form">
            <EditReport
              v-if="editReport == true"
              @reportReturn="reportReturn"
            />
            <EditCategory
              v-if="editCategory == true"
              @categoryReturn="categoryReturn"
            />
            <img
              @click="close()"
              style="cursor: pointer"
              class="close"
              src="@/assets/icon/icons8-multiply-96.png"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditReport from "@/components/admin/popup/EditReport.vue";
import EditCategory from "@/components/admin/popup/EditCategory.vue";
export default {
  components: {
    EditReport,
    EditCategory,
  },
  data() {
    return {
      editCategory: false,
      editReport: false,
    };
  },
  methods: {
    clickEditCategory() {
      this.editCategory = true;
    },
    clickEditReport() {
      this.editReport = true;
    },
    close() {
      this.$emit("editDatabase", false);
    },
    categoryReturn(value) {
      this.editCategory = value;
    },
    editReturn(value) {
      this.editReport = value;
    }
  },
};
</script>

<style scoped>
#edit-database-popup {
  padding: 20px 60px 30px 60px !important;
}

#header {
  text-align: center;
}

#cancel_button,
#edit_button {
  font-family: "Atten-Round-New";
  text-align: center;
  width: 100%;
  padding: 9px 0px;
  border-radius: 35px;
  margin-top: 10px;
  background-color: #ffffff;
  transition: 0.3s;
}

#edit_button {
  font-size: 1.75em;
  color: #444444;
  font-weight: 400;
  border: 2px solid #b1b1b1;
}
#cancel_button {
  margin-top: 25px;
  font-size: 2em;
  color: #ff8864;
  font-weight: 500;
  border: 2px solid #ff8864;
}
</style>
