<template>
  <div id="login">
    <div id="login-background" class="section">
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
          <div id="login_account" class="form">
            <h1 id="header_title">WELCOME BACK!</h1>

            <!-- Input -->
            <div>
              <h2 class="input_title">Username or Email</h2>
              <input
                v-model="identification"
                class="input_box"
                type="text"
                maxlength="30"
                size="30"
                placeholder="enter your username or email"
              />
              <!-- <h3 v-if="invalidUsername === true" class="invalid">
                * {{ alertUsername }}
              </h3> -->
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
              <!-- <h3 v-if="invalidPassword === true" class="invalid">
                * {{ alertPassword }}
              </h3> -->
            </div>
            <!-- Input -->

            <button id="signin_button" @click="checkLogin()">SIGN IN</button>

            <div id="term"></div>
          </div>
        </div>
        <!-- Form -->

        <div class="section">
          <div id="login_suggest" class="form">
            <h1 id="alreadyhave">Not have an account yet?</h1>
            <h2 id="signin" @click="goRegister()">Sign Up</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import $ from "jquery";
// import User from "../models/user";
export default {
  name: "login",
  data() {
    return {
      eye: true,
      passwordFieldType: "password",
      identification: "",
      password: ""
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
  },
  methods: {
    goMainpage() {
      window.location.href = "/mainpage";
    },
    goRegister() {
      window.location.href = "/register";
    },
    switchVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
    checkLogin() {
        if (this.identification && this.password) {
        this.$store.dispatch("auth/login", {identification : this.identification, password : this.password}).then(
          () => {
            this.$router.push("/mainpage");
            alert("Login Success");
          },
          error => {
            console.log(error)
            this.loading = false;
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
            alert("Email or password not correct");
          }
        );
      }
    }
  }
}

</script>

<style scoped>

#login {
  background-color: #f8f3ec;
  /* background-image: url("../assets/harryfer-background.jpg"); */
  overflow: scroll;
  height: auto;
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
  width: 200px;
  margin-top: 30px;
  margin-bottom: 25px;
  cursor: pointer;
}
#header_title {
  color: #444444;
  font-size: 3em;
  font-weight: 800;
  padding-top: 25px;
  text-align: center;
  margin: 0;
  padding-bottom: 3px;
}
.input_box {
  font-size: 1.75em;
  font-weight: 600;
  color: #444444;
  width: 400px;
  padding: 12px 12px 9px 15px;
  border: 2px solid #e3e3e3;
  border-radius: 10px;
  margin-bottom: 11px;
  box-shadow: none;
}
.date_box {
  font-size: 1.75em;
  font-weight: 450;
  color: #444444;
  width: 100%;
  padding: 12px 12px 9px 15px;
  border: 2px solid #e3e3e3;
  border-radius: 10px;
  margin-bottom: 11px;
  box-shadow: none;
}
#login_account {
  padding: 0px 38px;
}
#password_box {
  display: flex;
  align-items: center;
}
#signin_button {
  color: #ffffff;
  font-size: 2.5em;
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
  margin-bottom: 20px;
}
#signin_button:hover {
  background-color: #ffbb62;
  transition: 0.3s;
}
#term {
  font-size: 1.75em;
  text-align: left;
  line-height: 20px;
  letter-spacing: 0.2px;
  font-weight: 100;
  color: #444444;
  display: flex;
  justify-content: center;
  margin: 8px 0px;
}
#login_suggest {
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
@media screen and (max-width: 768px) {
  input {
    /* Remove First */
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  #login {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #whitelogo {
    width: 200px;
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
  #login_account {
    width: 300px;
  }
  #login_suggest {
    width: 373px;
    margin-top: 20px;
  }
  #login {
    /* background-image: url("../assets/harryfer-tablet-background.jpg"); */
    background-repeat: no-repeat;
    background-position: center;
  }
}
@media screen and (max-width: 414px) {
  .input_box {
    width: 228px;
  }
  #login_account {
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
  #login_account {
    width: 240px;
  }
  #login_suggest {
    width: 313px;
    margin-top: 20px;
  }
}
</style>