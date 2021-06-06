<template>
  <div id="edituser-popup" class="popup">
    <div class="popup-section section">
      <div>
        <div class="popup-form">
          <h1 id="header" class="header_title">EDIT USER ROLES</h1>

          <div id="searchbox">
            <!-- Input -->
            <div v-if="editUser == false">
              <h2 class="input_title">
                Username<span class="orange-color"> *</span>
              </h2>
              <div id="search_input">
                <input
                  v-model="search"
                  class="input_box edit_input"
                  type="text"
                  placeholder="enter username"
                />
                <span @click="searchInput()">Search</span>
              </div>
              <h1 v-if="invalidUsername" class="input_title">
                <span class="orange-color">* {{ alertUsername }}</span>
              </h1>
            </div>
            <!-- Input -->

            <!-- Not Found -->
            <div v-if="foundUser == false" id="user_info">
              <h2 class="input_title">User Information</h2>

              <div id="info-box-notfound">
                <div class="section">
                  <div>
                    <h1 class="info_title text-center">NO INFORMATION</h1>
                    <h1 class="info_data text-center">
                      please type valid username
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <!-- Found -->
            <div v-if="foundUser == true" id="user_info">
              <h2 class="input_title">User Information</h2>

              <div id="info-box">
                <div class="info-column">
                  <h1 class="info_title">Username</h1>
                  <h1 class="info_data">{{ userData.username }}</h1>
                </div>
                <div class="info-column">
                  <h1 class="info_title">Name</h1>
                  <h1 class="info_data">
                    {{ userData.firstname }} {{ userData.lastname }}
                  </h1>
                </div>
                <div class="info-column" v-if="editUser == false">
                  <h1 class="info_title">Birthdate</h1>
                  <h1 class="info_data">{{ userData.birthdate }}</h1>
                </div>
                <div class="info-column">
                  <h1 class="info_title">Email</h1>
                  <h1 class="info_data">{{ userData.email }}</h1>
                </div>
                <div class="info-column" v-if="editUser == false">
                  <h1 class="info_title">Phone</h1>
                  <h1 class="info_data">{{ userData.phone }}</h1>
                </div>
                <div class="info-column" v-if="editUser == false">
                  <h1 class="info_title">Gender</h1>
                  <h1 class="info_data">{{ userData.gender_name }}</h1>
                </div>
                <div class="info-column" v-if="editUser == false">
                  <h1 class="info_title">Joined on</h1>
                  <h1 class="info_data">{{ userData.created_at }}</h1>
                </div>
                <div class="info-column" v-if="editUser == false">
                  <h1 class="info_title">Last updated</h1>
                  <h1 class="info_data">{{ userData.updated_at }}</h1>
                </div>
                <hr v-if="editUser == false" class="bar" />
                <div v-if="editUser == false" class="info-column-roles">
                  <h1 class="info_title">Role</h1>
                  <div>
                    <h1 class="info_data">{{ userData.role_name }}</h1>
                  </div>
                </div>
                <div v-if="editUser == false" class="info-column-roles">
                  <h1 class="info_title">Status</h1>
                  <div>
                    <h1 v-if="userData.status == 'Normal'" class="info_data">
                      <span class="green-color status-bold">{{
                        userData.status
                      }}</span>
                    </h1>
                    <h1 v-if="userData.status == 'Banned'" class="info_data">
                      <span class="red-color status-bold">{{
                        userData.status
                      }}</span>
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="editUser == true && !isBanned">
              <h2 class="input_title">Select Role</h2>

              <div id="role-section">
                <div @click="userClick()" :class="cssUser">
                  <img
                    class="icon"
                    src="@/assets/icon/roles/icons8-customer-64-1.png"
                  />
                  <h1 class="role-text">USER</h1>

                  <i v-if="user" class="fa fa-check"></i>
                </div>

                <div @click="approverClick()" :class="cssApprover">
                  <img
                    class="icon"
                    src="@/assets/icon/roles/icons8-approve-64.png"
                  />
                  <h1 class="role-text">APPROVER</h1>

                  <i v-if="approver" class="fa fa-check"></i>
                </div>
                <div @click="analystClick()" :class="cssAnalyst">
                  <img
                    class="icon"
                    src="@/assets/icon/roles/icons8-graph-report-64.png"
                  />
                  <h1 class="role-text">ANALYST</h1>

                  <i v-if="analyst" class="fa fa-check"></i>
                </div>
                <div @click="adminClick()" :class="cssAdmin">
                  <img
                    class="icon"
                    src="@/assets/icon/roles/icons8-admin-settings-male-100.png"
                  />
                  <h1 class="role-text">ADMINISTRATOR</h1>

                  <i v-if="admin" class="fa fa-check"></i>
                </div>
              </div>
            </div>

            <div v-if="editUser == true && isBanned">
              <h2 class="input_title">User Status</h2>
              <div id="role-section">
                <div :class="cssUser">
                  <img
                    class="icon"
                    src="@/assets/icon/roles/icons8-customer-64-1.png"
                  />
                  <h1 class="role-text">BANNED</h1>

                  <i v-if="user" class="fa fa-check"></i>
                </div>
              </div>
            </div>

            <div v-if="editUser == false" id="verticle-button">
              <div>
                <button class="back_button" @click="editReturn()">
                  Cancel
                </button>
              </div>

              <div>
                <button class="create_button" @click="clickNext()">Next</button>
              </div>
            </div>

            <div v-if="editUser == true" id="double_button">
              <button class="back_button" @click="clickBack()">Back</button>
              <button
                v-if="!isBanned"
                class="create_button"
                @click="clickDone()"
              >
                Done
              </button>
              <button v-else class="create_button" @click="clickUnban()">
                Unban
              </button>
            </div>
          </div>
          <img
            @click="editReturn()"
            style="cursor: pointer"
            class="close"
            src="@/assets/icon/icons8-multiply-96.png"
          />
        </div>

        <div v-if="editUser == true" id="delete-box" class="popup-form">
          <h1
            v-if="!confirmBan && !isBanned"
            class="input_title"
            id="delete-text"
          >
            Want to delete this account?<span
              style="cursor: pointer"
              class="orange-color"
              @click="clickConfirmBan(true)"
            >
              Ban</span
            >
          </h1>
          <h1
            v-if="confirmBan && !isBanned"
            class="input_title"
            id="delete-text"
          >
            Do you confirm to ban this account?<span
              style="cursor: pointer"
              class="orange-color"
              @click="clickBan()"
            >
              Yes</span
            >
            <span
              style="cursor: pointer"
              class="orange-color"
              @click="clickConfirmBan(false)"
            >
              No</span
            >
          </h1>
          <h1 v-if="isBanned" class="input_title" id="delete-text">
            <span class="orange-color"> This account was banned.</span>
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/auth.service";
import UserService from "@/services/user.service";
import decode from "jwt-decode";

