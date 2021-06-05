<template>
  <div>
    <div class="title">
      <i @click="back()" class="fa fa-angle-left" aria-hidden="true"></i>
      <h1 @click="back()" id="header" class="header_title">EDIT REPORT</h1>
    </div>

    <h1 class="sub-header">Current Existing Category</h1>

    <div id="report-list">
      <div id="left">
        <div id="report-title-section">
          <h1 class="report-title">Report User</h1>
          <div>
            <hr id="bar" />
          </div>
        </div>
        <div v-for="type in typeUserList" :key="type.report_type_id">
          <h1 class="report-name">{{ type.type_name }}</h1>
        </div>

        <div id="report-title-section">
          <h1 class="report-title">Report Event</h1>
          <div>
            <hr id="bar" />
          </div>
        </div>
        <div v-for="type in typeEventList" :key="type.report_type_id">
          <h1 class="report-name">{{ type.type_name }}</h1>
        </div>

        <div id="report-title-section">
          <h1 class="report-title">Report Web App</h1>
          <div>
            <hr id="bar" />
          </div>
        </div>
        <div v-for="type in typeWebList" :key="type.report_type_id">
          <h1 class="report-name">{{ type.type_name }}</h1>
        </div>
      </div>
      <div id="right">
        <!-- Input -->
        <div>
          <h2 class="input_title">Select Type Category</h2>
          <h2 v-show="invalidCategory" class="input_title">
            <span class="orange-color"> * {{ alertCategory }}</span>
          </h2>
          <select
            name="gender"
            class="input_select minimal"
            v-model="typeSelected"
            required
          >
            <option value="" disabled selected hidden
              >select type category</option
            >
            <option value="user">User</option>
            <option value="event">Event</option>
            <option value="web">Web</option>
          </select>
        </div>
        <!-- Input -->
        <div>
          <hr id="dark-bar" />
        </div>
        <!-- Input -->
        <div>
          <h2 class="input_title">Delete Report Type</h2>
          <h2 v-show="invalidDelete" class="input_title">
            <span class="orange-color"> * {{ alertDelete }}</span>
          </h2>
          <select
            name="gender"
            class="input_select minimal"
            v-model="deleteSelected"
            required
          >
            <option value="" disabled selected hidden
              >select report type</option
            >
            <option
              v-for="(type, i) in selectList"
              :key="type.report_type_id"
              :value="i"
            >
              {{ type.type_name }}
            </option>
          </select>
          <div class="button">
            <button @click="deleteReportType()">Delete</button>
          </div>
        </div>
        <!-- Input -->
        <!-- Input -->
        <div>
          <h2 class="input_title">Rename Report Type</h2>
          <h2 v-show="invalidRename" class="input_title">
            <span class="orange-color"> * {{ alertRename }}</span>
          </h2>
          <select
            name="gender"
            class="input_select minimal"
            v-model="renameSelected"
            required
          >
            <option value="" disabled selected hidden
              >select report type</option
            >
            <option
              v-for="(type, i) in selectList"
              :key="type.report_type_id"
              :value="i"
            >
              {{ type.type_name }}
            </option>
          </select>
          <div>
            <input
              v-model="newNameReportType"
              class="input_box"
              type="text"
              maxlength="64"
              size="64"
              placeholder="enter new type name"
            />
          </div>

          <div class="button">
            <button @click="renameReportType()">Rename</button>
          </div>
        </div>
        <!-- Input -->
        <!-- Input -->
        <div>
          <h2 class="input_title">Add New Report Type</h2>
          <h2 v-show="invalidAdd" class="input_title">
            <span class="orange-color"> * {{ alertAdd }}</span>
          </h2>
          <div>
            <input
              v-model="newReportType"
              class="input_box"
              type="text"
              maxlength="64"
              size="64"
              placeholder="enter new type name"
            />
          </div>

          <div class="button">
            <button @click="addReportType()">Add</button>
          </div>
        </div>
        <!-- Input -->
        <div class="button-section">
          <button class="create_button" @click="done()">Done</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReportService from "@/services/report.service";

