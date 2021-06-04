<template>
  <div id="admin-report" class="event-container">
    <div>
      <div id="title-box">
        <h1 class="title header white-color">USER</h1>
        <select id="select-report" v-model="filter">
          <option value="all">All Users</option>
          <option value="admin">Admin</option>
          <option value="analyst">Analyst</option>
          <option value="approver">Approver</option>
          <option value="user">User</option>
          <option value="normal">Normal</option>
          <option value="banned">Banned</option>
        </select>
      </div>

      <div>
        <div id="report-menu">
          <div id="report-middle-menu" v-if="userListShow.length != 0">
            <h1 id="menu-text-id" class="menu-text">USERNAME</h1>
            <h1 class="menu-text">RATING</h1>
            <h1 class="menu-text">ROLE</h1>
            <h1 class="menu-text">STATUS</h1>
          </div>
          <div id="space-button"></div>
        </div>
        <div id="report-box">
          <NoInformation v-if="userListShow.length == 0"/>
          <div v-for="(user, i) in userListShow" :key="i">
            <ReportBox
              :userList="user"
              :user="true"
              @customerData="customerData"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReportBox from "@/components/admin/report/ReportBox.vue";
import AdminService from "@/services/admin.service";
import NoInformation from "@/components/NoInformation.vue";

export default {
  name: "admin-report",
  data() {
    return {
      userListShow: [],
      userList: [],
      filter: "all"
    };
  },
  watch: {
    filter: function() {
      this.userListShow = [];
      if (this.filter == "all") this.userListShow = this.userList;
      else if (this.filter == "admin") {
        this.userListShow = this.userList.filter((user) => {
          return user.role == "Administrator";
        });
      }
      if (this.filter == "analyst") {
        this.userListShow = this.userList.filter((user) => {
          return user.role == "Analyst";
        });
      }
      if (this.filter == "approver") {
        this.userListShow = this.userList.filter((user) => {
          return user.role == "Approver";
        });
      } else if (this.filter == "normal") {
        this.userListShow = this.userList.filter((user) => {
          return user.status == "Normal";
        });
      } else if (this.filter == "banned") {
        this.userListShow = this.userList.filter((user) => {
          return user.status == "Banned";
        });
      }
    }
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      AdminService.getUserList()
        .then((res) => {
          if (res) {
            this.userListShow = res;
            this.userList = res;
          }
        })
        .catch(() => {
          this.userListShow = [];
          this.userList = [];
        });
    },
    customerData(value) {
      this.$emit("customerData", value);
    }
  },
  components: {
    ReportBox,
    NoInformation
  }
};
</script>

<style scoped>
#admin-report {
  margin-top: 110px;
  margin-bottom: 30px;
  overflow-x: hidden;
}

.title {
  margin-top: 0px;
}

option {
  background-color: #a0a0a0;
}

.header {
  font-size: 3.75em;
  margin: 0px;
}

#title-box {
  display: flex;
  align-items: center;
}

#select-report {
  color: #ffffff;
  height: 20px;
  margin-left: 15px;
  border: none;
  background-color: transparent;
  font-size: 2em;
  font-family: "Atten-Round-New";
  font-weight: 500;
}

#report-menu {
  align-items: center;
  display: flex;
  width: 100%;
  padding: 3px;
}

#report-middle-menu {
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  align-items: center;
  width: 100%;
}

.menu-text {
  font-size: 1.5em;
  font-weight: 400;
  color: #b2b2b2;
  margin-bottom: 0px;
}

#menu-text-id {
  padding: 0px 30px;
}

#space-button {
  width: 50px;
}

@media screen and (max-width: 880px) {
  #admin-report {
    margin-top: 0px;
  }
}

@media screen and (max-width: 690px) {
  #report-middle-menu {
    grid-template-columns: 35% 25% 30% 10%;
  }

  .menu-text {
    font-size: 1.2em;
  }

  #space-button {
    width: 69px;
  }

  .report-cat {
    display: none;
  }
}
</style>
