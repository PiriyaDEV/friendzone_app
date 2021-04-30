<template>
  <div id="admin-report" class="event-container">
    <div>
      <div id="title-box">
        <h1 class="title header white-color">REPORT</h1>
        <select id="select-report" v-model="selected">
          <option value="all">All Event</option>
          <option value="host">Hosted</option>
          <option value="interest">Interested</option>
        </select>
      </div>

      <div>
        <div id="report-menu">
          <div id="report-middle-menu">
            <h1 id="menu-text-id" class="menu-text">ID</h1>
            <h1 class="menu-text">TITLE</h1>
            <h1 class="menu-text">TYPE</h1>
            <h1 class="menu-text">CAREGORIES</h1>
            <h1 class="menu-text">STATUS</h1>
          </div>
          <div id="space-button"></div>
        </div>
        <div id="report-box">
          <div v-for="(item, i) in eventList" :key="i">
            <ReportBox />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReportBox from "@/components/admin/report/ReportBox.vue";
export default {
  name: "admin-report",
  data() {
    return {
      selected: "all",
      eventList: 20,
    };
  },
  components: {
    ReportBox,
  },
};
</script>

<style scoped>
#admin-report {
  margin-top: 110px;
  margin-bottom: 30px;
  overflow-x: hidden;
}

.title {
  margin-top: 0px;
}

.header {
  font-size: 3.75em;
  margin: 0px;
}

#title-box {
  display: flex;
  align-items: center;
}

#select-report {
  color: #ffffff;
  height: 20px;
  margin-left: 15px;
  border: none;
  background-color: transparent;
  font-size: 2em;
  font-family: "Atten-Round-New";
  font-weight: 500;
}

#report-menu {
  align-items: center;
  display: flex;
  width: 100%;
  padding: 3px;
}

#report-middle-menu {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  align-items: center;
  width: 100%;
}

.menu-text {
  font-size: 1.5em;
  font-weight: 400;
  color: #b2b2b2;
  margin-bottom: 0px;
}

#menu-text-id {
  padding: 0px 30px;
}

#space-button {
  width: 68px;
}
</style>
