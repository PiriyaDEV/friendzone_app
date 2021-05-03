<template>
  <div id="eventinfo">
    <div id="info-section" class="section">
      <div id="left">
        <img id="event-image" :src="event.event_pic" alt="" />
        <div class="info-box">
          <div>
            <h1 class="info-title">Title</h1>
          </div>
          <div>
            <h1 class="info-text">{{ event.title }}</h1>
          </div>
        </div>

        <div class="info-box">
          <h1>Description</h1>
          <h1 class="info-description">
            {{ event.description }}
          </h1>
        </div>
      </div>

      <div id="right">
        <div class="info-box">
          <div>
            <h1 class="info-title">Event ID</h1>
            <h1 class="info-title">Host</h1>
            <h1 class="info-title">Location</h1>
            <h1 class="info-title">Start On</h1>
            <h1 class="info-title">End On</h1>
          </div>
          <div>
            <h1 class="info-eventid">{{ event.event_id }}</h1>
            <h1 class="info-text">{{ event.username }}</h1>
            <h1 class="info-text">{{ event.location }}</h1>
            <h1 class="info-text">{{ start_at }}</h1>
            <h1 class="info-text">{{ end_at }}</h1>
          </div>
        </div>
        <div id="info-flex-box">
          <h1 class="info-title">Participant Gender</h1>
          <div id="select-box">
            <div v-for="(item, i) in genderList" :key="i">
              <h1 class="info-text">{{ item.gender_name }}</h1>
            </div>
          </div>
        </div>
        <div id="info-flex-box" style="margin-top:10px;">
          <h1 class="info-title">Event Category</h1>
          <div id="select-box">
            <div v-for="(item, i) in categoryList" :key="i">
              <h1 class="info-text">{{ item.category_name }}</h1>
            </div>
          </div>
        </div>
        <div class="info-box">
          <div>
            <h1 class="info-title">Max Participants</h1>
            <h1 class="info-title">Age Limits</h1>
          </div>
          <div>
            <h1 class="info-text">{{ event.max_participant }} Participants</h1>
            <h1 class="info-text">
              {{ event.min_age }} - {{ event.max_age }} Years Old
            </h1>
          </div>
        </div>
      </div>
    </div>

    <div class="button-section">
      <button class="back_button" @click="rateReturn()">Delete Event</button>
      <button class="create_button" @click="done()">
        Done
      </button>
    </div>
  </div>
</template>

<script>
import EventService from "@/services/event.service";

export default {
  data() {
    return {
      start_at: "",
      end_at: "",
      categoryList: [],
      genderList: [],
      months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    };
  },
  props: ["event"],
  created() {
    EventService.getEventGenderList(this.event.event_id).then((res) => {
      if (res) {
        this.genderList = res;
      }
    });
    EventService.getEventCategoryList(this.event.event_id).then((res) => {
      if (res) {
        this.categoryList = res;
      }
    });
    let start_at = new Date(this.event.start_at);
    let end_at = new Date(this.event.end_at);
    let startDate = start_at.getDate();
    let startMonth = start_at.getMonth();
    let startYear = start_at.getFullYear();
    let startHours = start_at
      .getHours()
      .toString()
      .padStart(2, "0");
    let startMins = start_at
      .getMinutes()
      .toString()
      .padStart(2, "0");
    let endDate = end_at.getDate();
    let endMonth = end_at.getMonth();
    let endYear = end_at.getFullYear();
    let endHours = end_at
      .getHours()
      .toString()
      .padStart(2, "0");
    let endMins = end_at
      .getMinutes()
      .toString()
      .padStart(2, "0");
    this.start_at = `${startDate} ${this.months[startMonth]} ${startYear} ${startHours}:${startMins}`;
    this.end_at = `${endDate} ${this.months[endMonth]} ${endYear} ${endHours}:${endMins}`;

    // if (this.event.gender.length == 3) this.gender = "ALL GENDERS";
    // else if (this.event.gender.length == 2)
    //   this.gender = `${this.event.gender[0].toUpperCase()} AND ${this.event.gender[1].toUpperCase()} ONLY`;
    // else if (this.event.gender.length == 1)
    //   this.gender = `${this.event.gender[0].toUpperCase()} ONLY`;
  },
  methods: {
    done() {
      this.$emit("doneClick", false);
    },
  },
};
</script>

<style scoped>
h1 {
  color: #444444;
}

#info-section {
  display: flex;
  margin-top: 20px;
}

#left,
#right {
  width: 360px;
}

#left {
  margin-right: 20px;
}

#right {
  margin-left: 20px;
}

#eventinfo {
  margin-top: 5px;
}

#event-image {
  margin-top: 10px;
  width: 350px;
  height: 200px;
  object-fit: cover;
  border: 2px solid #444444;
  border-radius: 9px;
}

.info-title,
.info-text {
  font-size: 2em;
  margin: 10px 0px;
}

.info-text,
.info-description {
  font-weight: 400;
  color: #a0a0a0;
}

.info-eventid {
  color: #ff8864;
}

.info-description {
  max-width: 500px;
}

.info-box {
  display: grid;
  grid-template-columns: 40% 60%;
}

#info-flex-box > .info-title {
  margin: 0px;
}

#select-box {
  display: flex;
  margin-top: 10px;
}

#select-box > div > h1 {
  margin: 0px 10px 0px 0px;
  color: #a0a0a0;
  font-size: 1.6em;
  background: #e3e3e3;
  border-radius: 28px;
  padding: 3px 18px;
}
</style>
