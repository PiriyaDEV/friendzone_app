<template>
  <div id="mobile-topbar">
    <div class="section">
      <div id="mobile-container" class="event-container">
        <div id="left">
          <Slide :closeOnNavigation="true">
            <a @click="zoneClick()" id="yourzone" class="menu-box">
              <img
                class="menu-icon"
                src="@/assets/icon/icon-white/icons8-home-144-w.png"
              />
              <span class="menu-text">Your Zone</span>
            </a>
            <a @click="eventClick()" id="event" class="menu-box">
              <img
                class="menu-icon"
                src="@/assets/icon/icon-white/icons8-event-96-w.png"
              />
              <span class="menu-text">Event</span>
            </a>
            <a @click="discountClick()" id="discount" class="menu-box">
              <img
                class="menu-icon"
                src="@/assets/icon/icon-white/icons8-pricing-96-w.png"
              />
              <span class="menu-text">Discount</span>
            </a>
            <a @click="chatClick()" id="chat" class="menu-box">
              <img
                class="menu-icon"
                src="@/assets/icon/icon-white/icons8-chat-52-w.png"
              />
              <span class="menu-text">Chat</span>
            </a>
            <a @click="reportClick()" id="report" class="menu-box">
              <img
                class="menu-icon"
                src="@/assets/icon/icon-white/icons8-system-report-52-w.png"
              />
              <span class="menu-text">Report</span>
            </a>
            <a @click="signoutClick()" id="sign-out" class="menu-box">
              <img
                class="menu-icon"
                src="@/assets/icon/icons8-sign-out-96-o.png"
              />
              <span class="menu-text-orange">Sign Out</span>
            </a>
          </Slide>

          <img
            @click="zoneClick()"
            id="logo"
            style="cursor: pointer;"
            src="@/assets/longlogo.png"
          />
        </div>
        <div id="right">
          <img
            id="mail-logo"
            src="@/assets/icon/icons8-important-mail-96@2x.png"
          />
          <img
            @click="detailReturn()"
            id="profile-logo"
            src="@/assets/profile/pfpic.jpg"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Slide } from "vue-burger-menu";
import AuthService from "../services/auth.service";

export default {
  components: {
    Slide,
  },
  data() {
    return {
      zoneselect: true,
      eventselect: false,
      discountselect: false,
      chatselect: false,
      historyselect: false,
      reportselect: false,
      signoutselect: false,
    };
  },
  methods: {
    zoneClick() {
      this.zoneselect = true;
      this.eventselect = false;
      this.discountselect = false;
      this.chatselect = false;
      this.historyselect = false;
      (this.reportselect = false), (this.signoutselect = false);
      this.$emit("clickClearSearch", true);
      this.$emit("pageReturn", 1);
    },
    eventClick() {
      this.zoneselect = false;
      this.eventselect = true;
      this.discountselect = false;
      this.chatselect = false;
      this.historyselect = false;
      (this.reportselect = false), (this.signoutselect = false);
      this.$emit("clickClearSearch", true);
      this.$emit("pageReturn", 4);
    },
    discountClick() {
      this.zoneselect = false;
      this.eventselect = false;
      this.discountselect = true;
      this.chatselect = false;
      this.historyselect = false;
      (this.reportselect = false), (this.signoutselect = false);
      this.$emit("clickClearSearch", true);
      this.$emit("pageReturn", 5);
    },
    chatClick() {
      this.zoneselect = false;
      this.eventselect = false;
      this.discountselect = false;
      this.chatselect = true;
      this.historyselect = false;
      (this.reportselect = false), (this.signoutselect = false);
      this.$emit("clickClearSearch", true);
      this.$emit("pageReturn", 2);
    },
    historyClick() {
      this.zoneselect = false;
      this.eventselect = false;
      this.discountselect = false;
      this.chatselect = false;
      this.historyselect = true;
      (this.reportselect = false), (this.signoutselect = false);
      this.$emit("clickClearSearch", true);
      this.$emit("pageReturn", 6);
    },
    reportClick() {
      this.zoneselect = false;
      this.eventselect = false;
      this.discountselect = false;
      this.chatselect = false;
      this.historyselect = false;
      (this.reportselect = true), (this.signoutselect = false);
      this.$emit("clickClearSearch", true);
      this.$emit("pageReturn", 3);
    },
    signoutClick() {
      this.zoneselect = false;
      this.eventselect = false;
      this.discountselect = false;
      this.chatselect = false;
      this.historyselect = false;
      (this.reportselect = false), (this.signoutselect = true);
      AuthService.logout();
    },
    detailReturn() {
      this.$emit("clickDetail", true);
    },
  },
  computed: {
  },
};
</script>

<style scoped>
#mobile-topbar {
  display: flex;
  background-color: #ffffff;
  position: fixed;
  z-index: 9999;
  width: 100%;
}

.menu-text {
  font-family: "Atten-Round-New";
  font-size: 0.75em;
  font-weight: 400;
  color: #ffffff;
  padding-left: 5px;
}

.menu-text-orange {
  font-family: "Atten-Round-New";
  font-size: 0.75em;
  font-weight: 400;
  color: #ff8864;
  padding-left: 5px;
}

.menu-box {
  display: flex;
  align-items: center;
}

.menu-icon {
  width: 20px;
}

#sign-out {
  background-color: #ffffff;
}

#mobile-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#left,
#right {
  display: flex;
  align-items: center;
}

#mobile-container {
  padding: 13px 0px;
}

#logo {
  width: 155px;
  margin-left: 20px;
}

#profile-logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 40px;
  object-fit: cover;
}

#mail-logo {
  width: 30px;
}

@media screen and (max-width: 490px) {
  #logo {
    width: 120px;
  }

  #mail-logo {
    width: 25px;
  }

  #profile-logo {
    width: 30px;
    height: 30px;
    margin-left: 25px;
  }
}
</style>
