<template>
  <div id="mobile-topbar">
    <div class="section">
      <div v-if="!admin" id="mobile-container" class="event-container">
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
            <a  v-if="role == `RO02` || role == `RO01`" @click="analystClick()" id="analyst" class="menu-box">
              <img
                class="menu-icon"
                src="@/assets/icon/icon-white/icons8-increase-profits-96-w.png"
              />
              <span class="menu-text">Analyst</span>
            </a>
            <a v-if="role == `RO03` || role == `RO01`" @click="approverClick()" id="approver" class="menu-box">
              <img
                class="menu-icon"
                src="@/assets/icon/icon-white/icons8-verified-badge-96-w.png"
              />
              <span class="menu-text">Approver</span>
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
            v-if="!admin"
            @click="pointClick()"
            id="coin-logo"
            src="@/assets/icon/coin.png"
          />
          <img
            @click="notiClick()"
            id="mail-logo"
            src="@/assets/icon/icons8-important-mail-96@2x.png"
          />
          <img
            @click="detailReturn()"
            id="profile-logo"
            :src="user.profile_pic"
          />
        </div>
      </div>
      <div v-else id="mobile-container" class="event-container">
        <div id="left">
          <Slide :closeOnNavigation="true">
            <a @click="mainpageClick()" id="yourzone" class="menu-box">
              <img
                class="menu-icon"
                src="@/assets/icon/icon-white/icons8-home-144-w.png"
              />
              <span class="menu-text">Mainpage</span>
            </a>
            <a @click="discountClick()" id="discount" class="menu-box">
              <img
                class="menu-icon"
                src="@/assets/icon/icon-white/icons8-pricing-96-w.png"
              />
              <span class="menu-text">Discount</span>
            </a>
            <a @click="userClick()" id="chat" class="menu-box">
              <img
                class="menu-icon"
                src="@/assets/icon/icon-white/icons8-chat-52-w.png"
              />
              <span class="menu-text">User</span>
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
            @click="mainpageClick()"
            id="logo"
            style="cursor: pointer;"
            src="@/assets/longlogo.png"
          />
        </div>
        <div id="right">
          <img
            v-if="!admin"
            @click="pointClick()"
            id="coin-logo"
            src="@/assets/icon/coin.png"
          />
          <img
            @click="detailReturn()"
            id="profile-logo"
            :src="user.profile_pic"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Slide } from "vue-burger-menu";
import decode from "jwt-decode";
import User from "../models/user";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import PointTransactionService from "../services/pointTransaction.service";

export default {
  components: {
    Slide
  },
  props: ["admin"],
  data() {
    return {
      role:"",
      user: new User({ username: "", profile_pic: "" }),
      point: ""
    };
  },
  created() {
    this.getRole()
    UserService.getTopBarInfo().then((res) => {
      if (res) {
        this.user = res;
      }
    });

    PointTransactionService.getPoint().then((res) => {
      if (res) {
        this.point = res;
        console.log(this.point);
      }
    });
  },
  methods: {
    getRole() {
      let userData = decode(localStorage.getItem("user"));
      this.role = userData.role_id;
    },
    pointClick() {
      this.$emit("point", true);
    },
    zoneClick() {
      this.$emit("clickClearSearch", true);
      this.$emit("pageReturn", 1);
    },
    eventClick() {
      this.$emit("clickClearSearch", true);
      this.$emit("pageReturn", 4);
      this.$emit("pageReturnAdmin", 2);
    },
    discountClick() {
      this.$emit("clickClearSearch", true);
      this.$emit("pageReturn", 5);
      this.$emit("pageReturnAdmin", 3);
    },
    chatClick() {
      this.$emit("clickClearSearch", true);
      this.$emit("pageReturn", 2);
    },
    historyClick() {
      this.$emit("clickClearSearch", true);
      this.$emit("pageReturn", 6);
    },
    reportClick() {
      this.$emit("clickClearSearch", true);
      this.$emit("pageReturn", 3);
      this.$emit("pageReturnAdmin", 5);
    },
    signoutClick() {
      AuthService.logout();
    },
    analystClick() {
      this.$emit("clickClearSearch", true);
      this.$emit("pageReturn", 7);
    },
    approverClick() {
      this.$emit("clickClearSearch", true);
      this.$emit("pageReturn", 8);
    },
    detailReturn() {
      this.$emit("clickDetail", true);
    },
    mainpageClick() {
      this.$emit("pageReturnAdmin", 1);
    },
    userClick() {
      this.$emit("pageReturnAdmin", 4);
    },
    notiClick() {
      console.log("test")
      this.$emit("notificationShow", true);
    },
  },
  computed: {}
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
  cursor: pointer;
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
  object-fit: cover;
  cursor: pointer;
}

#mail-logo,
#profile-logo {
  margin-left: 30px;
}

#mail-logo,
#coin-logo {
  width: 30px;
  cursor: pointer;
}

@media screen and (max-width: 490px) {
  #logo {
    width: 120px;
  }

  #mail-logo,
  #coin-logo {
    width: 25px;
  }

  #profile-logo {
    width: 30px;
    height: 30px;
  }

  #mail-logo,
  #profile-logo {
    margin-left: 25px;
  }
}

@media screen and (max-width: 375px) {
  #mail-logo,
  #profile-logo {
    margin-left: 15px;
  }
}
</style>
