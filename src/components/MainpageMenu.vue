<template>
  <!-- Navbar -->
  <div class="sidenav">
    <div id="nav-container">
      <!-- Top -->
      <div id="top-half" class="section">
        <div>
          <img id="logo" src="@/assets/longlogo.png" />
          <div id="create-event-button" class="section">
            <button @click="createdReturn()">
              CREATE EVENT
              <img id="plus" src="@/assets/icons8-plus-math-90.png" />
            </button>
          </div>
        </div>
      </div>

      <!-- Middle Menu-->
      <div>
        <!-- Your Zone -->
        <div @click="zoneClick()" class="section" :class="zonebox" style ="cursor: pointer;">
          <div>
            <img
              v-show="zoneselect == false"
              class="menu-icon"
              src="@/assets/icon/icons8-home-144-b.png"
            />
            <img
              v-show="zoneselect == true"
              class="menu-icon"
              src="@/assets/icon/icons8-home-144-o.png"
            />
          </div>
          <div>
            <h1 :class="zonetext">Your Zone</h1>
          </div>
        </div>
        <!-- Your Zone -->

        <!-- Event -->
        <div @click="eventClick()" class="section" :class="eventbox" style ="cursor: pointer;">
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
        <div @click="discountClick()" class="section" :class="discountbox" style ="cursor: pointer;">
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

        <!-- Chat -->
        <div
          @click="chatClick()"
          style="margin-top: 70px; cursor: pointer;"
          class="section"
          :class="chatbox"
        >
          <div>
            <img
              v-show="chatselect == false"
              class="menu-icon"
              src="@/assets/icon/icons8-chat-52-b.png"
            />
            <img
              v-show="chatselect == true"
              class="menu-icon"
              src="@/assets/icon/icons8-chat-52-o.png"
            />
          </div>
          <div>
            <h1 :class="chattext">Chat</h1>
          </div>
        </div>
        <!-- Chat -->

        <!-- History -->
        <div @click="historyClick()" class="section" :class="historybox" style ="cursor: pointer;">
          <div>
            <img
              v-show="historyselect == false"
              class="menu-icon"
              src="@/assets/icon/icons8-time-machine-96-b.png"
            />
            <img
              v-show="historyselect == true"
              class="menu-icon"
              src="@/assets/icon/icons8-time-machine-96-o.png"
            />
          </div>
          <div>
            <h1 :class="historytext">History</h1>
          </div>
        </div>
        <!-- History -->

        <!-- Report -->
        <div
           @click="reportClick()"
          style="margin-top: 135px; cursor: pointer;"
          class="section"
          :class="reportbox"
        >
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
        <div
          @click="signoutClick()"
          class="section"
          :class="signoutbox"
          style ="cursor: pointer;"
        >
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
export default {
  name: "Mainpage",
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
    createdReturn() {
      this.$emit("clickCreate",true);
      },
    zoneClick() {
      this.zoneselect = true;
      this.eventselect = false;
      this.discountselect = false;
      this.chatselect = false;
      this.historyselect = false;
      this.reportselect = false,
      this.signoutselect = false;
      this.$emit("pageReturn",1);
    },
    eventClick() {
      this.zoneselect = false;
      this.eventselect = true;
      this.discountselect = false;
      this.chatselect = false;
      this.historyselect = false;
      this.reportselect = false,
      this.signoutselect = false;
      this.$emit("pageReturn",4);
    },
    discountClick() {
      this.zoneselect = false;
      this.eventselect = false;
      this.discountselect = true;
      this.chatselect = false;
      this.historyselect = false;
      this.reportselect = false,
      this.signoutselect = false;
      this.$emit("pageReturn",5);
    },
    chatClick() {
      this.zoneselect = false;
      this.eventselect = false;
      this.discountselect = false;
      this.chatselect = true;
      this.historyselect = false;
      this.reportselect = false,
      this.signoutselect = false;
      this.$emit("pageReturn",2);
    },
    historyClick() {
      this.zoneselect = false;
      this.eventselect = false;
      this.discountselect = false;
      this.chatselect = false;
      this.historyselect = true;
      this.reportselect = false,
      this.signoutselect = false;
    },
    reportClick() {
      this.zoneselect = false;
      this.eventselect = false;
      this.discountselect = false;
      this.chatselect = false;
      this.historyselect = false;
      this.reportselect = true,
      this.signoutselect = false;
      this.$emit("pageReturn",3);
    },
    signoutClick() {
      this.zoneselect = false;
      this.eventselect = false;
      this.discountselect = false;
      this.chatselect = false;
      this.historyselect = false;
      this.reportselect = false,
      this.signoutselect = true;
      localStorage.removeItem("user");
      window.location.href = "/";
    },
  },
  computed: {
    zonebox() {
      let select = "section menu-box";
      let unselect = "section menu-box-unselect";
      if (this.zoneselect === true) {
        return select;
      }
      return unselect;
    },
    zonetext() {
      let unselect = "menu-text";
      let select = "menu-text-select";
      if (this.zoneselect === true) {
        return select;
      }
      return unselect;
    },
    eventbox() {
      let select = "menu-box";
      let unselect = "menu-box-unselect";
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
      let select = "menu-box";
      let unselect = "menu-box-unselect";
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
    chatbox() {
      let select = "menu-box";
      let unselect = "menu-box-unselect";
      if (this.chatselect === true) {
        return select;
      }
      return unselect;
    },
    chattext() {
      let unselect = "menu-text";
      let select = "menu-text-select";
      if (this.chatselect === true) {
        return select;
      }
      return unselect;
    },
    historybox() {
      let select = "menu-box";
      let unselect = "menu-box-unselect";
      if (this.historyselect === true) {
        return select;
      }
      return unselect;
    },
    historytext() {
      let unselect = "menu-text";
      let select = "menu-text-select";
      if (this.historyselect === true) {
        return select;
      }
      return unselect;
    },
    reportbox() {
      let select = "menu-box";
      let unselect = "menu-box-unselect";
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
      let select = "menu-box";
      let unselect = "menu-box-unselect";
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
    },
  },
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
  padding-top:30px;
  justify-content: center;
}

#create-event-button > button {
  background-color: #ff8864;
  border: none;
  border-radius: 20px;
  font-size: 1.75em;
  font-weight: 450;
  color: #ffffff;
  padding: 6px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 45px;
  margin-bottom: 40px;
}

#nav-container {
  display: block;
}
</style>