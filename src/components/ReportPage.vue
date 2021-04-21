<template>
  <div id="report" class="event-container">
    <div id="report-section">
      <h1 style="text-align: center" class="event-header">
        SELECT REPORT TYPE
      </h1>
      <div id="box-section" class="section">
        <div @click="reportUserReturn()" class="report-box">
          <img class="icon" src="@/assets/icon/icons8-user-96.png" alt="" />
          <h1 class="choice-text">User</h1>
        </div>

        <div @click="reportEventReturn()" class="report-box">
          <img class="icon" src="@/assets/icon/icons8-event-96.png" alt="" />
          <h1 class="choice-text">Event</h1>
        </div>

        <div @click="reportWebReturn()" class="report-box">
          <img class="icon" src="@/assets/icon/icons8-website-100.png" alt="" />
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
    },
  },
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
  padding: 20px 40px;
  margin-left: 40px;
  margin-right: 40px;
  cursor: pointer;
}

#box-section {
  margin-top: 50px;
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
</style>
