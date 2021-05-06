<template>
  <div id="participant">
    <div v-if="status == 1">
      <h1 class="title">
        Participants ({{ joinedList.length }}/{{ event.max_participant }})
      </h1>
      <div class="large-box">
        <div v-for="(item, i) in joinedList" :key="i">
          <Userbox :select="status" :user="item" :eventPage="eventReturn" />
        </div>
      </div>
    </div>
    <div v-if="status == 2">
      <h1 class="title">Request ({{ requestedList.length }})</h1>
      <div class="large-box">
        <div v-for="(item, i) in requestedList" :key="i">
          <Userbox
            :select="status"
            :event_id="event.event_id"
            :user="item"
            :managePage="manageReturn"
            :detailPage="detailReturn"
            @decrementList="decrementRequest"
          />
        </div>
      </div>
    </div>
    <div v-if="status == 3" style="margin-top:20px;">
      <!-- Input -->
      <div class="left-inner-addon input-container">
        <i class="fa fa-search"></i>
        <input
          type="text"
          class="search-input"
          placeholder="find friend to invite using username"
          v-model="search"
        />
      </div>
      <!-- Input -->
      <div v-if="search">
        <h1 class="title">Followers ({{ joinedList.length }})</h1>
        <div class="small-box">
          <div v-for="(item, i) in eventList" :key="i">
            <Userbox :select="status" />
          </div>
        </div>
        <h1 class="title">Others ({{ joinedList.length }})</h1>
        <div class="small-box">
          <div v-for="(item, i) in eventList" :key="i">
            <Userbox :select="status" />
          </div>
        </div>
      </div>
    </div>

    <div id="button">
      <button @click="done()">Done</button>
    </div>
  </div>
</template>

<script>
import Userbox from "@/components/popup/manageEvent/Userbox.vue";
import EventService from "@/services/event.service";

export default {
  data() {
    return {
      eventList: 2,
      joinedList: [],
      requestedList: [],
      search: "",
    };
  },
  props: ["status", "event", "manageReturn", "detailReturn"],
  components: {
    Userbox,
  },
  created() {
    this.getEventParticipant();
  },
  watch: {
    status: function() {
      this.getEventParticipant();
    },
  },
  methods: {
    done() {
      this.$emit("doneClick", false);
    },
    getEventParticipant() {
      EventService.getEventParticipantList(this.event.event_id).then((res) => {
        if (res) {
          this.joinedList = res.filter(
            (participant) => participant.status_id == "ST11"
          );
          this.requestedList = res.filter(
            (participant) => participant.status_id == "ST13"
          );
        }
      });
    },
    decrementRequest(user_id) {
      let index = this.requestedList.findIndex(
        (user) => (user.user_id = user_id)
      );
      if (index > -1) {
        this.requestedList.splice(index, 1);
      }
    },
  },
};
</script>

<style scoped>
h1 {
  color: #444444;
}
.title {
  font-size: 2em;
  margin: 15px 0px;
}

#participant {
  margin-top: 5px;
}

#button {
  display: flex;
  justify-content: flex-end;
  margin: 30px 0px;
}

#button > button {
  color: #ffffff;
  background-color: #ff8864;
  text-align: center;
  font-family: "Atten-Round-New";
  font-size: 2.25em;
  font-weight: 450;
  border: none;
  padding: 9px 100px;
  margin: 0;
  border-radius: 24px;
}

.left-inner-addon {
  position: relative;
  display: flex;
  align-items: center;
}
.left-inner-addon input {
  padding-left: 42px !important;
}
.left-inner-addon i {
  position: absolute;
  padding: 14px 13px;
  pointer-events: none;
}

.input-container {
  padding-bottom: 1em;
}

.search-input {
  width: 100%;
  font-size: 1.75em;
  font-weight: 400;
  background-color: #f0f0f0;
  color: #606060;
  border-radius: 8px;
  border: none;
  padding: 10px 20px;
}

::placeholder {
  color: #606060 !important;
}

i {
  color: #606060;
  width: 30px;
  display: block;
}

.fa {
  font-size: initial;
}

.small-box {
  height: 130px;
  overflow-y: auto;
}

.large-box {
  height: 300px;
  overflow-y: auto;
}
</style>
