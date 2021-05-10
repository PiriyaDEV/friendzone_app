<template>
  <div>
    <div id="info-box">
      <div id="info-section">
        <div class="information-box">
          <h1 class="info-title black-color">Name</h1>
          <h1 v-if="!edit" class="info-text">
            {{ user.firstname }} {{ user.lastname }}
          </h1>
          <div v-if="edit" id="name-section">
            <input
              class="input_username_box"
              type="text"
              maxlength="30"
              size="30"
              name="name"
              v-model="user.firstname"
            />
            <input
              style="margin-left: 20px"
              class="input_username_box"
              type="text"
              maxlength="30"
              size="30"
              name="name"
              v-model="user.lastname"
            />
          </div>
        </div>
        <div v-if="role == 1" class="information-box">
          <h1 class="info-title black-color">Birthdate</h1>
          <h1 v-if="!edit" class="info-text">{{ user.birthdate }}</h1>
          <input
            v-if="edit"
            class="input_profile_box disable"
            type="text"
            maxlength="30"
            size="30"
            name="name"
            v-model="user.birthdate"
            disabled
          />
        </div>
        <div v-if="role == 2" class="information-box">
          <h1 class="info-title black-color">Birthdate</h1>
          <h1 v-if="!edit" class="info-text">{{ user.birthdate }}</h1>
          <input
            v-if="edit"
            class="input_profile_box"
            type="text"
            maxlength="30"
            size="30"
            name="name"
            v-model="user.birthdate"
          />
        </div>
        <div class="information-box">
          <h1 class="info-title black-color">Email</h1>
          <h1 v-if="!edit" class="info-text">{{ user.email }}</h1>
          <input
            v-if="edit"
            class="input_profile_box"
            type="text"
            maxlength="30"
            size="30"
            name="name"
            v-model="user.email"
          />
        </div>
        <div class="information-box">
          <h1 class="info-title black-color">Phone</h1>
          <h1 v-if="!edit" class="info-text">{{ user.phone }}</h1>
          <input
            v-if="edit"
            class="input_profile_box"
            type="text"
            maxlength="30"
            size="30"
            name="name"
            v-model="user.phone"
          />
        </div>
        <div v-if="role == 1" class="information-box">
          <h1 class="info-title black-color">Gender</h1>
          <h1 v-if="!edit" class="info-text">{{ user.gender }}</h1>
          <input
            v-if="edit"
            class="input_profile_box disable"
            type="text"
            maxlength="30"
            size="30"
            name="name"
            v-model="user.gender"
            disabled
          />
        </div>
        <div v-if="role == 2" class="information-box">
          <h1 class="info-title black-color">Gender</h1>
          <h1 v-if="!edit" class="info-text">{{ user.gender }}</h1>
          <input
            v-if="edit"
            class="input_profile_box"
            type="text"
            maxlength="30"
            size="30"
            name="name"
            v-model="user.gender"
          />
        </div>
      </div>
    </div>
    <div class="button-section">
      <button v-if="edit" class="back_button" @click="cancel()">Cancel</button>
      <button v-if="edit" class="create_button" @click="save()">Save</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["user", "role", "edit", "usernameAfter", "bioAfter"],
  created() {},
  methods: {
    cancel() {
      this.$emit("editReturn", false);
    },
    save() {
      this.user.bio = this.bioAfter;
      this.user.username = this.usernameAfter;
      this.$emit("saveUser", this.user);
    },
  },
};
</script>

<style scoped>
#info-section {
  margin: 5px 0px 20px 0px;
}

.information-box {
  display: grid;
  grid-template-columns: 20% 80%;
  align-items: center;
  width: 100%;
  margin: 0px 0px 19px 0px;
}

.info-title,
.info-text {
  font-size: 2em;
  margin: 0px;
}

.info-title {
  font-weight: 500;
}

.info-text {
  font-weight: 400;
  color: #444444;
}
.input_profile_box,
.input_username_box {
  font-size: 2em;
  font-weight: 400;
  color: #444444;
  padding: 3px 10px;
  border: 1.75px solid #e3e3e3;
  border-radius: 10px;
  margin-bottom: 2px;
  box-shadow: none;
  line-height: 21px;
  margin: 0px;
}

.disable {
  color: #a0a0a0;
  background-color: #e3e3e3;
}

.input_profile_box,
.input_username_box {
  width: calc(100% - 20px);
}
.back_button,
.create_button {
  margin: 10px 0px 25px 0px !important;
}

#name-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media screen and (max-width: 1024px) {
  #name-section {
    display: block;
    align-items: flex-start;
  }

  #name-section > input:nth-child(2) {
    margin-left: 0px !important;
    margin-top: 10px;
  }
}

@media screen and (max-width: 690px) {
  .information-box {
    display: flex;
  }

  .create_button,
  .back_button {
    width: 120px !important;
  }

  .information-box{
    display: table-caption;
  }

  .information-box > .info-text {
    margin-left: 0px;
    margin-top: 10px;
  }

  .input_profile_box, .input_username_box{
    width: 200px;
  }

  #info-box {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
