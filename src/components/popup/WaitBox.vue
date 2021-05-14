<template>
  <div id="wait-box" class="popup">
    <div class="popup-section section">
      <div class="popup-form">
        <h1 v-if="waitShow == `create`" class="header_title">
          WAIT FOR APPROVAL
        </h1>
        <h1 v-if="waitShow == `delete`" class="header_title">
          DO YOU WANT TO <br />
          DELETE THIS EVENT?
        </h1>
        <h1 v-if="waitShow == `end`" class="header_title">
          DO YOU WANT TO <br />
          END THIS EVENT?
        </h1>
        <div class="section">
          <h1 v-if="waitShow == `create`" id="info">
            Your event is now wait in the lists for approval and the event will
            be post after get approved by approver
          </h1>
          <h1 v-if="waitShow != `create`" id="event-title">
            Title : {{ confirmDeleteData.title }}
          </h1>
        </div>

        <div v-if="waitShow == `create`" id="mobile-done" class="section">
          <button class="back_button" @click="exit()">Done</button>
        </div>

        <div v-if="waitShow != `create`" class="section double-button">
          <div>
            <div>
              <button class="create_button" @click="confirm()">
                Confirm
              </button>
            </div>
            <div>
              <button class="back_button" @click="cancel()">
                Cancel
              </button>
            </div>
          </div>
        </div>

        <img
          @click="exit()"
          style="cursor: pointer"
          class="close"
          src="@/assets/icon/icons8-multiply-96.png"
        />
      </div>
    </div>
  </div>
</template>

<script>
import EventService from "@/services/event.service";

export default {
  props: ["waitShow", "confirmDeleteData"],
  data() {
    return {};
  },
  methods: {
    exit() {
      this.$router.push("/");
    },
    cancel() {
      this.$emit("informationShow", false);
    },
    confirm() {
      if (this.waitShow == "delete") {
        EventService.deleteEvent(this.confirmDeleteData.event_id)
          .then(() => {
            this.$router.push("/");
          })
          .catch(() => {
            console.log("Error when delete the event");
          });
      } else if (this.waitShow == "end") {
        EventService.endEvent(this.confirmDeleteData.event_id)
          .then(() => {
            this.$router.push("/");
          })
          .catch(() => {
            console.log("Error when end the event");
          });
      }
    }
  }
};
</script>

<style scoped>
#info {
  font-size: 1.6em;
  color: #444444;
  width: 220px;
  text-align: center;
  margin: 15px 0px 0px 0px;
  font-weight: 400;
}

#event-title {
  font-size: 2em;
  color: #444444;
  margin: 10px 0px 20px 0px;
  font-weight: 400;
  text-align: center;
}

.header_title {
  margin-top: 20px;
  text-align: center;
  font-size: 2.75em !important;
}

.double-button > div > div > button {
  margin: 0px 0px 10px 0px !important;
}

.double-button {
  margin-bottom: 20px;
}

@media screen and (max-width: 1024px) {
  #info {
    margin: 0px;
  }
}

@media screen and (max-width: 690px) {
  #event-title {
    font-size: 1.75em;
  }

  #mobile-done {
    margin-top: 10px;
  }
}

@media screen and (max-width: 490px) {
  .popup-form {
    padding: 0px 40px !important;
  }
}

@media screen and (max-width: 600px) {
  .create_button,
  .back_button {
    width: 165px !important;
  }
}
</style>
