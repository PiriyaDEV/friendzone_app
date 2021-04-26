<template>
  <div id="rate-popup" class="popup">
    <div class="popup-section section">
      <div class="popup-form">
        <div id="profile-section" class="section">
          <div id="left">
            <div id="profile-frame">
              <img id="profile-pic" :src="user.profile_pic" />
            </div>
          </div>

          <div id="right">
            <h1 id="name_title">{{ user.username }}</h1>

            <!-- Rating -->
            <div id="rating">
              <h2 class="black-color input_title">Rating</h2>
              <div style="margin-left: 5px" class="section">
                <!-- Star -->
                <div>
                  <!-- <img class="star" src="@/assets/icon/icons8-star-96.png" /> -->
                  <img
                    class="star"
                    src="@/assets/icon/icons8-star-96-orange.png"
                  />
                </div>
                <!-- Star -->

                <!-- Star -->
                <div>
                  <img class="star" src="@/assets/icon/icons8-star-96.png" />
                  <!-- <img class="star" src="@/assets/icon/icons8-star-96-orange.png" /> -->
                </div>
                <!-- Star -->

                <!-- Star -->
                <div>
                  <img class="star" src="@/assets/icon/icons8-star-96.png" />
                  <!-- <img class="star" src="@/assets/icon/icons8-star-96-orange.png" /> -->
                </div>
                <!-- Star -->

                <!-- Star -->
                <div>
                  <img class="star" src="@/assets/icon/icons8-star-96.png" />
                  <!-- <img class="star" src="@/assets/icon/icons8-star-96-orange.png" /> -->
                </div>
                <!-- Star -->

                <!-- Star -->
                <div>
                  <img class="star" src="@/assets/icon/icons8-star-96.png" />
                  <!-- <img class="star" src="@/assets/icon/icons8-star-96-orange.png" /> -->
                </div>
                <!-- Star -->
              </div>
            </div>
            <!-- Rating -->

            <!-- Follower -->
            <div id="follower">
              <div class="verticle-box">
                <h1 class="number-box">2</h1>
                <h1 class="title-box">Host</h1>
              </div>
              <div class="verticle-box">
                <h1 class="number-box">5</h1>
                <h1 class="title-box">Joined</h1>
              </div>
              <div class="verticle-box">
                <h1 class="number-box">12</h1>
                <h1 class="title-box">Follower</h1>
              </div>
              <div class="verticle-box">
                <h1 class="number-box">17</h1>
                <h1 class="title-box">Following</h1>
              </div>
            </div>
            <!-- Follower -->

            <h1 id="bio">
              {{ user.bio }}
            </h1>

            <div id="profile-button">
              <button @click="editReturn()">EDIT PROFILE</button>
              <button>INTERESETED</button>
              <button>CHANGE PASSWORD</button>
            </div>
          </div>
        </div>

        <div id="information">
          <div id="left" class="black-color">
            <h1 class="info-title">Name</h1>
            <h1 class="info-title">Birthdate</h1>
            <h1 class="info-title">Email</h1>
            <h1 class="info-title">Phone</h1>
            <h1 class="info-title">Gender</h1>
          </div>

          <div id="right" class="black-color">
            <h1 class="info-text">{{ fullname }}</h1>
            <h1 class="info-text">{{ user.birthdate }}</h1>
            <h1 class="info-text">{{ user.email }}</h1>
            <h1 class="info-text">{{ user.phone }}</h1>
            <h1 class="info-text">{{ user.gender }}</h1>
          </div>
          <img
            @click="detailReturn()"
            style="cursor: pointer"
            class="close"
            src="@/assets/icon/icons8-multiply-96.png"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "./../../services/user.service";

export default {
  data() {
    return {
      user: null,
      fullname: "",
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  },
  created() {
    UserService.getUserDetail().then((res) => {
      if (res) {
        this.user = res;
        this.fullname = this.user.firstname + " " + this.user.lastname;
        let birthdate = new Date(this.user.birthdate);
        let date = birthdate.getDate();
        let month = birthdate.getMonth();
        let year = birthdate.getFullYear();
        this.user.birthdate = `${date} ${this.months[month]} ${year}`;
      }
    });
  },
  methods: {
    detailReturn() {
      this.$emit("clickDetail", false);
      this.$emit("clickEdit", false);
    },
    editReturn() {
      this.$emit("clickEdit", true);
      this.$emit("clickDetail", false);
    },
  },
};
</script>

<style scoped>
#left {
  margin-right: 50px;
}

#right {
  margin-left: 20px;
}

#follower {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  margin-bottom: 5px;
}

.verticle-box {
  text-align: center;
}

.number-box {
  font-size: 2.5em;
  font-weight: 600;
  margin: 0;
  color: #444444;
}

.title-box {
  font-size: 2.25em;
  margin-top: -3px;
  margin-bottom: 0;
  color: #444444;
}

#name_title {
  color: #444444;
  font-size: 3.75em;
  font-weight: 700;
  padding-top: 25px;
  margin: 0;
}

#bio {
  color: #444444;
  font-size: 1.6em;
  font-weight: 500;
  margin: 0;
  padding-top: 10px;
  width: 400px;
  line-height: 21px;
}

#profile-pic {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #444444;
}

#profile-frame {
  border-radius: 50%;
  border: 2px solid #a0a0a0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px;
}

#profile-section {
  margin-top: 5px;
}

#rating {
  display: flex;
  align-items: center;
  margin-top: 5px;
}

#rating > h2 {
  font-size: 2em;
}

.star {
  width: 20px;
  margin-right: 4px;
}

#profile-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding-bottom: 15px;
}

#profile-button > button {
  color: #ff8864;
  border: 2px solid #ff8864;
  background-color: #ffffff;
  font-family: "Atten-Round-New";
  font-size: 1.25em;
  font-weight: 550;
  padding: 7px 18px;
  margin: 0;
  border-radius: 16px;
}

#information {
  display: flex;
  align-items: center;
}

.info-title,
.info-text {
  font-size: 2.25em;
}

.info-text {
  font-weight: 400;
}

#information {
  margin-bottom: 25px;
}
</style>
