<template>
  <div id="friend-flex">
    <div id="top">
      <div>
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
              <img class="star" src="@/assets/icon/icons8-star-96-orange.png" />
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
      </div>
    </div>

    <div id="follower">
      <div class="follower-text">
        <h1>2</h1>
        <h2>Host</h2>
      </div>
      <div class="follower-text">
        <h1>2</h1>
        <h2>Follower</h2>
      </div>
      <div class="follower-text">
        <h1>2</h1>
        <h2>Following</h2>
      </div>
    </div>

    <div>
      <h1 id="bio">
        My name is Harryfer and I’m the best boyscout alive. I’m Thailand
        representative to attend World Boyscout 2077 in Finland.
      </h1>
    </div>

    <!-- Button -->
    <div id="button">
      <button>FOLLOWING</button>
    </div>
    <!-- Button -->
  </div>
</template>

<script>
import User from "./../models/user";
import UserService from "./../services/user.service";
export default {
  data() {
    return {
      user: new User({
        username: "",
        email: "",
        firstname: "",
        lastname: "",
        phone: "",
        gender: "",
        profile_pic: "",
        birthdate: "",
        bio: "",
      }),
      fullname: "",
    };
  },
  created() {
    UserService.getUserDetail().then((res) => {
      if (res) {
        this.user = res;
        console.log(this.user.bio);
        this.fullname = this.user.firstname + " " + this.user.lastname;
      }
    });
  },
};
</script>

<style scoped>
#friend-flex {
  background-color: white;
  border-radius: 17px;
  width: 214px;
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
}

#button {
  text-align: right;
  margin-top: 10px;
  padding-bottom: 7px;
}

#button > button {
  color: #ff8864;
  border: 2px solid #ff8864;
  background-color: #ffffff;
  font-family: "Atten-Round-New";
  font-size: 1.25em;
  font-weight: 550;
  padding: 7px 15px;
  margin: 4px 0px 0px 0px;
  border-radius: 16px;
}

@media screen and (max-width: 880px) {
    #friend-flex {
      width:204px;
    }
}

@media screen and (max-width: 800px) {
  #friend-flex {
      width:314px;
    }

    #top{
      justify-content: flex-start;
    }

    #right{
      margin-left:25px;
    }
}

@media screen and (max-width: 768px) {
    #friend-flex {
      width:284px;
    }
}

@media screen and (max-width: 690px) {
    #friend-flex {
      width:264px;
    }
}

@media screen and (max-width: 650px) {
  #friend-flex {
      width:244px;
    }
}

@media screen and (max-width: 600px) {
  #friend-flex {
      width:224px;
    }
}

@media screen and (max-width: 570px) {
  #friend-flex {
      width:204px;
    }
}

@media screen and (max-width: 525px) {
    #friend-flex {
      width:340px;
    }
}

@media screen and (max-width: 490px) {
  #friend-flex {
      width:320px;
    }
}

@media screen and (max-width: 450px) {
   #friend-flex {
      width:285px;
    }
}
</style>
