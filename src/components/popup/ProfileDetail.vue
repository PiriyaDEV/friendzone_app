<template>
  <div id="rate-popup" class="popup">
    <div class="popup-section section">
      <div class="popup-form">
        <div id="profile-section" class="section">
          <div id="left">
            <div v-if="cancel || (!edit && !save)" id="profile-frame">
              <img id="profile-pic" :src="showprofile_pic" />
            </div>
            <div v-if="!profile_pic && edit" id="profile-frame">
              <img id="profile-pic" :src="showprofile_pic" />
            </div>
            <div v-if="!cancel && profile_pic">
              <img
                id="profile-pic"
                class="pictureUpload"
                style="position: relative"
                :src="profile_pic.imageURL"
                alt="profile_pic"
              />
            </div>
            <div style="position: relative" v-if="edit">
              <Upload v-model="profile_pic">
                <div id="upload-photo" slot="activator">
                  <img src="@/assets/icon/icons8-add-image-96.png" />
                </div>
              </Upload>
            </div>
          </div>

          <div id="right">
            <div id="username-box">
              <h1 v-if="!edit" id="name_title">{{ user.username }}</h1>
              <input
                v-else
                class="input_username_box"
                type="text"
                maxlength="30"
                size="30"
                name="name"
                autocomplete="off"
                v-model="username"
              />
            </div>

            <div id="bio-mobile">
              <h1 v-if="!edit" id="bio">{{ user.bio }}</h1>
              <textarea
                v-else
                class="input_bio_box"
                type="text"
                maxlength="256"
                size="256"
                name="name"
                autocomplete="off"
                v-model="bio"
              >
              </textarea>
            </div>

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

              <div v-if="demoRole == 1 && !edit" id="switch-button">
                <button @click="clickDemoAdmin()">Switch to Admin</button>
              </div>

              <div v-if="demoRole == 2 && !edit" id="switch-button">
                <button @click="clickDemoAdmin()">Switch to User</button>
              </div>
            </div>

            <!-- Follower -->
            <div id="follower-section">
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
            </div>
            <!-- Follower -->

            <div id="bio-default">
              <h1 v-if="!edit" id="bio">{{ user.bio }}</h1>
              <textarea
                v-else
                class="input_bio_box"
                type="text"
                maxlength="256"
                size="256"
                name="name"
                autocomplete="off"
                v-model="bio"
              >
              </textarea>
            </div>

            <div id="profile-button-section">
              <div id="profile-button">
                <div>
                  <button @click="clickEdit()">EDIT PROFILE</button>
                </div>
                <div>
                  <button @click="clickInterest()">INTERESTED</button>
                </div>
                <div>
                  <button @click="clickPassword()">CHANGE PASSWORD</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="middle">
          <EditProfile
            v-if="interestShow == false && changePassword == false"
            @editReturn="editReturn"
            :usernameAfter="username"
            :bioAfter="bio"
            :edit="edit"
            :user="user"
            :role="demoRole"
            @saveUser="saveUser"
          />
          <ProfileInterest
            v-if="interestShow == true"
            @showBack="showBack"
            :profileDetail="interestShow"
          />
          <ChangePassword v-if="changePassword == true" @showBack="showBack" />
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
import ProfileInterest from "@/components/popup/profile/ProfileInterest.vue";
import ChangePassword from "@/components/popup/profile/ChangePassword.vue";
import EditProfile from "@/components/popup/EditProfile.vue";
import UserService from "./../../services/user.service";
import Upload from "./../../components/UploadPic.vue";

