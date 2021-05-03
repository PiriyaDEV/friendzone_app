<template>
  <div id="mobile-topbar">
    <div class="section">
      <div id="mobile-container" class="event-container">
        <div id="left">
          <Slide>
            <a id="home" href="#">
              <span>Home</span>
            </a>
          </Slide>

          <img id="logo" style="cursor: pointer;" src="@/assets/longlogo.png" />
        </div>
        <div id="right">
          <img
            id="mail-logo"
            src="@/assets/icon/icons8-important-mail-96@2x.png"
          />
          <img id="profile-logo" src="@/assets/profile/pfpic.jpg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Slide } from "vue-burger-menu";
export default {
  components: {
    Slide,
  },
};
</script>

<style scoped>
#mobile-topbar {
  display: flex;
  background-color: #ffffff;
  position: fixed;
  z-index: 9999;
  width: 100%;
}

#mobile-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#left,
#right {
  display: flex;
  align-items: center;
}

#mobile-container {
  padding: 13px 0px;
}

#logo {
  width: 155px;
  margin-left: 20px;
}

#profile-logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 40px;
  object-fit: cover;
}

#mail-logo {
  width: 30px;
}
</style>
