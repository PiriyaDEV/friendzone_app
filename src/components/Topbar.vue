<template>
  <!-- Top Bar -->
  <div id="topbar" class="event-container">
    <div id="search-bar">
      <!-- Input -->
      <div class="left-inner-addon input-container">
        <i class="fa fa-search"></i>
        <input
          type="text"
          class="search-input"
          placeholder="find Event, friend, and discount"
        />
      </div>
      <!-- Input -->
    </div>

    <div id="right-bar" class="section">
      <div id="coin" class="section">
        <img id="coin-logo" src="@/assets/icon/coin.png" />
        <h1 id="bar-value">2500</h1>
      </div>

      <div @click="detailReturn()" id="profile-box" class="section" style ="cursor: pointer;">
        <img id="profile-logo" src="@/assets/profile/pfpic.jpg" />
        <h1 id="bar-value">pd.piriya</h1>
      </div>
    </div>
  </div>
  <!-- Top Bar -->
</template>

<script>
export default {
    methods: {
    detailReturn() {
      this.$emit("clickDetail",true);
      },
  },
};
</script>

<style scoped>
#topbar {
  background-color: #f8f3ec;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 25px;
  padding-bottom: 15px;
  z-index: 999;
  position: fixed;
}

.input-container {
  padding-bottom: 1em;
}
.left-inner-addon {
  position: relative;
}
.left-inner-addon input {
  padding-left: 42px !important;
}
.left-inner-addon i {
  position: absolute;
  padding: 14px 13px;
  pointer-events: none;
}

.search-icon {
  width: 20px;
  margin-top: -10px;
  margin-left: -43px;
  z-index: 4;
  cursor: pointer;
}

input {
  width: 100%;
  padding: 1em !important;
  margin: 0em !important;
  box-sizing: border-box;
}

.search-input {
  width: 700px;
  font-size: 1.75em;
  font-weight: 400;
  background-color: #ffffff;
  color: E3E3E3;
  border-radius: 8px;
  border: none;
}

i {
  color: #e3e3e3;
  width: 30px;
  display: block;
}

.fa {
  font-size: initial;
}

#coin-logo {
  width: 30px;
}

#bar-value {
  font-size: 2em;
  margin-left: 13px;
}

#profile-logo {
  width: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

#profile-box {
  background-color: #ffffff;
  border-radius: 27px;
  padding: 7px 20px 7px 7px;
  margin-left: 57px;
}
</style>