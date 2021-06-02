<template>
  <div>
    <!-- User -->
    <div v-if="role == 1" id="mainpage">
      <CreateEvent
        v-if="createShow == true"
        @clickCreate="clickCreate"
        @informationShow="informationShow"
      />
      <RatePopup
        v-if="rateShow == true"
        @clickShowed="clickShowed"
        v-bind:checkParticipants="selectRateShow"
        :event="eventData"
      />
      <ProfileDetail
        v-if="detailShow == true"
        @clickDetail="clickDetail"
        @demoAdmin="demoAdmin"
        :dataUser="dataUser"
        :findUser="findUser"
        :demoRole="role"
      />
      <ReportPopup
        v-if="reportShow == true"
        @clickReport="clickReport"
        @callWaitBox="callWaitBox"
        v-bind:categoryReport="selectReportShow"
      />
      <DiscountPopup
        v-if="discountShow == true || discountShow2 == true"
        @clickDiscount="clickDiscount"
        @clickDiscount2="clickDiscount2"
        @waitBoxDiscount="waitBoxDiscount"
        @decrementQuota="decrementQuota"
        :clickFromYourZone="discountShow"
        :Discount="discount"
      />
      <PointDetail v-if="pointPage == true" @point="point" />
      <ManageEvent
        v-if="manageShow == true"
        @clickManage="clickManage"
        @confirmDelete="confirmDelete"
        :Event="eventData"
        :valueDetail="valueDetail"
        :valueManage="valueManage"
        :valueView="view"
        :eventPending="eventPending"
        :showEnd="showEnd"
        :joined="joined"
        @updateStatus="updateStatus"
        @informationShow="informationShow"
      />
      <!-- Mobile Top Bar -->
      <MobileTopbar
        id="mobile-topbar"
        @clickClearSearch="clickClearSearch"
        @pageReturn="pageReturn"
        @point="point"
        @notificationShow="notificationShow"
        @clickCreate="clickCreate"
        @clickDetail="clickDetail"
      />
      <WaitBox
        v-if="information == true"
        :waitShow="waitShow"
        :confirmDeleteData="confirmDeleteData"
        :error="waitboxError"
        @informationShow="informationShow"
        @closeAlert="closeAlert"
      />

      <Notification
        v-if="notiShow == true"
        @notificationShow="notificationShow"
      />

      <!-- Mobile Top Bar -->
      <link
        rel="stylesheet"
        type="text/css"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
      />
      <div id="mainpage-background" class="section">
        <MainpageMenu
          id="menubar"
          @clickClearSearch="clickClearSearch"
          @pageReturn="pageReturn"
          @clickCreate="clickCreate"
        />

        <!-- Page -->
        <div id="timeline">
          <!-- Top Bar -->
          <Topbar
            @searchData="searchData"
            @clickDetail="clickDetail"
            :clearSearch="clearSearched"
            @clickClearSearch="clickClearSearch"
            @point="point"
            @notificationShow="notificationShow"
            :demoRole="role"
          />
          <!-- Top Bar -->
          <div v-if="searchBar">
            <Searchpage
              :searchValue="searchBar"
              @userProfile="userProfile"
              @discountData="discountData"
              @clickDiscount2="clickDiscount2"
              @thisEvent="thisEvent"
              @clickManage="clickManage"
              @detail="detail"
              @manage="manage"
              @informationShow="informationShow"
            />
          </div>

          <div v-if="select == 1 && !searchBar">
            <Yourzone
              @clickShowed="clickShowed"
              @checkShow="checkShow"
              @clickDiscount="clickDiscount"
              @clickManage="clickManage"
              @thisEvent="thisEvent"
              @detail="detail"
              @manage="manage"
              @pendingShow="pendingShow"
              @userProfile="userProfile"
              @onEvent="onEvent"
              @onJoined="onJoined"
              @discountData="discountData"
              :discountSelect="select"
            />
          </div>

          <div v-if="select == 2 && !searchBar">
            <Chat />
          </div>

          <div v-if="select == 3 && !searchBar">
            <ReportPage @clickReport="clickReport" @checkReport="checkReport" />
          </div>

          <div v-if="select == 4 && !searchBar">
            <Eventpage
              @clickManage="clickManage"
              @detail="detail"
              @pageEvent="pageEvent"
              @thisEvent="thisEvent"
              @onEvent="onEvent"
              @pendingShow="pendingShow"
              @userProfile="userProfile"
              @titleError="titleError"
              @onJoined="onJoined"
            />
          </div>

          <div v-if="select == 5 && !searchBar">
            <Discountpage
              @discountData="discountData"
              @clickDiscount2="clickDiscount2"
              :decrement="Quota"
              :discountSelect="select"
            />
          </div>

          <div v-if="select == 6 && !searchBar">
            <History />
          </div>

          <div v-if="select == 7 && !searchBar">
            <AnalystPage />
          </div>

          <div v-if="select == 8 && !searchBar">
            <ApproverPage
              @clickManage="clickManage"
              @viewShow="viewShow"
              @viewData="viewData"
              :statusEvent="statusEvent"
            />
          </div>
        </div>
      </div>
      <div id="mobile-add">
        <button @click="createShow = true" class="section">
          <img id="plus" src="@/assets/icons8-plus-math-90.png" />
        </button>
      </div>
    </div>
    <!-- User -->
    
    <!-- Admin -->
    <div v-if="role == 2" id="mainpage-admin">
      <ProfileDetail
        v-if="detailShow == true"
        @clickDetail="clickDetail"
        @demoAdmin="demoAdmin"
        :dataUser="dataUser"
        :findUser="findUser"
        :demoRole="role"
      />

      <EditUser v-if="editShow" @clickEdit="clickEdit" />

      <EditDatabase
        v-if="editDatabaseShow == true"
        @editDatabase="editDatabase"
      />

      <CreateDiscount v-if="createShow" @clickCreate="clickCreate" />

      <!-- Mobile Top Bar -->
      <MobileTopbar
        id="mobile-topbar"
        :admin="true"
        @clickDetail="clickDetail"
        @pageReturnAdmin="pageReturnAdmin"
      />
      <!-- Mobile Top Bar -->

      <div id="mainpage-background" class="section">
        <AdminMenu id="menubar" @pageReturnAdmin="pageReturnAdmin" />
        <div id="timeline">
          <Topbar
            @demoAdmin="demoAdmin"
            @clickDetail="clickDetail"
            :demoRole="role"
          />

          <AdminMainpage
            v-if="selectAdmin == 1"
            @clickCreate="clickCreate"
            @clickEdit="clickEdit"
            @editDatabase="editDatabase"
          />
          <AdminReport v-if="selectAdmin == 5" />

          <AdminUser v-if="selectAdmin == 4" />
        </div>
      </div>
    </div>
    <!-- Admin -->
  </div>
