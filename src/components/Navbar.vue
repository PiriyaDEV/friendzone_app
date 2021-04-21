<template>
  <div id="navbar" class="section">
    <div id="menu-container" class="navbar-container">
      <input v-model="checkedBox" type="checkbox" id="check" />
      <div
        style="cursor: pointer"
        href="#firstsection"
        v-smooth-scroll="{ duration: 1000, updateHistory: false }"
      >
        <img id="friendzone-logo" src="@/assets/longlogo.png" />
      </div>

      <div id="nav-button">
        <button id="orange-button" @click="goRegister()">JOIN US</button>
        <button id="white-button" @click="goLogin()">SIGN IN</button>
      </div>

      <div class="hamburger-menu-container">
        <div class="hamburger-menu">
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import vueSmoothScroll from "vue2-smooth-scroll";
Vue.use(vueSmoothScroll);
export default {
  name: "navbar",
  data() {
    return {
      checkedBox: false,
    };
  },
  methods: {
    unCheck() {
      this.checkedBox = false;
    },
    goRegister() {
      window.location.href = "/register";
    },
    goLogin() {
      window.location.href = "/login";
    },
  },
};
</script>

<style scoped>
#navbar {
  z-index: 10000;
  position: fixed;
  width: 100%;
  background-color: #ffffff;
  -webkit-box-shadow: 0 0px 5px #e5e3e3;
  -moz-box-shadow: 0 0px 5px #e5e3e3;
  box-shadow: 0 0px 5px #e5e3e3;
  padding: 22px 0px 18px 0px;
}
#nav-button {
  display: initial;
}
#menu-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#friendzone-logo {
  width: 194px;
}
#orange-button {
  font-family: "Atten-Round-New";
  font-weight: 500;
  font-size: 2em;
  color: #ffffff;
  padding: 7px 25px 5px 25px;
  border: none;
  border-radius: 31px;
  background-color: #ff8864;
  transition: 0.3s;
}
#orange-button:hover {
  background-color: #ffbb62;
  transition: 0.3s;
}
#white-button {
  margin-left: 14px;
  font-family: "Atten-Round-New";
  font-weight: 500;
  font-size: 2em;
  color: #ff8864;
  padding: 7px 25px 5px 25px;
  border: none;
  border-radius: 31px;
  background-color: #ffffff;
  -webkit-box-shadow: inset 0px 0px 0px 3px #fe8864;
  -moz-box-shadow: inset 0px 0px 0px 3px #fe8864;
  box-shadow: inset 0px 0px 0px 3px #fe8864;
  transition: 0.3s;
}
#white-button:hover {
  color: #ffbb62;
  -webkit-box-shadow: inset 0px 0px 0px 3px #ffbb62;
  -moz-box-shadow: inset 0px 0px 0px 3px #ffbb62;
  box-shadow: inset 0px 0px 0px 3px #ffbb62;
  transition: 0.3s;
}
.hamburger-menu-container {
  flex: 1;
  display: none;
  align-items: center;
  justify-content: flex-end;
}
.hamburger-menu {
  width: 100%;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.hamburger-menu div {
  width: 3.5rem;
  height: 3px;
  border-radius: 3px;
  background-color: #ff8864;
  position: relative;
  z-index: 1001;
  transition: 0.5s;
}
.hamburger-menu div:before,
.hamburger-menu div:after {
  content: "";
  position: absolute;
  width: inherit;
  height: inherit;
  background-color: #ff8864;
  border-radius: 3px;
  transition: 0.5s;
}
.hamburger-menu div:before {
  transform: translateY(-7px);
}
.hamburger-menu div:after {
  transform: translateY(7px);
}
#check {
  position: absolute;
  top: 50%;
  right: 2rem;
  transform: translateY(-50%);
  width: 4rem;
  height: 4rem;
  z-index: 90000;
  cursor: pointer;
  opacity: 0;
  display: none;
}
#check:checked ~ .hamburger-menu-container .hamburger-menu div {
  background-color: transparent;
}
#check:checked ~ .hamburger-menu-container .hamburger-menu div:before {
  transform: translateY(0) rotate(-45deg);
}
#check:checked ~ .hamburger-menu-container .hamburger-menu div:after {
  transform: translateY(0) rotate(45deg);
}
@keyframes animation {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}
@media screen and (max-width: 500px) {
  #friendzone-logo {
    width: 150px;
  }
  .hamburger-menu-container {
    display: none; /* เปิดเพื่อ show Hamburger */
  }
  #check {
    display: none; /* เปิดเพื่อ show Hamburger */
  }
  #orange-button {
    display: none;
  }
  #white-button {
    font-size: 1.5em;
    font-weight: 550px;
  }
  /* #check:checked ~ .nav-btn {
    transform: translateY(0);
    height: 440.33px;
  }
  #check:checked ~ .nav-btn .nav-link,
  #check:checked ~ .nav-btn .log-sign {
    animation: animation 0.5s ease forwards var(--i);
  } */
}
</style>
