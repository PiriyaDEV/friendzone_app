<template>
  <div id="event-flex-box">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <img
      v-if="!event.interest"
      @click="interestEvent()"
      class="star"
      src="@/assets/event/icons8-star-96.png"
    />
    <img
      v-if="event.interest"
      @click="interestEvent()"
      class="star"
      src="@/assets/event/icons8-star-96-y.png"
    />

    <!-- User -->
    <div id="user-box">
      <img class="user" src="@/assets/event/icons8-customer-100.png" />
      <h1 v-if="event.joined != event.max_participant">
        {{ event.joined }}/{{ event.max_participant }}
      </h1>
      <h1 v-if="event.joined == event.max_participant" class="full">
        FULL
      </h1>
    </div>
    <!-- User -->

    <!-- Rating -->
    <div v-if="showEnded && event.rating" id="rating-box">
      <h1 v-if="Number.isInteger(event.rating)">RATING {{ event.rating }}/5</h1>
      <h1 v-else>Rating {{ event.rating.toFixed(1) }}/5</h1>
    </div>
    <!-- Rating -->

    <!-- Date -->
    <div id="date-box">
      <h1>
        {{ event.date }}
      </h1>
    </div>
    <!-- Date -->

    <!-- ShowBox -->
    <div v-if="showEnded" id="end-box">
      <h1>EVENT HAS ENDED</h1>
    </div>
    <!-- ShowBox -->

    <!-- ShowBox -->
    <div v-if="showApproving" id="wait-box">
      <h1>
        WAIT FOR APPROVING<i style="margin-left:5px;" class="fa fa-clock-o"></i>
      </h1>
    </div>
    <!-- ShowBox -->

    <!-- ShowBox -->
    <div v-if="ongoingEvent" id="ongoing-box">
      <h1>
        EVENT IS ON-GOING<i
          style="margin-left:5px;"
          class="fa fa-play-circle-o"
        ></i>
      </h1>
    </div>
    <!-- ShowBox -->

    <!-- ShowBox -->
    <div v-if="showDeleted" id="delete-box">
      <h1>
        DELETED EVENT<i style="margin-left:5px;" class="fa fa-trash-o"></i>
      </h1>
    </div>
    <!-- ShowBox -->

    <!-- ShowBox -->
    <div v-if="showEventRejected" id="delete-box">
      <h1>
        YOUR EVENT HAS BEEN REJECTED<i
          style="margin-left:5px;"
          class="fa fa-ban"
        ></i>
      </h1>
    </div>
    <!-- ShowBox -->

    <img class="event-pic" :src="event.event_pic" />

    <div id="title-section">
      <h1 class="event-title">{{ event.title }}</h1>
    </div>

    <!-- Location -->
    <div>
      <h1 class="event-location">{{ event.location }}</h1>
    </div>
    <!-- Location -->

    <!-- Host -->
    <div id="host-section">
      <img id="profile-logo" :src="event.host_pic" />
      <h1>
        Hosted by
        <span
          @click="clickProfile()"
          style="cursor: pointer;"
          class="highlight-text"
          >{{ event.username }}</span
        >
      </h1>
    </div>
    <!-- Host -->

    <!-- Double Button -->
    <div v-if="showEnded" id="double-button">
      <div :class="cssRateParticipantBtn">
        <button @click="ratePartReturn()">
          RATE PARTICIPANT
        </button>
      </div>
      <div :class="cssRateEventBtn">
        <button @click="rateEventReturn()">
          RATE THIS EVENT
        </button>
      </div>
    </div>
    <!-- Double Button -->

    <!-- Button -->
    <div v-if="showHost" id="single-button">
      <button @click="manageEventReturn()">MANAGE EVENT</button>
    </div>
    <!-- Button -->

    <!-- Double Button -->
    <div v-if="showButton" id="double-button">
      <button class="long" @click="moreDetailReturn()">
        MORE DETAIL
      </button>
      <div>
        <div
          v-if="!showPending && !showJoined && !showRejected"
          id="join-button"
        >
          <button @click="joinEvent()">JOIN NOW</button>
        </div>
        <div v-if="showPending" class="pending-button">
          <button id="join-pending" @click="cancelRequest()">
            <span>JOIN PENDING</span
            ><i
              id="icon-pending"
              style="margin-left:5px;"
              class="fa fa-hourglass-start"
            ></i>
            <i id="icon-leave" style="margin-left:5px;" class="fa fa-times"></i>
          </button>
        </div>
        <div v-if="showRejected" class="pending-button">
          <button class="red normal-cursor">
            REJECTED<i style="margin-left:5px;" class="fa fa-ban"></i>
          </button>
        </div>
        <div v-if="showJoined" class="pending-button">
          <button class="normal-cursor green">
            JOINED<i style="margin-left:5px;" class="fa fa-check"></i>
          </button>
        </div>
      </div>
    </div>
    <!-- Double Button -->
  </div>
