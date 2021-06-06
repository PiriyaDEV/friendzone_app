<template>
  <div>
    <div id="info-box">
      <div id="info-section">
        <div class="information-box">
          <h1 class="info-title black-color">Name</h1>
          <h1 v-if="!edit" class="info-text">
            <span v-if="findUser == true && dataUser != user.username"
              >{{ userList.firstname }} {{ userList.lastname }}</span
            >
            <span v-else>{{ user.firstname }} {{ user.lastname }}</span>
          </h1>
          <div v-if="edit" id="name-section">
            <input
              class="input_username_box"
              type="text"
              maxlength="64"
              size="30"
              name="name"
              v-model="firstname"
            />
            <input
              style="margin-left: 20px"
              class="input_username_box"
              type="text"
              maxlength="64"
              size="30"
              name="name"
              v-model="lastname"
            />
          </div>
          <h2 v-if="invalidName && edit" class="orange-color invalid-text">
            * {{ alertName }}
          </h2>
        </div>
        <div v-if="roleUser != `RO01`" class="information-box">
          <h1 class="info-title black-color">Birthdate</h1>
          <h1 v-if="!edit" class="info-text">
            <span v-if="findUser == true && dataUser != user.username">{{
              userList.birthdate
            }}</span>
            <span v-else>{{ user.birthdate }}</span>
          </h1>
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
        <div v-if="roleUser == `RO01`" class="information-box">
          <h1 class="info-title black-color">Birthdate</h1>
          <h1 v-if="!edit" class="info-text">
            <span v-if="findUser == true && dataUser != user.username">{{
              userList.birthdate
            }}</span>
            <span v-else>{{ user.birthdate }}</span>
          </h1>
          <div
            v-if="edit"
            style="
                  width: 100%;
                  display: flex;
                  justify-content: space-between;
                  align-items:center;
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
            />
          </div>
          <h2 v-if="invalidDate && edit" class="orange-color invalid-text">
            * {{ alertDate }}
          </h2>
        </div>
        <div
          v-if="
            (findUser == true && dataUser == user.username) || findUser == false
          "
          class="information-box"
        >
          <h1 class="info-title black-color">Email</h1>
          <h1 v-if="!edit" class="info-text">{{ user.email }}</h1>
          <input
            v-if="edit"
            class="input_profile_box"
            type="text"
            maxlength="64"
            size="30"
            name="name"
            v-model="email"
          />
          <h2 v-if="invalidEmail && edit" class="orange-color invalid-text">
            * {{ alertEmail }}
          </h2>
        </div>
        <div
          v-if="
            (findUser == true && dataUser == user.username) || findUser == false
          "
          class="information-box"
        >
          <h1 class="info-title black-color">Phone</h1>
          <h1 v-if="!edit" class="info-text">{{ user.phone }}</h1>
          <input
            v-if="edit"
            class="input_profile_box"
            type="text"
            maxlength="10"
            size="30"
            name="name"
            v-model="phone"
          />
          <h2 v-if="invalidPhone && edit" class="orange-color invalid-text">
            * {{ alertPhone }}
          </h2>
        </div>
        <div v-if="roleUser != `RO01`" class="information-box">
          <h1 class="info-title black-color">Gender</h1>
          <h1 v-if="!edit" class="info-text">
            <span v-if="findUser == true && dataUser != user.username">{{
              userList.gender
            }}</span>
            <span v-else>{{ user.gender }}</span>
          </h1>
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
        <div v-if="roleUser == `RO01`" class="information-box">
          <h1 class="info-title black-color">Gender</h1>
          <h1 v-if="!edit" class="info-text">
            <span v-if="findUser == true && dataUser != user.username">{{
              userList.gender
            }}</span>
            <span v-else>{{ user.gender }}</span>
          </h1>
          <select
            v-if="edit"
            name="gender"
            class="input_select minimal"
            v-model="selected"
            required
          >
            <option value="" disabled selected hidden>
              {{ user.gender }}
            </option>
            <option
              v-for="(gender, index) in genderList"
              :key="index"
              :value="gender.gender_id"
            >
              {{ gender.gender_name }}
            </option>
          </select>
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
import GenderService from "./../../services/gender.service";
import decode from "jwt-decode";
import AuthService from "@/services/auth.service";

