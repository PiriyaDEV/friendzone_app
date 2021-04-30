<template>
  <div id="eventinfo">
    <div class="info-box">
      <div class="left">
        <h1 class="info-title">Host</h1>
        <h1 class="info-title">Title</h1>
        <h1 class="info-title">Event ID</h1>
      </div>
      <div class="left">
        <h1 class="info-text">{{ event.username }}</h1>
        <h1 class="info-text">{{ event.title }}</h1>
        <h1 class="info-eventid">{{ event.event_id }}</h1>
      </div>
    </div>

    <div class="info-box">
      <h1>Description</h1>
      <h1 class="info-description">
        {{ event.description }}
      </h1>
    </div>

    <div class="info-box">
      <div class="left">
        <h1 class="info-title">Location</h1>
        <h1 class="info-title">Start On</h1>
        <h1 class="info-title">End On</h1>
        <h1 class="info-title">Participant Gender</h1>
        <h1 class="info-title">Max Participants</h1>
        <h1 class="info-title">Age Limits</h1>
      </div>
      <div class="left">
        <h1 class="info-text">{{ event.location }}</h1>
        <h1 class="info-text">{{ start_at }}</h1>
        <h1 class="info-text">{{ end_at }}</h1>
        <h1 class="info-text">{{ gender }}</h1>
        <h1 class="info-text">{{ event.max_participant }} PARTICIPANTS</h1>
        <h1 class="info-text">
          {{ event.min_age }} - {{ event.max_age }} YEARS OLD
        </h1>
      </div>
    </div>

    <div class="button-section">
      <button class="back_button" @click="rateReturn()">Delete Event</button>
      <button class="create_button" @click="test()">
        Done
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      start_at: "",
      end_at: "",
      gender: "-",
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
    console.log(this.event);
    let start_at = new Date(this.event.start_at);
    let end_at = new Date(this.event.end_at);
    let startDate = start_at.getDate();
    let startMonth = start_at.getMonth();
    let startYear = start_at.getFullYear();
    let startHours = start_at.getHours().toString().padStart(2, '0');
    let startMins = start_at.getMinutes().toString().padStart(2, '0');
    let endDate = end_at.getDate();
    let endMonth = end_at.getMonth();
    let endYear = end_at.getFullYear();
    let endHours = end_at.getHours().toString().padStart(2, '0');
    let endMins = end_at.getMinutes().toString().padStart(2, '0');
    this.start_at = `${startDate} ${this.months[startMonth]} ${startYear} ${startHours}:${startMins}`;
    this.end_at = `${endDate} ${this.months[endMonth]} ${endYear} ${endHours}:${endMins}`;

    if (this.event.gender.length == 3) this.gender = "ALL GENDERS";
    else if (this.event.gender.length == 2)
      this.gender = `${this.event.gender[0].toUpperCase()} AND ${this.event.gender[1].toUpperCase()} ONLY`;
    else if (this.event.gender.length == 1)
      this.gender = `${this.event.gender[0].toUpperCase()} ONLY`;
  },
};
</script>

<style scoped>
h1 {
  color: #444444;
}

#eventinfo {
  margin-top: 5px;
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
</style>
