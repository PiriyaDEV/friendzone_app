<template>
  <div id="notfound-page" :class="cssBackground">
    <div>
        <h1 class="title" v-on:click="harryCount += 1">Sorry.</h1>
      <h1 class="detail">
        <span v-if="harryCount > 12">Hi! I'm Harry, </span>Look like something went wrong on our end <br />
        Head back to the Friendzone homepage.
      </h1>
      <div class="section">
        <button @click="goMainpage()" id="join_button">GO BACK</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      harryCount: 0
    }
  },
  methods: {
    goMainpage() {
      window.location.href = "/";
    }
  },
  computed: {
    cssBackground() {
      let defaultPic = "default-img section";
      let harry = "harry-img section";
      if(this.harryCount > 12){
        return harry;
      }
      return defaultPic;
    },
  }
};
</script>

<style scoped>
#notfound-page {
  height: 100vh;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
}

.default-img{
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("../assets/friendzone-background.jpg");
}

.harry-img{
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url("../assets/harryfer-background.jpg");
}

.title {
  font-weight: 800;
  color: #ffffff;
  font-size: 8.5em;
  margin: 0px;
  text-align: center;
  letter-spacing: 1.5px;
  z-index: 1;
}

.detail {
  font-weight: 500;
  color: #ffffff;
  font-size: 2.5em;
  margin: 10px 0px;
  text-align: center;
}

#join_button {
  font-family: "Atten-Round-New";
  font-weight: 600;
  font-size: 2.75em;
  color: #ffffff;
  padding: 8px 90px;
  border: none;
  margin-top: 20px;
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
  cursor: pointer;
}
#join_button:hover,
#join_button:focus,
#join_button:active {
  -webkit-transform: scale(1.03);
  transform: scale(1.03);
  background-color: #ffbb62;
  color: #ffffff;
  cursor: pointer;
}

@media screen and (max-width: 690px) {
  .default-img{
    background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
      url("../assets/friendzone-tablet-background.jpg");
  }

  .harry-img{
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url("../assets/harryfer-tablet-background.jpg");
}

  .title{
    font-size: 6.5em;
  }

  .detail{
    font-size:1.75em;
  }
}
</style>
