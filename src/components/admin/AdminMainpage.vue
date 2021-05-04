<template>
  <div>
    <div id="admin-mainpage" class="event-container">
      <div>
        <div id="flex-select">
          <div @click="editReturn()" id="flex-role" class="flex-box">
            <h1 class="flex-title">ADD NEW ROLES</h1>
            <h1 class="flex-subtitle">TO EXISTING USER</h1>
          </div>
          <div @click="createReturn()" id="flex-discount" class="flex-box">
            <h1 class="flex-title">CREATE NEW DISCOUNT</h1>
            <h1 class="flex-subtitle">FOR USER</h1>
          </div>
          <div @click="editDatabase()" id="flex-edit" class="flex-box">
            <h1 class="flex-title">EDIT DATABASE</h1>
            <h1 class="flex-subtitle">REPORT & CATEGORY TYPE</h1>
          </div>
        </div>

        <div id="middle-column">
          <div id="report">
            <div class="title-section">
              <h1 class="title header white-color">RECENT REPORT</h1>
              <div class="second-title">
                <h1>See All</h1>
                <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
              </div>
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

          <div id="employee">
            <div class="title-section">
              <h1 class="title header white-color">EMPLOYEES</h1>
            </div>
            <div
              style="margin-top:10px; width:330px; height:280px; border:none; background-color: #626262; border-radius: 8px;"
            ></div>
          </div>
        </div>

        <h1 class="title header white-color">RECENT DISCOUNT</h1>

        <div id="discount-page-section">
      <!-- Event -->
      <div class="event-section">
        <div id="container">
          <div
            id="list-container"
            @mouseover="hovered = true"
            @mouseleave="hovered = false"
            class="event-container"
          >
            <div class="list event-flex-section">
              <div v-for="(item, i) in eventList" :key="i">
                <DiscountFlex
                  @clickDiscountFlex="clickDiscountFlex"
                ></DiscountFlex>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Event -->
    </div>
      </div>
    </div>
  </div>
</template>

<script>
import DiscountFlex from "@/components/DiscountFlex.vue";
import ReportBox from "@/components/admin/report/ReportBox.vue";
export default {
  name: "event-page",
  data() {
    return {
      selected: "all",
      eventList: 10,
      joinList: 10,
    };
  },
  components: {
    DiscountFlex,
    ReportBox,
  },
  methods: {
    editReturn() {
      this.$emit("clickEdit", true);
    },
    createReturn() {
      this.$emit("clickCreate", true);
    },
    editDatabase() {
      this.$emit("editDatabase", true);
    },
  },
};
</script>

<style scoped>
#admin-mainpage {
  margin-top: 110px;
  margin-bottom: 30px;
  overflow-x: hidden;
}

.title {
  margin-top: 0px;
}

#flex-select {
  display: flex;
  align-items: center;
  justify-content: center;
}

#middle-column {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.flex-box {
  border: none;
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 55px 0px 20px 20px;
  width: 100%;
}

.flex-title {
  color: #ffffff;
  font-size: 2.5em;
  font-weight: 500;
  margin: 0px;
}

.flex-subtitle {
  color: #ffffff;
  font-size: 1.75em;
  font-weight: 400;
  margin: 0px;
}

#flex-discount,
#flex-role,
#flex-edit {
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: cover;
}

#flex-role {
  background-image: url("~@/assets/admin/Asset 3@4x.png");
  margin-right: 25px;
}

#flex-discount {
  background-image: url("~@/assets/admin/Asset 2@4x.png");
  margin-right: 25px;
}

#flex-edit {
  background-image: url("~@/assets/admin/Asset 4@4x.png");
}

.title-section,
.second-title {
  display: flex;
  align-items: center;
}

.second-title {
  margin-left: 15px;
}

.fa-long-arrow-right,
.second-title > h1 {
  color: #ffffff;
  margin: 0px 0px 0px 7px;
  font-size: 2em;
  font-weight: 500;
  cursor: pointer;
}

.fa-angle-left {
  font-size: 4.25em;
  color: #ffffff;
  padding-bottom: 3px;
  padding-right: 17px;
  cursor: pointer;
}

.header {
  font-size: 3.75em;
  margin: 0px;
}

#discount-page-section {
  margin-top: 20px;
}

#report-middle-menu {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  align-items: center;
  width: 100%;
}

#report-menu {
  align-items: center;
  display: flex;
  width: 100%;
  padding: 3px;
}

#report {
  width: 100%;
  margin-right: 20px;
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
  width: 80px;
}

#report-box {
  overflow-y: auto;
  overflow-x: hidden;
  height: 260px;
}

</style>
