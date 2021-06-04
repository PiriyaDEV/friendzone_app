<template>
  <div id="friend-flex">
    <div id="top">
      <div>
        <div id="profile-frame">
          <img id="profile-pic" :src="searchUser.profile_pic" />
        </div>
      </div>
      <div id="right">
        <h1 id="name_title">{{ searchUser.username }}</h1>

        <!-- Rating -->
        <div id="rating">
          <h2 class="black-color input_title">Rating</h2>
          <div style="margin-left: 5px" class="section">
            <!-- Star -->
            <div>
              <img
                v-if="showRating[0]"
                class="star"
                src="@/assets/icon/icons8-star-96-orange.png"
              />
              <img v-else class="star" src="@/assets/icon/icons8-star-96.png" />
            </div>
            <!-- Star -->

            <!-- Star -->
            <div>
              <img
                v-if="showRating[1]"
                class="star"
                src="@/assets/icon/icons8-star-96-orange.png"
              />
              <img v-else class="star" src="@/assets/icon/icons8-star-96.png" />
            </div>
            <!-- Star -->

            <!-- Star -->
            <div>
              <img
                v-if="showRating[2]"
                class="star"
                src="@/assets/icon/icons8-star-96-orange.png"
              />
              <img v-else class="star" src="@/assets/icon/icons8-star-96.png" />
            </div>
            <!-- Star -->

            <!-- Star -->
            <div>
              <img
                v-if="showRating[3]"
                class="star"
                src="@/assets/icon/icons8-star-96-orange.png"
              />
              <img v-else class="star" src="@/assets/icon/icons8-star-96.png" />
            </div>

            <!-- Star -->

            <!-- Star -->
            <div>
              <img
                v-if="showRating[4]"
                class="star"
                src="@/assets/icon/icons8-star-96-orange.png"
              />
              <img v-else class="star" src="@/assets/icon/icons8-star-96.png" />
            </div>
            <!-- Star -->
          </div>
        </div>
        <!-- Rating -->
      </div>
    </div>

    <div id="follower">
      <div class="follower-text">
        <h1>{{ searchUser.host }}</h1>
        <h2>Host</h2>
      </div>
      <div class="follower-text">
        <h1>{{ searchUser.follower }}</h1>
        <h2>Follower</h2>
      </div>
      <div class="follower-text">
        <h1>{{ searchUser.following }}</h1>
        <h2>Following</h2>
      </div>
    </div>

    <div>
      <h1 id="bio">
        <span v-if="this.searchUser.bio != null">{{ searchUser.bio }}</span>
        <span v-else id="no-bio"
          >No bio. Follow this user to know them more</span
        >
      </h1>
    </div>

    <!-- Button -->
    <div id="button">
      <button @click="viewProfile()" id="view_button">VIEW PROFILE</button>
      <button
        v-if="searchUser.status_id"
        id="following_button"
        @click="toUnfollow()"
      >
        <span id="following-text">FOLLOWING</span>
      </button>
      <button v-else id="follow_button" @click="toFollow()">FOLLOW</button>
    </div>
    <!-- Button -->
  </div>
</template>

<script>
import User from "../models/user";
import UserService from "../services/user.service";

export default {
  props: ["searchUser"],
  data() {
    return {
      showRating: [false, false, false, false, false],
      user: new User(""),
      following: false
    };
  },
  created() {
    if (this.searchUser.rating > 0) {
      this.showRating.fill(true, 0, this.searchUser.rating.toFixed(0));
    } else {
      this.showRating.fill(true, 0, 5);
    }
  },
  methods: {
    toFollow() {
      UserService.following(this.searchUser.user_id).then((res) => {
        if (res.message == "followed") {
          this.searchUser.status_id = 1;
          this.searchUser.follower++;
          console.log("send!");
        }
      });
    },
    toUnfollow() {
      UserService.unFollowing(this.searchUser.user_id).then((res) => {
        if (res.message == "unfollowed") {
          this.searchUser.status_id = 0;
          this.searchUser.follower--;
          console.log("send!");
        }
      });
    },
    viewProfile() {
      this.$emit("showProfile", this.searchUser.username);
    }
  }
};
</script>

