<template>
  <div id="profile">
    <div id="profile-background" class="section">
      <div class="page-container">
        <div class="section">
          <img
            id="whitelogo"
            @click="goMainpage()"
            src="@/assets/longlogo.png"
          />
        </div>
        <!-- Form -->
        <div class="section">
          <div id="profile_account" class="form">
            <h1 style="text-align: center" class="header_title">
              SETTING UP YOUR PROFILE
            </h1>

            <!-- Column -->
            <div id="profile-section">
              <!-- Left -->
              <div id="left-section">
                <!-- Input -->
                <div>
                  <h2 class="input_title">
                    Firstname<span class="orange-color"> *</span>
                  </h2>
                  <input
                    v-model="firstname"
                    class="input_box"
                    type="text"
                    maxlength="64"
                    size="64"
                    placeholder="enter your first name"
                  />
                  <h3 v-if="invalidFirstname === true" class="invalid">
                    * {{ alertFirstname }}
                  </h3>
                </div>
                <!-- Input -->

                <!-- Input -->
                <div>
                  <h2 class="input_title">
                    Lastname<span class="orange-color"> *</span>
                  </h2>
                  <input
                    v-model="lastname"
                    class="input_box"
                    type="text"
                    maxlength="64"
                    size="64"
                    placeholder="enter your last name"
                  />
                  <h3 v-if="invalidLastname === true" class="invalid">
                    * {{ alertLastname }}
                  </h3>
                </div>
                <!-- Input -->

                <!-- Input -->
                <div>
                  <h2 class="input_title">
                    Phone Number<span class="orange-color"> *</span>
                  </h2>
                  <input
                    v-model="phone"
                    class="input_box"
                    type="text"
                    maxlength="10"
                    size="10"
                    placeholder="enter your phone number"
                    @blur="checkUniquePhone()"
                  />
                  <h3 v-if="invalidPhone === true" class="invalid">
                    * {{ alertPhone }}
                  </h3>
                </div>
                <!-- Input -->

                <!-- Input -->
                <div>
                  <h2 class="input_title">
                    Gender<span class="orange-color"> *</span>
                  </h2>
                  <select
                    name="gender"
                    class="input_select minimal"
                    v-model="selected"
                    required
                  >
                    <option value="" disabled selected hidden>
                      select your gender
                    </option>
                    <option
                      v-for="(gender, index) in genderList"
                      :key="index"
                      :value="gender.gender_id"
                    >
                      {{ gender.gender_name }}
                    </option>
                  </select>
                  <h3 v-if="invalidGender === true" class="invalid">
                    * {{ alertGender }}
                  </h3>
                </div>
                <!-- Input -->
              </div>
              <!-- Left -->

              <!-- Right -->
              <div id="right-section">
                <!-- Input -->
                <div id="photo-section">
                  <h2 id="photo-header" class="input_title">
                    Profile Picture<span class="orange-color"> *</span>
                  </h2>

                  <div>
                    <div class="section" style="position: relative">
                      <div v-if="!profile_pic" id="photo-circle">
                        <img
                          id="photo-circle-default"
                          src="@/assets/icon/icons8-picture-96.png"
                        />
                      </div>
                      <div id="photo-circle" style="position: relative" v-else>
                        <img
                          class="pictureUpload"
                          style="position: relative"
                          :src="profile_pic.imageURL"
                          alt="profile_pic"
                        />
                      </div>
                    </div>
                    <Upload v-model="profile_pic">
                      <div
                        slot="activator"
                        id="select-photo-section"
                        class="section"
                      >
                        <img
                          id="addphoto"
                          src="@/assets/icon/icons8-add-image-96.png"
                        />
                        <h1 class="upload">upload photo</h1>
                      </div>
                    </Upload>
                  </div>
                </div>
                <h3 v-if="invalidProfilePic === true" class="invalid">
                  * {{ alertProfilePic }}
                </h3>
                <!-- Input -->

                <!-- Input -->
                <div>
                  <h2 class="input_title">Bio</h2>
                  <textarea
                    v-model="bio"
                    class="input_textarea_box bio"
                    maxlength="150"
                    size="150"
                    name="bio"
                    placeholder="add your bio"
                  >
                  </textarea>
                </div>
                <!-- Input -->
              </div>
              <!-- Right -->
            </div>
            <!-- Column -->

            <div class="button-section">
              <button class="back_button" @click="ClickBack()">BACK</button>
              <button class="create_button" @click="ClickCreate()">
                CREATE ACCOUNT
              </button>
            </div>
          </div>
        </div>
        <!-- Form -->
      </div>
    </div>
  </div>
</template>

<script>
import Upload from "@/components/UploadPic.vue";
import GenderService from "../services/gender.service";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