export default {
  data() {
    return {
      typeUserList: [],
      typeEventList: [],
      typeWebList: [],
      selectList: [],
      typeSelected: "",
      deleteSelected: "",
      renameSelected: "",
      newNameReportType: "",
      newReportType: "",
      alertCategory: false,
      alertType: "",
      invalidDelete: false,
      alertDelete: "",
      invalidRename: false,
      alertRename: "",
      invalidAdd: false,
      alertAdd: ""
    };
  },
  watch: {
    typeSelected: function() {
      this.invalidCategory = false;
      this.invalidDelete = false;
      this.invalidRename = false;
      this.invalidAdd = false;
      this.deleteSelected = "";
      this.renameSelected = "";
      if (this.typeSelected == "user") {
        this.selectList = this.typeUserList;
      } else if (this.typeSelected == "event") {
        this.selectList = this.typeEventList;
      } else if (this.typeSelected == "web") {
        this.selectList = this.typeWebList;
      }
    },
    deleteSelected: function() {
      this.invalidDelete = false;
    },
    renameSelected: function() {
      this.invalidRename = false;
    },
    newNameReportType: function() {
      if (this.newNameReportType) this.invalidRename = false;
    },
    newReportType: function() {
      if (this.newReportType) this.invalidAdd = false;
    }
  },
  created() {
    this.getReportTypeUser();
    this.getReportTypeEvent();
    this.getReportTypeWeb();
  },
  methods: {
    done() {
      window.location.href = "/admin";
    },
    back() {
      this.$emit("reportReturn", false);
    },
    getReportTypeUser() {
      ReportService.getReportTypeUserList()
        .then((res) => {
          if (res) {
            this.typeUserList = res;
          }
        })
        .catch(() => {
          this.typeUserList = [];
          console.log("Error when get report type list");
        });
    },
    getReportTypeEvent() {
      ReportService.getReportTypeEventList()
        .then((res) => {
          if (res) {
            this.typeEventList = res;
          }
        })
        .catch(() => {
          this.typeEventList = [];
          console.log("Error when get report type list");
        });
    },
    getReportTypeWeb() {
      ReportService.getReportTypeWebList()
        .then((res) => {
          if (res) {
            this.typeWebList = res;
          }
        })
        .catch(() => {
          this.typeWebList = [];
          console.log("Error when get report type list");
        });
    },
    deleteReportType() {
      if (!this.typeSelected) {
        this.invalidCategory = true;
        this.alertCategory = "required type category";
      } else if (!this.deleteSelected) {
        this.invalidDelete = true;
        this.alertDelete = "required report type";
      } else if (this.selectList.length <= 3) {
        this.invalidDelete = true;
        this.alertDelete = "minimum 3 types/category";
      } else {
        ReportService.updateType({
          report_type_id: this.selectList[this.deleteSelected].report_type_id,
          status_id: "ST07"
        }).then((res) => {
          if (res.report_type_id) {
            this.selectList.splice(this.deleteSelected, 1);
            this.deleteSelected = "";
          }
        });
      }
    },
    renameReportType() {
      if (!this.typeSelected) {
        this.invalidCategory = true;
        this.alertCategory = "required type category";
      } else if (!this.renameSelected) {
        this.invalidRename = true;
        this.alertRename = "required report type";
      } else if (!this.newNameReportType) {
        this.invalidRename = true;
        this.alertRename = "required new type name";
      } else {
        ReportService.updateType({
          report_type_id: this.selectList[this.renameSelected].report_type_id,
          type_name: this.newNameReportType
        }).then((res) => {
          if (res.report_type_id) {
            this.selectList[this.renameSelected].type_name = res.type_name;
            this.renameSelected = "";
            this.newNameReportType = "";
          }
        });
      }
    },
    addReportType() {
      if (!this.typeSelected) {
        this.invalidCategory = true;
        this.alertCategory = "required type category";
      } else if (!this.newReportType) {
        this.invalidAdd = true;
        this.alertAdd = "required new type name";
      } else {
        let reportType = {
          type_name: this.newReportType,
          status_id: "ST02"
        };
        if (this.typeSelected == "user") {
          reportType.require_event = false;
          reportType.require_suspect = true;
        } else if (this.typeSelected == "event") {
          reportType.require_event = true;
          reportType.require_suspect = false;
        } else if (this.typeSelected == "web") {
          reportType.require_event = false;
          reportType.require_suspect = false;
        }
        ReportService.createType(reportType).then((res) => {
          if (res.report_type_id) {
            this.selectList.push(res);
            this.newReportType = "";
          }
        });
      }
    }
  }
};
</script>

