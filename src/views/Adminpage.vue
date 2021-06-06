<template>
  <div>
    <div id="mainpage-admin">
      <PointDetail v-if="pointPage == true" @point="point" />

      <Notification
        v-if="notiShow == true"
        @notificationShow="notificationShow"
      />

      <ProfileDetail
        v-if="detailShow == true"
        @clickDetail="clickDetail"
        :customerData="customer"
        :findUser="false"
        :demoRole="role"
      />

      <ReportReview
        v-if="reportReviewShow == true"
        :reportList="dataReport"
        @reportData="reportData"
      />

      <EditUser v-if="editShow" @clickEdit="clickEdit" />

      <EditDatabase
        v-if="editDatabaseShow == true"
        @editDatabase="editDatabase"
      />

      <CreateDiscount
        v-if="createShow"
        :discountList="dataDiscountEdit"
        @clickCreate="clickCreate"
      />

      <MobileTopbar
        id="mobile-topbar"
        :admin="true"
        @clickDetail="clickDetail"
        @pageReturnAdmin="pageReturnAdmin"
        @point="point"
        @notificationShow="notificationShow"
      />

      <div id="mainpage-background" class="section">
        <AdminMenu
          id="menubar"
          :goReport="goReport"
          :selectMenu="selectAdmin"
          @pageReturnAdmin="pageReturnAdmin"
          @clickClearSearch="clickClearSearch"
        />
        <div id="timeline">
          <Topbar
            @clickDetail="clickDetail"
            @point="point"
            @notificationShow="notificationShow"
            @searchData="searchData"
            :demoRole="role"
            :clearSearch="clearSearched"
            @clickClearSearch="clickClearSearch"
          />

          <AdminSearch
            v-if="searchBar"
            :searchValue="searchBar"
            @editDiscountData="editDiscountData"
            @customerData="customerData"
            @reportData="reportData"
            @pageReturnAdmin="pageReturnAdmin"
            @clickClearSearch="clickClearSearch"
          />

          <AdminMainpage
            v-if="selectAdmin == 1 && !searchBar"
            @clickCreate="clickCreate"
            @clickEdit="clickEdit"
            @editDatabase="editDatabase"
            @editDiscountData="editDiscountData"
            @goToReport="goToReport"
            @reportData="reportData"
          />

          <AdminDiscount
            v-if="selectAdmin == 3 && !searchBar"
            @editDiscountData="editDiscountData"
          />

          <AdminUser
            v-if="selectAdmin == 4 && !searchBar"
            @customerData="customerData"
          />

          <AdminReport
            v-if="selectAdmin == 5 && !searchBar"
            @reportData="reportData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Topbar from "@/components/Topbar.vue";
import PointDetail from "@/components/popup/PointDetail.vue";
import Notification from "@/components/popup/notification/Notification.vue";
import ProfileDetail from "@/components/popup/ProfileDetail.vue";
import ReportReview from "@/components/admin/popup/ReportReview.vue";
import EditUser from "@/components/admin/popup/EditUser.vue";
import EditDatabase from "@/components/admin/popup/EditDatabase.vue";
import CreateDiscount from "@/components/admin/popup/CreateDiscount.vue";
import MobileTopbar from "@/components/MobileTopbar.vue";
import AdminMenu from "@/components/admin/AdminMenu.vue";
import AdminSearch from "@/components/admin/AdminSearch.vue";
import AdminReport from "@/components/admin/report/AdminReport.vue";
import AdminUser from "@/components/admin/user/AdminUser.vue";
import AdminDiscount from "@/components/admin/discount/AdminDiscount.vue";
import AdminMainpage from "@/components/admin/AdminMainpage.vue";
import decode from "jwt-decode";

