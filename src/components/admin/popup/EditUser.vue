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
                <span @click="searchInput()">search</span>
              </div>
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
                  <h1 class="info_data">Harryfer</h1>
                </div>
                <div class="info-column">
                  <h1 class="info_title">Name</h1>
                  <h1 class="info_data">Phumiphat Tatiyawongsoonthorn</h1>
                </div>
                <div class="info-column" v-if="editUser == false">
                  <h1 class="info_title">Birthdate</h1>
                  <h1 class="info_data">1 October 2000</h1>
                </div>
                <div class="info-column">
                  <h1 class="info_title">Email</h1>
                  <h1 class="info_data">harryferr@gmail.com</h1>
                </div>
                <div class="info-column" v-if="editUser == false">
                  <h1 class="info_title">Phonenumber</h1>
                  <h1 class="info_data">0879902345</h1>
                </div>
                <div class="info-column" v-if="editUser == false">
                  <h1 class="info_title">Gender</h1>
                  <h1 class="info_data">Male</h1>
                </div>
                <div class="info-column" v-if="editUser == false">
                  <h1 class="info_title">Create date</h1>
                  <h1 class="info_data">01 Jan 2021</h1>
                </div>
                <hr v-if="editUser == false" class="bar" />
                <div v-if="editUser == false" class="info-column-roles">
                  <h1 class="info_title">Roles</h1>
                  <div>
                    <h1 class="info_data">User</h1>
                    <h1 class="info_data">Approver</h1>
                    <h1 class="info_data">Analyst</h1>
                    <h1 class="info_data">Admin</h1>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="editUser == true">
              <h2 class="input_title">
                Select roles
              </h2>

              <div id="role-section">
                <div :class="cssUser">
                  <img
                    class="icon"
                    src="@/assets/icon/roles/icons8-customer-64-1.png"
                  />
                  <h1 class="role-text">USER</h1>
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
                  <h1 class="role-text">ADMIN</h1>

                  <i v-if="admin" class="fa fa-check"></i>
                </div>
              </div>
            </div>

            <div v-if="editUser == false" id="verticle-button">
              <div>
                <button id="back_button" @click="editReturn()">Cancle</button>
              </div>

              <div>
                <button id="next_button" @click="clickNext()">Next</button>
              </div>
            </div>

            <div v-if="editUser == true" id="double_button">
              <button id="back_button" @click="clickBack()">Back</button>
              <button id="next_button" @click="clickDone()">
                Done
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
          <h1 class="input_title" id="delete-text">
            Want to delete this account?<span
              style="cursor:pointer;"
              class="orange-color"
            >
              Banned</span
            >
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      editUser: false,
      foundUser: false,
      username: "harryfer",
      approver: false,
      analyst: false,
      admin: false,
      role: "User",
    };
  },
  methods: {
    searchInput() {
      console.log(this.search);
      console.log(this.username);
      if (this.search == this.username) {
        this.foundUser = true;
      } else {
        this.foundUser = false;
      }
    },
    editReturn() {
      this.$emit("clickEdit", false);
    },
    clickNext() {
      if (this.foundUser == true) {
        this.editUser = true;
      }
    },
    clickBack() {
      this.editUser = false;
    },
    clickDone() {
      this.$emit("clickEdit", false);
    },
    approverClick() {
      this.approver = !this.approver;
      this.analyst = false;
      this.admin = false;
    },
    analystClick() {
      this.analyst = !this.analyst;
      this.approver = false;
      this.admin = false;
    },
    adminClick() {
      this.admin = !this.admin;
      this.approver = false;
      this.analyst = false;
    },
  },
  computed: {
    cssUser() {
      let roleCorrect = "role-box role-box-block";
      let roleUncorrect = "role-box";
      if (this.role == "User") {
        return roleCorrect;
      }
      return roleUncorrect;
    },
    cssApprover() {
      let select = "role-box role-box-selected";
      let unselect = "role-box";
      let roleCorrect = "role-box role-box-block";

      if (this.role == "Aprrover") {
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

      if (this.role == "Admin") {
        return roleCorrect;
      } else if (this.admin == true) {
        return select;
      }
      return unselect;
    },
  },
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
  padding-bottom: 25px;
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

#user_info {
  margin-top: 20px;
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
  align-items: top;
}

.info_title {
  font-size: 1.75em;
  color: #444444;
  font-weight: 600;
}

.info_data {
  font-size: 1.5em;
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

#back_button {
  color: #ff8864;
  background-color: #ffffff;
  border: 2px solid #ff8864;
}

#next_button {
  color: #ffffff;
  background-color: #ff8864;
  border: 2px solid #ff8864;
}

#double_button {
  display: flex;
}

#double_button > #back_button {
  margin-right: 10px;
}

#double_button > #next_button {
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
</style>
