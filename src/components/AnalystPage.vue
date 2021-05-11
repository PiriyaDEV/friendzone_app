<template>
  <div id="analyst" class="event-container">
    <h1 id="analyst-title" class="event-header">ANALYTICS</h1>
    <div id="analyst-section">
      <div id="left">
        <!-- Yellow Block -->
        <div id="yellow-block-container">
          <div class="yellow-block yellow-right">
            <h1 class="small-purple">Total</h1>
            <h1 class="large-purple">USERS</h1>
            <h1 class="number-font">572</h1>
          </div>
          <div class="yellow-block yellow-right">
            <h1 class="small-purple">Total</h1>
            <h1 class="large-purple">EVENTS</h1>
            <h1 class="number-font">1056</h1>
          </div>
          <div class="yellow-block">
            <h1 class="small-purple">Total</h1>
            <h1 class="large-purple">DISCOUNTS</h1>
            <h1 class="number-font">38</h1>
          </div>
        </div>

        <!-- User History -->
        <div id="user-history" class="white-box">
          <div id="user-history-menu">
            <h1 class="subheader">USER HISTORY</h1>
          </div>
          <div id="user-graph">
            <UserGraph />
          </div>
        </div>

        <!-- Statistic -->
        <div id="stat-info">
          <StatInfo />
        </div>
      </div>
      <div id="right" class="white-box">
        <StatEvent />
      </div>
    </div>
  </div>
</template>

<script>
import StatInfo from "@/components/analyst/StatInfo.vue";
import StatEvent from "@/components/analyst/StatEvent.vue";
import UserGraph from "@/components/analyst/UserGraph.vue";
export default {
  components: {
    UserGraph,
    StatInfo,
    StatEvent
  },
  data() {
    return {
      userHistoryList: 30
    };
  }
};
</script>

<style scoped>
#analyst {
  margin-top: 110px;
  margin-bottom: 30px;
  overflow-x: hidden;
}

#analyst-title {
  margin-top: 0px;
}

#analyst-section {
  display: flex;
  justify-content: flex-start;
}

#left {
  margin-right: 10px;
  width: 100%;
}

#right {
  margin-left: 10px;
  padding: 15px 20px;
  width: 520px;
}

.white-box {
  background-color: #ffffff;
  border-radius: 10px;
}

#yellow-block-container {
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.yellow-block {
  background: transparent linear-gradient(180deg, #ffe164 0%, #ffc661 100%);
  border-radius: 10px;
  padding: 15px 20px;
  width: 100%;
}

.yellow-right {
  margin-right: 20px;
}

/* Yellow Font */
.small-purple {
  font-size: 1.6em;
  margin: 0px;
  font-weight: 400;
  color: #5d36ff;
}

.large-purple {
  font-size: 2.25em;
  margin: 0px;
  font-weight: 500;
  color: #5d36ff;
}

.number-font {
  font-size: 3.5em;
  font-weight: 600;
  color: #444444;
  margin: 0px;
}

#user-history {
  padding: 13px 17px;
}

#user-history {
  margin-top: 25px;
}

#range-select {
  background: #e3e3e3;
  border-radius: 20px;
  padding: 2px;
  color: #e3e3e3;
}

#range-select > h1 {
  font-size: 1.3em;
  font-weight: 500;
  color: #444444;
  margin: 0px;
}

.unselected {
  background-color: transparent;
  padding: 2px 18px;
}

.selected {
  background-color: #ff8864;
  padding: 2px 18px;
  border-radius: 20px;
  color: #ffffff !important;
}

#user-history-menu,
#range-select {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#user-history-menu {
  margin-bottom: 15px;
}

.subheader {
  font-size: 2.5em;
  color: #444444;
  margin: 0px;
}

div::-webkit-scrollbar {
  height: 3px;
  width: 5px;
}

@media screen and (max-width: 1920px) {
  #right{
    width:420px;
  }
}

@media screen and (max-width: 1350px) {
  #analyst-section{
    display: block;
  }

  #right,#left{
    margin-right:0px;
    margin-left:0px;
  }

  #right{
    margin-top:20px;
    width:calc(100% - 40px);
  }
}

@media screen and (max-width: 880px) {
  #analyst {
    margin-top: 0px;
  }
}

@media screen and (max-width: 490px) {
  #yellow-block-container{
    display: block;
  }

  .yellow-block {
    width:calc(100% - 40px);
    padding: 10px 20px;
  }

  .yellow-block:nth-child(2),.yellow-block:nth-child(3){
    margin-top:20px;
  }
}
</style>
