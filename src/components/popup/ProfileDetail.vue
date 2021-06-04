<template>
  <div id="rate-popup" class="popup">
    <div class="popup-section section">
      <div class="popup-form">
        <div id="profile-section" class="section">
          <div v-if="!adminEdit" id="left">
            <div v-if="cancel || (!edit && !save)" id="profile-frame">
              <img
                v-if="findUser == true && dataUser != user.username"
                id="profile-pic"
                :src="profile_User"
              />
              <img v-else id="profile-pic" :src="showprofile_pic" />
            </div>
            <div v-if="!profile_pic && edit" id="profile-frame">
              <img
                v-if="findUser == true && dataUser != user.username"
                id="profile-pic"
                :src="profile_User"
              />
              <img v-else id="profile-pic" :src="showprofile_pic" />
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


          <div v-if="adminEdit" id="left">
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
            <div v-if="!adminEdit" id="username-box">
              <h1 v-if="!edit" id="name_title">
                <span v-if="findUser == true && dataUser != user.username">{{
                  dataUser
                }}</span>
                <span v-else>{{ user.username }}</span>
                <img
                  v-if="role != `RO04`"
                  class="verified-badge"
                  src="../../assets/icon/verified-badge.png"
                />
              </h1>
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

            <div v-if="adminEdit" id="username-box">
              <h1 v-if="!edit" id="name_title">
                <span>{{ customerData.username }}</span>
                <img
                  v-if="role != `RO04`"
                  class="verified-badge"
                  src="../../assets/icon/verified-badge.png"
                />
              </h1>
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

            <div v-if="!adminEdit" id="bio-mobile">
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

            <div v-if="adminEdit" id="bio-mobile">
              <h1 v-if="!edit" id="bio">
                <span>{{ customerData.bio }}</span>
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


            <div id="double-flex">
              <!-- Rating -->
              <div id="rating">
                <h2 class="black-color input_title">Rating</h2>
                <div style="margin-left: 5px" class="section">
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
              <div v-if="!adminEdit">
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
            </div>

            <!-- Follower -->
            <div id="follower-section">
              <div id="follower">
                <div v-if="!adminEdit" class="verticle-box">
                  <h1
                    v-if="findUser == true && dataUser != user.username"
                    class="number-box"
                  >
                    {{ searchUserList.host }}
                  </h1>
                  <h1 v-else class="number-box">{{ user.host }}</h1>
                  <h1 class="title-box">Host</h1>
                </div>

                <div v-if="adminEdit"  class="verticle-box">
                  <h1 class="number-box">{{ customerData.host }}</h1>
                  <h1 class="title-box">Host</h1>
                </div>

                <div v-if="!adminEdit" class="verticle-box">
                  <h1
                    v-if="findUser == true && dataUser != user.username"
                    class="number-box"
                  >
                    {{ searchUserList.joined }}
                  </h1>
                  <h1 v-else class="number-box">{{ user.joined }}</h1>
                  <h1 class="title-box">Joined</h1>
                </div>

                <div v-if="adminEdit" class="verticle-box">
                  <h1 class="number-box">{{ customerData.joined }}</h1>
                  <h1 class="title-box">Joined</h1>
                </div>

                <div v-if="!adminEdit" class="verticle-box">
                  <h1
                    v-if="findUser == true && dataUser != user.username"
                    class="number-box"
                  >
                    {{ searchUserList.follower }}
                  </h1>
                  <h1 v-else class="number-box">{{ user.follower }}</h1>
                  <h1 class="title-box">Follower</h1>
                </div>

                <div v-if="adminEdit" class="verticle-box">
                  <h1 class="number-box">{{ customerData.follower }}</h1>
                  <h1 class="title-box">Follower</h1>
                </div>

                <div v-if="!adminEdit" class="verticle-box">
                  <h1
                    v-if="findUser == true && dataUser != user.username"
                    class="number-box"
                  >
                    {{ searchUserList.following }}
                  </h1>
                  <h1 v-else class="number-box">{{ user.following }}</h1>
                  <h1 class="title-box">Following</h1>
                </div>

                 <div v-if="adminEdit" class="verticle-box">
                  <h1 class="number-box">{{ customerData.following }}</h1>
                  <h1 class="title-box">Following</h1>
                </div>

              </div>
            </div>
            <!-- Follower -->

            <div v-if="!adminEdit" id="bio-default">
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

             <div v-if="adminEdit" id="bio-default">
              <h1 v-if="!edit" id="bio">
                <span>{{ customerData.bio }}</span>
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

            <div v-if="!adminEdit" id="profile-button-section">
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
                  <button
                    v-if="searchUserList.status_id"
                    id="following_button"
                    @click="toUnfollow()"
                  >
                    FOLLOWING
                  </button>

                  <button v-else id="follow_button" @click="toFollow()">
                    FOLLOW
                  </button>
                </div>
              </div>
            </div>

            <div v-if="adminEdit" id="profile-button-section">
              <div id="profile-button">
                <button @click="clickEdit()">EDIT PROFILE</button>
                <button @click="clickInterest()">INTERESTED</button>
                <button @click="clickPassword()">CHANGE PASSWORD</button>
              </div>
            </div>

          </div>
        </div>
        <div id="middle">
          <div v-if="!adminEdit">
            <EditProfile
            v-if="interestShow == false && changePassword == false"
            @editReturn="editReturn"
            :usernameAfter="username"
            :bioAfter="bio"
            :edit="edit"
            :user="user"
            :role="demoRole"
            :findUser="findUser"
            :dataUser="dataUser"
            :userList="searchUserList"
            :day="dayPlace"
            :month="monthPlace + 1"
            :year="yearPlace"
            @saveUser="saveUser"
          />
          </div>

          <div v-if="adminEdit">
            <EditProfile
            v-if="interestShow == false && changePassword == false"
            @editReturn="editReturn"
            :usernameAfter="username"
            :bioAfter="bio"
            :edit="edit"
            :user="customerData"
            :role="demoRole"
            :findUser="false"
            :day="dayPlace"
            :month="monthPlace + 1"
            :year="yearPlace"
            @saveUser="saveUser"
          />
          </div>

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
import SearchService from "./../../services/search.service";
import decode from "jwt-decode";

