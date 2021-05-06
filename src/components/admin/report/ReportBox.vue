<template>
    <div :class="cssBox">
      <div id="report-menu">
        <div :class="cssMiddle">
          <h1 id="menu-text-id" :class="cssMenuG">506</h1>
          <h1 :class="cssMenuB">Suspect fake user</h1>
          <h1 :class="cssMenuB">User</h1>
          <h1 :class="cssMenuB">Fake User</h1>
          <h1 v-if="approver" :class="cssMenuB">Raya.ya</h1>
          <div id="pending-dot">
            <span class="dot yellow"></span>
            <h1 :class="cssMenuG">pending</h1>
            <!-- <span class="dot green"></span> -->
            <!-- <h1 class="menu-text">done</h1> -->
          </div>
        </div>
        <div id="button-section">
          <button :class="cssView" @click="viewClick()">View</button>
          <!-- <button v-if="select == 3" class="button delete" >Invite</button> -->
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props:["approver"],
  computed: {
    cssMiddle() {
      let general = "report-middle-menu"
      let app = "report-middle-menu-approver"
      if(this.approver == true) {
        return app
      }
      return general
    },
    cssBox() {
      let general = "reportbox"
      let app = "reportbox-approver"
      if(this.approver == true) {
        return app
      }
      return general
    },
    cssView() {
      let general = "button view"
      let app = "button view-approver"
      if(this.approver == true) {
        return app
      }
      return general
    },
    cssMenuG() {
      let general = "menu-text"
      let app = "menu-gray-approver"
      if(this.approver == true) {
        return app
      }
      return general
    },
    cssMenuB() {
      let general = "menu-text"
      let app = "menu-black-approver"
      if(this.approver == true) {
        return app
      }
      return general
    },
  },
  methods: {
    viewClick() {
      this.$emit("viewReturn",true);
    }
  },
};
</script>

<style scoped>
.reportbox {
  background-color: #4d4d4d;
  border-radius: 23px;
  margin: 10px 0px;
}

.reportbox-approver{
  background-color:#FFFFFF;
  border-radius: 23px;
  margin: 10px 0px;
}

#report-menu {
  align-items: center;
  display: flex;
  width: 100%;
  padding: 3px;
}

#report {
  width: 100%;
}

.menu-text {
  font-size: 1.5em;
  font-weight: 400;
  color: #b2b2b2;
}

.menu-gray-approver{
  font-size: 1.5em;
  font-weight: 400;
  color: #a0a0a0;
}

.menu-black-approver{
  font-size: 1.5em;
  font-weight: 400;
  color: #444444;
}

#menu-text-id {
  padding: 0px 30px;
}

.report-middle-menu {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  align-items: center;
  width: 100%;
}

.report-middle-menu-approver {
  display: grid;
  grid-template-columns: 15% 20% 15% 15% 15% 20%;
  align-items: center;
  width: 100%;
}

.button {
  font-family: "Atten-Round-New";
  font-size: 1.5em;
  font-weight: 550;
  padding: 4px 13px;
  margin: 2px 8px 2px 0px;
  border-radius: 24px;
}

.view {
  color: #ffffff;
  border: 1.5px solid #ffffff;
  background-color: inherit;
}

.view-approver {
  color: #444444;
  border: 1.5px solid #444444;
  background-color: inherit;
}


.dot {
  height: 6px;
  width: 6px;
  background-color: #bbb;
  border-radius: 50%;
  margin-right: 5px;
}

.green {
  background-color: #91f071;
}

.yellow {
  background-color: #ffba1d;
}

#pending-dot {
  display: flex;
  align-items: center;
}
</style>
