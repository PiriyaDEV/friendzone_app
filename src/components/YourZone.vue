<template>
  <div id="detail" style="background-color: #f8f3ec" class="event-container">
    <!-- Follow Box -->
    <div id="follow-box">
      <!-- Host -->
      <div class="verticle-box">
        <h1 class="number-box">{{ hostedEventList.length }}</h1>
        <h1 class="title-box">Host</h1>
      </div>
      <!-- Host -->

      <!-- Joined -->
      <div class="verticle-box">
        <h1 class="number-box">{{ joinedEventList.length }}</h1>
        <h1 class="title-box">Joined</h1>
      </div>
      <!-- Joined -->

      <!-- Followed -->
      <div class="verticle-box">
        <h1 class="number-box">2</h1>
        <h1 class="title-box">Followers</h1>
      </div>
      <!-- Followed -->

      <!-- Following -->
      <div class="verticle-box">
        <h1 class="number-box">17</h1>
        <h1 class="title-box">Following</h1>
      </div>
      <!-- Following -->

      <img id="egg" src="@/assets/profile/smallegg.png" alt="" />
    </div>
    <!-- Follow Box -->

    <!-- Menubar -->
    <div id="menubar">
      <div @click="host = true" :class="selectHost">
        <h1>HOST</h1>
      </div>
      <div @click="join = true" :class="selectJoin">
        <h1>JOINED</h1>
      </div>
      <div @click="request = true" :class="selectRequest">
        <h1>REQUEST</h1>
      </div>
      <div @click="interest = true" :class="selectInterest">
        <h1>FAVOURITE</h1>
      </div>
      <div @click="discount = true" :class="selectDiscount">
        <h1>DISCOUNT</h1>
      </div>
    </div>
    <!-- Menubar -->

    <div id="event-display">
      <!-- YOUR EVENT -->

      <div v-if="host == true" id="host-menu">
        <div class="event-section">
          <h1 class="event-header">YOUR EVENT</h1>
          <select id="select-event" v-model="hostFilter">
            <option value="all">All Events</option>
            <option value="pending">Pending</option>
            <option value="ongoing">On Going</option>
            <option value="ended">Ended</option>
          </select>
        </div>
        <!-- YOUR EVENT -->

        <div>
          <!-- Event -->
          <div id="container">
            <div class="event-container">
              <div class="list event-flex-wrap-section">
                <div v-for="(event, i) in hostedEventShow" :key="i">
                  <EventFlex
                    :event="event"
                    @clickRate="clickRate"
                    @checkRate="checkRate"
                    @manageReturn="manageReturn"
                    @thisEvent="thisEvent"
                  />
                </div>
              </div>
            </div>
            <!-- Event -->
          </div>
        </div>

        <!-- YOUR EVENT -->
      </div>

      <div v-if="join == true" id="joined-menu">
        <div class="event-section">
          <h1 class="event-header">JOINED</h1>
          <select id="select-event" v-model="joinFilter">
            <option value="all">All Events</option>
            <option value="ongoing">On Going</option>
            <option value="ended">Ended</option>
          </select>
        </div>
        <!-- YOUR EVENT -->

        <div>
          <!-- Event -->
          <div id="container">
            <div class="event-container">
              <div class="list event-flex-wrap-section">
                <div v-for="(event, i) in joinedEventShow" :key="i">
                  <EventFlex
                    :event="event"
                    @clickRate="clickRate"
                    @checkRate="checkRate"
                    @manageReturn="manageReturn"
                    @thisEvent="thisEvent"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- Event -->
        </div>
        <!-- YOUR EVENT -->
      </div>

      <div v-if="request == true" id="request-menu">
        <div class="event-section">
          <h1 class="event-header">REQUEST</h1>
          <select id="select-event" v-model="requestFilter">
            <option value="all">All Events</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <!-- YOUR EVENT -->

        <div>
          <!-- Event -->
          <div id="container">
            <div class="event-container">
              <div class="list event-flex-wrap-section">
                <div v-for="(event, i) in requestedEventShow" :key="i">
                  <EventFlex
                    :event="event"
                    @clickRate="clickRate"
                    @checkRate="checkRate"
                    @manageReturn="manageReturn"
                    @thisEvent="thisEvent"
                  />
                </div>
              </div>
            </div>
            <!-- Event -->
          </div>
        </div>

        <!-- YOUR EVENT -->
      </div>

      <div v-if="interest == true" id="interest-menu">
        <div class="event-section">
          <h1 class="event-header">FAVOURITE</h1>
          <select id="select-event" v-model="interestFilter">
            <option value="all">All Events</option>
            <option value="host">Hosted</option>
          </select>
        </div>
        <!-- YOUR EVENT -->

        <div>
          <!-- Event -->
          <div id="container">
            <div class="event-container">
              <div class="list event-flex-wrap-section">
                <div v-for="(event, i) in interestedEventShow" :key="i">
                  <EventFlex
                    :event="event"
                    @clickRate="clickRate"
                    @checkRate="checkRate"
                    @manageReturn="manageReturn"
                    @thisEvent="thisEvent"
                  />
                </div>
              </div>
            </div>
            <!-- Event -->
          </div>
        </div>

        <!-- YOUR EVENT -->
      </div>

      <div v-if="discount == true" id="discount-menu">
        <div class="event-section">
          <h1 class="event-header">DISCOUNT</h1>
          <select id="select-event" v-model="discountFilter">
            <option value="all">All Discounts</option>
            <option value="host">Hosted</option>
            <option value="interest">Interested</option>
          </select>
        </div>
        <!-- YOUR EVENT -->

        <div>
          <!-- Event -->
          <div id="container">
            <div class="event-container">
              <div class="list event-flex-wrap-section">
                <div v-for="(item, i) in eventListLongFlex" :key="i">
                  <DiscountLongFlex
                    :statusYourZone="checkStatus"
                    @discountReturn="discountReturn"
                  />
                </div>
              </div>
            </div>

            <!-- Event -->
          </div>
        </div>
        <!-- YOUR EVENT -->
      </div>
    </div>
  </div>
