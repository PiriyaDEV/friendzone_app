<template>
  <div id="rate-popup" class="popup">
    <div class="popup-section section">
      <div class="popup-form">
        <div id="profile-section" class="section">
          <div id="left">
            <div v-if="!edit" id="profile-frame">
              <img id="profile-pic" :src="user.profile_pic" />
            </div>
            <div id="profile-frame" v-if="edit">
              <Upload v-model="profile_pic">
                <div
                  v-if="!profile_pic"
                  slot="activator"
                  id="select-photo-inside"
                  class="section"
                >
                  <img id="profile-pic" :src="user.profile_pic" />
                </div>
                <div v-else slot="activator">
                  <img
                    id="profile-pic"
                    class="pictureUpload"
                    style="position: relative"
                    :src="profile_pic.imageURL"
                    alt="profile_pic"
                  />
                </div>
              </Upload>
            </div>
          </div>

          <div id="right">
            <h1 v-if="!edit" id="name_title">{{ user.username }}</h1>
            <input
              v-else
              class="input_username_box"
              type="text"
              maxlength="30"
              size="30"
              name="name"
              autocomplete="off"
              v-model="user.username"
            />

            <div id="double-flex">
              <!-- Rating -->
              <div id="rating">
                <h2 class="black-color input_title">Rating</h2>
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

              <div v-if="demoRole == 1" id="switch-button">
                <button @click="clickDemoAdmin()">Switch to Admin</button>
              </div>

              <div v-if="demoRole == 2" id="switch-button">
                <button @click="clickDemoAdmin()">Switch to User</button>
              </div>
            </div>

            <!-- Follower -->
            <div id="follower">
              <div class="verticle-box">
                <h1 class="number-box">2</h1>
                <h1 class="title-box">Host</h1>
              </div>
              <div class="verticle-box">
                <h1 class="number-box">5</h1>
                <h1 class="title-box">Joined</h1>
              </div>
              <div class="verticle-box">
                <h1 class="number-box">12</h1>
                <h1 class="title-box">Follower</h1>
              </div>
              <div class="verticle-box">
                <h1 class="number-box">17</h1>
                <h1 class="title-box">Following</h1>
              </div>
            </div>
            <!-- Follower -->

            <div>
              <h1 v-if="!edit" id="bio">{{ user.bio }}</h1>
              <textarea
                v-else
                class="input_bio_box"
                type="text"
                maxlength="256"
                size="256"
                name="name"
                autocomplete="off"
                v-model="user.bio"
              >
              </textarea>
            </div>

            <div id="profile-button">
              <button @click="clickEdit()">
                EDIT PROFILE
              </button>
              <button>INTERESTED</button>
              <button>CHANGE PASSWORD</button>
            </div>
          </div>
        </div>

        <div id="middle">
          <EditProfile
            @editReturn="editReturn"
            :edit="edit"
            :user="user"
            :role="demoRole"
          />
        </div>

        <img
          @click="detailReturn()"
          style="cursor: pointer"
          class="close"
          src="@/assets/icon/icons8-multiply-96.png"
        />
      </div>
    </div>
  </div>
</template>

<script>
import EditProfile from "@/components/popup/EditProfile.vue";
import UserService from "./../../services/user.service";
import Upload from "./../../components/UploadPic.vue";

export default {
  data() {
    return {
      user: null,
      profile_pic: "",
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      edit: false,
    };
  },
  props: ["demoRole"],
  components: {
    EditProfile,
    Upload,
  },
  created() {
    UserService.getUserDetail().then((res) => {
      if (res) {
        this.user = res;
        let birthdate = new Date(this.user.birthdate);
        let date = birthdate.getDate();
        let month = birthdate.getMonth();
        let year = birthdate.getFullYear();
        this.user.birthdate = `${date} ${this.months[month]} ${year}`;
      }
    });
  },
  methods: {
    detailReturn() {
      this.$emit("clickDetail", false);
      this.$emit("clickEdit", false);
    },
    clickDemoAdmin() {
      if (this.demoRole == 1) {
        this.$emit("demoAdmin", 2);
        this.$emit("clickDetail", false);
      } else {
        this.$emit("demoAdmin", 1);
        this.$emit("clickDetail", false);
      }
    },
    clickEdit() {
      this.edit = true;
    },
    editReturn(value) {
      this.edit = value;
    },
  },
};
</script>

<style scoped>
#left {
  margin-right: 50px;
}

#right {
  margin-left: 20px;
  min-width: 260px;
}

#follower {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  margin-bottom: 5px;
}

.verticle-box {
  text-align: center;
  border-radius: 10px;
  background-color: #f8f8f8;
  padding: 10px;
  width: 65px;
}

.number-box {
  font-size: 2.5em;
  font-weight: 600;
  margin: 0;
  color: #444444;
}

.title-box {
  font-size: 1.75em;
  font-weight: 500;
  margin-top: -3px;
  margin-bottom: 0;
  color: #444444;
}

#name_title {
  color: #444444;
  font-size: 3.75em;
  font-weight: 700;
  padding-top: 25px;
  margin: 0;
}

#bio {
  color: #444444;
  font-size: 1.6em;
  font-weight: 500;
  margin: 0;
  padding-top: 15px;
  width: 400px;
  line-height: 21px;
}

#profile-pic {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #444444;
}

#profile-frame {
  border-radius: 50%;
  border: 2px solid #a0a0a0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px;
}

#profile-section {
  margin-top: 5px;
}

#rating {
  display: flex;
  align-items: center;
}

#rating > h2 {
  font-size: 2em;
}

.star {
  width: 20px;
  margin-right: 4px;
}

#profile-button,
#switch-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#switch-button {
  padding-left: 10px;
}

#profile-button {
  margin-top: 10px;
  padding-bottom: 15px;
}

#profile-button > button,
#switch-button > button {
  background-color: #ffffff;
  font-family: "Atten-Round-New";
  text-transform: uppercase;
  font-size: 1.25em;
  font-weight: 600;
  margin: 0px;
}

#profile-button > button {
  color: #ff8864;
  border: 2px solid #ff8864;
  border-radius: 16px;
  padding: 5px 18px;
}

#switch-button > button {
  color: #ffffff;
  border: none;
  padding: 7px 18px;
  background-color: #ffc661;
  border-radius: 9px;
}

#edit-box {
  display: block;
}

#double-flex {
  display: flex;
  align-items: center;
  margin: 10px 0px;
}

.input_bio_box {
  font-size: 2em;
  font-weight: 400;
  color: #444444;
  padding: 5px 10px;
  border: 1.6px solid #e3e3e3;
  border-radius: 10px;
  box-shadow: none;
  width: 400px;
  line-height: 21px;
  font-weight: 500;
  margin: 15px 0px 2px 0px;
}
.pictureUpload {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.input_username_box {
  color: #444444;
  padding: 3px 10px;
  border: 1.75px solid #e3e3e3;
  border-radius: 10px;
  box-shadow: none;
  width: 400px;
  line-height: 21px;
  margin: 25px 0px 0px 0px;
  font-size: 3.75em;
  font-weight: 700;
}
</style>
