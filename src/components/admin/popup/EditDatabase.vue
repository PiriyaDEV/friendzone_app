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
            <button
              class="back_button edit_button"
              @click="clickEditCategory()"
            >
              EDIT CATEGORIES
            </button>
            <button class="back_button edit_button" @click="clickEditReport()">
              EDIT REPORT
            </button>
            <button class="back_button" @click="editReturn()">Cancel</button>
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
    EditCategory
  },
  data() {
    return {
      editCategory: false,
      editReport: false
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
    reportReturn(value) {
      this.editReport = value;
    },
    editReturn(value) {
      this.editReport = value;
    }
  }
};
</script>

<style scoped>
#edit-database-popup {
  padding: 20px 60px 30px 60px !important;
}

#header {
  text-align: center;
}

.back_button {
  width: 100% !important;
  margin: 10px 0px;
}

.edit_button {
  color: #444444 !important;
  border: 2px solid #b1b1b1 !important;
  font-weight: 400 !important;
  margin: 5px 0px;
}

@media screen and (max-width: 490px) {
  #edit-database-popup {
    padding: 20px 40px 30px 40px !important;
  }
}
</style>
