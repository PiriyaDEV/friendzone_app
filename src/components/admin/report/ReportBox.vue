<template>
  <div :class="cssBox">
    <div id="report-menu">
      <div :class="cssMiddle">
        <h1 id="menu-text-id" :class="cssMenuG">
          <span v-if="approver">{{ event.event_id }}</span>
          <span v-if="report">{{ reportList.report_id }}</span>
          <span v-if="discount">{{ discountList.discount_id }}</span>
          <span v-if="user" class="icon-box white-color user-font"
            ><img id="profile-icon" :src="userList.profile_pic" />{{
              userList.username
            }}</span
          >
        </h1>
        <h1 :class="cssMenuB">
          <span v-if="approver">{{ event.title }}</span>
          <span v-if="report" class="white-color">{{ reportList.title }}</span>
          <span v-if="discount" class="white-color">{{
            discountList.name
          }}</span>
          <div v-if="user" class="rating-box">
            <span class="white-color">Rating</span>
            <!-- Rating -->
            <div id="star-box" class="section">
              <!-- Star -->
              <div>
                <img
                  v-if="showRating[0]"
                  class="star"
                  src="@/assets/icon/icons8-star-96-orange.png"
                />
                <img
                  v-else
                  class="star"
                  src="@/assets/icon/icons8-star-96.png"
                />
              </div>
              <!-- Star -->

              <!-- Star -->
              <div>
                <img
                  v-if="showRating[1]"
                  class="star"
                  src="@/assets/icon/icons8-star-96-orange.png"
                />
                <img
                  v-else
                  class="star"
                  src="@/assets/icon/icons8-star-96.png"
                />
              </div>
              <!-- Star -->

              <!-- Star -->
              <div>
                <img
                  v-if="showRating[2]"
                  class="star"
                  src="@/assets/icon/icons8-star-96-orange.png"
                />
                <img
                  v-else
                  class="star"
                  src="@/assets/icon/icons8-star-96.png"
                />
              </div>
              <!-- Star -->

              <!-- Star -->
              <div>
                <img
                  v-if="showRating[3]"
                  class="star"
                  src="@/assets/icon/icons8-star-96-orange.png"
                />
                <img
                  v-else
                  class="star"
                  src="@/assets/icon/icons8-star-96.png"
                />
              </div>

              <!-- Star -->

              <!-- Star -->
              <div>
                <img
                  v-if="showRating[4]"
                  class="star"
                  src="@/assets/icon/icons8-star-96-orange.png"
                />
                <img
                  v-else
                  class="star"
                  src="@/assets/icon/icons8-star-96.png"
                />
              </div>
              <!-- Star -->
            </div>
            <span class="mobile-rating">{{ rating }}</span>
          </div>
          <!-- Rating -->
        </h1>
        <!-- Here -->
        <h1 :class="cssHideB">
          <span v-if="approver">{{ event.location }}</span>
          <span v-if="report" class="white-color">{{ reportList.type }}</span>
          <span v-if="discount" class="coin-box white-color"
            ><img id="coin-logo" src="@/assets/icon/coin.png" />
          <span v-if="discountList.redeem_point == 0">
            FREE
          </span>
          <span v-else>
            {{ discountList.redeem_point }}
          </span>
          </span
          >
          <span v-if="user" class="white-color">{{ userList.role }}</span>
        </h1>

        <!-- Here -->
        <h1 v-if="!user" :class="cssHideBadmin">
          <span v-if="approver">{{ event.date }}</span>
          <span v-if="report" class="white-color">{{
            reportList.type_name
          }}</span>
          <span v-if="discount" class="white-color">{{
            discountList.period_end.substring(0, 11)
          }}</span>
        </h1>

        <h1 v-if="discount" :class="cssHideBadmin">
          {{ discountList.expired.substring(0, 11) }}
        </h1>

        <h1 v-if="approver" :class="cssMenuB">{{ event.username }}</h1>

        <div v-if="approver" id="pending-dot">
          <span :class="cssPendingEvent"></span>
          <h1 :class="cssHideG">{{ pendingEvent }}</h1>
        </div>

        <div v-if="report" id="pending-dot">
          <span :class="cssStatusReport"></span>
          <h1 :class="cssHideG">{{ reportList.status }}</h1>
        </div>

        <div v-if="discount" id="pending-dot">
          <span :class="cssStatusDiscount"></span>
          <h1 :class="cssHideG">{{ discountList.status }}</h1>
        </div>

        <div v-if="user" id="pending-dot">
          <span :class="cssStatusUser"></span>
          <h1 :class="cssHideG">{{ userList.status }}</h1>
        </div>
      </div>
      <div id="button-section">
        <button :class="cssView" @click="viewClick()">View</button>
        <!-- <button v-if="select == 3" class="button delete" >Invite</button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showRating: [false, false, false, false, false],
      rating: 5.0
    };
  },
  props: [
    "approver",
    "event",
    "statusEvent",
    "report",
    "reportList",
    "discountList",
    "discount",
    "userList",
    "user"
  ],
  watch: {
    statusEvent: function() {
      if (this.event.event_id == this.statusEvent.event_id) {
        this.event.status_id = this.statusEvent.status_id;
      }
    }
  },
  created() {
    if (this.user) {
      if (this.userList.rating > 0) {
        this.showRating.fill(true, 0, this.userList.rating.toFixed(0));
        this.rating = this.userList.rating.toFixed(1);
      } else {
        this.showRating.fill(true, 0, 5);
        this.rating = "5.0";
      }
    }
  },
  computed: {
    cssPendingEvent() {
      let red = "dot red";
      let green = "dot green";
      let yellow = "dot yellow";
      let deleteColor = "dot delete";
      if (this.event.status_id == "ST03") {
        return green;
      } else if (this.event.status_id == "ST15") {
        return red;
      } else if (this.event.status_id == "ST07") {
        return deleteColor;
      }
      return yellow;
    },
    pendingEvent() {
      let reject = "Rejected";
      let approved = "Approved";
      let pending = "Pending";
      let deleteText = "Delete";
      if (this.event.status_id == "ST03") {
        return approved;
      } else if (this.event.status_id == "ST15") {
        return reject;
      } else if (this.event.status_id == "ST07") {
        return deleteText;
      }
      return pending;
    },
    cssStatusReport() {
      let waitingReport = "dot yellow";
      let readReport = "dot green";
      let banReport = "dot red";
      let deleteReport = "dot red";
      if (this.reportList.status == "Waiting") return waitingReport;
      else if (this.reportList.status == "Read") return readReport;
      else if (this.reportList.status == "Banned") return banReport;
      return deleteReport;
    },
    cssStatusDiscount() {
      let inactiveDiscount = "dot black";
      let activeDiscount = "dot green";
      let deleteDiscount = "dot red";
      if (this.discountList.status == "Inactive") {
        return inactiveDiscount;
      } else if (this.discountList.status == "Active") {
        return activeDiscount;
      } else return deleteDiscount;
    },
    cssStatusUser() {
      let normal = "dot green";
      let ban = "dot red";
      if (this.userList.status == "Normal") {
        return normal;
      } else {
        return ban;
      }
    },
    cssMiddle() {
      let general = "report-middle-menu";
      let adminReport = "report-middle-menu-admin-report";
      let app = "report-middle-menu-approver";
      let adminUser = "report-middle-menu-admin-user";
      let adminDiscount = "report-middle-menu-admin-discount";
      if (this.approver == true) {
        return app;
      } else if (this.report == true) {
        return adminReport;
      } else if (this.discount == true) {
        return adminDiscount;
      } else if (this.user == true) {
        return adminUser;
      }
      return general;
    },
    cssBox() {
      let general = "reportbox";
      let app = "reportbox-approver";
      if (this.approver == true) {
        return app;
      }
      return general;
    },
    cssView() {
      let general = "button view";
      let app = "button view-approver";
      if (this.approver == true) {
        return app;
      }
      return general;
    },
    cssMenuG() {
      let general = "menu-text";
      let user = "menu-text profile-text";
      let app = "menu-gray-approver";
      if (this.approver == true) {
        return app;
      } else if (this.user == true) {
        return user;
      }
      return general;
    },
    cssMenuB() {
      let general = "menu-text";
      let user = "menu-text profile-text";
      let app = "menu-black-approver";
      if (this.approver == true) {
        return app;
      } else if (this.user == true) {
        return user;
      }
      return general;
    },
    cssHideB() {
      let general = "menu-text";
      let user = "menu-text profile-text";
      let app = "menu-black-approver approver-hide";
      if (this.approver == true) {
        return app;
      } else if (this.user == true) {
        return user;
      }
      return general;
    },
    cssHideG() {
      let general = "menu-text approver-hide";
      let app = "menu-gray-approver approver-hide";
      if (this.approver == true) {
        return app;
      }
      return general;
    },
    cssHideBadmin() {
      let general = "menu-text approver-hide white-color";
      let app = "menu-black-approver approver-hide white-color";
      if (this.approver == true) {
        return app;
      }
      return general;
    }
  },
  methods: {
    viewClick() {
      if (this.approver == true) {
        this.$emit("viewReturn", true);
        this.$emit("viewData", this.event);
      }
      if (this.report == true) {
        this.$emit("reportData", this.reportList);
      }
      if (this.discount == true) {
        this.$emit("discountData", this.discountList);
      }
      if (this.user == true) {
        this.$emit("customerData", this.userList);
      }
    }
  }
};
</script>

