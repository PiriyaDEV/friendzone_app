<template>
  <div>
    <div id="wait-box" class="popup">
      <div class="popup-section section">
        <div>
          <div id="top-section" class="popup-form">
            <!-- <h1 class="header_title">WAIT FOR APPROVAL</h1> -->
            <h1 class="header_title">
              POINT
            </h1>

            <div id="yellow-box" class="section">
              <div>
                <div class="section">
                  <img id="coin-logo" src="@/assets/icon/coin.png" />
                  <h1 id="point">{{ point.point }}</h1>
                </div>
                <h1 id="your-balance">Your Balance</h1>
              </div>
            </div>

            <img
              @click="pointClick()"
              style="cursor: pointer"
              class="close"
              src="@/assets/icon/icons8-multiply-96.png"
            />
          </div>
          <div id="bottom-section" class="popup-form">
            <div id="menu">
              <h1 @click="clickEventDetail()" class="menu-text selected">
                Point Log
              </h1>
            </div>
            <hr id="bar" />

            <div id="transaction-box">
              <div v-for="(pointLog, i) in pointLogList" :key="i">
                <div id="transaction">
                  <div class="transaction-flex">
                    <h1 class="transaction-text black-color">
                      {{ pointLog.title }}
                    </h1>
                    <h1 :class="cssPoint">
                      {{ pointLog.point }}
                    </h1>
                  </div>
                  <div class="transaction-flex">
                    <h1 class="transaction-info">{{ pointLog.description }}</h1>
                    <h1 class="transaction-info">{{ pointLog.date }}</h1>
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
              <div v-if="role == `RO01`">
                <div v-if="demoRole == 1 && !edit" id="switch-button">
                  <button
                    v-if="
                      (findUser == true && dataUser == user.username) ||
                        findUser == false
                    "
                    @click="clickDemoAdmin()"
                  >
                    Switch to Admin
                  </button>
                </div>

                <div
                  v-if="demoRole == 2 && !edit && dataUser != user.username"
                  id="switch-button"
                >
                  <button
                    v-if="
                      (findUser == true && dataUser == user.username) ||
                        findUser == false
                    "
                    @click="clickDemoAdmin()"
                  >
                    Switch to User
                  </button>
                </div>
              </div>
            </div>

            <!-- Follower -->
            <div id="follower-section">
              <div id="follower">
                <div class="verticle-box">
                  <h1
                    v-if="findUser == true && dataUser != user.username"
                    class="number-box"
                  >
                    {{ searchUserList.host }}
                  </h1>
                  <h1 v-else class="number-box">{{ user.host }}</h1>
                  <h1 class="title-box">Host</h1>
                </div>
                <div class="verticle-box">
                  <h1
                    v-if="findUser == true && dataUser != user.username"
                    class="number-box"
                  >
                    {{ searchUserList.joined }}
                  </h1>
                  <h1 v-else class="number-box">{{ user.joined }}</h1>
                  <h1 class="title-box">Joined</h1>
                </div>
                <div class="verticle-box">
                  <h1
                    v-if="findUser == true && dataUser != user.username"
                    class="number-box"
                  >
                    {{ searchUserList.follower }}
                  </h1>
                  <h1 v-else class="number-box">{{ user.follower }}</h1>
                  <h1 class="title-box">Follower</h1>
                </div>
                <div class="verticle-box">
                  <h1
                    v-if="findUser == true && dataUser != user.username"
                    class="number-box"
                  >
                    {{ searchUserList.following }}
                  </h1>
                  <h1 v-else class="number-box">{{ user.following }}</h1>
                  <h1 class="title-box">Following</h1>
                </div>
              </div>
            </div>
            <!-- Follower -->

            <div id="bio-default">
              <h1 v-if="!edit" id="bio">
                <span v-if="findUser == true && dataUser != user.username">{{
                  searchUserList.bio
                }}</span>
                <span v-else>{{ user.bio }}</span>
              </h1>
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
                <div
                  v-if="
                    (findUser == true && dataUser == user.username) ||
                      findUser == false
                  "
                >
                  <button @click="clickEdit()">EDIT PROFILE</button>
                </div>
                <div
                  v-if="
                    (findUser == true && dataUser == user.username) ||
                      findUser == false
                  "
                >
                  <button @click="clickInterest()">INTERESTED</button>
                </div>
                <div
                  v-if="
                    (findUser == true && dataUser == user.username) ||
                      findUser == false
                  "
                >
                  <button @click="clickPassword()">CHANGE PASSWORD</button>
                </div>
                <div
                  id="follow_button_section"
                  v-if="findUser == true && dataUser !== user.username"
                >
                  <button id="follow_button" @click="toFollow">FOLLOW</button>
                  <!-- <button @click="clickPassword()">FOLLOWING</button> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import decode from "jwt-decode";
