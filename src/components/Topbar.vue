<template>
  <!-- Top Bar -->
  <div :id="cssBlackground" class="event-container">
    <div :class="cssSearch">
      <!-- Input -->
      <div class="left-inner-addon input-container">
        <i class="fa fa-search"></i>
        <input
          type="text"
          class="search-input"
          :placeholder="inputPlaceholder"
          v-model="search"
        />
      </div>
      <!-- Input -->

      <div
        @click="pointClick()"
        id="coin-box"
        class="section"
      >
        <img id="coin-logo" src="@/assets/icon/coin.png" />
        <h1 :class="csspointColor" id="bar-value">{{ this.$store.state.point }}</h1>
      </div>

      <div id="mail-box">
        <div id="mail-circle">
          <img
            @click="notiClick()"
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
          <img v-if="role != `RO04`" class="verified-badge" src="@/assets/icon/verified-badge.png"/>
        </div>
      </div>
    </div>
  </div>
  <!-- Top Bar -->
</template>

<script>
import User from "../models/user";
import decode from "jwt-decode";
import UserService from "../services/user.service";
import PointTransactionService from "../services/pointTransaction.service";

export default {
  data() {
    return {
      search: "",
      user: new User({ username: "", profile_pic: "" })
    };
  },
  props: ["clearSearch", "demoRole"],
  created() {
    this.getRole();
    UserService.getTopBarInfo().then((res) => {
      if (res) {
        this.user = res;
      }
    });

    PointTransactionService.getPoint().then((res) => {
      if (res) {
        this.$store.state.point = res.point;
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
    }
  },
  methods: {
    getRole() {
      let userData = decode(localStorage.getItem("user"));
      this.role = userData.role_id;
    },
    detailReturn() {
      this.$emit("clickDetail", true);
    },
    pointClick() {
      this.$emit("point", true);
    },
    notiClick() {
      this.$emit("notificationShow", true);
    }
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
    inputPlaceholder() {
      let user = "find event, friend, and discount";
      let admin = "find discount, user, and report";
      if (this.demoRole == 1) {
        return user;
      }
      return admin;
    },
    csspointColor(){
      let user = "black-color";
      let admin = "white-color";
      if (this.demoRole == 1) {
        return user;
      }
      return admin;
    },
    cssSearch() {
      let user = "search-bar";
      // let admin = "search-bar-admin";
      let admin = "search-bar";
      if (this.demoRole == 1) {
        return user;
      }
      return admin;
    }
  }
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

.verified-badge{
  width:15px;
  height:15px;
  padding-left:10px;
}

#topbar-admin {
  background-color: #444444;
}

.search-bar,.search-bar-admin{
  display: flex;
  align-items: center;
}

.search-bar {
  justify-content: space-between;
}

.search-bar-admin{
  justify-content: flex-end;
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
  width: 550px;
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
  cursor: pointer;
}

#mail-logo {
  width: 29px;
}

#mail-circle {
  border-radius: 50%;
  background-color: #ffffff;
  padding: 11px;
  cursor: pointer;
}

#bar-value {
  font-size: 2em;
  margin-left: 13px;
  cursor: pointer;
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
  display:flex;
  justify-content: center;
  align-items: center;
  /* margin-left: 57px; */
}

@media screen and (max-width: 1350px) {
  .search-input {
    width: 350px;
  }
}

@media screen and (max-width: 490px) {
  #topbar,
  #topbar-admin {
    padding-top: 10px;
  }
}

@media screen and (max-width: 880px) {
  #profile-box,
  #coin-box,
  #mail-box {
    display: none;
  }

  .search-bar,.search-bar-admin {
    display: block;
  }

  #topbar,
  #topbar-admin {
    position: relative;
    background-color: inherit;
  }

  .search-input {
    width: 100%;
  }
}
</style>
