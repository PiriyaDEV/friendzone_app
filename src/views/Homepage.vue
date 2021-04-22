<template>
  <div>
    <Navbar></Navbar>
    <div id="firstsection" class="section">
      <!-- First Section -->
      <div class="page-container">
        <!-- Join Button -->
        <div>
          <div id="first_text">
            <h1 id="friendzone_title">ARE YOU IN FRIENDZONE?</h1>
            <h2 id="description">
              If you're getting bored of being alone, Our community can help
              you.
            </h2>
          </div>

          <div>
            <button id="join_button" @click="goRegister()">
              JOIN OUR COMMUNITY
            </button>
          </div>
        </div>
      </div>
      <!-- First Section -->
      <img id="egg" src="@/assets/egg.svg" alt="" />
    </div>
U
    <div id="secondsection" class="section">
      <div class="page-container"></div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  name: "Homepage",
  components: {
    Navbar,
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/mainpage");
    }
  },
  methods: {
    goRegister() {
      window.location.href = "/register";
    },
  },
};
</script>

<style scoped>
#friendzone_title {
  width: 328px;
  font-weight: 800;
  color: #444444;
  font-size: 5.5em;
  margin: 0px;
  z-index: 1;
}
#description {
  width: 490px;
  font-weight: 500;
  font-size: 3.5em;
  margin-top: 15px;
  margin-bottom: 29px;
  z-index: 1;
}
#firstsection {
  width: 100%;
  padding: 164px 0px 353px 0px;
  position: relative;
}
#join_button {
  font-family: "Atten-Round-New";
  font-weight: 600;
  font-size: 2.75em;
  color: #ffffff;
  padding: 16px 90px;
  border: none;
  border-radius: 31px;
  background-color: #ff8864;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform;
  transition-property: transform;
  transition: 0.3s;
}
#join_button:hover,
#join_button:focus,
#join_button:active {
  -webkit-transform: scale(1.03);
  transform: scale(1.03);
  background-color: #ffbb62;
  color: #ffffff;
}
.btn {
  display: inline-block;
  padding: 0px 0px;
  font-size: 2em;
  line-height: 1;
  margin: 0 0;
  transition: 0.3s;
  height: 80px;
  width: 100px;
}
.btn.solid,
.btn.transparent:hover {
  background-color: #fff;
  color: #f17f92;
}
.btn.transparent,
.btn.solid:hover {
  background-color: #f17f92;
  color: #fff;
}
#egg {
  position: absolute;
  z-index: -1;
  bottom: -43px;
  right: -58px;
  width: 860px;
}
#secondsection {
  z-index: 2;
  background-color: #ffc661;
  padding: 450px;
}
@media screen and (max-width: 1080px) {
  #egg {
    width: 780px;
    bottom: -35px;
  }
}
@media screen and (max-width: 1080px) {
  #egg {
    width: 740px;
  }
}
@media screen and (max-width: 980px) {
  #egg {
    width: 690px;
  }
}
@media screen and (max-width: 905px) {
  #egg {
    width: 610px;
    bottom: -29px;
  }
}
@media screen and (max-width: 600px) {
  #egg {
    width: 480px;
    bottom: -23px;
  }
  #friendzone_title {
    font-size: 4.5em;
  }
  #description {
    font-size: 3em;
    width: 416px;
  }
  #firstsection {
    padding: 164px 0px 265px 0px;
  }
  #join_button {
    font-size: 2.25em;
    padding: 16px 54px;
  }
}
@media screen and (max-width: 500px) {
  #firstsection {
    padding: 124px 0px 300px 0px;
  }
}
@media screen and (max-width: 440px) {
  #egg {
    width: 414px;
    bottom: -19px;
  }
  #friendzone_title {
    font-size: 4em;
  }
  #description {
    font-size: 2.25em;
    width: 310px;
  }
  #join_button {
    padding: 16px 44px;
    font-size: 1.75em;
  }
}</style
>r