export default {
  name: "profile",
  data() {
    return {
      firstname: "",
      lastname: "",
      phone: "",
      bio: "",
      profile_pic: "",
      selected: "",
      genderList: null,
      invalidFirstname: false,
      alertFirstname: "",
      invalidLastname: false,
      alertLastname: "",
      invalidPhone: false,
      alertPhone: "",
      invalidGender: false,
      alertGender: "",
      invalidProfilePic: false,
      alertProfilePic: ""
    };
  },
  components: {
    Upload
  },
  watch: {
    phone: function() {
      this.invalidPhone = false;
      var reg = /^\d*\.?\d+$/;
      if (!reg.test(this.phone)) {
        this.invalidPhone = true;
        this.alertPhone = "phone number must be only numbers";
      } else if (this.phone.length != 10) {
        this.invalidPhone = true;
        this.alertPhone = "phone number is invalid";
      }
      if (!this.phone) this.invalidPhone = false;
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    GenderService.getGenderList().then((res) => {
      if (res) {
        this.genderList = res;
      }
    });
    if (this.loggedIn) {
      this.$router.push("/mainpage");
    }
    var user = this.$store.state.user;
    if (!user.username || !user.email || !user.password) {
      window.location.href = "/register";
    } else {
      if (!user.gender_id) {
        this.selected = "";
      } else {
        this.selected = user.gender_id;
      }
      this.firstname = user.firstname;
      this.lastname = user.lastname;
      this.phone = user.phone;
      this.profile_pic = user.profile_pic;
      this.bio = user.bio;
    }
  },
  methods: {
    ClickBack() {
      this.$store.state.user.firstname = this.firstname;
      this.$store.state.user.lastname = this.lastname;
      this.$store.state.user.phone = this.phone;
      this.$store.state.user.gender_id = this.selected;
      this.$store.state.user.profile_pic = this.profile_pic;
      this.$store.state.user.bio = this.bio;
      this.$router.push("/register");
    },
    ClickCreate() {
      if (!this.firstname) {
        this.invalidFirstname = true;
        this.alertFirstname = "firstname required";
      }
      if (!this.lastname) {
        this.invalidLastname = true;
        this.alertLastname = "lastname required";
      }
      if (!this.phone) {
        this.invalidPhone = true;
        this.alertPhone = "phone required";
      }
      if (!this.selected) {
        this.invalidGender = true;
        this.alertGender = "gender required";
      }
      if (!this.profile_pic) {
        this.invalidProfilePic = true;
        this.alertProfilePic = "profile picture required";
      }
      if (
        !this.invalidFirstname &&
        !this.invalidLastname &&
        !this.invalidPhone &&
        !this.invalidGender &&
        !this.invalidProfilePic
      ) {
        var birthdate = this.$store.state.user.birthdate;
        this.$store.state.user.birthdate = new Date(
          birthdate.year,
          birthdate.month - 1,
          birthdate.day
        ).getTime();
        this.$store.state.user.firstname = this.firstname;
        this.$store.state.user.lastname = this.lastname;
        this.$store.state.user.phone = this.phone;
        this.$store.state.user.gender_id = this.selected;
        this.$store.state.user.bio = this.bio;

        this.$store.dispatch("auth/register", this.$store.state.user).then(
          (res) => {
            if (res.user_id) {
              UserService.uploadProfile(this.profile_pic.formData).then(
                (res) => {
                  if (res) {
                    console.log(res);
                    this.$router.push("/interestSelect");
                  }
                }
              );
            }
          },
          (error) => {
            console.log(error.message);
          }
        );
      }
    },
    checkUniquePhone() {
      if (this.phone) {
        AuthService.checkUniqueExists({ phone: this.phone }).then((res) => {
          if (res.exist) {
            this.invalidPhone = res.exist;
            this.alertPhone = "this phone number has been used";
          } else this.invalidPhone = res.exist;
        });
      }
    }
  }
};
</script>

<style scoped>
#profile {
  background-color: #f8f3ec;
  /* background-image: url("../assets/harryfer-background.jpg"); */
  overflow-x: hidden;
  overflow-y: auto;
  /* height: auto; */
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

#photo-mobile {
  display: block;
}

#profile-section {
  display: flex;
  justify-content: center;
}

#right-section {
  margin-left: 30px;
}

#left-section {
  margin-right: 30px;
}

.icon {
  width: 24px;
  margin-top: -10px;
  margin-left: -43px;
  z-index: 4;
  cursor: pointer;
}
#whitelogo {
  width: 160px;
  margin-bottom: 20px;
  cursor: pointer;
}

#select-photo-section {
  border: 2px solid #e3e3e3;
  border-radius: 6px;
  padding: 3px 8px;
  margin-top: 12px;
  cursor: pointer;
}

.input_box_bio {
  font-size: 1.6em;
  font-weight: 450;
  color: #444444;
  width: 400px;
  padding: 12px 12px 9px 15px;
  border: 2px solid #e3e3e3;
  border-radius: 10px;
  margin-bottom: 2px;
  box-shadow: none;
}

