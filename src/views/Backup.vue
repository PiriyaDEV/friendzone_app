<template>
  <div>
    <div class="section">
      <body id="navbar">
        <div class="header">
          <div class="navbar-container">
            <input v-model="checkedBox" type="checkbox" name="" id="check" />
            <div class="logo-container" 
                 style="cursor: pointer;" 
                 href="#mainpage"
                 v-smooth-scroll="{ duration: 1000, updateHistory: false }">
              <img src="@/assets/Navbar/Nav_Logo.png" />
            </div>

            <div class="nav-btn">
              <div class="nav-links">
                <ul style="padding: 0">
                  <li
                    @click="unCheck(checkedBox)"
                    class="nav-link"
                    style="--i: 0.6s"
                  >
                    <a
                      href="#mainpage"
                      v-smooth-scroll="{ duration: 1000, updateHistory: false }"
                      >{{$t('navbar.home')}}</a
                    >
                  </li>

                  <li
                    @click="unCheck(checkedBox)"
                    class="nav-link"
                    style="--i: 0.6s"
                  >
                    <a
                      href="#thirdsection"
                      v-smooth-scroll="{
                        duration: 1000,
                        offset: -100,
                        updateHistory: false,
                      }"
                      >{{$t('navbar.about')}}</a
                    >
                  </li>
                  <li
                    @click="unCheck(checkedBox)"
                    class="nav-link"
                    style="--i: 0.6s"
                  >
                    <a
                      href="#ticketsection"
                      v-smooth-scroll="{
                        duration: 1000,
                        offset: -150,
                        updateHistory: false,
                      }"
                      >{{$t('navbar.ticket')}}</a
                    >
                  </li>

                  <li
                    @click="unCheck(checkedBox)"
                    class="nav-link"
                    style="--i: 0.6s"
                  >
                    <a
                      href="#souvenir_section"
                      v-smooth-scroll="{
                        duration: 1000,
                        offset: -150,
                        updateHistory: false,
                      }"
                      >{{$t('navbar.souvenir')}}</a
                    >
                  </li>

                  <li
                    @click="unCheck(checkedBox)"
                    class="nav-link"
                    style="--i: 0.6s"
                  >
                    <a
                      href="#faq"
                      v-smooth-scroll="{
                        duration: 1000,
                        offset: 20,
                        updateHistory: false,
                      }"
                      >{{$t('navbar.faqs')}}</a
                    >
                  </li>

                  <li
                    @click="unCheck(checkedBox)"
                    class="nav-link"
                    style="--i: 0.6s"
                  >
                    <a
                      href="#footer_section"
                      v-smooth-scroll="{ duration: 1000, updateHistory: false }"
                      >{{$t('navbar.contact')}}</a
                    >
                  </li>
                </ul>
              </div>

              <div class="log-sign" style="--i: 0.6s">
                <a
                  @click="unCheck(checkedBox)"
                  style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 2em;
                    color: #ffffff;
                  "
                  href="https://www.lazada.co.th/products/poker-card-i1658396589-s5927300183.html?spm=a2o4m.searchlist.list.7.7e4c5fc142RRwn&search=1"
                  target="_blank"
                >
                  <a>{{$t('navbar.shop')}}</a>
                  <img
                    style="margin-left: 8px; width: 21px"
                    src="@/assets/Navbar/Icon_Shop.png"
                /></a>

                <!-- Login -->
                <div v-show="!login" id="login_text">
                  <router-link to="/login" @click="unCheck(checkedBox)"
                    style="
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      font-size: 2em;
                    "
                    class="btn transparent"
                    >{{$t('navbar.loginThai')}}</router-link
                  >
                </div>
                <!-- Login -->

                <!-- Username -->
                <div v-show="login" id="login_text">
                  <router-link to="/profile" @click="unCheck(checkedBox)"
                    style="
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      font-size: 2em;
                      text-transform:capitalize;
                    "
                    href="/profile"
                    class="btn transparent"
                    >{{firstName}}</router-link
                  >
                </div>
                <!-- Username -->

                <a style="margin: 0px; padding: 0px">
                  <div
                    @click="unCheck(checkedBox),switchLocal()"
                    id="changelag"
                    style="
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      font-size: 2em;
                      color: #ffffff;
                      cursor:pointer;
                    "
                  >
                    <span >EN</span>
                    <span style="margin-left: 6px; margin-right: 6px">|</span>
                    <span >TH</span>
                  </div>
                </a>
              </div>
            </div>

            <div class="hamburger-menu-container">
              <div class="hamburger-menu">
                <div></div>
              </div>
            </div>
          </div>
        </div>
        <main>
          <section>
            <div class="overlay"></div>
          </section>
        </main>
      </body>
    </div>
    <div v-show="checkedBox" @click="unCheck(checkedBox)" id="blankSpace">
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import vueSmoothScroll from "vue2-smooth-scroll";
import decode from "jwt-decode";
Vue.use(vueSmoothScroll);