</template>

<script>
import EventFlex from "@/components/EventFlex.vue";
import DiscountLongFlex from "@/components/DiscountLongFlex.vue";
import EventService from "@/services/event.service";
import decode from "jwt-decode";

export default {
  name: "Yourzone",
  data() {
    return {
      hostFilter: "all",
      joinFilter: "all",
      requestFilter: "all",
      interestFilter: "all",
      discountFilter: "all",
      host: true,
      join: false,
      request: false,
      interest: false,
      discount: false,
      selectHost: "menu-box-orange",
      selectJoin: "menu-box-white",
      selectRequest: "menu-box-white",
      selectInterest: "menu-box-white",
      selectDiscount: "menu-box-white",
      hostedEventShow: [],
      hostedEventList: [],
      joinedEventShow: [],
      joinedEventList: [],
      requestedEventShow: [],
      requestedEventList: [],
      interestedEventShow: [],
      interestedEventList: [],
      eventListLongFlex: 10,
    };
  },
  props: ["discountSelect"],
  watch: {
    host: function() {
      if (this.host == true) {
        this.hostedEventShow = [];
        this.getHostedEventList();
        this.hostFilter = "all";
        this.selectHost = "menu-box-orange";
        this.request = false;
        this.join = false;
        this.interest = false;
        this.discount = false;
      } else this.selectHost = "menu-box-white";
    },
    join: function() {
      if (this.join == true) {
        this.joinedEventShow = [];
        this.getJoinedEventList();
        this.joinFilter = "all";
        this.selectJoin = "menu-box-orange";
        this.request = false;
        this.host = false;
        this.interest = false;
        this.discount = false;
      } else this.selectJoin = "menu-box-white";
    },
    request: function() {
      if (this.request == true) {
        this.requestedEventShow = [];
        this.getRequestedEventList();
        this.requestFilter = "all";
        this.selectRequest = "menu-box-orange";
        this.host = false;
        this.join = false;
        this.interest = false;
        this.discount = false;
      } else this.selectRequest = "menu-box-white";
    },
    interest: function() {
      if (this.interest == true) {
        //this.interestedEventShow = [];
        this.getInterestedEventList();
        this.interestFilter = "all";
        this.selectInterest = "menu-box-orange";
        this.request = false;
        this.host = false;
        this.join = false;
        this.discount = false;
      } else this.selectInterest = "menu-box-white";
    },
    discount: function() {
      if (this.discount == true) {
        this.discountFilter = "all";
        this.selectDiscount = "menu-box-orange";
        this.request = false;
        this.host = false;
        this.join = false;
        this.interest = false;
      } else this.selectDiscount = "menu-box-white";
    },
    hostFilter: function() {
      if (this.hostFilter == "all") this.hostedEventShow = this.hostedEventList;
      else if (this.hostFilter == "pending") {
        this.hostedEventShow = this.hostedEventList.filter(
          (event) => event.status_id == "ST13"
        );
      } else if (this.hostFilter == "ongoing") {
        this.hostedEventShow = this.hostedEventList.filter((event) => {
          let currentTime = new Date().getTime();
          return currentTime > event.start_at && currentTime < event.end_at;
        });
      } else if (this.hostFilter == "ended") {
        this.hostedEventShow = this.hostedEventList.filter((event) => {
          let currentTime = new Date().getTime();
          return currentTime > event.end_at;
        });
      }
    },
    joinFilter: function() {
      if (this.joinFilter == "all") this.joinedEventShow = this.joinedEventList;
      else if (this.joinFilter == "ongoing") {
        this.joinedEventShow = this.joinedEventList.filter((event) => {
          let currentTime = new Date().getTime();
          return currentTime > event.start_at && currentTime < event.end_at;
        });
      } else if (this.joinFilter == "ended") {
        this.joinedEventShow = this.joinedEventList.filter((event) => {
          let currentTime = new Date().getTime();
          return currentTime > event.end_at;
        });
      }
    },
    requestFilter: function() {
      if (this.requestFilter == "all")
        this.requestedEventShow = this.requestedEventList;
      else if (this.requestFilter == "pending") {
        this.requestedEventShow = this.requestedEventList.filter(
          (event) => !event.rejected
        );
      } else if (this.requestFilter == "rejected") {
        this.requestedEventShow = this.requestedEventList.filter(
          (event) => event.rejected
        );
      }
    },
    interestFilter: function() {
      let user = decode(localStorage.getItem("user"));
      if (this.interestFilter == "all")
        this.interestedEventShow = this.interestedEventList;
      else if (this.interestFilter == "host") {
        this.interestedEventShow = this.interestedEventList.filter(
          (event) => event.user_id == user.user_id
        );
      }
    },
  },
  components: {
    EventFlex,
    DiscountLongFlex,
  },
  created() {
    this.getHostedEventList();
    this.getJoinedEventList();
  },
  methods: {
    clickRate(value) {
      this.$emit("clickShowed", value);
    },
    checkRate(value) {
      this.$emit("checkShow", value);
    },
    discountReturn(value) {
      this.$emit("clickDiscount", value);
    },
    manageReturn(value) {
      this.$emit("clickManage", value);
    },
    thisEvent(value) {
      this.$emit("thisEvent", value);
    },
    getHostedEventList() {
      EventService.getHostedEvent()
        .then((res) => {
          if (res) {
            this.hostedEventShow = res;
            this.hostedEventList = res;
          }
        })
        .catch(() => {
          this.hostedEventShow = [];
        });
    },
    getJoinedEventList() {
      EventService.getJoinedEvent()
        .then((res) => {
          if (res) {
            this.joinedEventShow = res;
            this.joinedEventList = res;
          }
        })
        .catch(() => {
          this.joinedEventShow = [];
        });
    },
    getRequestedEventList() {
      EventService.getRequestedEvent()
        .then((res) => {
          if (res) {
            this.requestedEventShow = res;
            this.requestedEventList = res;
          }
        })
        .catch(() => {
          this.requestedEventShow = [];
        });
    },
    getInterestedEventList() {
      EventService.getInterestedEvent()
        .then((res) => {
          if (res) {
            this.interestedEventShow = res;
            this.interestedEventList = res;
          }
        })
        .catch(() => {
          this.interestedEventShow = [];
        });
    },
  },
  computed: {
    checkStatus() {
      if (this.discountSelect == 1) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style scoped>
#detail {
  margin-top: 110px;
  margin-bottom: 30px;
  overflow-x: hidden;
  overflow-y: auto;
}

#follow-box {
  background-color: #ffc45c;
  border-radius: 10px;
  position: relative;
  padding: 15px 90px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 30px;
}
.verticle-box {
  text-align: center;
}
#egg {
  width: 120px;
  position: absolute;
  z-index: 3;
  bottom: -27px;
  right: -25px;
}