<style scoped>
.reportbox {
  background-color: #4d4d4d;
  border-radius: 23px;
  margin: 10px 0px;
}

.reportbox-approver {
  background-color: #ffffff;
  border-radius: 23px;
  margin: 10px 0px;
}

.profile-text {
  margin: 0px;
}

#report-menu {
  align-items: center;
  display: flex;
  width: 100%;
  padding: 3px;
}

.mobile-rating {
  display: none;
}

#star-box {
  margin-left: 5px;
  margin-top: 3px;
}

.star {
  width: 12px;
  margin-right: 1px;
}

#profile-icon {
  width: 25px;
  height: 25px;
  -o-object-fit: cover;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 14px;
  border: 0.5px solid #ffffff;
}

.user-font {
  font-size: 1.3em;
  font-weight: 600;
}

#report {
  width: 100%;
}

.mobile-rating {
  margin-left: 6px;
}

#coin-logo {
  width: 15px;
  height: 15px;
  padding-right: 6px;
}

.menu-text {
  font-size: 1.5em;
  font-weight: 400;
  color: #b2b2b2;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0px 10px;
}

.coin-box,
.icon-box,
.rating-box {
  display: flex;
  align-items: center;
}

.approver-hide {
  display: inherit;
}

.menu-gray-approver {
  font-size: 1.5em;
  font-weight: 400;
  color: #a0a0a0;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0px 10px;
}

