<template>
  <!-- Navbar -->
  <div class="sidenav">
    <div id="nav-container">
      <!-- Top -->
      <div id="top-half" class="section">
        <div>
          <img id="logo" src="@/assets/longlogo.png" />
          <img
            @click="mainpageClick()"
            id="mobile-logo"
            style="cursor: pointer;"
            src="@/assets/friendzone-logo.png"
          />
        </div>
      </div>

      <!-- Middle Menu-->
      <div>
        <!-- Your Zone -->
        <div
          @click="mainpageClick()"
          :class="mainpagebox"
          style="margin-top:115px; cursor: pointer;"
        >
          <div>
            <img
              v-show="mainpageselect == false"
              class="menu-icon"
              src="@/assets/icon/icons8-home-144-b.png"
            />
            <img
              v-show="mainpageselect == true"
              class="menu-icon"
              src="@/assets/icon/icons8-home-144-o.png"
            />
          </div>
          <div>
            <h1 :class="mainpagetext">Mainpage</h1>
          </div>
        </div>
        <!-- Your Zone -->

        <!-- Event -->
        <div @click="eventClick()" :class="eventbox" style="cursor: pointer;">
          <div>
            <img
              v-show="eventselect == false"
              class="menu-icon"
              src="@/assets/icon/icons8-event-96-b.png"
            />
            <img
              v-show="eventselect == true"
              class="menu-icon"
              src="@/assets/icon/icons8-event-96-o.png"
            />
          </div>
          <div>
            <h1 :class="eventtext">Event</h1>
          </div>
        </div>
        <!-- Event -->

        <!-- Discount -->
        <div
          @click="discountClick()"
          :class="discountbox"
          style="cursor: pointer;"
        >
          <div>
            <img
              v-show="discountselect == false"
              class="menu-icon"
              src="@/assets/icon/icons8-pricing-96-b.png"
            />
            <img
              v-show="discountselect == true"
              class="menu-icon"
              src="@/assets/icon/icons8-pricing-96-o.png"
            />
          </div>
          <div>
            <h1 :class="discounttext">Discount</h1>
          </div>
        </div>
        <!-- Discount -->

        <!-- User -->
        <div @click="userClick()" style="cursor: pointer;" :class="userbox">
          <div>
            <img
              v-show="userselect == false"
              class="menu-icon"
              src="@/assets/icon/icons8-user-male-144-b.png"
            />
            <img
              v-show="userselect == true"
              class="menu-icon"
              src="@/assets/icon/icons8-user-male-144-o.png"
            />
          </div>
          <div>
            <h1 :class="usertext">User</h1>
          </div>
        </div>
        <!-- User -->

        <!-- Report -->
        <div @click="reportClick()" style="cursor: pointer;" :class="reportbox">
          <div>
            <img
              v-show="reportselect == false"
              class="menu-icon"
              src="@/assets/icon/icons8-system-report-52-b.png"
            />
            <img
              v-show="reportselect == true"
              class="menu-icon"
              src="@/assets/icon/icons8-system-report-52-o.png"
            />
          </div>
          <div>
            <h1 :class="reporttext">Report</h1>
          </div>
        </div>
        <!-- Report -->

        <!-- Sign out -->
        <div @click="signoutClick()" :class="signoutbox" class="bottom-menu">
          <div>
            <img
              v-show="signoutselect == false"
              class="menu-icon"
              src="@/assets/icon/icons8-sign-out-96-b.png"
            />
            <img
              v-show="signoutselect == true"
              class="menu-icon"
              src="@/assets/icon/icons8-sign-out-96-o.png"
            />
          </div>
          <div>
            <h1 :class="signouttext">Sign Out</h1>
          </div>
        </div>
        <!-- Sign out -->
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from "./../../services/auth.service";