<style scoped>
h1 {
  color: #444444;
}

#left {
  margin-right: 15px;
  border: 1.75px solid #444444;
  border-radius: 10px;
  overflow-y: auto;
  padding: 5px 10px;
  height: 500px;
  width: 300px;
}

#report-title-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0px;
}

#report-title-section > div {
  width: 150px;
}

#bar {
  height: 2px;
  border-width: 0;
  color: #ff8864;
  background-color: #ff8864;
}

#dark-bar {
  height: 1.75px;
  margin: 10px 0px;
  border-width: 0;
  color: #444444;
  background-color: #444444;
}

.report-title,
.report-name {
  color: #444444;
  font-weight: 500;
  margin: 0px;
}

.report-title {
  font-size: 1.85em;
  font-weight: 600;
  text-transform: uppercase;
}

.report-name {
  font-size: 1.6em;
  font-weight: 500;
  padding: 3px 0px 5px 5px;
}

#right {
  margin-left: 15px;
}

.fa-angle-left {
  font-size: 4.25em;
  color: #444444;
  padding-bottom: 3px;
  padding-right: 17px;
  cursor: pointer;
}

.back_button,
.create_button {
  font-size: 1.75em !important;
  width: 120px !important;
}

.back_button {
  margin-right: 10px !important;
}

.header_title {
  margin: 0px !important;
  padding: 0px !important;
}

.title {
  padding: 25px 0px 13px 0px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

#report-list {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.sub-header {
  color: #444444;
  font-size: 2em;
  font-weight: 600;
  margin: 0px;
}

.input_select {
  font-size: 1.6em;
  font-weight: 450;
  width: 100%;
  padding: 9px 12px 9px 15px;
  border: 2px solid #e3e3e3;
  border-radius: 10px;
  margin-bottom: 2px;
  box-shadow: none;
  font-family: "Atten-Round-New";
}

select {
  /* styling */
  background-color: white;
  border: thin solid #e3e3e3;
  border-radius: 4px;
  display: inline-block;
  font: inherit;
  line-height: 1.5em;
  padding: 0.5em 3.5em 0.5em 1em;

  /* reset */

  margin: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
}

select.minimal {
  background-image: linear-gradient(45deg, transparent 50%, #e3e3e3 50%),
    linear-gradient(135deg, #e3e3e3 50%, transparent 50%);
  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;
}

select.minimal:focus {
  background-image: linear-gradient(45deg, #e3e3e3 50%, transparent 50%),
    linear-gradient(135deg, transparent 50%, #e3e3e3 50%);
  background-position: calc(100% - 15px) 1em, calc(100% - 20px) 1em,
    calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;
  border-color: #e3e3e3;
  outline: 0;
}

select:-moz-focusring {
  color: transparent;
  text-shadow: 0 0 0 #000;
}

select:required:invalid {
  color: #cccccc;
}
select,
option {
  color: #444444;
}

.button {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
}

.button > button {
  background-color: #ffffff;
  font-family: "Atten-Round-New";
  text-transform: uppercase;
  font-size: 1.25em;
  font-weight: 600;
  width: 80px;
  margin: 0px;
  color: #ff8864;
  border: 2px solid #ff8864;
  border-radius: 16px;
  padding: 5px 18px;
}

.button-section {
  justify-content: flex-end !important;
}

.input_box {
  width: 250px !important;
  margin-top: 10px !important;
}

@media screen and (max-width: 1024px) {
  #report-list {
    display: block;
  }

  .button-section {
    width: inherit;
    margin-top: 10px;
  }

  #left {
    margin: 0px;
    height: 200px;
  }

  #right {
    margin: 20px 0px 0px 0px;
  }
}

@media screen and (max-width: 690px) {
  #left {
    width: 250px;
  }

  #report-title-section > div {
    width: 70px;
  }

  div::-webkit-scrollbar {
    height: 3px;
    width: 3px;
  }
}
</style>
