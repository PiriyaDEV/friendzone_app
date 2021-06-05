<template>
  <div id="admin-search" class="event-container">
    <div>
      <h1 id="searchtext" class="event-header">
        {{ discountList.length + userList.length + reportList.length }} items
        match your search
        <span class="orange-color">“{{ searchValue }}”</span>
      </h1>
      <div id="title-box">
        <h1 class="title header white-color">DISCOUNT</h1>
        <div @click="recentClick(discount)" class="second-title">
          <h1>See All</h1>
          <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
        </div>
      </div>

      <div v-if="discountList.length">
        <div id="report-menu">
          <div id="report-middle-menu-discount">
            <h1 id="menu-text-id" class="menu-text">ID</h1>
            <h1 class="menu-text">TITLE</h1>
            <h1 class="menu-text">POINT USED</h1>
            <h1 class="menu-text report-cat">BUY WITHIN</h1>
            <h1 class="menu-text report-cat">USED WITHIN</h1>
            <h1 class="menu-text">STATUS</h1>
          </div>
          <div id="space-button-discount"></div>
        </div>
        <div id="report-box">
          <div v-for="discount in discountList" :key="discount.discount_id">
            <ReportBox
              :discountList="discount"
              :discount="true"
              @discountData="discountData"
            />
          </div>
        </div>
      </div>
      <div v-else><NoInformation :adminSearch="true" /></div>

      <div id="title-box" class="title-box-space">
        <h1 class="title header white-color">USER</h1>
        <div @click="recentClick(user)" class="second-title">
          <h1>See All</h1>
          <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
        </div>
      </div>

      <div v-if="userList.length">
        <div id="report-menu">
          <div id="report-middle-menu-user">
            <h1 id="menu-text-id" class="menu-text">USERNAME</h1>
            <h1 class="menu-text">RATING</h1>
            <h1 class="menu-text">ROLE</h1>
            <h1 class="menu-text">STATUS</h1>
          </div>
          <div id="space-button-user"></div>
        </div>
        <div id="report-box">
          <div v-for="user in userList" :key="user.user_id">
            <ReportBox
              :userList="user"
              :user="true"
              @customerData="customerData"
            />
          </div>
        </div>
      </div>
      <div v-else><NoInformation :adminSearch="true" /></div>

      <div id="title-box" class="title-box-space">
        <h1 class="title header white-color">REPORT</h1>
        <div @click="recentClick(report)" class="second-title">
          <h1>See All</h1>
          <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
        </div>
      </div>

      <div v-if="reportList.length">
        <div id="report-menu">
          <div id="report-middle-menu-report">
            <h1 id="menu-text-id" class="menu-text">ID</h1>
            <h1 class="menu-text">TITLE</h1>
            <h1 class="menu-text">TYPE</h1>
            <h1 class="menu-text report-cat">CAREGORIES</h1>
            <h1 class="menu-text">STATUS</h1>
          </div>
          <div id="space-button-report"></div>
        </div>
        <div id="report-box">
          <div v-for="report in reportList" :key="report.report_id">
            <ReportBox
              :approver="false"
              :reportList="report"
              :report="true"
              @reportData="reportData"
            />
          </div>
        </div>
      </div>
      <div v-else><NoInformation :adminSearch="true" /></div>
    </div>
  </div>
</template>

<script>
import ReportBox from "@/components/admin/report/ReportBox.vue";
import AdminService from "@/services/admin.service";
import NoInformation from "@/components/NoInformation.vue";

export default {
  name: "admin-search",
  data() {
    return {
      discountList: [],
      userList: [],
      reportList: []
    };
  },
  components: {
    ReportBox,
    NoInformation
  },
  props: ["searchValue"],
  created() {
    this.search(this.searchValue);
  },
  watch: {
    searchValue: function(searchValue) {
      this.discountList = [];
      this.userList = [];
      this.reportList = [];
      this.search(searchValue);
    }
  },
  methods: {
    recentClick(value) {
        if(value == "discount") {
          this.$emit("pageReturnAdmin",3)
        }
        if(value == "user") {
          this.$emit("pageReturnAdmin",4)
        }
        if(value == "report") {
          this.$emit("pageReturnAdmin",5)
        }
    },
    search(searchValue) {
      if (searchValue) {
        AdminService.searchDiscount(searchValue)
          .then((res) => {
            if (res) {
              this.discountList = res;
            }
          })
          .catch(() => {
            this.discountList = [];
          });
        AdminService.searchUser(searchValue)
          .then((res) => {
            if (res) {
              this.userList = res;
            }
          })
          .catch(() => {
            this.userList = [];
          });
        AdminService.searchReport(searchValue)
          .then((res) => {
            if (res) {
              this.reportList = res;
            }
          })
          .catch(() => {
            this.reportList = [];
          });
      }
    },
    discountData(value) {
      this.$emit("editDiscountData", value);
    },
    reportData(value) {
      this.$emit("reportData", value);
    },
    customerData(value) {
      this.$emit("customerData", value);
    }
  }
};
</script>

<style scoped>
#admin-search {
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

.title-box-space {
  margin-top: 20px;
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

.second-title {
  display: flex;
  align-items: center;
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

#searchtext {
  color: #ffffff;
  margin-top: 0px;
  font-size: 2em;
  font-weight: 500;
  margin-bottom: 15px;
}

#report-menu {
  align-items: center;
  display: flex;
  width: 100%;
  padding: 3px;
}

#report-middle-menu-report {
  display: grid;
  grid-template-columns: 15% 20% 10% 35% 20%;
  align-items: center;
  width: 100%;
}

#report-middle-menu-user {
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  align-items: center;
  width: 100%;
}

#report-middle-menu-discount {
  display: grid;
  grid-template-columns: 15% 20% 15% 15% 15% 20%;
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

#space-button-discount {
  width: 48px;
}

#space-button-report {
  width: 68px;
}

#space-button-user {
  width: 50px;
}

@media screen and (max-width: 880px) {
  #admin-search {
    margin-top: 0px;
  }
}

@media screen and (max-width: 690px) {
  #report-middle-menu-report {
    grid-template-columns: 25% 40% 20% 15%;
  }

  .menu-text {
    font-size: 1.2em;
  }

  #space-button-report {
    width: 42px;
  }

  #report-middle-menu-user {
    grid-template-columns: 35% 25% 30% 10%;
  }

  #space-button-user {
    width: 69px;
  }

  #report-middle-menu-discount {
    grid-template-columns: 25% 40% 20% 15%;
  }

  #space-button-discount {
    width: 42px;
  }

  .report-cat {
    display: none;
  }
}
</style>