<style scoped>
#friend-flex {
  background-color: white;
  border-radius: 17px;
  width: 214px;
  /* height: 250px; */
  max-height: 250px;
  margin-right: 20px;
  margin-bottom: 20px;
  padding: 13px;
}

#top {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 6px;
}

h1,
h2 {
  color: #444444;
}

#profile-pic {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #444444;
}

#profile-frame {
  border-radius: 50%;
  border: 1px solid #a0a0a0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
}

#rating {
  display: flex;
  align-items: center;
  margin-top: 5px;
}

.star {
  width: 12px;
  margin-right: 1px;
}

#rating > h2 {
  font-size: 1.5em;
}

#name_title {
  font-size: 2.25em;
  margin: 0px;
}

#follower {
  display: flex;
  justify-content: space-evenly;
}

.follower-text > h1 {
  text-align: center;
  font-size: 2.25em;
  font-weight: 500;
  margin: 2px 0px 0px 0px;
}

.follower-text > h2 {
  text-align: center;
  font-size: 1.5em;
  margin: 2px 0px 0px 0px;
}

#bio {
  font-size: 1.65em;
  padding: 0px 5px;
  font-weight: 400;
  margin: 13px 0px 0px 0px;
  height: 48px;
}

#no-bio {
  color: #a0a0a0 !important;
}

#button {
  /* text-align: right; */
  margin-top: 10px;
  padding-bottom: 7px;
  display: flex;
  justify-content: space-between;
}

#follow_button,
#following_button {
  font-family: "Atten-Round-New";
  font-size: 1.25em;
  font-weight: 500;
  padding: 4px 23px;
  margin: 4px 0px 0px 0px;
  border-radius: 16px;
}

#view_button {
  font-family: "Atten-Round-New";
  font-size: 1.25em;
  font-weight: 500;
  padding: 4px 14px;
  margin: 4px 0px 0px 0px;
  border-radius: 16px;
}

#follow_button {
  color: #ffffff;
  border: 1.75px solid #ff8864;
  background-color: #ff8864;
}

#following_button {
  color: #ff8864;
  border: 1.75px solid #ff8864;
  background-color: #ffffff;
  padding: 4px 14px !important;
}

#following_button:hover:before {
  content: "UNFOLLOW";
}

#following_button:hover span {
  display: none;
}

#view_button {
  color: #a0a0a0;
  border: 1.75px solid #a0a0a0;
  background-color: #ffffff;
}

@media screen and (max-width: 880px) {
  #friend-flex {
    width: 204px;
  }
}

@media screen and (max-width: 800px) {
  #friend-flex {
    width: 314px;
  }

  #top {
    justify-content: flex-start;
  }

  #right {
    margin-left: 25px;
  }
}

@media screen and (max-width: 768px) {
  #friend-flex {
    width: 284px;
  }
}

@media screen and (max-width: 690px) {
  #friend-flex {
    width: 264px;
  }
}

@media screen and (max-width: 650px) {
  #friend-flex {
    width: 244px;
  }
}

@media screen and (max-width: 600px) {
  #friend-flex {
    width: 224px;
  }
}

@media screen and (max-width: 570px) {
  #friend-flex {
    width: 204px;
  }
}

@media screen and (max-width: 525px) {
  #friend-flex {
    width: 340px;
    margin-right: 0px;
  }
}

@media screen and (max-width: 490px) {
  #friend-flex {
    width: 320px;
  }
}

@media screen and (max-width: 450px) {
  #friend-flex {
    width: 252px;
  }
}

@media screen and (max-width: 375px) {
  #friend-flex {
    width: 235px;
  }
}
</style>