.input_box_bio {
  padding-bottom: 52px;
}

#photo-header {
  margin-right: 80px;
}

.input_select {
  font-size: 1.6em;
  font-weight: 450;
  width: 100%;
  padding: 9px 12px 9px 15px;
  border: 2px solid #e3e3e3;
  border-radius: 10px;
  margin-bottom: 2px;
  box-shadow: none;
  font-family: "Atten-Round-New";
}

.upload {
  color: #cccccc;
  font-size: 1.6em;
  font-weight: 450;
  margin: 0px 0px 0px 6px;
}

select {
  /* styling */
  background-color: white;
  border: thin solid #e3e3e3;
  border-radius: 4px;
  display: inline-block;
  font: inherit;
  line-height: 1.5em;
  padding: 0.5em 3.5em 0.5em 1em;

  /* reset */

  margin: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
}

select.minimal {
  background-image: linear-gradient(45deg, transparent 50%, #e3e3e3 50%),
    linear-gradient(135deg, #e3e3e3 50%, transparent 50%);
  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;
}

select.minimal:focus {
  background-image: linear-gradient(45deg, #e3e3e3 50%, transparent 50%),
    linear-gradient(135deg, transparent 50%, #e3e3e3 50%);
  background-position: calc(100% - 15px) 1em, calc(100% - 20px) 1em,
    calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;
  border-color: #e3e3e3;
  outline: 0;
}

select:-moz-focusring {
  color: transparent;
  text-shadow: 0 0 0 #000;
}

select:required:invalid {
  color: #cccccc;
}
select,
option {
  color: #444444;
}

#profile_account {
  padding: 0px 38px;
}
#password_box {
  display: flex;
  align-items: center;
}

#profile_suggest {
  margin: 25px 0px 50px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 17px 0px;
  width: 507px;
}
#alreadyhave {
  font-size: 2em;
  font-weight: 500;
  color: #444444;
  margin: 0;
}
#signin {
  font-size: 2em;
  font-weight: 550;
  color: #ff8864;
  padding-left: 6px;
  margin: 0;
  cursor: pointer;
  transition: 0.3s;
}
#signin:hover {
  color: #ffbb62;
  transition: 0.3s;
}

.invalid {
  margin: -3px 0 0 0;
  padding: 0;
  font-size: 1.5em;
  color: #ff8864;
  font-weight: 300;
}

#photo-circle {
  border-radius: 50%;
  border: 2px solid #e3e3e3;
  width: 120px;
  height: 120px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
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

#photo-circle-default {
  width: 50px;
  margin: 0px;
}

#photo-section {
  display: flex;
}

#addphoto {
  width: 25px;
}

.input_textarea_box {
  font-size: 1.6em;
  font-weight: 450;
  color: #a0a0a0;
  padding: 7px 12px 7px 15px;
  border: 2px solid #e3e3e3;
  border-radius: 10px;
  margin-bottom: 2px;
  box-shadow: none;
  width: 400px;
  line-height: 21px;
}

.bio {
  padding-bottom: 23px;
}

@media screen and (max-width: 1080px) {
  #profile-section {
    display: block;
  }

  #profile {
    padding: 20px 0px;
  }

  .input_select {
    width: 430px;
  }

  #select-photo-section {
    width: calc(100% - 20px);
  }

  .input_textarea_box {
    width: calc(100% - 30px);
  }

  #right-section {
    margin-left: 0px;
    margin-top: 5px;
  }

  #left-section {
    margin-right: 0px;
  }

  #photo-section {
    display: block;
  }

  #photo-circle {
    margin-top: 0px;
  }

  #photo-box {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #photo-header {
    margin-right: 0px;
  }
}

@media screen and (max-width: 768px) {
  #profile {
    justify-content: center;
    align-items: flex-start;
  }
}

@media screen and (max-width: 600px) {
  input {
    /* Remove First */
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  #profile {
    display: flex;
    justify-content: center;
  }

  .input_select {
    width: 100%;
  }

  #photo-circle {
    width: 100px;
    height: 100px;
  }
}
@media screen and (max-width: 600px) {
  br {
    display: none;
  }

  #profile_account {
    width: 300px;
  }

  #profile_suggest {
    width: 373px;
    margin-top: 20px;
  }
  #profile {
    /* background-image: url("../assets/harryfer-tablet-background.jpg"); */
    background-repeat: no-repeat;
    background-position: center;
  }
}

@media screen and (max-width: 414px) {
  #profile_account {
    width: 260px;
    padding: 0px 30px;
  }

  #profile_suggest {
    width: 333px;
    margin-top: 20px;
  }
}

@media screen and (max-width: 360px) {
  #profile_account {
    width: 240px;
    padding: 0px 26px;
  }

  #profile_suggest {
    width: 313px;
    margin-top: 20px;
  }

  .header_title {
    font-size: 2.25em;
  }
}
</style>