export default {
  name: "Mainpage",
  data() {
    return {
      mainpageselect: true,
      eventselect: false,
      discountselect: false,
      userselect: false,
      reportselect: false,
      signoutselect: false
    };
  },
  methods: {
    mainpageClick() {
      this.mainpageselect = true;
      this.eventselect = false;
      this.discountselect = false;
      this.userselect = false;
      this.reportselect = false;
      (this.signoutselect = false), this.$emit("clickClearSearch", true);
      this.$emit("pageReturnAdmin", 1);
    },
    eventClick() {
      this.mainpageselect = false;
      this.eventselect = true;
      this.discountselect = false;
      this.userselect = false;
      this.reportselect = false;
      (this.signoutselect = false), this.$emit("clickClearSearch", true);
      this.$emit("pageReturnAdmin", 2);
    },
    discountClick() {
      this.mainpageselect = false;
      this.eventselect = false;
      this.discountselect = true;
      this.userselect = false;
      this.reportselect = false;
      (this.signoutselect = false), this.$emit("clickClearSearch", true);
      this.$emit("pageReturnAdmin", 3);
    },
    userClick() {
      this.mainpageselect = false;
      this.eventselect = false;
      this.discountselect = false;
      this.userselect = true;
      this.reportselect = false;
      (this.signoutselect = false), this.$emit("clickClearSearch", true);
      this.$emit("pageReturnAdmin", 4);
    },
    reportClick() {
      this.mainpageselect = false;
      this.eventselect = false;
      this.discountselect = false;
      this.userselect = false;
      this.reportselect = true;
      (this.signoutselect = false), this.$emit("clickClearSearch", true);
      this.$emit("pageReturnAdmin", 5);
    },
    signoutClick() {
      this.mainpageselect = false;
      this.eventselect = false;
      this.discountselect = false;
      this.userselect = false;
      this.reportselect = false;
      (this.signoutselect = true), AuthService.logout();
    }
  },
  computed: {
    mainpagebox() {
      let select = "section menu-box";
      let unselect = "section menu-box-unselect";
      if (this.mainpageselect === true) {
        return select;
      }
      return unselect;
    },
    mainpagetext() {
      let unselect = "menu-text";
      let select = "menu-text-select";
      if (this.mainpageselect === true) {
        return select;
      }
      return unselect;
    },
    eventbox() {
      let select = "section menu-box";
      let unselect = "section menu-box-unselect";
      if (this.eventselect === true) {
        return select;
      }
      return unselect;
    },
    eventtext() {
      let unselect = "menu-text";
      let select = "menu-text-select";
      if (this.eventselect === true) {
        return select;
      }
      return unselect;
    },
    discountbox() {
      let select = "section menu-box";
      let unselect = "section menu-box-unselect";
      if (this.discountselect === true) {
        return select;
      }
      return unselect;
    },
    discounttext() {
      let unselect = "menu-text";
      let select = "menu-text-select";
      if (this.discountselect === true) {
        return select;
      }
      return unselect;
    },
    userbox() {
      let select = "section menu-box";
      let unselect = "section menu-box-unselect";
      if (this.userselect === true) {
        return select;
      }
      return unselect;
    },
    usertext() {
      let unselect = "menu-text";
      let select = "menu-text-select";
      if (this.userselect === true) {
        return select;
      }
      return unselect;
    },
    reportbox() {
      let select = "section menu-box";
      let unselect = "section menu-box-unselect";
      if (this.reportselect === true) {
        return select;
      }
      return unselect;
    },
    reporttext() {
      let unselect = "menu-text";
      let select = "menu-text-select";
      if (this.reportselect === true) {
        return select;
      }
      return unselect;
    },
    signoutbox() {
      let select = "section menu-box";
      let unselect = "section menu-box-unselect";
      if (this.signoutselect === true) {
        return select;
      }
      return unselect;
    },
    signouttext() {
      let unselect = "menu-text";
      let select = "menu-text-select";
      if (this.signoutselect === true) {
        return select;
      }
      return unselect;
    }
  }
};
</script>

<style scoped>
#logo {
  width: 160px;
}
#plus {
  width: 17px;
  padding-left: 7px;
}
.menu-icon {
  width: 23px;
}
.menu-box {
  border-right: 6px solid #ff8864;
  width: 191px;
  display: flex;
  justify-content: flex-start;
  margin-left: 43px;
  padding: 3px 10px;
}
.menu-box-unselect {
  width: 191px;
  display: flex;
  justify-content: flex-start;
  margin-left: 43px;
  padding: 3px 10px;
}

#mobile-logo {
  display: none;
  width: 40px;
}

.bottom-menu {
  margin-top: 210px;
  cursor: pointer;
}

.menu-text {
  font-family: "Atten-Round-New";
  font-size: 2em;
  font-weight: 400;
  color: #444444;
  padding-left: 16px;
}
.menu-text-select {
  font-family: "Atten-Round-New";
  font-size: 2em;
  font-weight: 400;
  color: #ff8864;
  padding-left: 16px;
}
.sidenav {
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #ffffff;
  /* overflow-x: hidden; */
  display: flex;
  padding-top: 30px;
  justify-content: center;
}

#nav-container {
  display: block;
}

@media screen and (max-width: 1080px) {
  .menu-box {
    width: 173px;
  }
}

@media screen and (max-width: 1060px) {
  .menu-text-select,
  .menu-text {
    display: none;
  }

  .bottom-menu {
    margin-top: 70px !important;
  }

  .menu-box,
  .menu-box-unselect {
    justify-content: center;
    width: inherit;
    border: none;
    margin-left: 0px;
    margin-top: 40px;
  }

  #logo {
    display: none;
  }

  #mobile-logo {
    display: block;
    margin-left: 5px;
  }
}
</style>
