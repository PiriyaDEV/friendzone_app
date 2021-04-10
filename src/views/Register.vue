<template>
  <div id="register">
    <div id="register-background" class="section">
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
          <div id="register_account" class="form">
            <h1 id="header_title">CREATE AN ACCOUNT</h1>

            <!-- Input -->
            <div>
              <h2 class="input_title">Username</h2>
              <input
                v-model="username"
                class="input_box"
                type="text"
                maxlength="30"
                size="30"
                placeholder="enter a unique username"
              />
              <h3 v-if="invalidUsername === true" class="invalid">
                * {{ alertUsername }}
              </h3>
            </div>
            <!-- Input -->

            <!-- Input -->
            <div>
              <h2 class="input_title">Email Address</h2>
              <input
                v-model="email"
                class="input_box"
                type="text"
                placeholder="enter your email address"
              />
              <h3 v-if="invalidEmail === true" class="invalid">
                * {{ alertEmail }}
              </h3>
            </div>
            <!-- Input -->

            <!-- Input -->
            <div>
              <h2 class="input_title">Password</h2>
              <div id="password_box">
                <input
                  v-model="password"
                  class="input_box"
                  :type="passwordFieldType"
                  placeholder="enter your password"
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
              <h3 v-if="invalidPassword === true" class="invalid">
                * {{ alertPassword }}
              </h3>
            </div>
            <!-- Input -->

            <!-- Input -->
            <div>
              <h2 class="input_title">Confirm Password</h2>
              <div id="password_box">
                <input
                  v-model="password"
                  class="input_box"
                  :type="passwordFieldType"
                  placeholder="enter your password"
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
              <h3 v-if="invalidPassword === true" class="invalid">
                * {{ alertPassword }}
              </h3>
            </div>
            <!-- Input -->

            <!-- Input -->
            <div>
              <h2 class="input_title">Date of Birth</h2>
              <div
                style="
                  width: 100%;
                  display: flex;
                  justify-content: space-between;
                "
              >
                <input
                  id="day"
                  class="date_box"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="2"
                  size="2"
                  v-model="day"
                  placeholder="enter date"
                />
                <h1 style="margin-left: 10px; color: #e3e3e3">/</h1>
                <input
                  id="month"
                  style="margin-left: 10px"
                  class="date_box"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="2"
                  size="2"
                  v-model="month"
                  placeholder="enter month"
                />
                <h1 style="margin-left: 10px; color: #e3e3e3">/</h1>
                <input
                  id="year"
                  style="margin-left: 10px"
                  class="date_box"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="4"
                  size="4"
                  v-model="year"
                  placeholder="enter year"
                />
              </div>
              <h3 v-if="invalidDate === true" class="invalid">
                * {{ alertDate }}
              </h3>
              <h3 class="invalid" style="display: none">
                * your password is too short (minimum 8 characters)
              </h3>
            </div>
            <!-- Input -->

            <button id="signup_button" @click="checkRegister()">SIGN UP</button>

            <div id="term">
              <p>
                By continuing you accept the
                <span style="color: #ff8864">Terms of Use</span> and
                <span style="color: #ff8864"> Privacy Policy </span>, <br />
                that your data will be stored, and that you are 18 years or
                older.
              </p>
            </div>
          </div>
        </div>
        <!-- Form -->

        <div class="section">
          <div id="login_suggest" class="form">
            <h1 id="alreadyhave">Already have an account?</h1>
            <h2 id="signin" @click="goLogin()">Sign In</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "register",
  component: {},
  data() {
    return {
      eye: true,
      passwordFieldType: "password",
      username: "",
      email: "",
      password: "",
      day: "",
      month: "",
      year: "",
      invalidUsername: false,
      alertUsername: "",
      invalidEmail: false,
      alertEmail: "",
      invalidPassword: false,
      alertPassword: "",
      invalidDate: false,
      alertDate: "",
    };
  },
  methods: {
    goMainpage() {
      window.location.href = "/";
    },
    goLogin() {
      window.location.href = "/login";
    },
    switchVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
    checkRegister() {
      this.invalidUsername = false;
      this.invalidEmail = false;
      this.invalidPassword = false;
      this.invalidDate = false;
      if (!this.username) {
        this.invalidUsername = true;
        this.alertUsername = "username required";
      } else if (!this.email) {
        this.invalidEmail = true;
        this.alertEmail = "email required";
      } else if (!this.validUsername(this.username)) {
        this.invalidUsername = true;
        this.alertUsername = "username is not yet valid";
      } else if (!this.validEmail(this.email)) {
        this.invalidEmail = true;
        this.alertEmail = "email is not yet valid";
      } else if (!this.validPassword(this.password)) {
        this.invalidPassword = true;
      } else if (!this.validDate(this.day)) {
        this.alertDate = "day is not yet valid";
        this.invalidDate = true;
      } else if (!this.validDate(this.month)) {
        this.alertDate = "month is not yet valid";
        this.invalidDate = true;
      } else if (!this.validDate(this.year)) {
        this.alertDate = "year is not yet valid";
        this.invalidDate = true;
      } else if (this.day < 1) {
        this.alertDate = "day is not yet valid";
        this.invalidDate = true;
      } else if (
        (this.month == 4 && this.day > 30) ||
        (this.month == 6 && this.day > 30) ||
        (this.month == 9 && this.day > 30) ||
        (this.month == 11 && this.day > 30)
      ) {
        this.alertDate = "day is not yet valid";
        this.invalidDate = true;
      } else if (
        (this.month == 1 && this.day > 31) ||
        (this.month == 3 && this.day > 31) ||
        (this.month == 5 && this.day > 31) ||
        (this.month == 7 && this.day > 31) ||
        (this.month == 8 && this.day > 31) ||
        (this.month == 10 && this.day > 31) ||
        (this.month == 12 && this.day > 31)
      ) {
        this.alertDate = "day is not yet valid";
        this.invalidDate = true;
      } else if (this.month < 1 || this.month > 12) {
        this.alertDate = "month is not yet valid";
        this.invalidDate = true;
      } else if (this.year > 2021 || this.year < 1921) {
        this.alertDate = "year is not yet valid";
        this.invalidDate = true;
      } else {
        alert("Pass");
        console.log("Pass");
        window.location.href = "/profilesetting";
      }
    },
    validUsername: function (username) {
      const name = /^[a-zA-Z0-9]+$/;
      return name.test(username);
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validPassword: function (password) {
      this.password_length = password.length;
      const format = /[^A-Za-z0-9]/;
      if (this.password_length > 8) {
        this.contains_eight_characters = true;
      } else {
        this.contains_eight_characters = false;
      }
      this.contains_number = /\d/.test(password);
      this.contains_uppercase = /[A-Z]/.test(password);
      this.contains_special_character = format.test(password);

      if (
        this.contains_eight_characters === true &&
        this.contains_special_character === true &&
        this.contains_uppercase === true &&
        this.contains_number === true
      ) {
        return (this.valid_password = true);
      } else {
        if (this.contains_eight_characters === false) {
          this.alertPassword = "Password must have more than 8 characters";
        } else if (this.contains_uppercase === false) {
          this.alertPassword = "Password must have at least 1 uppercase";
        } else if (this.contains_number === false) {
          this.alertPassword = "Password must have at least 1 number";
        } else if (this.contains_special_character === false) {
          this.alertPassword =
            "Password must have at least 1 special characters";
        }
        return (this.valid_password = false);
      }
    },
    validDate: function (date) {
      const num = /^[0-9]+$/;
      return num.test(date);
    },
  },
  mounted() {
    if ($(window).width() > 600) {
      $("input[id='day']").attr("placeholder", "enter day");
      $("input[id='month']").attr("placeholder", "enter month");
      $("input[id='year']").attr("placeholder", "enter year");
    } else {
      $("input[id='day']").attr("placeholder", "dd");
      $("input[id='month']").attr("placeholder", "mm");
      $("input[id='year']").attr("placeholder", "yyyy");
    }
    $(document).ready(function () {
      $("input").keyup(function () {
        if ($(this).val().length == $(this).attr("maxlength")) {
          const i = $("input").index(this);
          $("input")
            .eq(i + 1)
            .focus();
        }
      });
    });
  },
};
</script>

