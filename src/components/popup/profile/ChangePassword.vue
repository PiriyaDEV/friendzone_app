<template>
  <div>
    <div id="change-password">
      <h1 id="header_title">CHANGE NEW PASSWORD</h1>
      <div class="section">
        <div>
          <!-- Input -->
          <div>
            <h2 class="input_title">Old Password</h2>
            <div id="password_box">
              <input
                v-model="passwordOld"
                class="input_box"
                :type="passwordFieldType"
                maxlength="36"
                size="36"
                placeholder="enter old password"
                autocomplete="new-password"
              />
              <div>
                <img
                  v-show="eye == true"
                  @click="(eye = !eye), switchVisibility()"
                  class="icon"
                  src="@/assets/icon-eye.png"
                />
                <img
                  v-show="eye == false"
                  @click="(eye = !eye), switchVisibility()"
                  class="icon"
                  src="@/assets/icon-eye-closed.png"
                />
              </div>
            </div>
            <h3 v-if="invalidPasswordOld === true" class="invalid">
              * {{ alertPasswordOld }}
            </h3>
          </div>
          <!-- Input -->

          <!-- Input -->
          <div>
            <h2 class="input_title">New Password</h2>
            <div id="password_box">
              <input
                v-model="passwordNew"
                class="input_box"
                :type="passwordFieldType"
                maxlength="36"
                size="36"
                placeholder="enter new password"
                autocomplete="new-password"
              />
              <div>
                <img
                  v-show="eye == true"
                  @click="(eye = !eye), switchVisibility()"
                  class="icon"
                  src="@/assets/icon-eye.png"
                />
                <img
                  v-show="eye == false"
                  @click="(eye = !eye), switchVisibility()"
                  class="icon"
                  src="@/assets/icon-eye-closed.png"
                />
              </div>
            </div>
            <h3 v-if="invalidPasswordNew === true" class="invalid">
              * {{ alertPasswordNew }}
            </h3>
          </div>
          <!-- Input -->

          <!-- Input -->
          <div>
            <h2 class="input_title">Confirm Password</h2>
            <div id="password_box">
              <input
                v-model="passwordConfirm"
                class="input_box"
                :type="passwordFieldType"
                maxlength="36"
                size="36"
                placeholder="enter new password"
                autocomplete="new-password"
              />
              <div>
                <img
                  v-show="eye == true"
                  @click="(eye = !eye), switchVisibility()"
                  class="icon"
                  src="@/assets/icon-eye.png"
                />
                <img
                  v-show="eye == false"
                  @click="(eye = !eye), switchVisibility()"
                  class="icon"
                  src="@/assets/icon-eye-closed.png"
                />
              </div>
            </div>
            <h3 v-if="invalidPasswordConfirm === true" class="invalid">
              * {{ alertPasswordConfirm }}
            </h3>
          </div>
          <!-- Input -->
        </div>
      </div>
    </div>

    <div class="button-section">
      <button class="back_button" @click="back()">Cancel</button>
      <button class="create_button" @click="save()">Save</button>
    </div>
  </div>
</template>

<script>
import UserService from "@/services/user.service";

export default {
  data() {
    return {
      passwordOld: "",
      passwordNew: "",
      passwordConfirm: "",
      eye: true,
      passwordFieldType: "password",
      invalidPasswordOld: false,
      alertPasswordOld: "",
      invalidPasswordNew: false,
      alertPasswordNew: "",
      invalidPasswordConfirm: false,
      alertPasswordConfirm: ""
    };
  },
  watch: {
    passwordOld: function() {
      this.invalidPasswordOld = false;
    },
    passwordNew: function() {
      this.invalidPasswordNew = false;
      if (this.passwordNew.length < 8) {
        this.invalidPasswordNew = true;
        this.alertPasswordNew = "password must have at least 8 characters";
      } else if (!/\d/.test(this.passwordNew)) {
        this.invalidPasswordNew = true;
        this.alertPasswordNew = "password must have at least 1 number";
      } else if (!/[a-z]/.test(this.passwordNew)) {
        this.invalidPasswordNew = true;
        this.alertPasswordNew = "password must have at least 1 lowercase";
      } else if (!/[A-Z]/.test(this.passwordNew)) {
        this.invalidPasswordNew = true;
        this.alertPasswordNew = "password must have at least 1 uppercase";
      } else if (!/[^A-Za-z0-9]/.test(this.passwordNew)) {
        this.invalidPasswordNew = true;
        this.alertPasswordNew =
          "password must have at least 1 special characters";
      }
      if (this.passwordNew == this.passwordOld) {
        this.invalidPasswordNew = true;
        this.alertPasswordNew = "new password must not match to the old";
      }
      if (this.passwordNew != this.passwordConfirm) {
        this.invalidPasswordConfirm = true;
        this.alertPasswordConfirm = "password does not match";
      } else {
        this.invalidPasswordConfirm = false;
      }
      if (!this.passwordNew) this.invalidPasswordNew = false;
    },
    passwordConfirm: function() {
      this.invalidPasswordConfirm = false;
      if (this.passwordNew != this.passwordConfirm) {
        this.invalidPasswordConfirm = true;
        this.alertPasswordConfirm = "password does not match";
      }
      if (!this.passwordConfirm) this.invalidPasswordConfirm = false;
    }
  },
  methods: {
    back() {
      this.$emit("showBack", false);
    },
    switchVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
    save() {
      if (!this.passwordOld) {
        this.invalidPasswordOld = true;
        this.alertPasswordOld = "old password required";
      }
      if (!this.passwordNew) {
        this.invalidPasswordNew = true;
        this.alertPasswordNew = "new password required";
      }
      if (!this.passwordConfirm) {
        this.invalidPasswordConfirm = true;
        this.alertPasswordConfirm = "confirm password required";
      }
      if (
        !this.invalidPasswordOld &&
        !this.invalidPasswordNew &&
        !this.invalidPasswordConfirm
      ) {
        UserService.changePassword({
          oldPassword: this.passwordOld,
          newPassword: this.passwordNew
        })
          .then((res) => {
            if (res.message == "Password Changed!")
              this.$emit("showBack", false);
            else if (res.message == "Invalid Password!") {
              this.invalidPasswordOld = true;
              this.alertPasswordOld = "invalid password";
            }
          })
          .catch(() => {
            console.log("Error when change new password");
          });
      }
    }
  }
};
</script>

<style scoped>
#change-password {
  border-radius: 10px;
  border: 1.75px solid #e3e3e3;
  padding: 10px 0px 20px 0px;
  max-height: 300px;
  margin-bottom: 15px;
  overflow-y: auto;
}

#header_title {
  font-size: 2em;
  margin: 0px;
  color: #444444;
  text-align: center;
}

.invalid {
  margin: -1px 0px 0px 0px;
  padding: 0;
  font-size: 1.5em;
  color: #ff8864;
  font-weight: 300;
}

.back_button,
.create_button {
  margin: 10px 0px 25px 0px !important;
}

.icon {
  width: 24px;
  margin-top: 0px;
  margin-left: -43px;
  z-index: 4;
  cursor: pointer;
}

#password_box {
  display: flex;
  align-items: center;
}

@media screen and (max-width: 1024px) {
  #change-password {
    padding-right: 10px;
    padding-left: 10px;
  }
}

@media screen and (max-width: 690px) {
  .input_box,
  .input_textarea_box {
    width: 210px !important;
  }

  .create_button,
  .back_button {
    width: 120px !important;
  }
}
</style>
