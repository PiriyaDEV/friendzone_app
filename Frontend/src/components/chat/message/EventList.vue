<template>
  <div id="message">
    <div id="event-logo">
      <img :src="pic" />
    </div>
    <div id="event-info-box">
      <h1 id="eventname">
        <div id="event-title">
          <span>{{ event.title }}</span>
        </div>
        <div id="event-join">
          ({{ event.joined }}/{{ event.max_participant }})
        </div>
      </h1>
      <div v-if="event.message" id="message-section">
        <h1 v-if="myMessage" id="message-text">You : {{ event.message }}</h1>
        <h1 v-else id="message-text">
          {{ event.username }} : {{ event.message }}
        </h1>
        <h1 id="time">{{ datetime }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import decode from "jwt-decode";
const PORT = require("@/services/port.config").PORT;

export default {
  data() {
    return {
      myMessage: false,
      datetime: ""
    };
  },
  created() {
    if (this.event.message) {
      let userData = decode(localStorage.getItem("user"));
      if (this.event.participant_id == userData.user_id) {
        this.myMessage = true;
      }
    }
    if (this.event.created) {
      let createTime = new Date(this.event.created);
      let currentTime = new Date();
      let createDate = createTime.getDate();
      let createMonth = createTime.getMonth();
      let createYear = createTime.getFullYear();
      let currentDate = currentTime.getDate();
      let currentMonth = currentTime.getMonth();
      let currentYear = currentTime.getFullYear();
      if (
        createDate == currentDate &&
        createMonth == currentMonth &&
        createYear == currentYear
      ) {
        this.datetime =
          createTime
            .getHours()
            .toString()
            .padStart(2, "0") +
          ":" +
          createTime
            .getMinutes()
            .toString()
            .padStart(2, "0");
      } else {
        this.datetime =
          createDate.toString().padStart(2, "0") +
          "/" +
          (createMonth + 1).toString().padStart(2, "0") +
          "/" +
          createYear.toString().substr(-2);
      }
    }
  },
  props: ["event"],
  computed: {
    pic() {
      let link = `${PORT}/api/event/displayPic/`;
      return link + this.event.event_id;
    }
  }
};
</script>

<style scoped>
#event-logo > img {
  border-radius: 50%;
  width: 34px;
  height: 34px;
  margin-right: 13px;
  object-fit: cover;
}

#message {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0px 0px 15px 0px;
  background-color: #ffffff;
  padding: 2px;
  border-radius: 24px;
  cursor: pointer;
}

#eventname {
  margin: 0;
  font-size: 1.85em;
  color: #444444;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#event-info-box {
  width: 100%;
}

#event-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

#event-join {
  margin-left: 10px;
}

#event-title,
#message-text {
  max-width: 170px;
}

#message-text {
  margin: 0;
  font-size: 1.5em;
  font-weight: 400;
  color: #a0a0a0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

#message-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2px;
}

#time {
  margin: 0px 0px 0px 10px;
  font-size: 1.5em;
  font-weight: 400;
  color: #a0a0a0;
}

@media screen and (max-width: 1350px) {
  #eventname {
    font-size: 1.6em;
  }

  #event-title,
  #message-text {
    max-width: 140px;
  }
}

@media screen and (max-width: 880px) {
  #message {
    width: 220px;
    margin: 0px 20px 0px 0px;
    padding: 10px;
  }

  #event-title,
  #message-text {
    max-width: 110px;
  }

  #event-info-box {
    padding-right: 10px;
  }
}
</style>
