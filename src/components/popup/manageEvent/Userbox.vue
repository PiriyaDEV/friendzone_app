<template>
  <div>
    <div :class="cssUserbox">
      <div id="box-info">
        <div id="profile-frame">
          <img id="profile-pic" :src="user.profile_pic" />
        </div>
        <div v-if="select == 1" :class="cssName">
          <h1 class="title">{{ user.username }}</h1>
          <h1 class="title">{{ eventRole }}</h1>
        </div>

        <div v-if="select == 2 || select == 3" :class="cssName">
          <h1 class="title">{{ user.username }}</h1>
          <div>
            <!-- Rating -->
            <div :class="cssRate">
              <h2 class="black-color title">Rating</h2>
              <div id="star-box" class="section">
                <!-- Star -->
                <div>
                  <img
                    v-if="showRating[0]"
                    class="star"
                    src="@/assets/icon/icons8-star-96-orange.png"
                  />
                  <img
                    v-else
                    class="star"
                    src="@/assets/icon/icons8-star-96.png"
                  />
                </div>
                <!-- Star -->

                <!-- Star -->
                <div>
                  <img
                    v-if="showRating[1]"
                    class="star"
                    src="@/assets/icon/icons8-star-96-orange.png"
                  />
                  <img
                    v-else
                    class="star"
                    src="@/assets/icon/icons8-star-96.png"
                  />
                </div>
                <!-- Star -->

                <!-- Star -->
                <div>
                  <img
                    v-if="showRating[2]"
                    class="star"
                    src="@/assets/icon/icons8-star-96-orange.png"
                  />
                  <img
                    v-else
                    class="star"
                    src="@/assets/icon/icons8-star-96.png"
                  />
                </div>
                <!-- Star -->

                <!-- Star -->
                <div>
                  <img
                    v-if="showRating[3]"
                    class="star"
                    src="@/assets/icon/icons8-star-96-orange.png"
                  />
                  <img
                    v-else
                    class="star"
                    src="@/assets/icon/icons8-star-96.png"
                  />
                </div>

                <!-- Star -->

                <!-- Star -->
                <div>
                  <img
                    v-if="showRating[4]"
                    class="star"
                    src="@/assets/icon/icons8-star-96-orange.png"
                  />
                  <img
                    v-else
                    class="star"
                    src="@/assets/icon/icons8-star-96.png"
                  />
                </div>
                <!-- Star -->
              </div>
            </div>
            <!-- Rating -->
          </div>
        </div>
      </div>

      <div v-if="managePage && !showEnd" id="button-section">
        <div v-if="select == 1 && !user.host">
          <button
            v-if="showModButton"
            @click="addModerator()"
            class="button participant"
          >
            <span class="move-default">Move to Moderator</span>
            <span class="move-mobile">Moderator</span>
          </button>
          <button v-else @click="removeModerator()" class="button moderator">
            <span class="move-default">Move to Participant</span>
            <span class="move-mobile">Participant</span>
          </button>
        </div>

        <!-- <button v-if="select == 1" class="button delete">Delete</button> -->
        <button v-if="select == 3" class="button delete">Invite</button>
        <div v-if="select == 2">
          <button @click="declineRequest()" class="button decline">
            Decline
          </button>
          <button @click="approveRequest()" class="button approve">
            Approve
          </button>
        </div>

        <!-- <button>Click</button> -->
      </div>
      <div v-if="isMod">
        <button @click="declineRequest()" class="button decline">
          Decline
        </button>
        <button @click="approveRequest()" class="button approve">
          Approve
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import EventService from "@/services/event.service";