export default {
  data() {
    return {
      search: "",
      selected: "",
      editUser: false,
      foundUser: false,
      userData: null,
      user: false,
      approver: false,
      analyst: false,
      admin: false,
      role: "",
      invalidUsername: false,
      confirmBan: false,
      isBanned: false
    };
  },
  watch: {
    search: function() {
      this.isBanned = false;
      this.invalidUsername = false;
      this.foundUser = false;
    }
  },
  methods: {
    searchInput() {
      this.foundUser = false;
      this.invalidUsername = false;
      this.role = "";

      this.user = false;
      this.approver = false;
      this.analyst = false;
      this.admin = false;

      this.selected = "";
      if (this.search) {
        UserService.findByUsername(this.search.trim())
          .then((res) => {
            if (res.user_id) {
              this.userData = res;
              this.role = res.role_name;
              this.foundUser = true;
            } else {
              this.foundUser = false;
              this.invalidUsername = true;
              this.alertUsername = "this username not found";
            }
          })
          .catch(() => {
            this.foundUser = false;
            this.invalidUsername = true;
            this.alertUsername = "this username not found";
          });
      } else {
        this.foundUser = false;
        this.invalidUsername = true;
        this.alertUsername = "required username";
      }
    },
    editReturn() {
      this.$emit("clickEdit", false);
    },
    clickConfirmBan(value) {
      this.confirmBan = value;
    },
    clickBan() {
      UserService.editUser(
        {
          user_id: this.userData.user_id,
          status_id: "ST04"
        },
        true
      ).then((res) => {
        if (res.user_id) {
          let userLocal = decode(localStorage.getItem("user"));
          if (userLocal.user_id == res.user_id) {
            AuthService.logout();
          } else {
            this.isBanned = true;
          }
        }
      });
    },
    clickUnban() {
      UserService.editUser(
        {
          user_id: this.userData.user_id,
          status_id: "ST02"
        },
        true
      ).then((res) => {
        if (res.user_id) {
          this.confirmBan = false;
          this.isBanned = false;
        }
      });
    },
    clickNext() {
      if (this.foundUser == true) {
        this.editUser = true;
      } else {
        this.foundUser = false;
        this.invalidUsername = true;
        this.alertUsername = "require user to edit";
      }
      if (this.userData.status == "Banned") {
        this.isBanned = true;
      }
    },
    clickBack() {
      this.editUser = false;
    },
    clickDone() {
      if (this.selected && !this.isBanned) {
        UserService.editUser(
          {
            user_id: this.userData.user_id,
            role_id: this.selected
          },
          true
        ).then((res) => {
          if (res.user_id) {
            let userLocal = decode(localStorage.getItem("user"));
            if (userLocal.role_id != "RO01") {
              this.$router.push("/mainpage");
            } else {
              window.location.href = "/admin";
            }
          }
        });
      } else {
        this.$emit("clickEdit", false);
      }
    },
    userClick() {
      if (this.role != "User") {
        this.user = !this.user;
        this.analyst = false;
        this.approver = false;
        this.admin = false;
        this.selected = "RO04";
      }
    },
    approverClick() {
      if (this.role != "Approver") {
        this.approver = !this.approver;
        this.user = false;
        this.analyst = false;
        this.admin = false;
        this.selected = "RO03";
      }
    },
    analystClick() {
      if (this.role != "Analyst") {
        this.analyst = !this.analyst;
        this.user = false;
        this.approver = false;
        this.admin = false;
        this.selected = "RO02";
      }
    },
    adminClick() {
      if (this.role != "Administrator") {
        this.admin = !this.admin;
        this.user = false;
        this.approver = false;
        this.analyst = false;
        this.selected = "RO01";
      }
    }
  },
  computed: {
    cssUser() {
      let select = "role-box role-box-selected";
      let unselect = "role-box";
      let roleCorrect = "role-box role-box-block";
      if (this.role == "User") {
        return roleCorrect;
      } else if (this.user == true) {
        return select;
      }
      return unselect;
    },
    cssApprover() {
      let select = "role-box role-box-selected";
      let unselect = "role-box";
      let roleCorrect = "role-box role-box-block";

      if (this.role == "Approver") {
        return roleCorrect;
      } else if (this.approver == true) {
        return select;
      }
      return unselect;
    },
    cssAnalyst() {
      let select = "role-box role-box-selected";
      let unselect = "role-box";
      let roleCorrect = "role-box role-box-block";

      if (this.role == "Analyst") {
        return roleCorrect;
      } else if (this.analyst == true) {
        return select;
      }
      return unselect;
    },
    cssAdmin() {
      let select = "role-box role-box-selected";
      let unselect = "role-box";
      let roleCorrect = "role-box role-box-block";

      if (this.role == "Administrator") {
        return roleCorrect;
      } else if (this.admin == true) {
        return select;
      }
      return unselect;
    }
  }
};
</script>