</template>

<script>
import MainpageMenu from "@/components/MainpageMenu.vue";
import Topbar from "@/components/Topbar.vue";
import MobileTopbar from "@/components/MobileTopbar.vue";
import Yourzone from "@/components/YourZone.vue";
import Eventpage from "@/components/Eventpage.vue";
import Discountpage from "@/components/Discountpage.vue";
import Chat from "@/components/Chat.vue";
import CreateEvent from "@/components/popup/CreateEvent.vue";
import RatePopup from "@/components/popup/RatePopup.vue";
import ReportPage from "@/components/ReportPage.vue";
import ProfileDetail from "@/components/popup/ProfileDetail.vue";
import ReportPopup from "@/components/popup/ReportPopup.vue";
import DiscountPopup from "@/components/popup/DiscountPopup.vue";
import ManageEvent from "@/components/popup/manageEvent/ManageEvent.vue";
import Searchpage from "@/components/Searchpage.vue";
import History from "@/components/History.vue";
import AdminMainpage from "@/components/admin/AdminMainpage.vue";
import AdminMenu from "@/components/admin/AdminMenu.vue";
import AdminReport from "@/components/admin/report/AdminReport.vue";
import AdminUser from "@/components/admin/user/AdminUser.vue";
import CreateDiscount from "@/components/admin/popup/CreateDiscount.vue";
import EditUser from "@/components/admin/popup/EditUser.vue";
import EditDatabase from "@/components/admin/popup/EditDatabase.vue";
import WaitBox from "@/components/popup/WaitBox.vue";
import AnalystPage from "@/components/AnalystPage.vue";
import ApproverPage from "@/components/ApproverPage.vue";
import PointDetail from "@/components/popup/PointDetail.vue";
import Notification from "@/components/popup/notification/Notification.vue";

