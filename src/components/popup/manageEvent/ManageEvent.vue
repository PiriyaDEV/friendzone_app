<template>
  <div id="manageevent-popup" class="popup">
    <div class="popup-section section">
      <div id="manage_event" class="popup-form">
        <h1 v-if="valueManage" id="header" class="header_title">
          MANAGE EVENT
        </h1>
        <h1 v-if="valueDetail" id="header" class="header_title">
          EVENT DETAIL
        </h1>

        <div id="menu">
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
      valueShow: 1,
    };
  },
  props: ["Event","valueDetail", "valueManage"],
  components: {
    EventInfo,
    Participant,
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
    },
  },
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
</style>