export default {
  data() {
    return {
      user: null,
      showprofile_pic: "",
      profile_pic: "",
      username: "",
      bio: "",
      cancel: false,
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
      save: false,
      interestShow: false,
      changePassword: false,
    };
  },
  props: ["demoRole"],
  components: {
    EditProfile,
    Upload,
    ProfileInterest,
    ChangePassword,
  },
  created() {
    UserService.getUserDetail().then((res) => {
      if (res) {
        this.user = res;
        this.username = this.user.username;
        this.bio = this.user.bio;
        this.showprofile_pic = this.user.profile_pic;
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
      this.cancel = false;
      this.profile_pic = "";
      this.interestShow = false;
      this.changePassword = false;
    },
    editReturn(value) {
      this.edit = value;
      this.cancel = true;
      this.profile_pic.imageURL = "";
    },
    clickInterest() {
      this.interestShow = true;
      this.changePassword = false;
      this.edit = false;
    },
    clickPassword() {
      this.changePassword = true;
      this.interestShow = false;
      this.edit = false;
    },
    showBack(value) {
      this.interestShow = value;
      this.changePassword = value;
    },
    saveUser(value) {
      this.edit = false;
      this.save = true;
      UserService.editUser(value).then((res) => {
        if (res) {
          UserService.uploadProfile(this.profile_pic.formData).then((res) => {
            if (res) {
              window.location.href = "/mainpage";
            }
          });
        }
      });
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
  position: relative;
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

#bio-mobile {
  display: none;
}

#profile-button {
  margin-top: 10px;
  padding-bottom: 15px;
}

#profile-button > div > button,
#switch-button > button {
  background-color: #ffffff;
  font-family: "Atten-Round-New";
  text-transform: uppercase;
  font-size: 1.25em;
  font-weight: 600;
  margin: 0px;
}

#profile-button > div > button {
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

#upload-photo {
  background-color: #fe8864;
  border: none;
  border-radius: 50%;
  padding: 7px;
  position: absolute;
  bottom: 2px;
  right: 5px;
  cursor: pointer;
}

#upload-photo > img {
  width: 22px;
  height: 22px;
}

@media screen and (max-width: 1024px) {
  #profile-section {
    display: block;
  }

  #upload-photo {
    bottom: -70px;
    right: 0px;
  }

  #profile-button {
    padding: 0px;
    margin: 20px 0px;
  }

  .input_username_box,
  .input_bio_box {
    width: 100%;
  }

  #left {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
  }

  #profile-frame {
    width: 140px;
    height: 140px;
  }

  #double-flex {
    justify-content: space-around;
  }

  #bio-mobile {
    display: block;
    text-align: center;
    width: 100%;
  }

  #bio-default {
    display: none;
  }

  #name_title {
    text-align: center;
  }

  #left,
  #right {
    margin-right: 0px;
    margin-left: 0px;
  }
}

@media screen and (max-width: 690px) {
  #profile-frame,
  #profile-pic {
    width: 100px;
    height: 100px;
  }

  #upload-photo > img{
    width: 20px;
    height: 20px;
  }

  #upload-photo {
    bottom: -60px;
    right: 0px;
  }

  #double-flex {
    display: block;
    margin-bottom: 0px;
  }

  .input_username_box,
  .input_bio_box {
    width: 200px;
  }

  #follower-section {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #follower {
    flex-wrap: wrap;
    width: 180px;
    justify-content: center;
  }

  .popup-form {
    padding: 0px 40px !important;
  }

  .verticle-box {
    width: 40px;
    margin: 10px;
  }

  #username-box {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .number-box {
    font-size: 2em;
  }

  .title-box {
    font-size: 1.6em;
  }

  #rating {
    justify-content: center;
  }

  #profile-button > div > button {
    width: 100%;
  }

  #profile-button > div > button:nth-child(1),
  #profile-button > div > button:nth-child(1) {
    margin-bottom: 10px;
  }

  #bio {
    width: 150px;
  }

  #switch-button {
    padding: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #profile-button {
    display: block;
    margin: 0px;
  }

  #profile-button-section {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #switch-button > button {
    width: 170px;
    margin: 10px 0px;
  }
}

@media screen and (max-width: 490px) {
  .popup-form {
    padding: 0px 20px !important;
  }
}
</style>