import ProfileInterest from "@/components/popup/profile/ProfileInterest.vue";
import ChangePassword from "@/components/popup/profile/ChangePassword.vue";
import EditProfile from "@/components/popup/EditProfile.vue";
import UserService from "./../../services/user.service";
import Upload from "./../../components/UploadPic.vue";
import SearchService from "./../../services/search.service";

export default {
  data() {
    return {
      role:"",
      user: null,
      showprofile_pic: "",
      profile_pic: "",
      username: "",
      bio: "",
      showRating: [false, false, false, false, false],
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
        "December"
      ],
      edit: false,
      save: false,
      interestShow: false,
      changePassword: false,
      searchUserList: [],
      profile_User: ""
    };
  },
  computed: {
    cssPoint() {
      let positive = "transaction-text green-color";
      let negative = "transaction-text red-color";
      if (this.pointLogList[0].positive) {
        return positive;
      }
      return negative;
    }
  },
  created() {
    this.getRole()
    UserService.getUserDetail().then((res) => {
      if (res) {
        this.pointLogList = res;
        console.log(this.pointLogList[0].positive);
      }
    });
  },
  methods: {
    getRole() {
      let userData = decode(localStorage.getItem("user"));
      this.role = userData.role_id;
    },
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
    functionGetApi(value) {
      SearchService.getSearchUser(value)
        .then((res) => {
          if (res) {
            this.searchUserList = res[0];
            this.profile_User =
              "http://localhost:8080/api/user/displayPic/" + res[0].user_id;
            if (this.searchUserList.rating > 0) {
              this.showRating.fill(
                true,
                0,
                this.searchUserList.rating.toFixed(0)
              );
            } else {
              this.showRating.fill(true, 0, 5);
            }
          }
        })
        .catch(() => {
          this.searchUserList = [];
        });
    },
    toFollow() {
      UserService.following(this.searchUserList.user_id).then((res) => {
        if (res.status == 200) console.log("send!");
      });
    }
  }
};
</script>

<style scoped>
#yellow-box {
  border: 2px solid #ffc449;
  border-radius: 9px;
  padding: 30px 130px;
}

#coin-logo {
  width: 35px;
  height: 35px;
}

#top-section {
  padding-bottom: 25px;
}

#bottom-section {
  margin-top: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
}

#point {
  font-size: 4em;
  color: #444444;
  font-weight: 500;
  margin: 0px 0px 0px 10px;
}

#your-balance {
  font-size: 1.75em;
  color: #a0a0a0;
  text-transform: uppercase;
  font-weight: 400;
  text-align: center;
  margin: 10px 0px 0px 0px;
}

#menu {
  display: flex;
}

div::-webkit-scrollbar {
  height: 5px;
  width: 5px;
}

#transaction {
  margin-bottom: 15px;
}

#transaction-box {
  margin-top: 15px;
  height: 270px;
  overflow-y: auto;
  padding: 0px 15px 0px 0px;
}

.transaction-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.transaction-text {
  font-size: 1.75em;
  margin: 0px;
  font-weight: 500;
}

.transaction-info {
  font-size: 1.5em;
  margin: 0px;
  font-weight: 500;
  color: #a0a0a0;
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
  margin-top: 5px;
  padding-bottom: 7px;
  color: #444444;
  cursor: pointer;
}

.selected {
  font-weight: 600;
  border-bottom: 5px solid #fe8864;
}

@media screen and (max-width: 1024px) {
  .popup-form {
    margin: 50px 0px 20px 0px;
  }
}

@media screen and (max-width: 690px) {
  #yellow-box {
    padding: 30px 100px;
  }

  #point {
    font-size: 3em;
  }

  #coin-logo {
    width: 25px;
    height: 25px;
  }
}

@media screen and (max-width: 490px) {
  .popup-form {
    padding-right: 30px !important;
    padding-left: 30px !important;
  }

  #transaction-box {
    width: 240px;
  }

  .transaction-text {
    font-size: 1.5em;
  }

  .transaction-info {
    font-size: 1.3em;
  }

  #yellow-box {
    padding: 20px 0px;
  }
}
</style>
