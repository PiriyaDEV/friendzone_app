<template>
  <div id="event-box">
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
      <h1 v-if="event.joined != event.max_participant">{{ event.joined }}/{{ event.max_participant }}</h1>
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
    <!-- <div id="end-box">
      <h1>EVENT HAS ENDED</h1>
    </div> -->
    <!-- Date -->

    <img class="event-pic" :src="event.event_pic" />

    <div id="title-section">
      <!-- <img
        class="event-icon"
        src="@/assets/event/event-icon/icons8-airport-200.png"
      /> -->
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

    <!-- Button -->
    <!-- <div id="button">
      <button>MANAGE EVENT</button>
    </div> -->
    <!-- Button -->

    <!-- Double Button -->
    <div id="double-button">
      <button @click="ratePartReturn()">
        RATE PARTICIPANTS
      </button>
      <button @click="rateEventReturn()" style="display:none;">
        RATE THIS EVENT
      </button>
      <button @click="manageEventReturn()">MANAGE EVENT</button>
    </div>
    <!-- Double Button -->

    <!-- Pending Button -->
    <!-- <div id="pending-button">
      <button>JOIN PENDING<i style="margin-left:5px;" class="fa fa-hourglass-start"></i></button>
    </div> -->
    <!-- Pending Button -->
  </div>
</template>

<script>
import EventService from "../services/event.service";

export default {
  name: "EventFlex",
  props: ["event"],
  methods: {
    rateEventReturn() {
      this.$emit("clickRate", true);
      this.$emit("checkRate", false);
    },
    ratePartReturn() {
      this.$emit("clickRate", true);
      this.$emit("checkRate", true);
    },
    manageEventReturn() {
      this.$emit("manageReturn", true);
    },
    interestEvent() {
      this.event.interest = !this.event.interest;
      EventService.updateInterestEvent({
        event_id: this.event.event_id,
        interest: this.event.interest,
      });
    },
  }
};
</script>

<style scoped>
#event-box {
  background-color: white;
  border-radius: 17px;
  position: relative;
  margin-right: 20px;
  margin-bottom: 20px;
  height: 270px;
  width: 230px;
}

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

.event-title {
  margin: 0px 15px;
  height: 18px;
  font-size: 1.75em;
  font-weight: 450;
  color: #444444;
  max-width: 200px;
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
  top: 158px;
  left: 16px;
  color: #ff8864;
}

#end-box > h1 {
  margin: 0;
  font-size: 1.25em;
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
  max-width: 200px;
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

#button,
#pending-button {
  text-align: right;
  margin-right: 20px;
  margin-top: 10px;
  padding-bottom: 15px;
}

#pending-button > button {
  color: #ffffff;
  background-color: #a0a0a0;
  font-family: "Atten-Round-New";
  border: none;
  font-size: 1.25em;
  font-weight: 550;
  padding: 7px 15px;
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
  justify-content: space-between;
  align-items: center;
  margin-right: 20px;
  margin-left: 20px;
  margin-top: 15px;
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

@media screen and (max-width: 1440px) {
  /* #event-box {
    margin-right: 40px;
  } */
}
</style>