</template>

<script>
import EventService from "@/services/event.service";
import decode from "jwt-decode";

export default {
  data() {
    return {
      showButton: true,
      showEnded: false,
      showApproving: false,
      showHost: false,
      showPending: false,
      showRejected: false,
      showJoined: false,
      showEventRejected: false,
      showDeleted: false,
      ongoingEvent: false,
      approveEvent: false
    };
  },
  name: "EventFlex",
  props: ["event"],
  created() {
    this.getCreate();
  },
  watch: {
    event: function() {
      this.getCreate();
    }
  },
  computed: {
    cssRateParticipantBtn() {
      let orange = "";
      let grey = "pending-button block";
      if (this.event.isParticipantRated) {
        return grey;
      } else {
        return orange;
      }
    },
    cssRateEventBtn() {
      let orange = "";
      let grey = "pending-button block";
      if (this.event.isEventRated) {
        return grey;
      } else {
        return orange;
      }
    }
  },
  methods: {
    clickProfile() {
      this.$emit("userProfile", this.event.username);
    },
    rateEventReturn() {
      if (!this.event.isEventRated) {
        this.$emit("clickRate", true);
        this.$emit("checkRate", false);
        this.$emit("thisEvent", this.event);
      }
    },
    ratePartReturn() {
      if (!this.event.isParticipantRated) {
        this.$emit("clickRate", true);
        this.$emit("checkRate", true);
        this.$emit("thisEvent", this.event);
      }
    },
    manageEventReturn() {
      this.$emit("manageReturn", true);
      this.$emit("thisEvent", this.event);
      if (!this.approveEvent) {
        this.$emit("pendingClick", true);
      } else {
        this.$emit("onEvent", this.ongoingEvent);
      }
    },
    moreDetailReturn() {
      this.$emit("detailReturn", true);
      this.$emit("thisEvent", this.event);
    },
    interestEvent() {
      this.event.interest = !this.event.interest;
      EventService.updateInterestEvent({
        event_id: this.event.event_id,
        interest: this.event.interest
      });
    },
    joinEvent() {
      EventService.joinEvent(this.event.event_id)
        .then((res) => {
          if (res) {
            this.showPending = true;
          }
        })
        .catch(() => {
          console.log("Error when joining the event");
        });
    },
    cancelRequest() {
      EventService.cancelRequest(this.event.event_id)
        .then((res) => {
          if (res) {
            this.showPending = false;
          }
        })
        .catch(() => {
          console.log("Error when cancel the request");
        });
    },
    getCreate() {
      let user = decode(localStorage.getItem("user"));
      let currentTime = new Date().getTime();
      this.showButton = true;
      this.showEnded = false;
      this.showApproving = false;
      this.showHost = false;
      this.showPending = false;
      this.showRejected = false;
      this.showJoined = false;
      this.showEventRejected = false;
      this.showDeleted = false;
      this.ongoingEvent = false;
      this.approveEvent = false;
      if (this.event.status_id == "ST13") {
        this.showApproving = true;
      } else if (this.event.status_id == "ST07") {
        this.showDeleted = true;
      } else if (this.event.status_id == "ST15") {
        this.showEventRejected = true;
      } else if (this.event.status_id == "ST03") {
        this.approveEvent = true;
        if (currentTime > this.event.start_at) {
          this.ongoingEvent = true;
        }
      }
      if (currentTime > this.event.end_at) {
        this.showButton = false;
        this.showEnded = true;
        this.ongoingEvent = false;
        this.showHost = false;
        this.showApproving = false;
        this.showDeleted = false;
        this.showEventRejected = false;
      } else if (this.event.user_id == user.user_id) {
        this.showButton = false;
        this.showEnded = false;
        this.showHost = true;
      }
      if (this.event.participant_status == "ST11") {
        this.showJoined = true;
      } else if (this.event.participant_status == "ST13") {
        this.showPending = true;
      } else if (this.event.participant_status == "ST15") {
        this.showRejected = true;
      }
    }
  }
};
</script>

<style scoped>
.event-pic {
  width: 100%;
  height: 130px;
  object-fit: cover;
  border-top-left-radius: 17px;
  border-top-right-radius: 17px;
}

.star {
  width: 23px;
  height: 23px;
  position: absolute;
  z-index: 3;
  top: 10px;
  left: 10px;
  cursor: pointer;
}

.user {
  width: 14px;
  height: 14px;
  margin-right: 4px;
}

#user-box {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  height: 24px;
  border-radius: 14px;
  position: absolute;
  z-index: 3;
  top: 10px;
  right: 10px;
  padding: 3px 11px;
}

