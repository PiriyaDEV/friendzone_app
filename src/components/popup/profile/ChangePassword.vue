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
                v-model="password"
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
            <h3 v-if="invalidPassword === true" class="invalid">
              * {{ alertPassword }}
            </h3>
          </div>
          <!-- Input -->

          <!-- Input -->
          <div>
            <h2 class="input_title">New Password</h2>
            <div id="password_box">
              <input
                v-model="password"
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
      <button class="create_button">Save</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      eye: true,
      passwordFieldType: "password"
    };
  },
  methods: {
    back() {
      this.$emit("showBack", false);
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