/* menubar css */

#menubar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-radius: 20px;
  margin: 0px 100px 10px 100px;
  padding: 3px;
}

.menu-box-orange,
.menu-box-white {
  padding: 8px 50px;
  border-radius: 20px;
  color: #444444;
  cursor: pointer;
}

.menu-box-orange {
  background-color: #fe8864;
  color: #ffffff;
}

.menu-box-orange > h1,
.menu-box-white > h1 {
  font-size: 1.75em;
  font-weight: 600;
  margin: 0px;
}

/* menubar css  */

#event-display {
  width: 400px;
}

.number-box {
  font-size: 4.25em;
  font-weight: 500;
  margin: 0;
  color: #444444;
}

.title-box {
  font-size: 2.5em;
  margin-top: -5px;
  margin-bottom: 0;
  color: #444444;
}

.event-section {
  display: flex;
  align-content: center;
}

.join-section {
  margin-top: 10px;
}

#select-event {
  color: #444444;
  height: 20px;
  margin-top: 28px;
  margin-left: 20px;
  border: none;
  background-color: transparent;
  font-size: 2em;
  font-family: "Atten-Round-New";
  font-weight: 500;
}

option {
  color: #444444;
}

.fade-in {
  animation: fadeIn ease 1s;
  -webkit-animation: fadeIn ease 1s;
  -moz-animation: fadeIn ease 1s;
  -o-animation: fadeIn ease 1s;
  -ms-animation: fadeIn ease 1s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-moz-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-o-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-ms-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

#container {
  width: 340px;
  height: 50px;
}

