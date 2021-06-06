<template>
  <div id="participant">
    <div v-if="status == 1">
      <h1 class="title">
        Participants ({{ joinedList.length }}/{{ event.max_participant }})
      </h1>
      <div v-if="joinedList.length" class="large-box">
        <div v-for="(item, i) in joinedList" :key="i">
          <Userbox
            :select="status"
            :user="item"
            :managePage="manageReturn"
            :detailPage="detailReturn"
            :eventPage="eventReturn"
            :showEnd="endShow"
            :adminPage="false"
          />
        </div>
      </div>
      <div v-else><NoInformation /></div>
    </div>
    <div v-if="status == 2">
      <h1 class="title">Request ({{ requestedList.length }})</h1>
      <div v-if="requestedList.length" class="large-box">
        <div v-for="(item, i) in requestedList" :key="i">
          <Userbox
            :select="status"
            :event_id="event.event_id"
            :isMod="event.isMod"
            :user="item"
            :managePage="manageReturn"
            :detailPage="detailReturn"
            @decrementList="decrementRequest"
          />
        </div>
      </div>
      <div v-else><NoInformation /></div>
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
      <div v-if="search && (followerUserList.length || otherUserList.length)">
        <h1 v-if="followerUserList.length" class="title">
          Followers ({{ followerUserList.length }})
        </h1>
        <div v-if="followerUserList.length" class="small-box">
          <div v-for="(user, i) in followerUserList" :key="i">
            <Userbox
              :select="status"
              :user="user"
              :participant_id="event.event_participant_id"
              :managePage="manageReturn"
              :detailPage="detailReturn"
            />
          </div>
        </div>
        <h1 v-if="otherUserList.length" class="title">
          Others ({{ otherUserList.length }})
        </h1>
        <div v-if="otherUserList.length" class="small-box">
          <div v-for="(user, i) in otherUserList" :key="i">
            <Userbox
              :select="status"
              :user="user"
              :participant_id="event.event_participant_id"
              :managePage="manageReturn"
              :detailPage="detailReturn"
            />
          </div>
        </div>
      </div>
      <div v-else><NoInformation /></div>
    </div>

    <div id="button">
      <button class="create_button" @click="done()">Done</button>
    </div>
  </div>
</template>

<script>
import Userbox from "@/components/popup/manageEvent/Userbox.vue";
import EventService from "@/services/event.service";
import SearchService from "@/services/search.service";
import NoInformation from "@/components/NoInformation.vue";

export default {
  data() {
    return {
      eventList: 2,
      joinedList: [],
      requestedList: [],
      followerUserList: [],
      otherUserList: [],
      search: ""
    };
  },
  props: ["status", "event", "manageReturn", "detailReturn", "endShow"],
  components: {
    Userbox,
    NoInformation
  },
  created() {
    this.getEventParticipant();
  },
  watch: {
    status: function() {
      this.getEventParticipant();
    },
    search: function() {
      if (this.search) {
        this.getSearchUser();
      }
    }
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
    getSearchUser() {
      SearchService.getSearchUserToInvite(this.search, this.event.event_id)
        .then((res) => {
          if (res) {
            this.followerUserList = res.filter((user) => user.follow);
            this.otherUserList = res.filter((user) => !user.follow);
          }
        })
        .catch(() => {
          this.followerUserList = [];
          this.otherUserList = [];
        });
    }
  }
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
  width: 100%;
}

#button {
  display: flex;
  justify-content: flex-end;
  margin: 30px 0px 0px 0px;
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
  max-height: 130px;
  overflow-y: auto;
}

.large-box {
  max-height: 300px;
  overflow-y: auto;
}

@media screen and (max-width: 690px) {
  .search-input {
    font-size: 1.3em !important;
  }
}
</style>
