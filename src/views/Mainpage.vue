<template>
  <div>
    <!-- User -->
    <div v-if="role == 1" id="mainpage">
      <CreateEvent v-if="createShow == true" @clickCreate="clickCreate" />
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
        :demoRole="role"
      />
      <ReportPopup
        v-if="reportShow == true"
        @clickReport="clickReport"
        v-bind:categoryReport="selectReportShow"
      />
      <DiscountPopup
        v-if="discountShow == true || discountShow2 == true"
        @clickDiscount="clickDiscount"
        @clickDiscount2="clickDiscount2"
        :clickFromYourZone="discountShow"
      />
      <ManageEvent
        v-if="manageShow == true"
        @clickManage="clickManage"
        :Event="eventData"
      />
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
            :demoRole="role"
          />
          <!-- Top Bar -->
          <div v-if="searchBar">
            <Searchpage :searchValue="searchBar" />
          </div>

          <div v-if="select == 1 && !searchBar">
            <Yourzone
              @clickShowed="clickShowed"
              @checkShow="checkShow"
              @clickDiscount="clickDiscount"
              @clickManage="clickManage"
              @thisEvent="thisEvent"
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
            <Eventpage />
          </div>

          <div v-if="select == 5 && !searchBar">
            <Discountpage
              @clickDiscount2="clickDiscount2"
              :discountSelect="select"
            />
          </div>

          <div v-if="select == 6 && !searchBar">
            <History />
          </div>
        </div>
      </div>
    </div>
    <!-- User -->
    <!-- Admin -->
    <div v-if="role == 2" id="mainpage-admin">
      <ProfileDetail
        v-if="detailShow == true"
        @clickDetail="clickDetail"
        @clickEdit="clickEdit"
        @demoAdmin="demoAdmin"
        :demoRole="role"
      />

      <EditUser v-if="editShow" @clickEdit="clickEdit" />

      <EditDatabase
        v-if="editDatabaseShow == true"
        @editDatabase="editDatabase"
      />

      <CreateDiscount v-if="createShow" @clickCreate="clickCreate" />

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
        </div>
      </div>
    </div>
    <!-- Admin -->
  </div>
</template>

<script>
import MainpageMenu from "@/components/MainpageMenu.vue";
import Topbar from "@/components/Topbar.vue";
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
import CreateDiscount from "@/components/admin/popup/CreateDiscount.vue";
import EditUser from "@/components/admin/popup/EditUser.vue";
import EditDatabase from "@/components/admin/popup/EditDatabase.vue";

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
      manageShow: false,
      editDatabaseShow: false,
      role: 1,
      selectAdmin: 1,
      eventData: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
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
  },
};
</script>

<style scoped>
#mainpage,
#mainpage-admin {
  /* background-image: url("../assets/harryfer-background.jpg"); */
  overflow-y: scroll;
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

#menubar {
  width: 260px;
  z-index: 1000;
}
</style>