export default {
  name: "navbar",
  data() {
    return {
      login: false,
      firstName: null,
      checkedBox: false,
    }
  },
  created() {
    let data = decode(localStorage.getItem("user"));
    if(data.exp < new Date().getTime()/1000) {
      localStorage.removeItem("user");
      localStorage.removeItem("firstName")
      this.$store.dispatch("auth/logout");
    }
    try {
      this.firstName = localStorage.getItem("firstName");
    }
    catch(e) {
      this.login = false;
    }
    if(this.firstName) {
      this.login = true;
      this.firstName = this.firstName + '.';
    }
  },
  methods: {
    unCheck() {
      this.checkedBox = false;
    },
    changeLang(){
      alert("This feature is under development");
    },
    switchLocal() {
      let lang = localStorage.getItem("lang");
      if (lang == "en") {
        this.$i18n.locale = "th";
        localStorage.removeItem("lang");
        localStorage.setItem("lang","th");
        }
      else {
        this.$i18n.locale = "en";
        localStorage.removeItem("lang");
        localStorage.setItem("lang","en");
        }
    }
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");

#blankSpace {
  position: fixed;
  top: 520.33px;
  height: 100vh;
  width: 100%;
  z-index: 1000;
}
.navbar-container {
  height: 80px;
}
#navbar {
  position: fixed; /* Set the navbar to fixed position */
  top: 0;
  width: 100%;
  z-index: 999;
}

#changelag {
  margin-left: 40px;
}

#login_text {
  padding-left: 51px;
}

body {
  font-family: "CloudBold";
  overflow: hidden;
}

ul {
  list-style: none;
}

a {
  margin-left: 10px;
  text-decoration: none;
}

.header {
  background-color: rgba(58, 56, 117, 1);
  height: 100%;
  width: 100%;
  z-index: 1000;
  top: 0px;
}

section {
  position: relative;
  overflow: hidden;
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(58, 56, 117, 0.83);
}

.container {
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  display: flex;
  position: relative;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
}

.logo-container > img {
  height: 100%;
}

.nav-btn {
  display: flex;
  justify-items: space-between;
  width: 100%;
  justify-content: space-between;
}

.nav-links {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
}

.log-sign {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  line-height: 3rem;
}