<style scoped>
.edit_input {
  width: calc(100% - 30px) !important;
  border-top-right-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
  margin: 0px !important;
}

#searchbox {
  padding-bottom: 15px;
  width: 100%;
}

#search_input {
  display: flex;
  align-items: center;
}

#search_input > span {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border-left: none;
  background-color: #ffffff;
  border-top: 2px solid #e3e3e3;
  border-right: 2px solid #e3e3e3;
  border-bottom: 2px solid #e3e3e3;
  font-size: 1.7em;
  color: #fe8864;
  font-weight: 500;
  padding: 10px 10px;
  margin: 0;
  cursor: pointer;
}

.status-bold {
  font-weight: 500 !important;
}

#user_info {
  margin: 20px 0px;
}

#info-box {
  padding: 10px;
  border: 1.75px solid #444444;
  border-radius: 10px;
  margin-bottom: 10px;
  width: 350px;
}

#info-box-notfound {
  padding: 100px 10px;
  border: 1.75px solid #444444;
  border-radius: 10px;
  margin-bottom: 10px;
  width: 350px;
}

.info-column,
.info-column-roles {
  display: grid;
  grid-template-columns: 40% 60%;
  width: 100%;
}

.info-column {
  align-items: center;
}

.info-column-roles {
  align-items: center;
}

