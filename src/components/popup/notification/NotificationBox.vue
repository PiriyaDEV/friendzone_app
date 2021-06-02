<template>
  <div id="notification-box">
    <div id="profile-pic">
      <img :src="information.pic" alt="" />
    </div>
    <div id="text-box">
      <h1 v-if="information.type == 'inviteRequest'" class="noti-text">
        <span class="highlight-text">{{ information.username }}</span> invite
        you to join the event
        <span class="highlight-text">{{ information.title }}</span>
      </h1>
      <h1 v-if="information.type == 'accept'" class="noti-long">
        Your request has been
        <span class="highlight-text">{{ information.status }}</span> in the
        event
        <span class="highlight-text">{{ information.title }}</span>
      </h1>
      <h1 v-if="information.type == 'eventRequest'" class="noti-text">
        <span class="highlight-text">{{ information.username }}</span> request
        to join your event
        <span class="highlight-text">{{ information.title }}</span>
      </h1>
      <h1 v-if="information.type == 'eventApproval'" class="noti-long">
        <span class="highlight-text">{{ information.title }}</span> event is now
        <span class="highlight-text">{{ information.status }}</span> by
        Friendzone
      </h1>
      <h1 class="date">
        {{ information.date }}
      </h1>
    </div>
    <div v-if="information.status == '1'" id="button">
      <button
        v-if="information.type == 'inviteRequest'"
        class="decline"
        @click="declineInviteRequest()"
      >
        <i class="icon fa fa-ban"></i><span class="btn-text">Decline</span>
      </button>
      <button v-else class="decline" @click="declineEventRequest()">
        <i class="icon fa fa-ban"></i><span class="btn-text">Decline</span>
      </button>
      <button
        v-if="information.type == 'inviteRequest'"
        class="done"
        @click="approveInviteRequest()"
      >
        <i class="icon fa fa-check"></i><span class="btn-text">Join</span>
      </button>
      <button v-else class="approved" @click="approveEventRequest()">
        <i class="icon fa fa-check"></i><span class="btn-text">Approve</span>
      </button>
    </div>
  </div>
</template>

<script>
import EventService from "@/services/event.service";
import InviteService from "@/services/eventInvited.service";

export default {
  props: ["information"],
  methods: {
    approveInviteRequest() {
      InviteService.acceptedInvited(this.information.inviter_id)
        .then((res) => {
          if (res) {
            EventService.joinEvent(this.information.event_id)
              .then((response) => {
                if (response) {
                  this.$emit("decrementList");
                }
              })
              .catch(() => {
                console.log("Error when joining the event");
              });
          }
        })
        .catch(() => {
          console.log("Error when accept invite request");
        });
    },
    declineInviteRequest() {
      InviteService.declinedInvited(this.information.inviter_id)
        .then((res) => {
          if (res) {
            this.$emit("decrementList");
          }
        })
        .catch(() => {
          console.log("Error when decline invite request");
        });
    },
    approveEventRequest() {
      EventService.approveRequest({
        event_id: this.information.event_id,
        user_id: this.information.user_id
      })
        .then((res) => {
          if (res) {
            this.$emit("decrementList");
          }
        })
        .catch(() => {
          console.log("Error when approve event request");
        });
    },
    declineEventRequest() {
      EventService.declineRequest({
        event_id: this.information.event_id,
        user_id: this.information.user_id
      })
        .then((res) => {
          if (res) {
            this.$emit("decrementList");
          }
        })
        .catch(() => {
          console.log("Error when decline event request");
        });
    }
  }
};
</script>

<style scoped>
#notification-box {
  display: flex;
  align-items: center;
  margin: 0px 0px 10px 0px;
  width: 455px;
}

#profile-pic > img {
  height: 40px;
  width: 40px;
  border: 0.5px solid #444444;
  border-radius: 50%;
  -o-object-fit: cover;
  object-fit: cover;
}

#text-box {
  margin-left: 10px;
}

.noti-text {
  font-size: 1.6em;
  color: #444444;
  margin: 0px;
  font-weight: 400;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 240px;
  line-height: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.noti-long {
  font-size: 1.6em;
  color: #444444;
  margin: 0px;
  font-weight: 400;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  width: 373px;
}

.highlight-text {
  font-weight: 600;
}

.date {
  font-size: 1.4em;
  color: #ff8864;
  margin: 2px 0px 0px 0px;
  font-weight: 500;
}

.icon {
  display: none;
}

#button {
  margin-left: 10px;
}

#button > button {
  border-radius: 24px;
  font-size: 1.5em;
  font-weight: 600;
  margin: 2px;
  background-color: transparent;
}

.decline {
  border: 1.5px solid #fd6363;
  color: #fd6363;
  padding: 4px 13px;
}

.done {
  border: 1.5px solid #1ed32c;
  color: #1ed32c;
  padding: 4px 23px;
}

.approved {
  border: 1.5px solid #1ed32c;
  color: #1ed32c;
  padding: 4px 12px;
}

@media screen and (max-width: 690px) {
  .noti-text {
    width: 157px;
    font-size: 1.4em;
    -webkit-line-clamp: 3;
  }

  .noti-long {
    width: 284px;
    font-size: 1.4em;
    -webkit-line-clamp: 3;
  }

  #notification-box {
    width: 347px;
  }

  #button > button {
    font-size: 1.2em;
  }

  .decline {
    padding: 4px 8px;
  }

  .done {
    padding: 4px 18px;
  }
}

@media screen and (max-width: 490px) {
  #profile-pic > img {
    height: 35px;
    width: 35px;
  }

  .icon {
    display: block;
    color: #ffffff;
  }

  #notification-box {
    width: 265px;
  }

  .decline {
    border: 1.5px solid #fd6363;
    color: #fd6363;
    background-color: #fd6363 !important;
    padding: 4px 12px;
  }

  .done,
  .approved {
    border: 1.5px solid #1ed32c;
    background-color: #1ed32c !important;
    color: #1ed32c;
    padding: 4px 12px;
  }

  .btn-text {
    display: none;
  }

  .noti-text {
    width: 120px;
    line-height: 17px;
    font-size: 1.4em;
    -webkit-line-clamp: 3;
  }

  .noti-long {
    width: 206px;
    line-height: 17px;
    font-size: 1.4em;
    -webkit-line-clamp: 3;
  }
}
</style>
