<template>
  <div id="rate-popup" class="popup">
    <div class="popup-section section">
      <div class="popup-form">
        <h1 v-if="categoryReport == 1" class="header_title report-title">
          REPORT USER
        </h1>
        <h1 v-if="categoryReport == 2" class="header_title report-title">
          REPORT EVENT
        </h1>
        <h1 v-if="categoryReport == 3" class="header_title report-title">
          REPORT WEB
        </h1>

        <!-- User Input -->
        <div v-if="categoryReport == 1">
          <h2 class="input_title">
            Who do you want to report?<span class="orange-color"> * </span>
            <span v-if="invalidUsername" class="orange-color">{{
              alertUsername
            }}</span>
          </h2>
          <input
            v-model="username"
            class="input_box"
            type="text"
            maxlength="16"
            size="16"
            placeholder="enter a person username"
          />
        </div>
        <!-- User Input -->

        <!-- Event Input -->
        <div v-if="categoryReport == 2">
          <h2 class="input_title">
            What event do you want to report?<span class="orange-color">
              *
            </span>
            <span v-if="invalidEvent" class="orange-color">
              {{ alertEvent }}</span
            >
          </h2>
          <input
            v-model="event_id"
            class="input_box"
            type="text"
            maxlength="8"
            size="8"
            placeholder="enter an event id (e.g. EV000001)"
          />
          <h1 class="porlor">* you can find event id in event details</h1>
        </div>
        <!-- Event Input -->

        <!-- Input -->
        <div>
          <h2 class="input_title">
            Report Category<span class="orange-color"> * </span>
            <span v-if="invalidType" class="orange-color">{{ alertType }}</span>
          </h2>
          <select
            name="gender"
            class="input_select minimal"
            v-model="report.report_type_id"
            required
          >
            <option value="" disabled selected hidden>
              select report category
            </option>
            <option
              v-for="(type, i) in reportTypeList"
              :key="i"
              :value="type.report_type_id"
            >
              {{ type.type_name }}
            </option>
          </select>
        </div>
        <!-- Input -->

        <!-- Input -->
        <div>
          <h2 class="input_title">
            Title<span class="orange-color"> * </span>
            <span v-if="invalidTitle" class="orange-color">{{
              alertTitle
            }}</span>
          </h2>
          <input
            v-model="report.title"
            class="input_box"
            type="text"
            maxlength="64"
            size="64"
            placeholder="enter report title"
          />
        </div>
        <!-- Input -->

        <!-- Input -->
        <div>
          <h2 class="input_title">
            What went wrong?<span class="orange-color"> * </span>
            <span v-if="invalidDescription" class="orange-color">
              {{ alertDescription }}</span
            >
          </h2>
          <textarea
            class="input_textarea_box bio"
            v-model="report.description"
            maxlength="256"
            size="256"
            name="bio"
            placeholder="enter your report description"
          >
          </textarea>
        </div>
        <!-- Input -->

        <div class="button-section">
          <button class="back_button" @click="reportReturn()">Cancel</button>
          <button class="create_button" @click="clickReport()">Report</button>
        </div>
        <img
          @click="reportReturn()"
          style="cursor: pointer"
          class="close"
          src="@/assets/icon/icons8-multiply-96.png"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ReportService from "@/services/report.service";
import EventService from "@/services/event.service";
import AuthService from "@/services/auth.service";
import Report from "@/models/report";
import decode from "jwt-decode";

