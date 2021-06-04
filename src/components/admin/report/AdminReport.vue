<template>
  <div id="admin-report" class="event-container">
    <div>
      <div id="title-box">
        <h1 class="title header white-color">REPORT</h1>
        <select id="select-report" v-model="filter">
          <option value="all">All Reports</option>
          <option value="waiting">Waiting</option>
          <option value="read">Read</option>
          <option value="banned">Banned</option>
          <option value="deleted">Deleted</option>
        </select>
      </div>

      <div>
        <div id="report-menu">
          <div id="report-middle-menu" v-if="reportListShow.length != 0">
            <h1 id="menu-text-id" class="menu-text">ID</h1>
            <h1 class="menu-text">TITLE</h1>
            <h1 class="menu-text">TYPE</h1>
            <h1 class="menu-text report-cat">CAREGORIES</h1>
            <h1 class="menu-text">STATUS</h1>
          </div>
          <div id="space-button"></div>
        </div>
        <div id="report-box">
          <NoInformation v-if="reportListShow.length == 0"/>
          <div v-for="(report, i) in reportListShow" :key="i">
            <ReportBox
              :approver="false"
              :reportList="report"
              :report="true"
              @reportData="reportData"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReportBox from "@/components/admin/report/ReportBox.vue";
import AdminService from "@/services/admin.service";
import NoInformation from "@/components/NoInformation.vue";

export default {
  name: "admin-report",
  data() {
    return {
      reportListShow: [],
      reportList: [],
      filter: "all"
    };
  },
  components: {
    ReportBox,
    NoInformation
  },
  watch: {
    filter: function() {
      this.reportListShow = [];
      if (this.filter == "all") this.reportListShow = this.reportList;
      else if (this.filter == "waiting") {
        this.reportListShow = this.reportList.filter((report) => {
          return report.status == "Waiting";
        });
      } else if (this.filter == "read") {
        this.reportListShow = this.reportList.filter((report) => {
          return report.status == "Read";
        });
      } else if (this.filter == "banned") {
        this.reportListShow = this.reportList.filter((report) => {
          return report.status == "Banned";
        });
      } else if (this.filter == "deleted") {
        this.reportListShow = this.reportList.filter((report) => {
          return report.status == "Deleted";
        });
      }
    }
  },
  created() {
    AdminService.getReportList()
      .then((res) => {
        if (res) {
          this.reportListShow = res;
          this.reportList = res;
        }
      })
      .catch(() => {
        this.reportListShow = [];
        this.reportList = [];
      });
  },
  methods: {
    reportData(value) {
      this.$emit("reportData", value);
    }
  }
};
</script>

<style scoped>
#admin-report {
  margin-top: 110px;
  margin-bottom: 30px;
  overflow-x: hidden;
}

option {
  background-color: #a0a0a0;
}

.title {
  margin-top: 0px;
}

.header {
  font-size: 3.75em;
  margin: 0px;
}

#title-box {
  display: flex;
  align-items: center;
}

#select-report {
  color: #ffffff;
  height: 20px;
  margin-left: 15px;
  border: none;
  background-color: transparent;
  font-size: 2em;
  font-family: "Atten-Round-New";
  font-weight: 500;
}

#report-menu {
  align-items: center;
  display: flex;
  width: 100%;
  padding: 3px;
}

#report-middle-menu {
  display: grid;
  grid-template-columns: 15% 20% 10% 35% 20%;
  align-items: center;
  width: 100%;
}

.menu-text {
  font-size: 1.5em;
  font-weight: 400;
  color: #b2b2b2;
  margin-bottom: 0px;
}

#menu-text-id {
  padding: 0px 30px;
}

#space-button {
  width: 68px;
}

@media screen and (max-width: 880px) {
  #admin-report {
    margin-top: 0px;
  }
}

@media screen and (max-width: 690px) {
  #report-middle-menu {
    grid-template-columns: 25% 40% 20% 15%;
  }

  .menu-text {
    font-size: 1.2em;
  }

  #space-button {
    width: 42px;
  }

  .report-cat {
    display: none;
  }
}
</style>
