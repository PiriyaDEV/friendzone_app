<template>
  <div id="footer" class="section">
    <div class="page-container">
      <div id="footer-container">
        <div id="logo-box">
          <img id="logo" src="@/assets/homepage/Group 2@2x.png" alt="" />
        </div>
        <div id="term">
          <h1 @click="clickPolicy()" class="term-text">Terms of use</h1>
          <h1 @click="clickPolicy()" class="term-text">Privacy Policy</h1>
          <h1 class="term-text">© 2021 Friendzone, All Rights Reserved.</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clickPolicy() {
      this.$router.push("/policy");
    }
  }
};
</script>

<style scoped>
#footer {
  z-index: 2;
  background-color: #444444;
  padding: 20px 0px;
  position: relative;
}

#footer-container,
#term {
  display: flex;
  align-items: center;
}

#term > .term-text:nth-child(1),
#term > .term-text:nth-child(2) {
  cursor: pointer;
}

#footer-container {
  justify-content: space-between;
}

.term-text {
  font-size: 1.75em;
  color: #ffffff;
  font-weight: 500;
  margin: 0px;
  padding-left: 50px;
}

#logo {
  width: 150px;
}

@media screen and (max-width: 540px) {
  #footer-container,
  #term {
    display: block;
  }

  #logo-box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }

  .term-text {
    padding: 10px 0px;
    text-align: center;
  }
}
</style>