.menu-black-approver {
  font-size: 1.5em;
  font-weight: 400;
  color: #444444;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0px 10px;
}

#menu-text-id {
  padding: 0px 30px;
}

.report-middle-menu {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  align-items: center;
  width: 100%;
}

.report-middle-menu-admin-user {
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  align-items: center;
  width: 100%;
}

.report-middle-menu-admin-report {
  display: grid;
  grid-template-columns: 15% 20% 10% 35% 20%;
  align-items: center;
  width: 100%;
}

.report-middle-menu-approver {
  display: grid;
  grid-template-columns: 15% 20% 15% 15% 15% 20%;
  align-items: center;
  width: 100%;
}

.report-middle-menu-admin-discount {
  display: grid;
  grid-template-columns: 15% 20% 15% 15% 15% 20%;
  align-items: center;
  width: 100%;
}

.button {
  font-family: "Atten-Round-New";
  font-size: 1.5em;
  font-weight: 550;
  padding: 4px 13px;
  margin: 2px 8px 2px 0px;
  border-radius: 24px;
}

.view {
  color: #ffffff;
  border: 1.5px solid #ffffff;
  background-color: inherit;
}

.view-approver {
  color: #444444;
  border: 1.5px solid #444444;
  background-color: inherit;
}

.dot {
  height: 6px;
  width: 6px;
  background-color: #bbb;
  border-radius: 50%;
  margin-right: 5px;
}

.green {
  background-color: #91f071;
}

.yellow {
  background-color: #ffba1d;
}

.red {
  background-color: #fd6363;
}

.delete {
  background-color: #444444;
}

#pending-dot {
  display: flex;
  align-items: center;
}

.report-middle-menu-admin-report > .approver-hide {
  margin-right: 5px;
}

@media screen and (max-width: 690px) {
  .approver-hide,
  #star-box {
    display: none;
  }

  .mobile-rating {
    display: block;
  }

  .report-middle-menu-approver {
    grid-template-columns: 25% 40% 25% 10%;
  }

  .report-middle-menu-admin-discount {
    grid-template-columns: 25% 40% 25% 10%;
  }

  .report-middle-menu {
    grid-template-columns: 25% 40% 25% 10%;
  }

  .report-middle-menu-admin-report {
    grid-template-columns: 25% 40% 25% 10%;
  }

  .report-middle-menu-admin-user {
    grid-template-columns: 35% 25% 30% 10%;
  }

  .user-font {
    font-size: 1.1em;
  }

  #profile-icon {
    width: 15px;
    height: 15px;
  }

  #coin-logo {
    width: 8px;
    height: 8px;
  }

  #menu-text-id {
    padding: 0px 20px 0px 30px;
  }

  .menu-gray-approver,
  .menu-black-approver,
  .menu-text {
    font-size: 1.3em;
  }

  .view-approver {
    margin-left: 10px;
  }

  .button {
    font-size: 1.3em;
    font-weight: 500;
    padding: 2px 7px;
  }

  .history-text {
    font-size: 1.5em;
  }
}
</style>