.info_title {
  font-size: 1.6em;
  color: #444444;
  font-weight: 600;
}

.info_data {
  font-size: 1.6em;
  color: #444444;
  font-weight: 400;
}

.info_title,
.info_data {
  margin: 5px 0px;
}

.bar {
  border-top: 0.1px solid #a0a0a0;
  border-radius: 5px;
  border-bottom: none;
  border-left: none;
  border-right: none;
}

#back_button,
#next_button {
  font-size: 2em;
  font-family: "Atten-Round-New";
  text-align: center;
  width: 100%;
  padding: 9px 0px;
  border-radius: 35px;
  margin-top: 10px;
  transition: 0.3s;
  font-weight: 500;
}

#double_button {
  display: flex;
  margin-top: 20px;
}

#verticle-button {
  margin-top: 10px;
}

#double_button > .back_button {
  margin-right: 10px;
}

#double_button > .create_button {
  margin-left: 10px;
}

.role-box {
  display: flex;
  align-items: center;
  padding: 7px 30px;
  border: 1.75px solid #b1b1b1;
  border-radius: 10px;
  margin-bottom: 10px;
  position: relative;
  cursor: pointer;
}

.role-box-block {
  background: #e3e3e3;
  cursor: default !important;
  opacity: 0.7;
}

.role-box-selected {
  border: 2px solid #ff8864;
}

.role-text {
  font-size: 1.75em;
  color: #444444;
  font-weight: 400;
  text-transform: uppercase;
  margin: 0px;
  padding-left: 20px;
}

.icon {
  width: 23px;
  height: 23px;
}

.fa-check {
  font-size: 2.25em;
  color: #ff8864;
  text-align: right;
  position: absolute;
  right: 20px;
}

#delete-box {
  margin-top: 15px;
}

#delete-text {
  text-align: center;
  padding: 15px 0px;
  font-size: 1.85em;
  color: #444444;
  font-weight: 500;
}

.create_button,
.back_button {
  width: 100% !important;
}

.create_button,
.back_button {
  margin: 0px 0px 10px 0px;
}

@media screen and (max-width: 1024px) {
  .popup-form {
    margin: 50px 0px 20px 0px;
  }
}

@media screen and (max-width: 690px) {
  #info-box-notfound,
  #info-box {
    width: 250px;
  }
}

@media screen and (max-width: 490px) {
  #info-box-notfound,
  #info-box {
    width: 230px;
  }

  .role-text {
    font-size: 1.6em;
  }

  .fa-check {
    font-size: 2em;
  }

  .icon {
    width: 20px;
    height: 20px;
  }

  .popup-form {
    padding-right: 30px !important;
    padding-left: 30px !important;
  }
}
</style>