<style scoped>
#register {
  background-color: #f8f3ec;
  /* background-image: url("../assets/harryfer-background.jpg"); */
  overflow-x: hidden;
  overflow-y: auto;
  /* height: auto; */
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
  margin-top: 20px;
  margin-bottom: 20px;
  cursor: pointer;
}
#header_title {
  color: #444444;
  font-size: 2.5em;
  font-weight: 800;
  padding-top: 20px;
  text-align: center;
  margin: 0;
  padding-bottom: 3px;
}

.input_box {
  font-size: 1.6em;
  font-weight: 450;
  color: #444444;
  width: 400px;
  padding: 12px 12px 9px 15px;
  border: 2px solid #e3e3e3;
  border-radius: 10px;
  margin-bottom: 11px;
  box-shadow: none;
}

#register_account {
  padding: 0px 38px;
}
#password_box {
  display: flex;
  align-items: center;
}
#signup_button {
  color: #ffffff;
  font-size: 2.25em;
  font-family: "Atten-Round-New";
  text-align: center;
  width: 100%;
  padding: 12px 0px;
  background-color: #ff8864;
  box-shadow: 0px 3px 20px #00000029;
  border-radius: 35px;
  border: none;
  margin-top: 10px;
  transition: 0.3s;
}
#signup_button:hover {
  background-color: #ffbb62;
  transition: 0.3s;
}
#term {
  font-size: 1.6em;
  text-align: left;
  line-height: 20px;
  letter-spacing: 0.2px;
  font-weight: 100;
  color: #444444;
  display: flex;
  justify-content: center;
  margin: 8px 0px;
}

#term > p {
  margin: 10px 0px;
  text-align: center;
}

#login_suggest {
  margin: 15px 0px 30px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 17px 0px;
  width: 507px;
}
#alreadyhave {
  font-size: 1.75em;
  font-weight: 500;
  color: #444444;
  margin: 0;
}
#signin {
  font-size: 1.75em;
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
@media screen and (max-width: 1440px) {
  #register {
    height: 100%;
  }
}

@media screen and (max-width: 768px) {
  input {
    /* Remove First */
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  #header_title{
    font-size: 2.25em;
  }

  #signup_button{
    padding: 10px 0px;
  }

  #register {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #whitelogo {
    /* width: 200px; */
    margin-top: 45px;
  }
}
@media screen and (max-width: 600px) {
  br {
    display: none;
  }
  .input_box {
    width: 268px;
  }
  #register_account {
    width: 300px;
  }

  #login_suggest {
    width: 373px;
    margin-top: 20px;
  }
  #register {
    /* background-image: url("../assets/harryfer-tablet-background.jpg"); */
    background-repeat: no-repeat;
    background-position: center;
    height: auto;
  }
}

@media screen and (max-width: 414px) {
  .input_box {
    width: 228px;
  }
  #register_account {
    width: 260px;
  }

  #login_suggest {
    width: 333px;
    margin-top: 20px;
  }
}

@media screen and (max-width: 360px) {
  .input_box {
    width: 208px;
  }
  #register_account {
    width: 240px;
  }

  #login_suggest {
    width: 313px;
    margin-top: 20px;
  }
}
</style>