export default {
  name: "adminpage",
  components: {
    PointDetail,
    Notification,
    ProfileDetail,
    ReportReview,
    EditUser,
    EditDatabase,
    CreateDiscount,
    MobileTopbar,
    AdminMenu,
    AdminSearch,
    AdminReport,
    AdminUser,
    AdminDiscount,
    AdminMainpage,
    Topbar
  },
  data() {
    return {
      pointPage: false,
      notiShow: false,
      detailShow: false,
      editShow: false,
      createShow: false,
      editDatabaseShow: false,
      reportReviewShow: false,
      findUser: false,
      clearSearched: false,
      goReport: false,
      dataDiscountEdit: null,
      customer: null,
      role: 2,
      selectAdmin: 1,
      dataReport: [],
      searchBar: "",
      roleAccount: ""
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (!this.loggedIn) {
      this.$router.push("/");
    } else {
      this.getRole();
      if (this.roleAccount != "RO01") {
        this.$router.push("/");
      }
    }
  },
  methods: {
    getRole() {
      let userData = decode(localStorage.getItem("user"));
      this.roleAccount = userData.role_id;
    },
    point(value) {
      this.pointPage = value;
    },
    notificationShow(value) {
      this.notiShow = value;
    },
    clickDetail(value) {
      this.detailShow = value;
      this.findUser = false;
      this.customer = null;
    },
    reportData(value) {
      if (value == false) {
        this.reportReviewShow = value;
      } else {
        this.dataReport = value;
        this.reportReviewShow = true;
      }
    },
    clickEdit(value) {
      this.editShow = value;
    },
    editDatabase(value) {
      this.editDatabaseShow = value;
    },
    clickCreate(value) {
      this.createShow = value;
      this.dataDiscountEdit = null;
    },
    pageReturnAdmin(value) {
      this.searchBar = "";
      this.selectAdmin = value;
    },
    clickClearSearch(value) {
      this.clearSearched = value;
    },
    searchData(value) {
      this.searchBar = value;
    },
    goToReport(value) {
      this.goReport = value;
    },
    editDiscountData(value) {
      this.dataDiscountEdit = value;
      this.createShow = true;
    },
    customerData(value) {
      this.customer = value;
      this.detailShow = true;
    }
  }
};
</script>

<style scoped>
#mainpage,
#mainpage-admin {
  /* background-image: url("../assets/harryfer-background.jpg"); */
  overflow-y: auto;
  height: auto;
  width: 100vw;
  height: 100vh;
  /* display: flex; */
  justify-content: center;
  align-items: center;
}

#mainpage {
  background-color: #f8f3ec;
}

#mainpage-admin {
  background-color: #444444;
  position:fixed;
}

#timeline {
  margin-left: 260px;
}

#mobile-add {
  display: none;
  position: fixed;
  z-index: 9998;
  bottom: 15px;
  right: 15px;
  box-shadow: 0px 3px 30px #0000000d;
}

#plus {
  width: 30px;
  padding: 10px;
}

#mobile-add > button {
  background-color: #ff8864;
  border: none;
  font-size: 1.75em;
  font-weight: 450;
  color: #ffffff;
  border-radius: 50%;
  padding: 8px;
}

#menubar {
  width: 260px;
  z-index: 1000;
}

#mobile-topbar {
  display: none;
}

@media screen and (max-width: 1080px) {
  #menubar {
    width: 230px;
  }

  #timeline {
    margin-left: 230px;
  }
}

@media screen and (max-width: 1060px) {
  #menubar {
    width: 80px;
  }

  #timeline {
    margin-left: 80px;
  }
}

@media screen and (max-width: 880px) {
  #menubar {
    display: none;
  }

  #timeline {
    margin-left: 0px;
    margin-top: 70px;
  }

  #mobile-topbar {
    display: block;
  }

  #mobile-add {
    display: block;
  }
}

@media screen and (max-width: 570px) {
  #plus {
    width: 25px;
    padding: 7px;
  }
}

@media screen and (max-width: 490px) {
  #plus {
    width: 23px;
    padding: 5px;
  }
}
</style>
