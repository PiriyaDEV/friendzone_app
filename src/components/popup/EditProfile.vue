<template>
  <div id="rate-popup" class="popup">
    <div class="popup-section section">
      <div class="popup-form">
        <h1 class="header_title report-title">EDIT PROFILE</h1>

        <div class="edit-section">
          <div id="left">
            <div id="profile-frame">
              <img id="profile-pic" :src= "user.profile_pic" />
            </div>
            <div id="select-photo-section" class="section">
              <img
                id="addphoto"
                @click="goMainpage()"
                src="@/assets/icon/icons8-add-image-96.png"
              />
              <h1 class="upload">upload photo</h1>
            </div>
          </div>
          <div id="right">
            <!-- Information -->
            <div class="info">
              <h1 class="info-title">Username</h1>
              <input
                class="input_profile_box"
                type="text"
                maxlength="30"
                size="30"
                name="name"
                :value="user.username"
              />
            </div>
            <!-- Information -->

            <!-- Information -->
            <div class="info">
              <h1 class="info-title">Bio</h1>
              <textarea
                class="input_profile_box bio"
                maxlength="256"
                size="256"
                name="bio"
                :value="user.bio"
              >
              </textarea>
            </div>
            <!-- Information -->

            <!-- Information -->
            <div class="info">
              <h1 class="info-title">Firstname</h1>
              <input
                class="input_profile_box"
                type="text"
                maxlength="30"
                size="30"
                :value= user.firstname
              />
            </div>
            <!-- Information -->

            <!-- Information -->
            <div class="info">
              <h1 class="info-title">Lastname</h1>
              <input
                class="input_profile_box"
                type="text"
                maxlength="30"
                size="30"
                :value= user.lastname
              />
            </div>
            <!-- Information -->

            <!-- Information -->
            <div class="static-info">
              <h1 class="info-title">Birthdate</h1>
              <h1 id="date">{{user.birthdate}}</h1>
            </div>
            <!-- Information -->

            <!-- Information -->
            <div class="info">
              <h1 class="info-title">Email</h1>
              <input
                class="input_profile_box"
                type="text"
                maxlength="30"
                size="30"
                :value= user.email
              />
            </div>
            <!-- Information -->

            <!-- Information -->
            <div class="info">
              <h1 class="info-title">Phonenumber</h1>
              <input
                class="input_profile_box"
                type="text"
                maxlength="30"
                size="30"
                :value= user.phone
              />
            </div>
            <!-- Information -->

            <!-- Information -->
            <div class="static-info">
              <h1 class="info-title">Gender</h1>
              <h1 id="gender">Male</h1>
            </div>
            <!-- Information -->
          </div>
        </div>

        <div class="button-section">
          <button class="back_button" @click="editReturn()">Cancel</button>
          <button class="create_button" @click="ClickCreate()">
            Save Change
          </button>
        </div>

        <img
          @click="editReturn()()"
          style="cursor: pointer"
          class="close"
          src="@/assets/icon/icons8-multiply-96.png"
        />
      </div>
    </div>
  </div>
</template>

<script>

import User from './../../models/user';
import UserService from "./../../services/user.service"

export default {
  data() {
     return {
       user: new User({
         username: "",
         email: "",
         firstname: "",
         lastname: "",
         phone: "",
         gender: "",
         profile_pic: "",
         birthdate: "",
         bio: ""
         }),
     }
   },
   created() {
     UserService.getUserDetail().then(
       res => {
         if(res) {
           this.user = res;
           console.log(this.user)
         }
       }
     )
   },
  methods: {
    editReturn() {
      this.$emit("clickEdit", false);
      this.$emit("clickDetail", true);
    },
  },
};
</script>

<style scoped>
#left {
  margin-right: 50px;
}

#right {
  margin-left: 50px;
}

.info {
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin-top: 10px;
}

.input_profile_box {
  font-size: 1.75em;
  font-weight: 600;
  color: #a0a0a0;
  padding: 7px 12px 7px 15px;
  border: 2px solid #e3e3e3;
  border-radius: 10px;
  margin-bottom: 2px;
  box-shadow: none;
  width: 250px;
  line-height: 21px;
}

#profile-pic {
  width: 140px;
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

.bio {
  padding-bottom: 50px;
}

.edit-section {
  display: flex;
  justify-content: center;
}

.upload {
  color: #cccccc;
  font-size: 1.75em;
  font-weight: 600;
  margin: 0px 0px 0px 6px;
}

#addphoto {
  width: 25px;
}

#select-photo-section {
  border: 2px solid #e3e3e3;
  border-radius: 6px;
  padding: 3px 8px;
  margin-top: 20px;
}

.info-title {
  font-size: 2.25em;
  color: #444444;
  margin-right: 20px;
}

.static-info {
  display: flex;
  align-items: center;
  color: #444444;
  margin: 0;
}

#date {
  margin-left: 40px;
  font-weight: 500;
  font-size: 2em;
}

#gender {
  margin-left: 55px;
  font-weight: 500;
  font-size: 2em;
}
</style>