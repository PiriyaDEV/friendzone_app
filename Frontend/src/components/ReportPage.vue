<template>
  <div id="report" class="event-container">
    <div id="report-section">
      <h1 style="text-align: center" class="event-header">
        SELECT REPORT TYPE
      </h1>
      <div id="box-section">
        <div @click="reportUserReturn()" class="report-box">
          <div class="img-box">
            <img class="icon" src="@/assets/icon/icons8-user-96.png" alt="" />
          </div>
          <h1 class="choice-text">User</h1>
        </div>

        <div @click="reportEventReturn()" class="report-box">
          <div class="img-box">
            <img class="icon" src="@/assets/icon/icons8-event-96.png" alt="" />
          </div>
          <h1 class="choice-text">Event</h1>
        </div>

        <div @click="reportWebReturn()" class="report-box">
          <div class="img-box">
            <img
              class="icon"
              src="@/assets/icon/icons8-website-100.png"
              alt=""
            />
          </div>
          <h1 class="choice-text">Web</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    reportUserReturn() {
      this.$emit("clickReport", true);
      this.$emit("checkReport", 1);
    },
    reportEventReturn() {
      this.$emit("clickReport", true);
      this.$emit("checkReport", 2);
    },
    reportWebReturn() {
      this.$emit("clickReport", true);
      this.$emit("checkReport", 3);
    }
  }
};
</script>

<style scoped>
#report {
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

.report-box {
  background-color: #ffffff;
  box-shadow: 0px 3px 15px #0000000d;
  border-radius: 10px;
  padding: 20px 120px;
  margin-left: 40px;
  margin-right: 40px;
  cursor: pointer;
}

#box-section {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon {
  width: 80px;
}

.choice-text {
  text-align: center;
  font-size: 3em;
  font-weight: 500;
  color: #a0a0a0;
  margin: 0;
}

@media screen and (max-width: 1920px) {
  .report-box {
    padding: 20px 80px;
  }
}

@media screen and (max-width: 1440px) {
  .report-box {
    padding: 20px 40px;
  }
}

@media screen and (max-width: 880px) {
  #report {
    width: auto;
    height: auto;
  }

  .icon {
    width: 50px;
  }

  .report-box {
    padding: 15px 40px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #box-section {
    display: block;
    margin-top: 35px;
  }

  .choice-text {
    padding-left: 30px;
  }

  .img-box {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #report-section {
    width: 100%;
  }
}

@media screen and (max-width: 490px) {
  .icon {
    width: 30px;
  }

  .choice-text {
    padding-left: 15px;
    font-size: 2.75em;
  }
}
</style>