export default {
  name: "ReportPopup",
  props: ["categoryReport"],
  data() {
    return {
      username: "",
      event_id: "",
      report: new Report(""),
      reportTypeList: [],
      invalidUsername: false,
      alertUsername: "",
      invalidEvent: false,
      alertEvent: "",
      invalidType: false,
      alertType: "",
      invalidTitle: false,
      alertTitle: "",
      invalidDescription: false,
      alertDescription: ""
    };
  },
  watch: {
    username: function() {
      this.invalidUsername = false;
      this.checkUsername();
    },
    event_id: function() {
      this.invalidEvent = false;
      this.checkEvent();
    },
    "report.report_type_id": function() {
      this.invalidType = false;
    },
    "report.title": function() {
      this.invalidTitle = false;
    },
    "report.description": function() {
      this.invalidDescription = false;
    }
  },
  created() {
    if (this.categoryReport == 1) {
      this.getReportTypeUser();
    } else if (this.categoryReport == 2) {
      this.getReportTypeEvent();
    } else if (this.categoryReport == 3) {
      this.getReportTypeWeb();
    }
    this.report.report_type_id = "";
  },
  methods: {
    reportReturn() {
      this.$emit("clickReport", false);
    },
    getReportTypeUser() {
      ReportService.getReportTypeUserList()
        .then((res) => {
          if (res) {
            this.reportTypeList = res;
          }
        })
        .catch(() => {
          this.reportTypeList = [];
          console.log("Error when get report type list");
        });
    },
    getReportTypeEvent() {
      ReportService.getReportTypeEventList()
        .then((res) => {
          if (res) {
            this.reportTypeList = res;
          }
        })
        .catch(() => {
          this.reportTypeList = [];
          console.log("Error when get report type list");
        });
    },
    getReportTypeWeb() {
      ReportService.getReportTypeWebList()
        .then((res) => {
          if (res) {
            this.reportTypeList = res;
          }
        })
        .catch(() => {
          this.reportTypeList = [];
          console.log("Error when get report type list");
        });
    },
    checkUsername() {
      if (this.username) {
        AuthService.checkUniqueExists({ username: this.username }).then(
          (res) => {
            if (res.exist) {
              let user = decode(localStorage.getItem("user"));
              if (res.user_id == user.user_id) {
                this.invalidUsername = true;
                this.alertUsername = "you can't report yourself";
              }
              else {
                this.report.suspect_id = res.user_id;
              }
            } 
            else {
              this.invalidUsername = true;
              this.alertUsername = "not found this username";
            }
          }
        );
      }
    },
    checkEvent() {
      if (this.event_id) {
        EventService.findEventByID(this.event_id).then((res) => {
          if (res.exist) {
            this.report.event_id = res.event_id;
          } else {
            this.invalidEvent = true;
            this.alertEvent = "not found this event id";
          }
        });
      }
    },
    clickReport() {
      if (!this.username && this.categoryReport == 1) {
        this.invalidUsername = true;
        this.alertUsername = "username required";
      }
      if (!this.event_id && this.categoryReport == 2) {
        this.invalidEvent = true;
        this.alertEvent = "event id required";
      }
      if (!this.report.report_type_id) {
        this.invalidType = true;
        this.alertType = "report category required";
      }
      if (!this.report.title) {
        this.invalidTitle = true;
        this.alertTitle = "title required";
      }
      if (!this.report.description) {
        this.invalidDescription = true;
        this.alertDescription = "report detail required";
      }
      if (
        !this.invalidUsername &&
        !this.invalidEvent &&
        !this.invalidType &&
        !this.invalidTitle &&
        !this.invalidDescription
      ) {
        ReportService.createReport(this.report).then(
          (res) => {
            if (res.report_id) {
              this.$emit("callWaitBox", true);
              this.reportReturn();
            }
          },
          (error) => {
            console.log(error.message);
          }
        );
      }
    }
  }
};
</script>

<style scoped>
.report-title {
  margin-bottom: 20px;
  text-align: center;
}

.input_select {
  font-size: 1.6em;
  font-weight: 500;
  width: 100%;
  padding: 9px 12px 9px 15px;
  border: 2px solid #e3e3e3;
  border-radius: 10px;
  margin-bottom: 2px;
  box-shadow: none;
  font-family: "Atten-Round-New";
}

.comment {
  font-size: 1.6em;
  font-weight: 600;
  color: #444444;
  width: calc(100% - 15px);
  border: 2px solid #e3e3e3;
  border-radius: 10px;
  margin-bottom: 2px;
  box-shadow: none;
  padding-bottom: 100px;
  padding-top: 12px;
  padding-left: 15px;
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

.porlor {
  font-size: 1.5em;
  color: #a0a0a0;
  margin-bottom: 0;
  font-weight: 400;
  margin-top: 2px;
}

.back_button,
.create_button {
  width: 170px !important;
}

.input_textarea_box {
  font-size: 1.6em;
  font-weight: 500;
  color: #a0a0a0;
  padding: 7px 12px 7px 15px;
  border: 2px solid #e3e3e3;
  border-radius: 10px;
  margin-bottom: 2px;
  box-shadow: none;
  width: 400px;
  line-height: 21px;
}

.bio {
  padding-bottom: 50px;
}

@media screen and (max-width: 690px) {
  .input_box,
  .input_textarea_box {
    width: 250px !important;
  }

  .create_button,
  .back_button {
    width: 120px !important;
  }
}

@media screen and (max-width: 490px) {
  .input_box,
  .input_textarea_box {
    width: 210px !important;
  }

  .create_button,
  .back_button {
    width: 110px !important;
  }

  .popup-form {
    padding: 0px 40px !important;
  }
}
</style>
