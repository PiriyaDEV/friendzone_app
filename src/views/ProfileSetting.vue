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
                    v-model="username"
                    class="input_box"
                    type="text"
                    maxlength="30"
                    size="30"
                    placeholder="enter your first name"
                  />
                  <h3 v-if="invalidUsername === true" class="invalid">
                    * {{ alertUsername }}
                  </h3>
                </div>
                <!-- Input -->

                <!-- Input -->
                <div>
                  <h2 class="input_title">
                    Lastname<span class="orange-color"> *</span>
                  </h2>
                  <input
                    v-model="username"
                    class="input_box"
                    type="text"
                    maxlength="30"
                    size="30"
                    placeholder="enter your last name"
                  />
                  <h3 v-if="invalidUsername === true" class="invalid">
                    * {{ alertUsername }}
                  </h3>
                </div>
                <!-- Input -->

                <!-- Input -->
                <div>
                  <h2 class="input_title">
                    Phone Number<span class="orange-color"> *</span>
                  </h2>
                  <input
                    v-model="username"
                    class="input_box"
                    type="text"
                    maxlength="30"
                    size="30"
                    placeholder="enter your phone number"
                  />
                  <h3 v-if="invalidUsername === true" class="invalid">
                    * {{ alertUsername }}
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
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="lgbt">LBGTQ</option>
                  </select>
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
                    <div style="position: relative">
                      <div id="photo-circle">
                        <img
                          id="photo-circle-default"
                          slot="activator"
                          src="@/assets/icon/icons8-picture-96.png"
                        />
                      </div>
                    </div>

                    <div id="select-photo-section" class="section">
                      <img
                        id="addphoto"
                        slot="activator"
                        @click="goMainpage()"
                        src="@/assets/icon/icons8-add-image-96.png"
                      />
                      <h1 class="upload">upload photo</h1>
                    </div>
                  </div>
                </div>
                <!-- Input -->

                <!-- Input -->
                <div>
                  <h2 class="input_title">Bio</h2>
                  <textarea
                    class="input_textarea_box bio"
                    maxlength="256"
                    size="256"
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

export default {
  name: "profile",
  data() {
    return {
      selected: "",
    };
  },
  methods: {
    ClickBack() {
      window.location.href = "/register";
    },
    ClickCreate() {
      window.location.href = "/interestSelect";
    },
  },
};
</script>

<style scoped>
#profile {
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
  width: 200px;
  margin-bottom: 25px;
  cursor: pointer;
}

#select-photo-section {
  border: 2px solid #e3e3e3;
  border-radius: 6px;
  padding: 3px 8px;
  margin-top: 12px;
}

.input_box_bio {
  font-size: 1.75em;
  font-weight: 600;
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
  font-size: 1.75em;
  font-weight: 600;
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
  font-size: 1.75em;
  font-weight: 600;
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
  width: 140px;
  height: 140px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
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
  font-size: 1.75em;
  font-weight: 600;
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
  padding-bottom: 35px;
}

@media screen and (max-width: 768px) {
  input {
    /* Remove First */
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  #profile {
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
  }

  #profile_suggest {
    width: 333px;
    margin-top: 20px;
  }
}

@media screen and (max-width: 360px) {
  #profile_account {
    width: 240px;
  }

  #profile_suggest {
    width: 313px;
    margin-top: 20px;
  }
}
</style>