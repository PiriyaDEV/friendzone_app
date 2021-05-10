<template>
  <div id="interest">
    <div id="interest-background" class="section">
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
          <div id="interest_account" class="form">
            <h1 id="header_title">PICK YOUR INTEREST</h1>

            <div id="term">
              <p>
                We <span style="color: #ff8864">recommend</span> you to choose
                <span style="color: #ff8864">at least 1</span> <br />so we can
                suggest an event you might interested in.
              </p>
            </div>

            <div id="category-list" v-for="(item, i) in categoryList" :key="i">
              <CategoryBox
                @click.native="clicktest($event, i)"
                :nameCategory="categoryList[i].category_name"
                :icon="categoryList[i].icon_black"
                :colorCode="categoryList[i].color_code"
                :status="categoryList[i].status"
              />
            </div>

            <button id="signin_button" @click="clickStart()">
              Start using FRIENDZONE !
            </button>
          </div>
        </div>
        <!-- Form -->
      </div>
    </div>
  </div>
</template>

<script>
import CategoryBox from "@/components/CategoryBox.vue";
import UserService from "../services/user.service";
import CategoryService from "../services/category.service";

export default {
  name: "interest",
  data() {
    return {
      categoryList: null
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    CategoryService.getCategoryList().then((res) => {
      if (res) {
        this.categoryList = res;
      }
    });
    if (this.loggedIn) {
      this.$router.push("/mainpage");
    }
    var user = this.$store.state.user;
    if (!user.username || !user.email || !user.password || !user.phone) {
      window.location.href = "/register";
    }
  },
  components: {
    CategoryBox
  },
  methods: {
    clickStart() {
      var category_id = [];

      this.categoryList.forEach((category) => {
        if (category.status) {
          category_id.push(category.category_id);
        }
      });

      if (category_id.length > 0) {
        UserService.updateUserCategory(category_id).then((res) => {
          if (res) window.location.href = "/mainpage";
        });
      } else {
        window.location.href = "/mainpage";
      }
    },
    clicktest(ev, i) {
      console.log(i + 1);
      this.categoryList[i].status = !this.categoryList[i].status;
      console.log(this.categoryList[0].status);
      console.log(this.categoryList[1].status);
      console.log(this.categoryList[2].status);
      console.log(this.categoryList[3].status);
      console.log(this.categoryList[4].status);
      console.log(this.categoryList[5].status);
      console.log(this.categoryList[6].status);
    }
  }
};
</script>

<style scoped>
#interest {
  background-color: #f8f3ec;
  /* background-image: url("../assets/harryfer-background.jpg"); */
  overflow-x: hidden;
  overflow-y: auto;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
  margin-top: 40px;
  margin-bottom: 25px;
  cursor: pointer;
}
#header_title {
  color: #444444;
  font-size: 3em;
  font-weight: 800;
  padding-top: 25px;
  text-align: center;
  margin: 0;
  padding-bottom: 3px;
}
.date_box {
  font-size: 1.6em;
  font-weight: 450;
  color: #444444;
  width: 100%;
  padding: 12px 12px 9px 15px;
  border: 2px solid #e3e3e3;
  border-radius: 10px;
  margin-bottom: 11px;
  box-shadow: none;
}
#interest_account {
  padding: 0px 38px;
  margin-bottom: 40px;
}
#password_box {
  display: flex;
  align-items: center;
}
#signin_button {
  color: #ffffff;
  font-size: 2.25em;
  font-family: "Atten-Round-New";
  text-align: center;
  width: 100%;
  padding: 12px 0px;
  background-color: #ff8864;
  box-shadow: 0px 3px 20px #00000029;
  border-radius: 35px;
  border: none;
  margin-top: 20px;
  transition: 0.3s;
  margin-bottom: 30px;
}
#signin_button:hover {
  background-color: #ffbb62;
  transition: 0.3s;
}
#term {
  font-size: 1.6em;
  line-height: 20px;
  letter-spacing: 0.2px;
  font-weight: 100;
  color: #444444;
  display: flex;
  justify-content: center;
  margin: 12px 0px;
  text-align: center;
}
#term > p {
  margin: 0;
}
#interest_suggest {
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
@media screen and (max-width: 768px) {
  #interest {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  #header_title {
    font-size: 2.5em;
  }
  #category-box {
    width: 100%;
  }
  input {
    /* Remove First */
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
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
  .input_box {
    width: 268px;
  }
  #interest_account {
    width: 300px;
  }
  #interest_suggest {
    width: 373px;
    margin-top: 20px;
  }
  #interest {
    /* background-image: url("../assets/harryfer-tablet-background.jpg"); */
    background-repeat: no-repeat;
    background-position: center;
  }
}
@media screen and (max-width: 414px) {
  .input_box {
    width: 228px;
  }
  #interest_account {
    width: 260px;
  }
  #interest_suggest {
    width: 333px;
    margin-top: 20px;
  }
}
@media screen and (max-width: 360px) {
  .input_box {
    width: 208px;
  }
  #interest_account {
    width: 240px;
  }
  #interest_suggest {
    width: 313px;
    margin-top: 20px;
  }
  #header_title {
    font-size: 2.25em;
  }
}
</style>
