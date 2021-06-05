<template>
  <div>
    <div id="admin-mainpage" class="event-container">
      <div>
        <div id="flex-select">
          <div @click="editReturn()" id="flex-role" class="flex-box">
            <h1 class="flex-title">ADD NEW ROLES</h1>
            <h1 class="flex-subtitle">TO EXISTING USER</h1>
          </div>
          <div @click="createReturn()" id="flex-discount" class="flex-box">
            <h1 class="flex-title">CREATE NEW DISCOUNT</h1>
            <h1 class="flex-subtitle">FOR USER</h1>
          </div>
          <div @click="editDatabase()" id="flex-edit" class="flex-box">
            <h1 class="flex-title">EDIT DATABASE</h1>
            <h1 class="flex-subtitle">REPORT & CATEGORY TYPE</h1>
          </div>
        </div>

        <div id="middle-column">
          <div id="report">
            <div class="title-section">
              <h1 class="title header white-color">RECENT REPORT</h1>
              <div @click="recentClick()" class="second-title">
                <h1>See All</h1>
                <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
              </div>
            </div>

            <div v-if="reportList.length">
              <div id="report-menu">
                <div id="report-middle-menu">
                  <h1 id="menu-text-id" class="menu-text">ID</h1>
                  <h1 class="menu-text">TITLE</h1>
                  <h1 class="menu-text">TYPE</h1>
                  <h1 class="menu-text report-cat">CAREGORIES</h1>
                  <h1 class="menu-text">STATUS</h1>
                </div>
                <div id="space-button"></div>
              </div>
              <div id="report-box">
                <div v-for="(report, i) in reportList" :key="i">
                  <ReportBox
                    v-if="i < 5"
                    :approver="false"
                    :reportList="report"
                    :report="true"
                    @reportData="reportData"
                  />
                </div>
              </div>
            </div>
            <div v-else><NoInformation /></div>
          </div>

          <div id="employee">
            <div class="title-section">
              <h1 class="title header white-color">EMPLOYEES</h1>
            </div>
            <div id="black-box">
              <div id="black-menu">
                <h1
                  @click="adminClick()"
                  style="cursor: pointer;"
                  :class="cssAdmin"
                >
                  Admin
                </h1>
                <h1
                  @click="analystClick()"
                  style="cursor: pointer;"
                  :class="cssAnalyst"
                >
                  Analyst
                </h1>
                <h1
                  @click="approverClick()"
                  style="cursor: pointer;"
                  :class="cssApprover"
                >
                  Approver
                </h1>
              </div>
              <div id="userbox">
                <div
                  v-show="Admin"
                  v-for="item in adminList"
                  :key="item.user_id"
                >
                  <Userbox :select="2" :user="item" :admin="true" />
                </div>
                <div v-if="Admin && !adminList.length"><NoInformation /></div>
                <div
                  v-show="Analyst"
                  v-for="item in analystList"
                  :key="item.user_id"
                >
                  <Userbox :select="2" :user="item" :admin="true" />
                </div>
                <div v-if="Analyst && !analystList.length">
                  <NoInformation />
                </div>
                <div
                  v-show="Approver"
                  v-for="item in approverList"
                  :key="item.user_id"
                >
                  <Userbox :select="2" :user="item" :admin="true" />
                </div>
                <div v-if="Approver && !approverList.length">
                  <NoInformation />
                </div>
              </div>
            </div>
          </div>
        </div>

        <h1 class="title header white-color">RECENT DISCOUNT</h1>

        <div v-if="discountList.length" id="discount-page-section">
          <!-- Event -->
          <div class="event-section">
            <div id="container">
              <div id="list-container" class="event-container">
                <div class="list event-flex-section">
                  <div v-for="(discount, i) in discountList" :key="i">
                    <DiscountFlex
                      :discount="discount"
                      @clickDiscountFlex="clickDiscountFlex"
                      @discountData="discountData"
                    ></DiscountFlex>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Event -->
        </div>
        <div v-else><NoInformation /></div>
      </div>
    </div>
  </div>
</template>

<script>
import Userbox from "@/components/popup/manageEvent/Userbox.vue";
import DiscountFlex from "@/components/DiscountFlex.vue";
import ReportBox from "@/components/admin/report/ReportBox.vue";
import AdminService from "@/services/admin.service";
import NoInformation from "@/components/NoInformation.vue";

export default {
  name: "event-page",
  data() {
    return {
      Admin: true,
      Analyst: false,
      Approver: false,
      reportList: [],
      adminList: [],
      analystList: [],
      approverList: [],
      discountList: []
    };
  },
  components: {
    DiscountFlex,
    ReportBox,
    Userbox,
    NoInformation
  },
  created() {
    AdminService.getReportList()
      .then((res) => {
        if (res) {
          this.reportList = res;
        }
      })
      .catch(() => {
        this.reportList = [];
      });
    AdminService.getUserList()
      .then((res) => {
        if (res) {
          this.adminList = res.filter((user) => {
            return user.role == "Administrator";
          });
          this.analystList = res.filter((user) => {
            return user.role == "Analyst";
          });
          this.approverList = res.filter((user) => {
            return user.role == "Approver";
          });
        }
      })
      .catch(() => {
        this.adminList = [];
        this.analystList = [];
        this.approverList = [];
      });
    AdminService.getDiscountList()
      .then((res) => {
        if (res) {
          this.discountList = res;
        }
      })
      .catch(() => {
        this.discountList = [];
      });
  },
  methods: {
    recentClick() {
      this.$emit("goToReport", true);
    },
    reportData(value) {
      this.$emit("reportData", value);
    },
    editReturn() {
      this.$emit("clickEdit", true);
    },
    createReturn() {
      this.$emit("clickCreate", true);
    },
    editDatabase() {
      this.$emit("editDatabase", true);
    },
    adminClick() {
      this.Admin = true;
      this.Analyst = false;
      this.Approver = false;
    },
    analystClick() {
      this.Admin = false;
      this.Analyst = true;
      this.Approver = false;
    },
    approverClick() {
      this.Admin = false;
      this.Analyst = false;
      this.Approver = true;
    },
    discountData(value) {
      this.$emit("editDiscountData", value);
    },
  },
  computed: {
    cssAdmin() {
      let select = "selected";
      let unselect = "";
      if (this.Admin == true) {
        return select;
      }
      return unselect;
    },
    cssAnalyst() {
      let select = "selected";
      let unselect = "";
      if (this.Analyst == true) {
        return select;
      }
      return unselect;
    },
    cssApprover() {
      let select = "selected";
      let unselect = "";
      if (this.Approver == true) {
        return select;
      }
      return unselect;
    }
  }
};
</script>