export default {
  data() {
    return {
      genderList: null,
      selected: "",
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      invalidName: false,
      alertName: "",
      invalidDate: false,
      alertDate: "",
      invalidEmail: false,
      alertEmail: "",
      invalidPhone: false,
      alertPhone: "",
      day: "",
      month: "",
      year: "",
    };
  },
  props: [
    "user",
    "role",
    "edit",
    "findUser",
    "dataUser",
    "userList",
    "prop_day",
    "prop_month",
    "prop_year"
  ],
  watch: {
    firstname: function() {
      var letters = /^[A-Za-z]+$/;
      if (!letters.test(this.firstname)) {
        this.invalidName = true;
        this.alertName = "invalid firstname";
      }
      if (!this.firstname) this.invalidName = false;
    },
    lastname: function() {
      var letters = /^[A-Za-z]+$/;
      if (!letters.test(this.lastname)) {
        this.invalidName = true;
        this.alertName = "invalid lastname";
      }
      if (!this.lastname) this.invalidName = false;
    },
    day: function() {
      this.validateDate();
      if (!this.day) this.invalidDate = false;
    },
    month: function() {
      this.validateDate();
      if (!this.month) this.invalidDate = false;
    },
    year: function() {
      this.validateDate();
      if (!this.year) this.invalidDate = false;
    },
    email: function() {
      this.invalidEmail = false;
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(this.email) && this.email.length > 0) {
        this.invalidEmail = true;
        this.alertEmail = "email is invalid";
      } else if (this.email != this.user.email) {
        this.checkUniqueEmail();
      }
    },
    phone: function() {
      this.invalidPhone = false;
      var reg = /^\d*\.?\d+$/;
      if (this.phone) {
        if (!reg.test(this.phone)) {
          this.invalidPhone = true;
          this.alertPhone = "phone number must be only numbers";
        } else if (this.phone.length != 10) {
          this.invalidPhone = true;
          this.alertPhone = "phone number is invalid";
        } else if (this.phone != this.user.phone) {
          this.checkUniquePhone();
        }
      }
    },
    edit: function() {
      GenderService.getGenderList().then((res) => {
        if (res) {
          this.genderList = res;
          this.genderList.forEach((gender) => {
            if (this.user.gender == gender.gender_name) {
              this.selected = gender.gender_id;
            }
          });
        }
      });
      this.firstname = this.user.firstname;
      this.lastname = this.user.lastname;
      this.email = this.user.email;
      this.phone = this.user.phone;
      this.day = this.prop_day;
      this.month = this.prop_month;
      this.year = this.prop_year;
      this.invalidName = false;
      this.invalidDate = false;
      this.invalidEmail = false;
      this.invalidPhone = false;
    }
  },
  created() {
    this.getRole();
  },
  methods: {
    cancel() {
      this.firstname = this.user.firstname;
      this.lastname = this.user.lastname;
      this.email = this.user.email;
      this.phone = this.user.phone;
      this.selected = this.user.gender;
      this.$emit("editReturn", false);
    },
    save() {
      if (!this.firstname) {
        this.invalidName = true;
        this.alertName = "firstname required";
      } else if (!this.lastname) {
        this.invalidName = true;
        this.alertName = "lastname required";
      }
      if (!this.day || !this.month || !this.year) {
        this.invalidDate = true;
        this.alertDate = "birthday required";
      }
      if (!this.email) {
        this.invalidEmail = true;
        this.alertEmail = "email required";
      }
      if (!this.phone) {
        this.invalidPhone = true;
        this.alertPhone = "phone required";
      }
      if (
        !this.invalidName &&
        !this.invalidDate &&
        !this.invalidEmail &&
        !this.invalidPhone
      ) {
        this.user.firstname = this.firstname;
        this.user.lastname = this.lastname;
        this.user.email = this.email;
        this.user.phone = this.phone;
        this.user.gender_id = this.selected;
        this.user.birthdate = new Date(
          this.year,
          this.month - 1,
          this.day
        ).getTime();
        this.$emit("saveUser", this.user);
      }
    },
    getRole() {
      let userData = decode(localStorage.getItem("user"));
      this.roleUser = userData.role_id;
    },
    validateDate() {
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
      } else if (this.month == 2 && this.day > 29) {
        this.invalidDate = true;
        this.alertDate = "day or month is invalid";
      } else if (
        this.month == 2 &&
        this.day == 29 &&
        !((0 == this.year % 4 && 0 != this.year % 100) || 0 == this.year % 400)
      ) {
        this.invalidDate = true;
        this.alertDate = "not a leap year";
      } else if (!reg.test(this.month)) {
        this.invalidDate = true;
        this.alertDate = "date must be only numbers";
      } else if (this.month < 1 || this.month > 12) {
        this.invalidDate = true;
        this.alertDate = "month must be only 1-12";
      } else if (!reg.test(this.year)) {
        this.invalidDate = true;
        this.alertDate = "date must be only numbers";
      } else if (this.year < 1922) {
        this.invalidDate = true;
        this.alertDate = "you are too old";
      } else if (this.year > 2007) {
        this.invalidDate = true;
        this.alertDate = "you must be 13 years or older (Year must be A.D.)";
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
  },
  computed: {
    dayPlace() {
      let test = this.day;
      let test0 = `0${this.day}`;
      if (this.day >= 10) {
        return test;
      }
      return test0;
    },
    monthPlace() {
      let test = this.month;
      let test0 = `0${this.month}`;
      if (this.month >= 10) {
        return test;
      }
      return test0;
    }
  }
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
  margin: 0px 0px 10px 0px;
}

.info-title,
.info-text {
  font-size: 2em;
  margin: 0px;
  margin-bottom: 5px;
}

.info-title {
  font-weight: 500;
}

.info-text {
  font-weight: 400;
  color: #444444;
}
.input_profile_box,
.input_username_box,
.date_box {
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

.invalid-text {
  margin: 3px 0px -10px 0px;
  font-weight: 400;
}

.date_box {
  height: 24px;
}

select {
  /* styling */
  background-color: white;
  border: 1.75px solid #e3e3e3;
  border-radius: 10px;
  display: inline-block;
  font-size: 2em;
  font-weight: 400;
  font-family: "Atten-Round-New";
  line-height: 1.5em;
  padding: 3px 10px;
  width: 100%;

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
  color: #444444;
}
select,
option {
  color: #444444;
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

  .information-box {
    display: table-caption;
  }

  .information-box > .info-text {
    margin-left: 0px;
    margin-top: 10px;
  }

  .input_profile_box,
  .input_username_box {
    width: 200px;
  }

  #info-box {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
