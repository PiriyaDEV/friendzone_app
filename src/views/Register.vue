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
                maxlength="16"
                size="16"
                placeholder="enter a unique username"
                autocomplete="off"
                @blur="checkUniqueUsername()"
              />
              <h3 v-show="invalidUsername === true" class="invalid">
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
                type="email"
                maxlength="64"
                size="64"
                placeholder="enter your email address"
                autocomplete="off"
                @blur="checkUniqueEmail()"
              />
              <h3 v-show="invalidEmail === true" class="invalid">
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
                  maxlength="36"
                  size="36"
                  placeholder="enter your password"
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
                  v-model="passwordConfirm"
                  class="input_box"
                  :type="passwordFieldType"
                  maxlength="36"
                  size="36"
                  placeholder="enter your password"
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
            </div>
            <!-- Input -->

            <button id="signup_button" @click="checkRegister()">SIGN UP</button>

            <div id="term">
              <p>
                By continuing you accept the
                <span style="color: #ff8864">Terms of Use</span> and
                <span style="color: #ff8864"> Privacy Policy </span>, <br />
                that your data will be stored, and that you are 13 years or
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
import AuthService from "../services/auth.service";

export default {
  name: "register",
  component: {},
  data() {
    return {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      day: "",
      month: "",
      year: "",
      birthdate: "",
      eye: true,
      passwordFieldType: "password",
      invalidUsername: false,
      alertUsername: "",
      invalidEmail: false,
      alertEmail: "",
      invalidPassword: false,
      alertPassword: "",
      invalidPasswordConfirm: false,
      alertPasswordConfirm: "",
      invalidDate: false,
      alertDate: ""
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/mainpage");
    }
    var user = this.$store.state.user;
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.passwordConfirm = user.password;
    this.day = user.birthdate.day;
    this.month = user.birthdate.month;
    this.year = user.birthdate.year;
  },
  watch: {
    username: function() {
      this.invalidUsername = false;
      if (this.username.length < 3) {
        this.invalidUsername = true;
        this.alertUsername = "username is too short";
      } else if (/[^A-Za-z0-9_.]/.test(this.username)) {
        this.invalidUsername = true;
        this.alertUsername =
          "username can only use letters, numbers, underscores and periods";
      } else if (this.username[0] == ".") {
        this.invalidUsername = true;
        this.alertUsername = "username can't start with period";
      } else if (this.username[this.username.length - 1] == ".") {
        this.invalidUsername = true;
        this.alertUsername = "username can't end with period";
      }
      if (!this.username) this.invalidUsername = false;
    },
    email: function() {
      this.invalidEmail = false;
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(this.email) && this.email.length > 0) {
        this.invalidEmail = true;
        this.alertEmail = "email is invalid";
      }
      if (!this.email) this.invalidEmail = false;
    },
    password: function() {
      this.invalidPassword = false;
      if (this.password.length < 8) {
        this.invalidPassword = true;
        this.alertPassword = "password must have at least 8 characters";
      } else if (!/\d/.test(this.password)) {
        this.invalidPassword = true;
        this.alertPassword = "password must have at least 1 number";
      } else if (!/[a-z]/.test(this.password)) {
        this.invalidPassword = true;
        this.alertPassword = "password must have at least 1 lowercase";
      } else if (!/[A-Z]/.test(this.password)) {
        this.invalidPassword = true;
        this.alertPassword = "password must have at least 1 uppercase";
      } else if (!/[^A-Za-z0-9]/.test(this.password)) {
        this.invalidPassword = true;
        this.alertPassword = "password must have at least 1 special characters";
      }
      if (!this.password) this.invalidPassword = false;
    },
    passwordConfirm: function() {
      this.invalidPasswordConfirm = false;
      if (this.password != this.passwordConfirm) {
        this.invalidPasswordConfirm = true;
        this.alertPasswordConfirm = "password does not match";
      }
      if (!this.passwordConfirm) this.invalidPasswordConfirm = false;
    },
    // Leap year is incompleted
    day: function() {
      this.invalidDate = false;
      var reg = /^\d*\.?\d+$/;
      if (!reg.test(this.day)) {
        this.invalidDate = true;
        this.alertDate = "date must be only numbers";
      } else if (this.day < 1 || this.day > 31) {
        this.invalidDate = true;
        this.alertDate = "day must be only 1-31";
      } else if (
        (this.month == 4 && this.day > 30) ||
        (this.month == 6 && this.day > 30) ||
        (this.month == 9 && this.day > 30) ||
        (this.month == 11 && this.day > 30)
      ) {
        this.invalidDate = true;
        this.alertDate = "day or month is invalid";
      }
      if (!this.day) this.invalidDate = false;
    },
    month: function() {
      this.invalidDate = false;
      var reg = /^\d*\.?\d+$/;
      if (!reg.test(this.month)) {
        this.invalidDate = true;
        this.alertDate = "date must be only numbers";
      } else if (this.month < 1 || this.month > 12) {
        this.invalidDate = true;
        this.alertDate = "month must be only 1-12";
      }
      if (!this.month) this.invalidDate = false;
    },
    year: function() {
      this.invalidDate = false;
      var reg = /^\d*\.?\d+$/;
      if (!reg.test(this.year)) {
        this.invalidDate = true;
        this.alertDate = "date must be only numbers";
      } else if (this.year < 1921) {
        this.invalidDate = true;
        this.alertDate = "you are too old";
      } else if (this.year > 2007) {
        this.invalidDate = true;
        this.alertDate = "you must be 13 years or older";
      }
      if (!this.year) this.invalidDate = false;
    }
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
      var reg = /^\d*\.?\d+$/;
      if (!this.username) {
        this.invalidUsername = true;
        this.alertUsername = "username required";
      }
      if (!this.email) {
        this.invalidEmail = true;
        this.alertEmail = "email required";
      }
      if (!this.password) {
        this.invalidPassword = true;
        this.alertPassword = "password required";
      }
      if (!this.day || !this.month || !this.year) {
        this.invalidDate = true;
        this.alertDate = "birthday required";
      }
      if (
        !reg.test(this.day) ||
        !reg.test(this.month) ||
        !reg.test(this.year)
      ) {
        this.invalidDate = true;
        this.alertDate = "date must be only numbers";
      }
      if (
        !this.invalidUsername &&
        !this.invalidEmail &&
        !this.invalidPassword &&
        !this.invalidPasswordConfirm &&
        !this.invalidDate
      ) {
        this.birthdate = {
          day: this.day,
          month: this.month,
          year: this.year
        };
        this.$store.state.user.username = this.username;
        this.$store.state.user.email = this.email;
        this.$store.state.user.password = this.password;
        this.$store.state.user.birthdate = this.birthdate;
        this.$router.push("/ProfileSetting");
      }
    },
    checkUniqueUsername() {
      if (this.username) {
        AuthService.checkUniqueExists({ username: this.username }).then(
          (res) => {
            if (res.exist) {
              this.invalidUsername = res.exist;
              this.alertUsername = "this username has been used";
            } else this.invalidUsername = res.exist;
          }
        );
      }
    },
    checkUniqueEmail() {
      if (this.email) {
        AuthService.checkUniqueExists({ email: this.email }).then((res) => {
          if (res.exist) {
            this.invalidEmail = res.exist;
            this.alertEmail = "this email has been used";
          } else this.invalidEmail = res.exist;
        });
      }
    }
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
    $(document).ready(function() {
      $("input").keyup(function() {
        if ($(this).val().length == $(this).attr("maxlength")) {
          const i = $("input").index(this);
          $("input")
            .eq(i + 1)
            .focus();
        }
      });
    });
  }
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
  min-height: 100vh;
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

@media screen and (max-width: 768px) {
  input {
    /* Remove First */
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  #header_title {
    font-size: 2.25em;
  }

  #signup_button {
    padding: 10px 0px;
  }

  #register {
    display: flex;
    justify-content: center;
    align-items: flex-start;
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
