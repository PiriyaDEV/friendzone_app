<template>
  <!-- Top Bar -->
  <div :id="cssBlackground" class="event-container">
    <div id="search-bar">
      <!-- Input -->
      <div class="left-inner-addon input-container">
        <i class="fa fa-search"></i>
        <input
          type="text"
          class="search-input"
          placeholder="find Event, friend, and discount"
          v-model="search"
        />
      </div>
      <!-- Input -->

      <div v-if="!toggle" class="section">
        <img id="coin-logo" src="@/assets/icon/coin.png" />
        <h1 class="black-color" id="bar-value">2500</h1>
      </div>

      <div>
        <div @click="clickDemoAdmin()" id="mail-circle">
          <img
            id="mail-logo"
            src="@/assets/icon/icons8-important-mail-96@2x.png"
          />
        </div>
      </div>

      <div>
        <div
          @click="detailReturn()"
          id="profile-box"
          class="section"
          style="cursor: pointer"
        >
          <img id="profile-logo" :src="user.profile_pic" />
          <h1 class="black-color" id="bar-value">{{ user.username }}</h1>
        </div>
      </div>
    </div>
  </div>
  <!-- Top Bar -->
</template>

<script>
import User from "../models/user";
import UserService from "../services/user.service";

export default {
  data() {
    return {
      search: "",
      toggle: false,
      user: new User({ username: "", profile_pic: "" }),
    };
  },
  props: ["clearSearch", "demoRole"],
  created() {
    UserService.getTopBarInfo().then((res) => {
      if (res) {
        this.user = res;
      }
    });
  },
  watch: {
    search: function() {
      this.$emit("searchData", this.search);
      this.$emit("clickClearSearch", false);
    },
    clearSearch: function() {
      if (this.clearSearch == true) {
        this.search = "";
      }
    },
  },
  methods: {
    detailReturn() {
      this.$emit("clickDetail", true);
    },
    clickDemoAdmin() {
      this.toggle = !this.toggle;
      if (this.toggle == true) {
        this.$emit("demoAdmin", 2);
      } else {
        this.$emit("demoAdmin", 1);
      }
    },
  },
  computed: {
    cssBlackground() {
      let user = "topbar";
      let admin = "topbar-admin";
      if (this.demoRole == 1) {
        return user;
      }
      return admin;
    },
  },
};
</script>

<style scoped>
#topbar,
#topbar-admin {
  padding-top: 25px;
  padding-bottom: 15px;
  z-index: 999;
  position: fixed;
}

#topbar {
  background-color: #f8f3ec;
}

#topbar-admin {
  background-color: #444444;
}

#search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.input-container {
  padding-bottom: 1em;
}
.left-inner-addon {
  position: relative;
}
.left-inner-addon input {
  padding-left: 42px !important;
}
.left-inner-addon i {
  position: absolute;
  padding: 14px 13px;
  pointer-events: none;
}

.search-icon {
  width: 20px;
  margin-top: -10px;
  margin-left: -43px;
  z-index: 4;
  cursor: pointer;
}

input {
  width: 100%;
  padding: 1em !important;
  margin: 0em !important;
  box-sizing: border-box;
}

.search-input {
  width: 650px;
  font-size: 1.75em;
  font-weight: 400;
  background-color: #ffffff;
  color: #444444;
  border-radius: 8px;
  border: none;
}

i {
  color: #e3e3e3;
  width: 30px;
  display: block;
}

.fa {
  font-size: initial;
}

.left-top {
  margin-left: 30px;
}

#coin-logo {
  width: 30px;
}

#mail-logo {
  width: 29px;
}

#mail-circle {
  border-radius: 50%;
  background-color: #ffffff;
  padding: 11px;
  cursor:pointer;
}

#bar-value {
  font-size: 2em;
  margin-left: 13px;
}

#profile-logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
}

#profile-box {
  background-color: #ffffff;
  border-radius: 27px;
  padding: 7px 20px 7px 7px;
  /* margin-left: 57px; */
}
</style>
