<template>
  <div>
    <div id="userbox">
      <div id="box-info">
        <div id="profile-frame">
          <img id="profile-pic" :src="user.profile_pic" />
        </div>

        <div v-if="select == 1" class="namerole">
          <h1 class="title">{{ user.username }}</h1>
          <h1 class="title">{{ eventRole }}</h1>
        </div>

        <div v-if="select == 2 || select == 3" class="namerole">
          <h1 class="title">{{ user.username }}</h1>
          <div>
            <!-- Rating -->
            <div id="rating">
              <h2 class="black-color title">Rating</h2>
              <div style="margin-left: 5px" class="section">
                <!-- Star -->
                <div>
                  <!-- <img class="star" src="@/assets/icon/icons8-star-96.png" /> -->
                  <img
                    class="star"
                    src="@/assets/icon/icons8-star-96-orange.png"
                  />
                </div>
                <!-- Star -->

                <!-- Star -->
                <div>
                  <img class="star" src="@/assets/icon/icons8-star-96.png" />
                  <!-- <img class="star" src="@/assets/icon/icons8-star-96-orange.png" /> -->
                </div>
                <!-- Star -->

                <!-- Star -->
                <div>
                  <img class="star" src="@/assets/icon/icons8-star-96.png" />
                  <!-- <img class="star" src="@/assets/icon/icons8-star-96-orange.png" /> -->
                </div>
                <!-- Star -->

                <!-- Star -->
                <div>
                  <img class="star" src="@/assets/icon/icons8-star-96.png" />
                  <!-- <img class="star" src="@/assets/icon/icons8-star-96-orange.png" /> -->
                </div>
                <!-- Star -->

                <!-- Star -->
                <div>
                  <img class="star" src="@/assets/icon/icons8-star-96.png" />
                  <!-- <img class="star" src="@/assets/icon/icons8-star-96-orange.png" /> -->
                </div>
                <!-- Star -->
              </div>
            </div>
            <!-- Rating -->
          </div>
        </div>
      </div>

      <div id="button-section">
        <button v-if="select == 1" class="button moderator">
          Move to Participant
        </button>
        <button v-if="select == 1" class="button moderator">
          Move to Moderator
        </button>
        <button v-if="select == 1" class="button delete">Delete</button>
        <button v-if="select == 3" class="button delete">Invite</button>
        <button v-if="select == 2" class="button decline">Decline</button>
        <button v-if="select == 2" class="button approve">Approve</button>
        <!-- <button>Click</button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      eventRole: "Participant",
    };
  },
  props: ["select", "user"],
  created() {
    if (this.user.moderator != 0) this.eventRole = "Moderator";
    else if (this.user.host == 1) this.eventRole = "Host";
  },
};
</script>

<style scoped>
h1 {
  color: #444444;
}

#userbox {
  border-radius: 23px;
  border: none;
  background-color: #f0f0f0;
  padding: 3px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
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

#profile-frame {
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 30px;
}

.namerole {
  width: 400px;
  display: grid;
  grid-template-columns: 40% 60%;
  align-items: center;
}

.title {
  font-size: 1.75em;
  margin: 0px;
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
  color: #a0a0a0;
  border: 1.5px solid #a0a0a0;
}

.decline {
  color: #fd6363;
  border: 1.5px solid #fd6363;
}

.approve {
  color: #1ed32c;
  border: 1.5px solid #1ed32c;
}

#rating {
  display: flex;
  align-items: center;
  margin-top: 5px;
}

.star {
  width: 12px;
  margin-right: 1px;
}
</style>
