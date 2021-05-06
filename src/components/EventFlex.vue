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

    <!-- Date -->
    <div id="date-box">
      <h1>
        {{ event.date }}
      </h1>
    </div>
    <!-- Date -->

    <!-- Date -->
    <div v-if="showEnded" id="end-box">
      <h1>EVENT HAS ENDED</h1>
    </div>
    <!-- Date -->

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
        <span class="highlight-text">{{ event.username }}</span>
      </h1>
    </div>
    <!-- Host -->

    <!-- Double Button -->
    <div v-if="showEnded" id="double-button">
      <button @click="ratePartReturn()">
        RATE PARTICIPANTS
      </button>
      <div id="pending-button">
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
        <div v-if="!showPending && !showJoined" id="join-button">
          <button @click="joinEvent()">JOIN NOW</button>
        </div>
        <div v-if="showPending" id="pending-button">
          <button @click="cancelRequest()">
            JOIN PENDING<i
              style="margin-left:5px;"
              class="fa fa-hourglass-start"
            ></i>
          </button>
        </div>
        <div v-if="showJoined" id="pending-button">
          <button class="normal-cursor">
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
      showHost: false,
      showPending: false,
      showJoined: false,
    };
  },
  name: "EventFlex",
  props: ["event", "joined", "requested"],
  created() {
    let user = decode(localStorage.getItem("user"));
    let currentTime = new Date().getTime();
    if (currentTime > this.event.end_at) {
      this.showButton = false;
      this.showEnded = true;
      this.showHost = false;
    }
    else if (this.event.user_id == user.user_id) {
      this.showButton = false;
      this.showEnded = false;
      this.showHost = true;
    }
    if (this.joined) {
      this.showJoined = true;
    }
    if (this.requested) {
      this.showPending = true;
    }
  },
  methods: {
    rateEventReturn() {
      this.$emit("clickRate", true);
      this.$emit("checkRate", false);
      this.$emit("thisEvent", this.event);
    },
    ratePartReturn() {
      this.$emit("clickRate", true);
      this.$emit("checkRate", true);
      this.$emit("thisEvent", this.event);
    },
    manageEventReturn() {
      this.$emit("manageReturn", true);
      this.$emit("thisEvent", this.event);
    },
    moreDetailReturn() {
      this.$emit("detailReturn", true);
      this.$emit("thisEvent", this.event);
    },
    interestEvent() {
      this.event.interest = !this.event.interest;
      EventService.updateInterestEvent({
        event_id: this.event.event_id,
        interest: this.event.interest,
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
  },
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

#end-box {
  padding: 5px 10px;
  background-color: white;
  border-radius: 16px;
  text-align: center;
  position: absolute;
  z-index: 3;
  top: 91px;
  left: 13px;
  color: #ff8864;
}

#end-box > h1 {
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

#pending-button > button {
  color: #ffffff;
  background-color: #a0a0a0;
  border: 1.75px solid #a0a0a0;
  font-family: "Atten-Round-New";
  font-size: 1em;
  font-weight: 550;
  padding: 3px 8px;
  margin: 0;
  border-radius: 16px;
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
</style>