.logo span {
  font-weight: 300;
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

li:after {
  background: none repeat scroll 0 0 transparent;
  bottom: -30px;
  content: "";
  display: block;
  height: 10px;
  left: 50%;
  position: absolute;
  background: #f17f92;
  transition: width 0.3s ease 0s, left 0.3s ease 0s;
  width: 0;
}
li:hover:after {
  width: 100%;
  left: 3px;
}

.nav-links > ul {
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-link {
  position: relative;
}

.nav-link > a {
  line-height: 3rem;
  color: #fff;
  padding: 0 0.8rem;
  letter-spacing: 1px;
  font-size: 2em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: 0.5s;
}

.nav-link > a > i {
  margin-left: 0.2rem;
}

.nav-link:hover > a {
  transform: scale(1.1);
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 10rem;
  transform: translateY(10px);
  opacity: 0;
  pointer-events: none;
  transition: 0.5s;
}

.dropdown ul {
  position: relative;
}

.dropdown-link > a {
  display: flex;
  background-color: #fff;
  color: #3498db;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  align-items: center;
  justify-content: space-between;
  transition: 0.3s;
}

.dropdown-link:hover > a {
  background-color: #3498db;
  color: #fff;
}

.dropdown-link:not(:nth-last-child(2)) {
  border-bottom: 1px solid #efefef;
}

.dropdown-link i {
  transform: rotate(-90deg);
}

.arrow {
  position: absolute;
  width: 11px;
  height: 11px;
  top: -5.5px;
  left: 32px;
  background-color: #fff;
  transform: rotate(45deg);
  cursor: pointer;
  transition: 0.3s;
  z-index: -1;
}

.dropdown-link:first-child:hover ~ .arrow {
  background-color: #3498db;
}

.dropdown-link {
  position: relative;
}

.dropdown.second {
  top: 0;
  left: 100%;
  padding-left: 0.8rem;
  cursor: pointer;
  transform: translateX(10px);
}

.dropdown.second .arrow {
  top: 10px;
  left: -5.5px;
}

.nav-link:hover > .dropdown,
.dropdown-link:hover > .dropdown {
  transform: translate(0, 0);
  opacity: 1;
  pointer-events: auto;
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
  width: 3rem;
  height: 3px;
  border-radius: 3px;
  background-color: #fff;
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
  background-color: #fff;
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

@media screen and (max-width: 768px) {
  .logo-container {
    height: 50px;
  }

  li:after {
    display: none;
  }
  li:hover:after {
    display: none;
  }

  .hamburger-menu-container {
    display: flex;
  }

  ul {
    margin: 0;
  }

  #check {
    display: block;
  }

  .nav-btn {
    position: fixed;
    top: 80px;
    left: 0;
    width: 100%;
    height: 0%;
    background-color: rgba(58, 56, 117, 1);
    flex-direction: column;
    align-items: center;
    justify-content: initial;
    overflow-x: hidden;
    overflow-y: auto;
    transition: 0.65s;
    z-index: 1000;
  }

  #check:checked ~ .nav-btn {
    transform: translateY(0);
    height: 440.33px;
  }

  #check:checked ~ .nav-btn .nav-link,
  #check:checked ~ .nav-btn .log-sign {
    animation: animation 0.5s ease forwards var(--i);
  }

  .nav-links {
    flex: initial;
    border-top: 1px solid rgb(255, 255, 255, 0.5);
    width: 100%;
    margin: 0;
  }

  .nav-link > a {
    margin: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .nav-links > ul {
    display: grid;
    justify-content: center;
    align-items: center;
  }

  .nav-link {
    width: 100%;
    opacity: 0;
    transform: translateY(15px);
  }

  .nav-link > a {
    padding: 1.6rem 2rem;
  }

  .nav-link:hover > a {
    transform: scale(1);
    background-color: transparent;
  }

  .dropdown,
  .dropdown.second {
    position: initial;
    top: initial;
    left: initial;
    transform: initial;
    opacity: 1;
    pointer-events: auto;
    width: 100%;
    padding: 0;
    background-color: transparent;
    display: none;
  }

  .nav-link:hover > .dropdown,
  .dropdown-link:hover > .dropdown {
    display: block;
  }

  .nav-link:hover > a > i,
  .dropdown-link:hover > a > i {
    transform: rotate(360deg);
  }

  .dropdown-link > a {
    background-color: transparent;
    color: #fff;
    padding: 1.2rem 2rem;
    line-height: 1;
  }

  .dropdown.second .dropdown-link > a {
    padding: 1.2rem 2rem 1.2rem 3rem;
  }

  .dropdown.second .dropdown.second .dropdown-link > a {
    padding: 1.2rem 2rem 1.2rem 4rem;
  }

  .dropdown-link:not(:nth-last-child(2)) {
    border-bottom: none;
  }

  .arrow {
    z-index: 1;
    background-color: transparent;
    left: 10%;
    transform: scale(1.1) rotate(45deg);
    transition: 0.5s;
  }

  .nav-link:hover .arrow {
    background-color: transparent;
  }

  .dropdown .dropdown .arrow {
    display: none;
  }

  .dropdown-link:hover > a {
    background-color: transparent;
  }

  .dropdown-link:first-child:hover ~ .arrow {
    background-color: transparent;
  }

  .nav-link > a > i {
    font-size: 1.1rem;
    transform: rotate(-90deg);
    transition: 0.7s;
  }

  .dropdown i {
    font-size: 1rem;
    transition: 0.7s;
  }

  .log-sign {
    flex: initial;
    width: 100%;
    padding: 1.5rem 1.9rem;
    display: grid;
    justify-content: center;
    opacity: 0;
    transform: translateY(15px);
    padding: 0;
  }

  .btn {
    height: 20px;
    width: 100%;
  }

  #login_text {
    margin: 0;
    padding: 1.6rem 2rem;
    background-color: #f17f92;
    width: 100vw;
  }

  .log-sign > a,
  #login_text,
  #changelag {
    margin: 0;
    padding: 1.6rem 2rem;
  }
}
</style>