<template>
  <div id="manageevent-popup" class="popup">
    <div class="popup-section section">
      <div id="manage_event" class="popup-form">
        <h1 v-if="valueManage && !valueView" id="header" class="header_title">
          MANAGE EVENT
        </h1>
        <h1 v-if="valueDetail && !valueView" id="header" class="header_title">
          EVENT DETAIL
        </h1>
        <h1 v-if="valueView" id="header" class="header_title">REVIEW EVENT</h1>

        <div v-if="valueView" id="menu">
          <h1 class="menu-text selected">Event Details</h1>
        </div>
        <div v-if="!valueView" id="menu">
          <h1 @click="clickEventDetail()" :class="cssEventDetail">
            Event Details
          </h1>
          <h1 @click="clickParticipants()" :class="cssParticipants">
            Participants
          </h1>
          <h1 @click="clickRequest()" :class="cssRequest">Request</h1>
          <h1 @click="clickInvite()" :class="cssInvite">Invite</h1>
        </div>
        <hr id="bar" />

        <div v-if="valueView" class="event-box">
          <EventInfo
            v-if="eventDetail == true"
            :event="Event"
            @doneClick="doneClick"
            @deleteReturn="deleteReturn"
            :detailReturn="valueDetail"
            :manageReturn="valueManage"
            :view="valueView"
            @updateStatus="updateStatus"
          />
        </div>
        <div v-else class="event-box">
          <EventInfo
            v-if="eventDetail == true"
            :event="Event"
            @doneClick="doneClick"
            @deleteReturn="deleteReturn"
            :detailReturn="valueDetail"
            :manageReturn="valueManage"
          />

          <Participant
            v-else
            :status="valueShow"
            :event="Event"
            @doneClick="doneClick"
            :detailReturn="valueDetail"
            :manageReturn="valueManage"
          />
        </div>
        <img
          @click="cancelManage()"
          style="cursor: pointer"
          class="close"
          src="@/assets/icon/icons8-multiply-96.png"
        />
      </div>
    </div>
  </div>
</template>
<script>
import EventInfo from "@/components/popup/manageEvent/EventInfo.vue";
import Participant from "@/components/popup/manageEvent/Participant.vue";
export default {
  data() {
    return {
      eventDetail: true,
      participants: false,
      request: false,
      invite: false,
      valueShow: 1
    };
  },
  props: ["Event", "valueDetail", "valueManage", "valueView"],
  components: {
    EventInfo,
    Participant
  },
  methods: {
    cancelManage() {
      this.$emit("clickManage", false);
    },
    clickEventDetail() {
      this.eventDetail = true;
      this.participants = false;
      this.request = false;
      this.invite = false;
      this.valueShow = 0;
    },
    clickParticipants() {
      this.eventDetail = false;
      this.participants = true;
      this.request = false;
      this.invite = false;
      this.valueShow = 1;
    },
    clickRequest() {
      this.eventDetail = false;
      this.participants = false;
      this.request = true;
      this.invite = false;
      this.valueShow = 2;
    },
    clickInvite() {
      this.eventDetail = false;
      this.participants = false;
      this.request = false;
      this.invite = true;
      this.valueShow = 3;
    },
    doneClick(value) {
      this.$emit("clickManage", value);
    },
    deleteReturn(value) {
      this.$emit("clickDelete", value);
    },
    updateStatus(value) {
      this.$emit("updateStatus",value);
    }
  },
  computed: {
    cssEventDetail() {
      let select = "menu-text selected";
      let deselect = "menu-text";
      if (this.eventDetail == true) {
        return select;
      }
      return deselect;
    },
    cssParticipants() {
      let select = "menu-text selected";
      let deselect = "menu-text";
      if (this.participants == true) {
        return select;
      }
      return deselect;
    },
    cssRequest() {
      let select = "menu-text selected";
      let deselect = "menu-text";
      if (this.request == true) {
        return select;
      }
      return deselect;
    },
    cssInvite() {
      let select = "menu-text selected";
      let deselect = "menu-text";
      if (this.invite == true) {
        return select;
      }
      return deselect;
    }
  }
};
</script>

<style scoped>
h1 {
  color: #444444;
}

#manage_event {
  min-width: 700px;
  position: relative;
}

#menu {
  display: flex;
}

#bar {
  height: 0.1px;
  border-width: 0;
  color: #a0a0a0;
  background-color: #a0a0a0;
  margin-top: -15px;
}
.menu-text {
  font-size: 2.25em;
  font-weight: 500;
  padding-right: 19px;
  padding-left: 10px;
  margin-top: 5px;
  padding-bottom: 7px;
  cursor: pointer;
}

.selected {
  font-weight: 600;
  border-bottom: 5px solid #fe8864;
}

@media screen and (max-width: 1024px) {
  #manage_event {
    min-width: inherit;
  }

  .event-box {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .menu-text {
    font-size: 2em;
    padding: 0px 6.5px 7px 6.5px;
  }

  #bar {
    margin-top: -14px;
  }
}

@media screen and (max-width: 690px) {
  #bar {
    margin-top: -11px;
  }
}

@media screen and (max-width: 490px) {
  .popup-form {
    padding: 0px 40px !important;
  }

  .menu-text {
    font-size: 1.55em;
  }
}
</style>