/* div::-webkit-scrollbar {
  height: 10px;
  padding-bottom: 30px;
}

div::-webkit-scrollbar-track {
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.2);
}

div::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 0 0 1px rgba(255, 255, 255, 1);
}

div::-webkit-scrollbar:vertical {
  display: none;
} */

.arrow {
  width: 30px;
  opacity: 70;
}

@media screen and (max-width: 1350px) {
  #menubar {
    margin: 0px;
  }

  .menu-box-orange,
  .menu-box-white {
    padding: 8px 40px;
  }
}

@media screen and (max-width: 880px) {
  #detail {
    margin-top: 0px;
  }
}

@media screen and (max-width: 768px) {
  .menu-box-orange,
  .menu-box-white {
    padding: 8px 30px;
  }
}

@media screen and (max-width: 650px) {
  .menu-box-orange,
  .menu-box-white {
    padding: 8px 20px;
  }

  #follow-box {
    padding: 15px 25px;
  }

  #egg {
    width: 100px;
    bottom:-23px;
    right:-21px;
  }
}

@media screen and (max-width: 570px) {
  .menu-box-orange,
  .menu-box-white {
    padding: 8px 13px;
  }

  .menu-box-orange > h1,
  .menu-box-white > h1 {
    font-size: 1.6em;
  }

  #egg {
    display:none;
  }
}
</style>