export default {
  name: "mainpage",
  components: {
    MainpageMenu,
    Topbar,
    Yourzone,
    Eventpage,
    Discountpage,
    Chat,
    CreateEvent,
    RatePopup,
    ReportPage,
    ProfileDetail,
    ReportPopup,
    DiscountPopup,
    ManageEvent,
    Searchpage,
    History,
    AdminMainpage,
    AdminMenu,
    AdminReport,
    CreateDiscount,
    EditUser,
    EditDatabase,
    MobileTopbar,
    WaitBox,
    AnalystPage,
    ApproverPage,
    PointDetail,
    Notification,
    AdminUser
  },
  data() {
    return {
      select: 1,
      selected: "all",
      createShow: false,
      rateShow: false,
      editShow: false,
      detailShow: false,
      reportShow: false,
      discountShow: false,
      discountShow2: false,
      searchBar: "",
      clearSearched: false,
      confirmDeleteData: null,
      manageShow: false,
      editDatabaseShow: false,
      discount: [],
      role: 1,
      selectAdmin: 1,
      eventData: "",
      deleteShow: false,
      valueDetail: false,
      valueManage: true,
      pointPage: false,
      view: false,
      statusEvent: null,
      findUser: false,
      dataUser: "",
      eventPending: false,
      showEnd: false,
      information: false,
      waitShow: "",
      notiShow: false,
      waitboxError: "",
      Quota: "",
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
    }
  },
  methods: {
    pageReturn(value) {
      this.select = value;
    },
    clickEdit(value) {
      this.editShow = value;
    },
    clickDetail(value) {
      this.detailShow = value;
      this.findUser = false;
    },
    clickCreate(value) {
      this.createShow = value;
    },
    clickShowed(value) {
      this.rateShow = value;
    },
    checkShow(value) {
      this.selectRateShow = value;
    },
    clickManage(value) {
      this.manageShow = value;
    },
    clickReport(value) {
      this.reportShow = value;
    },
    checkReport(value) {
      this.selectReportShow = value;
    },
    searchData(value) {
      this.searchBar = value;
    },
    clickClearSearch(value) {
      this.clearSearched = value;
    },
    clickDiscount(value) {
      this.discountShow = value;
    },
    clickDiscount2(value) {
      this.discountShow2 = value;
    },
    demoAdmin(value) {
      this.role = value;
    },
    pageReturnAdmin(value) {
      this.selectAdmin = value;
    },
    editDatabase(value) {
      this.editDatabaseShow = value;
    },
    thisEvent(value) {
      this.eventData = value;
    },
    pageEvent(value) {
      this.eventReturn = value;
    },
    detail(value) {
      this.valueDetail = value;
      this.valueManage = false;
      this.view = false;
    },
    manage(value) {
      this.valueManage = value;
      this.valueDetail = false;
      this.view = false;
    },
    point(value) {
      this.pointPage = value;
    },
    viewShow(value) {
      this.view = value;
    },
    viewData(value) {
      this.eventData = value;
      this.valueManage = false;
      this.valueDetail = false;
    },
    updateStatus(value) {
      this.statusEvent = value;
    },
    userProfile(value) {
      this.dataUser = value;
      this.findUser = true;
      this.detailShow = true;
    },
    pendingShow(value) {
      this.eventPending = value;
      this.showEnd = false;
    },
    onEvent(value) {
      this.showEnd = value;
      this.eventPending = false;
    },
    confirmDelete(value) {
      this.confirmDeleteData = value;
    },
    informationShow(value) {
      this.information = value;
      if (this.createShow == true) {
        this.waitShow = "create";
      } else if (this.manageShow == true) {
        if (this.showEnd == true) {
          this.waitShow = "end";
        } else {
          this.waitShow = "delete";
        }
      }
      if (value == false) {
        this.manageShow = true;
      } else {
        this.createShow = false;
        this.manageShow = false;
      }
    },
    discountData(value) {
      this.discount = value;
    },
    notificationShow(value) {
      this.notiShow = value;
    },
    titleError(value) {
      console.log(value);
      this.waitboxError = value;
      this.information = true;
    },
    closeAlert(value) {
      this.information = value;
    },
    callWaitBox(value) {
      this.waitShow = "report";
      this.information = value;
    },
    waitBoxDiscount(value) {
      this.waitShow = "discount";
      this.information = value;
    },
    onJoined(value) {
      this.joined = value;
    },
    decrementQuota(value) {
      this.Quota = value;
    },
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