.event-icon {
  width: 30px;
  padding-left: 15px;
}

.normal-cursor {
  cursor: default;
}

.event-title {
  margin: 0px 15px;
  height: 18px;
  font-size: 1.75em;
  font-weight: 450;
  color: #444444;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

#title-section {
  margin-top: 19px;
  /* display: flex;
  align-items: center; */
}

#date-box {
  padding: 7px 13px;
  background-color: #ff8864;
  border-radius: 16px;
  text-align: center;
  position: absolute;
  z-index: 3;
  top: 115px;
  left: 12px;
  color: white;
  border: 2px solid white;
}

.block,
.block > button {
  cursor: default;
}

.block > button {
  background-color: #a0a0a0 !important;
  border: 1.75px solid #a0a0a0 !important;
  color: #ffffff !important;
}

#end-box,
#wait-box,
#ongoing-box,
#delete-box {
  padding: 5px 10px;
  border-radius: 16px;
  text-align: center;
  position: absolute;
  top: 91px;
  left: 13px;
  z-index: 3;
}

#end-box {
  color: #ff8864;
  background-color: white;
}

#wait-box {
  color: #a0a0a0;
  background-color: white;
}

#ongoing-box {
  color: white;
  background: transparent linear-gradient(180deg, #ffe164 0%, #ffc661 100%);
}

#delete-box {
  color: #fd6363;
  background-color: white;
}

#end-box > h1,
#wait-box > h1,
#ongoing-box > h1,
#delete-box > h1 {
  margin: 0;
  font-size: 1em;
  font-weight: 500;
}

#date-box > h1,
#user-box > h1,
#host-section > h1 {
  margin: 0;
  font-size: 1.25em;
  font-weight: 500;
}

#host-section > h1,
#user-box > h1 {
  color: #444444;
}

.event-location {
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 6px;
  margin-bottom: 0px;
  font-size: 1.5em;
  font-weight: 400;
  color: #a0a0a0;
  height: 18px;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

#profile-logo {
  width: 20px;
  height: 20px;
  object-fit: cover;
  border-radius: 50%;
}

#host-section {
  margin-left: 18px;
  display: flex;
  align-items: center;
  margin-top: 9px;
}

#host-section > h1 {
  margin-left: 7px;
}

.highlight-text {
  color: #ff8864;
}

#button {
  text-align: right;
  margin-right: 20px;
  margin-top: 10px;
  padding-bottom: 15px;
}

.pending-button > button {
  color: #ffffff;
  background-color: #a0a0a0;
  border: 1.75px solid #a0a0a0;
  font-family: "Atten-Round-New";
  font-size: 1em;
  font-weight: 550;
  padding: 3px 8px;
  margin: 0;
  border-radius: 16px;
  transition: 0.3s;
}

#icon-leave {
  display: none;
}

#join-pending:hover span {
  display: none;
}

#join-pending:hover:before {
  content: "CANCEL";
}

#join-pending:hover #icon-pending {
  display: none;
}

#join-pending:hover #icon-leave {
  display: block;
}

#join-pending:hover {
  min-width: 86px;
  background-color: #ffffff;
  color: #a0a0a0;
  border: 1.75px solid #a0a0a0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
}

#double-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 20px;
  margin-left: 20px;
  margin-top: 15px;
}

#single-button {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;
  margin-left: 20px;
  margin-top: 15px;
}

#join-button > button {
  color: #ffffff;
  background-color: #fe8864;
  border: 1.75px solid #ff8864;
  font-family: "Atten-Round-New";
  font-size: 1em;
  font-weight: 550;
  padding: 3px 15px;
  margin: 0;
  border-radius: 16px;
}

.long {
  padding: 3px 15px !important;
}

#button > button,
#double-button > button,
#double-button > div > button,
#single-button > button {
  color: #ff8864;
  border: 1.75px solid #ff8864;
  background-color: #ffffff;
  font-family: "Atten-Round-New";
  font-size: 1em;
  font-weight: 550;
  padding: 3px 8px;
  margin: 0;
  border-radius: 16px;
}

.full {
  color: #ff8864 !important;
  font-weight: 600 !important;
}

.red {
  background-color: #fd6363 !important;
  border: 1.75px solid #fd6363 !important;
}

.green {
  background-color: #1ed32c !important;
  border: 1.75px solid #1ed32c !important;
}

#rating-box {
  border: none;
  border-radius: 10px;
  background: transparent linear-gradient(180deg, #ffe164 0%, #ffc661 100%);
  position: absolute;
  left: 40px;
  top: 13px;
  box-shadow: 0px 3px 30px #0000000d;
}

#rating-box > h1 {
  font-size: 1em;
  margin: 0px;
  padding: 4px 12px;
  color: #ffffff;
  font-weight: 500;
}
</style>
