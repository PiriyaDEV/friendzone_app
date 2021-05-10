<template>
  <div id="approver" class="event-container">
    <div id="approver-title-box">
      <div>
        <h1 id="approver-title" class="event-header">APPROVER</h1>
        <select id="select-event">
          <option value="all">Recent</option>
          <option value="pending">Pending</option>
          <option value="ongoing">On Going</option>
          <option value="ended">Ended</option>
        </select>
      </div>

      <div id="history-box">
        <h1 class="history-text">{{ this.eventStatusList[0] }}</h1>
        <h1 class="history-text">{{ this.eventStatusList[1] }}</h1>
        <h1 class="history-text">{{ this.eventStatusList[2] }}</h1>
      </div>
    </div>

    <div id="approver-menu">
      <div id="approver-middle-menu">
        <h1 id="menu-text-id" class="menu-text">ID</h1>
        <h1 class="menu-text">TITLE</h1>
        <h1 class="menu-text approver-hide">LOCATION</h1>
        <h1 class="menu-text approver-hide">START DATE</h1>
        <h1 class="menu-text">HOST NAME</h1>
        <h1 class="menu-text">STATUS</h1>
      </div>
      <div id="space-button"></div>
    </div>

    <div id="report-box">
      <div v-for="(event, i) in eventList" :key="i">
        <ReportBox
          :approver="true"
          @viewReturn="viewReturn"
          :event="event"
          @viewData="viewData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ReportBox from "@/components/admin/report/ReportBox.vue";
import EventService from "../services/event.service";

export default {
  data() {
    return {
      eventList: [],
      eventStatusList: []
    };
  },
  created() {
    EventService.getApproverList().then((res) => {
      if (res) {
        this.eventList = res;
      }
    });
    EventService.getEventCount().then((res) => {
      if (res) {
        for(let i = 0 ; i < res.length ; i++ )
        {
          if (res[i].status_id === "ST03")
            this.eventStatusList[i] = `Approved (${res[i].count})`;
          if (res[i].status_id === "ST15")
            this.eventStatusList[i] = `Disapproved (${res[i].count})`;
          if (res[i].status_id === "ST13")
            this.eventStatusList[i] = `Pending (${res[i].count})`;
        }
        

      }

    });
  },
  components: {
    ReportBox
  },
  methods: {
    viewReturn(value) {
      this.$emit("viewShow", value);
      this.$emit("clickManage", value);
    },
    viewData(value) {
      this.$emit("viewData", value);
    }
  }
};
</script>

<style scoped>
#approver {
  margin-top: 110px;
  margin-bottom: 30px;
  overflow-x: hidden;
}

#approver-title {
  margin: 0px 20px 0px 0px;
}

#approver-title-box {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#approver-title-box > div {
  display: flex;
  align-items: center;
}

#history-box {
  background: #e3e3e3;
  border-radius: 6px;
  padding: 3px 8px;
}

.history-text {
  font-size: 1.6em;
  color: #a0a0a0;
  font-weight: 400;
  padding: 0px 8px;
}

#select-event {
  color: #444444;
  height: 20px;
  border: none;
  background-color: transparent;
  font-size: 2em;
  font-family: "Atten-Round-New";
  font-weight: 500;
}

/* Menu */
#space-button {
  width: 70px;
}

#approver-menu {
  align-items: center;
  display: flex;
  width: 100%;
  padding: 3px;
}

#approver-middle-menu {
  display: grid;
  grid-template-columns: 15% 20% 15% 15% 15% 20%;
  align-items: center;
  width: 100%;
}

#menu-text-id {
  padding: 0px 30px;
}

.menu-text {
  font-size: 1.5em;
  font-weight: 400;
  color: #444444;
  margin-bottom: 0px;
  padding: 0px 2px;
}

.approver-hide {
  display: inherit;
}

@media screen and (max-width: 880px) {
  #approver {
    margin-top: 0px;
    margin-bottom: 20px;
  }

  #approver-title-box {
    display: block;
  }

  #history-box {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 15px;
  }
}

@media screen and (max-width: 690px) {
  .approver-hide {
    display: none;
  }

  #approver-middle-menu {
    grid-template-columns: 25% 40% 25% 10%;
  }

  .menu-text {
    font-size: 1.2em;
  }

  #space-button {
    width: 75px;
  }
}
</style>