export default {
  data() {
    return {
      showRating: [false, false, false, false, false],
      showModButton: false,
      eventRole: "Participant"
    };
  },
  props: [
    "select",
    "event_id",
    "isMod",
    "user",
    "detailPage",
    "managePage",
    "admin",
    "showEnd"
  ],
  created() {
    if (this.user.rating > 0) {
      this.showRating.fill(true, 0, this.user.rating.toFixed(0));
    } else {
      this.showRating.fill(true, 0, 5);
    }
    this.checkRole();
    this.checkModButton();
  },
  watch: {
    select: function() {
      this.checkRole();
    },
    participant_id: function() {
      this.checkModButton();
    }
  },
  computed: {
    cssUserbox() {
      let userRole = "userbox";
      if (this.select == 1) {
        let adminRole = "userbox-admin";
        let HostRole = "userbox host-box";
        let ModeratorRole = "userbox moderator-box";
        if (this.admin == true) {
          return adminRole;
        } else if (this.user.host) {
          return HostRole;
        } else if (!this.showModButton) {
          return ModeratorRole;
        }
      }
      return userRole;
    },
    cssName() {
      let userRole = "namerole";
      let adminRole = "namerole-admin";
      if (this.admin == true) {
        return adminRole;
      }
      return userRole;
    },
    cssRate() {
      let userRole = "rating";
      let adminRole = "rating-admin";
      if (this.admin == true) {
        return adminRole;
      }
      return userRole;
    }
  },
  methods: {
    checkRole() {
      if (this.user.moderator != 0) this.eventRole = "Moderator";
      else if (this.user.host == 1) this.eventRole = "Host";
    },
    checkModButton() {
      if (this.select == 1) {
        if (this.user.moderator == 0) this.showModButton = true;
        else this.showModButton = false;
      }
    },
    approveRequest() {
      EventService.approveRequest({
        event_id: this.event_id,
        user_id: this.user.user_id
      })
        .then((res) => {
          if (res) {
            this.$emit("decrementList", this.user.user_id);
          }
        })
        .catch(() => {
          console.log("Error when approve the event");
        });
    },
    declineRequest() {
      EventService.declineRequest({
        event_id: this.event_id,
        user_id: this.user.user_id
      })
        .then((res) => {
          if (res) {
            this.$emit("decrementList", this.user.user_id);
          }
        })
        .catch(() => {
          console.log("Error when decline the event");
        });
    },
    addModerator() {
      EventService.addModerator({
        participant_id: this.user.event_participant_id
      })
        .then((res) => {
          if (res) {
            this.showModButton = false;
            this.eventRole = "Moderator";
          }
        })
        .catch(() => {
          console.log("Error when add new moderator");
        });
    },
    removeModerator() {
      EventService.removeModerator({
        participant_id: this.user.event_participant_id
      })
        .then((res) => {
          if (res) {
            this.showModButton = true;
            this.eventRole = "Participant";
          }
        })
        .catch(() => {
          console.log("Error when remove the moderator");
        });
    }
  }
};
</script>

<style scoped>
h1 {
  color: #444444;
}

.userbox,
.userbox-admin {
  border-radius: 23px;
  border: none;
  background-color: #f0f0f0;
  padding: 3px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.host-box {
  background-color: #ff8864 !important;
}

.moderator-box {
  background-color: #ffc45c !important;
}

/* Admin */
.userbox-admin {
  background-color: #a0a0a0 !important;
}

#box-info {
  display: flex;
}

#profile-pic {
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 50%;
  border: none;
}

.move-mobile {
  display: none;
}

#profile-frame {
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 30px;
}

/* Admin */
.namerole,
.namerole-admin {
  display: grid;
  grid-template-columns: 40% 60%;
  align-items: center;
}

.namerole-admin {
  width: 100%;
}

.namerole {
  width: 400px;
}

#star-box {
  margin-left: 5px;
  margin-top: 3px;
}

.title {
  font-size: 1.75em;
  margin: 0px;
  font-weight: 500;
}

.button {
  font-family: "Atten-Round-New";
  font-size: 1.5em;
  font-weight: 550;
  padding: 4px 13px;
  margin: 2px;
  border-radius: 24px;
}

.delete {
  color: #ff8864;
  border: 1.5px solid #ff8864;
}

.moderator {
  color: #ffc45c;
  border: 1.5px solid #ffffff;
  background-color: #ffffff;
}

.participant {
  color: #a0a0a0;
  border: 1.5px solid #a0a0a0;
  background-color: transparent;
}

.decline {
  color: #fd6363;
  border: 1.5px solid #fd6363;
}

.approve {
  color: #1ed32c;
  border: 1.5px solid #1ed32c;
}

.rating,
.rating-admin {
  display: flex;
  align-items: center;
}

.rating-admin {
  margin-left: 60px;
}

.star {
  width: 12px;
  margin-right: 1px;
}

@media screen and (max-width: 1650px) {
  .rating-admin {
    margin-left: 30px;
  }
}

@media screen and (max-width: 1350px) {
  .userbox-admin {
    justify-content: center;
  }
}

@media screen and (max-width: 1024px) {
  .namerole {
    width: 300px;
  }
}

@media screen and (max-width: 690px) {
  .namerole {
    display: flex;
    align-items: center;
  }

  .rating > h2 {
    display: none;
  }

  .button {
    padding: 2px 5px;
    font-size: 1.2em;
  }

  #box-info {
    width: 250px;
  }

  .namerole > .title:nth-child(2) {
    margin-left: 10px;
  }

  #profile-frame {
    margin-right: 20px;
  }

  #profile-pic {
    width: 25px;
    height: 25px;
  }

  .title {
    font-size: 1.5em;
  }

  .move-mobile {
    display: block;
  }

  .move-default {
    display: none;
  }
}

@media screen and (max-width: 490px) {
  .popup-form {
    padding: 0px 40px !important;
  }

  .button {
    padding: 2px;
    font-size: 1.2em;
  }

  .title {
    font-size: 1.25em;
  }

  #profile-frame {
    margin-right: 10px;
  }

  #box-info {
    width: 155px;
  }
}
</style>