<style scoped>
#admin-mainpage {
  margin-top: 110px;
  margin-bottom: 30px;
  overflow-x: hidden;
  overflow-y: auto;
}

.title {
  margin-top: 0px;
}

#flex-select {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#middle-column {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.flex-box {
  border: none;
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 55px 0px 20px 20px;
  width: 100%;
}

.flex-title {
  color: #ffffff;
  font-size: 2.5em;
  font-weight: 500;
  margin: 0px;
}

.flex-subtitle {
  color: #ffffff;
  font-size: 1.75em;
  font-weight: 400;
  margin: 0px;
}

#flex-discount,
#flex-role,
#flex-edit {
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: cover;
}

#flex-role {
  background-image: url("~@/assets/admin/Asset 3@4x.png");
  margin-right: 25px;
}

#flex-discount {
  background-image: url("~@/assets/admin/Asset 2@4x.png");
  margin-right: 25px;
}

#flex-edit {
  background-image: url("~@/assets/admin/Asset 4@4x.png");
}

.title-section,
.second-title {
  display: flex;
  align-items: center;
}

.second-title {
  margin-left: 15px;
}

.fa-long-arrow-right,
.second-title > h1 {
  color: #ffffff;
  margin: 0px 0px 0px 7px;
  font-size: 2em;
  font-weight: 500;
  cursor: pointer;
}

.fa-angle-left {
  font-size: 4.25em;
  color: #ffffff;
  padding-bottom: 3px;
  padding-right: 17px;
  cursor: pointer;
}

.header {
  font-size: 3.75em;
  margin: 0px;
}

#discount-page-section {
  margin-top: 20px;
}

#userbox {
  margin-top: 10px;
  width: 100%;
  height: 220px;
  overflow-y: auto;
  padding-right: 5px;
  padding-bottom: 4px;
}

#report-middle-menu {
  display: grid;
  grid-template-columns: 15% 20% 10% 35% 20%;
  align-items: center;
  width: 100%;
  padding-top: 5px;
}

#report-menu {
  align-items: center;
  display: flex;
  width: 100%;
  padding: 3px;
}

#report {
  width: 100%;
  margin-right: 20px;
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
  width: 80px;
}

#report-box {
  overflow-y: auto;
  overflow-x: hidden;
  height: 256px;
  padding-right: 15px;
  padding-top: 8px;
}

div::-webkit-scrollbar {
  height: 5px;
  width: 5px;
}

#black-box {
  margin-top: 10px;
  width: 450px;
  /* height: 280px; */
  border: none;
  background-color: #626262;
  border-radius: 8px;
  /* overflow-y: auto; */
  padding: 8px;
}

#black-menu {
  background: #a0a0a0;
  border-radius: 20px;
  padding: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#black-menu > h1 {
  margin: 0px;
  text-transform: uppercase;
  border-radius: 20px;
  padding: 3px 23px;
  text-align: center;
  font-size: 1.5em;
  font-weight: 500;
  color: #444444;
}

.selected {
  background: #ffffff;
}

.namerole {
  width: 100% !important;
}

@media screen and (max-width: 1650px) {
  #black-box {
    width: 330px;
  }
}

@media screen and (max-width: 1350px) {
  #middle-column {
    display: block;
  }

  #black-menu {
    justify-content: space-between;
  }

  .flex-title {
    font-size: 2em;
  }

  .flex-subtitle {
    font-size: 1.5em;
  }

  #employee {
    margin-top: 15px;
    margin-bottom: 10px;
  }

  #black-box {
    width: calc(100% - 20px);
  }

  .flex-box {
    width: 200px;
    height: 65px;
    padding: 20px;
  }

  #flex-role,
  #flex-discount {
    margin-right: 0px;
  }
}

@media screen and (max-width: 880px) {
  #admin-mainpage {
    margin-top: 0px;
  }

  .flex-title {
    font-size: 2.75em;
  }

  .flex-subtitle {
    font-size: 1.85em;
  }

  #flex-discount,
  #flex-role,
  #flex-edit {
    background-position: center;
  }

  #black-box {
    border-radius: 4px;
  }

  #flex-select {
    display: block;
  }

  .flex-box {
    width: calc(100% - 40px);
    border-radius: 20px;
  }
}

@media screen and (max-width: 690px) {
  #report-middle-menu {
    grid-template-columns: 25% 40% 20% 15%;
  }

  .menu-text {
    font-size: 1.2em;
  }

  #report-box {
    padding-right: 5px;
  }

  #space-button {
    width: 61px;
  }

  .report-cat {
    display: none;
  }
}

@media screen and (max-width: 490px) {
  .flex-box {
    height: 45px;
  }
}
</style>
