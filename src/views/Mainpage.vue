<template>
  <div id="mainpage">
    <CreateEvent v-show="createShow == true" @clickCreate="clickCreate" />
    <RatePopup
      v-show="rateShow == true"
      @clickShowed="clickShowed"
      v-bind:checkParticipants="selectRateShow"
    />
    <ProfileDetail
      v-if="detailShow == true"
      @clickDetail="clickDetail"
      @clickEdit="clickEdit"
    />
    <EditProfile
      v-if="editShow == true"
      @clickDetail="clickDetail"
      @clickEdit="clickEdit"
    />
    <ReportPopup
      v-show="reportShow == true"
      @clickReport="clickReport"
      v-bind:categoryReport="selectReportShow"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
    />
    <div id="mainpage-background" class="section">
      <MainpageMenu
        id="menubar"
        @pageReturn="pageReturn"
        @clickCreate="clickCreate"
      />

      <!-- Page -->
      <div id="timeline">
        <!-- Top Bar -->
        <Topbar @clickDetail="clickDetail" />
        <!-- Top Bar -->
        <div v-if="select == 1">
          <Yourzone @clickShowed="clickShowed" @checkShow="checkShow" />
        </div>

        <div v-if="select == 2">
          <Chat />
        </div>

        <div v-if="select == 3">
          <ReportPage @clickReport="clickReport" @checkReport="checkReport" />
        </div>

        <div v-if="select == 4">
          <Eventpage />
        </div>

        <div v-if="select == 5">
          <Discountpage />
        </div>
      </div>
    </div>
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
import EditProfile from "@/components/popup/EditProfile.vue";
import ProfileDetail from "@/components/popup/ProfileDetail.vue";
import ReportPopup from "@/components/popup/ReportPopup.vue";

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
    EditProfile,
    ProfileDetail,
    ReportPopup,
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
    clickReport(value) {
      this.reportShow = value;
    },
    checkReport(value) {
      this.selectReportShow = value;
    },
  },
};
</script>

<style scoped>
#mainpage {
  background-color: #f8f3ec;
  /* background-image: url("../assets/harryfer-background.jpg"); */
  overflow-y: scroll;
  height: auto;
  width: 100vw;
  height: 100vh;
  /* display: flex; */
  justify-content: center;
  align-items: center;
}

#timeline {
  margin-left: 260px;
}

#menubar {
  width: 260px;
  z-index: 1000;
}
</style>