export default {
  data() {
    return {
      user: null,
      showprofile_pic: "",
      profile_pic: "",
      username: "",
      bio: "",
      dayPlace: "",
      monthPlace: "",
      yearPlace: "",
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
      profile_User: "",
      role: "",
      adminEdit: false
    };
  },
  props: ["demoRole", "findUser", "dataUser","customerData"],
  components: {
    EditProfile,
    Upload,
    ProfileInterest,
    ChangePassword
  },
  created() {
    this.getRole();
    if(this.customerData != null) {
      this.adminEdit = true;
      this.username = this.customerData.username;
      this.bio = this.customerData.bio;
      this.showprofile_pic = this.customerData.profile_pic;
      let birthdate = new Date(this.customerData.birthdate);
      let date = birthdate.getDate();
      let month = birthdate.getMonth();
      let year = birthdate.getFullYear();
      this.dayPlace = date;
      this.monthPlace = month;
      this.yearPlace = year;
      this.customerData.birthdate = `${date} ${this.months[month]} ${year}`;
        if (this.customerData.rating > 0) {
            this.showRating.fill(true, 0, this.customerData.rating.toFixed(0));
          } else {
            this.showRating.fill(true, 0, 5);
          }
    }
    else {
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
        this.dayPlace = date;
        this.monthPlace = month;
        this.yearPlace = year;
        this.user.birthdate = `${date} ${this.months[month]} ${year}`;
        if (this.findUser == true) {
          if (this.dataUser == this.user.username) {
            console.log("sameUser");
          } else {
            this.functionGetApi(this.dataUser);
          }
        }
        if (!this.findUser || this.dataUser == this.user.username) {
          if (this.user.rating > 0) {
            this.showRating.fill(true, 0, this.user.rating.toFixed(0));
          } else {
            this.showRating.fill(true, 0, 5);
          }
        }
      }
    });
    } 
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
      value.role_id = this.role;
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
    getRole() {
      let userData = decode(localStorage.getItem("user"));
      this.role = userData.role_id;
    },
    functionGetApi(value) {
      SearchService.getSearchUser(value)
        .then((res) => {
          if (res) {
            this.searchUserList = res.find((user) => user.username == value);
            this.profile_User =
              "http://localhost:8080/api/user/displayPic/" +
              this.searchUserList.user_id;
            let birthdate = new Date(this.searchUserList.birthdate);
            let date = birthdate.getDate();
            let month = birthdate.getMonth();
            let year = birthdate.getFullYear();
            this.searchUserList.birthdate = `${date} ${this.months[month]} ${year}`;

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
        if (res.message == "followed") {
          this.searchUserList.status_id = 1;
          this.searchUserList.follower++;
          console.log("send!");
        }
      });
    },
    toUnfollow() {
      UserService.unFollowing(this.searchUserList.user_id).then((res) => {
        if (res.message == "unfollowed") {
          this.searchUserList.status_id = 0;
          this.searchUserList.follower--;
          console.log("send!");
        }
      });
    }
  }
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
#middle {
  margin-bottom: 15px;
}
#follower {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  margin-bottom: 5px;
}
.verified-badge {
  width: 20px;
  height: 20px;
  padding-left: 10px;
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
#follow_button_section {
  display: flex;
  width: 100%;
  justify-content: flex-end;
}
#follow_button_section > button {
  width: 150px !important;
}
#follow_button {
  color: #ffffff !important;
  border: 2px solid #ff8864 !important;
  background-color: #ff8864 !important;
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
  font-size: 1.6em;
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
    display: flex;
    justify-content: center;
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
  #name_title {
    padding-top: 15px;
  }
  #upload-photo > img {
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
    width: 50px;
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
