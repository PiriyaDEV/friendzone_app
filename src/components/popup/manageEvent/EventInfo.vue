<template>
  <div id="eventinfo">
    <div id="info-section">
      <div id="left">
        <div id="image-box">
          <img id="event-image" :src="event.event_pic" alt="" />
        </div>
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
        <div id="info-flex-box-section">
          <div id="info-flex-box">
            <h1 class="info-title">Participant Gender</h1>
            <div id="select-box">
              <div v-for="(item, i) in genderList" :key="i">
                <h1 class="info-text">{{ item.gender_name }}</h1>
              </div>
            </div>
          </div>
          <div id="info-flex-box" style="margin-top: 10px">
            <h1 class="info-title">Event Category</h1>
            <div id="select-box">
              <div v-for="(item, i) in categoryList" :key="i">
                <h1 class="info-text">{{ item.category_name }}</h1>
              </div>
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

    <div v-if="!view">
      <div v-if="manageReturn" class="button-section">
        <button v-if="endShow" @click="deleteClick()" class="back_button">
          End Event
        </button>
        <button v-if="!endShow && event.status_id != 'ST07'" @click="deleteClick()" class="back_button">
          Delete Event
        </button>
        <button v-if="event.status_id != 'ST07'" class="create_button" @click="done()">Done</button>
      </div>
      <div id="single-button">
        <button v-if="detailReturn || event.status_id == 'ST07'" class="create_button" @click="done()">
          Done
        </button>
      </div>
    </div>

    <div
      v-if="event.status_id !== this.statusCheck && view == true"
      id="spacer"
    ></div>

    <div v-if="view == true" class="button-section">
      <button
        v-if="event.status_id == this.statusCheck"
        id="disapprove_button"
        class="back_button"
        @click="approve(false)"
      >
        Disapprove
      </button>
      <button
        v-if="event.status_id == this.statusCheck"
        id="approve_button"
        class="back_button"
        @click="approve(true)"
      >
        Approve
      </button>
    </div>
  </div>
</template>

<script>
import EventService from "@/services/event.service";

export default {
  data() {
    return {
      statusCheck: "ST13",
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
  props: [
    "event",
    "eventReturn",
    "manageReturn",
    "detailReturn",
    "view",
    "endShow",
  ],
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
    approve(boolean) {
      EventService.approving(
        this.event.event_id,
        this.event.host_id,
        boolean
      ).then(() => {
        if (boolean) {
          this.$emit("updateStatus", {
            event_id: this.event.event_id,
            status_id: "ST03",
          });
        } else {
          this.$emit("updateStatus", {
            event_id: this.event.event_id,
            status_id: "ST15",
          });
        }
        this.$emit("doneClick", false);
      });
    },
    deleteClick() {
      this.$emit("information", true);
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
  justify-content: center;
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

#single-button {
  display: flex;
  align-items: center;
  justify-content: flex-end;
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

#spacer {
  height: 30px;
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

#disapprove_button {
  border: 2px solid #fd6363 !important;
  color: #fd6363;
}

#approve_button {
  border: 2px solid #1ed32c !important;
  color: #1ed32c;
}

@media screen and (max-width: 1024px) {
  #info-section {
    display: block;
  }

  #left,
  #right {
    margin: 0px;
    width: 100%;
  }

  #image-box {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }

  .info-box {
    grid-template-columns: 50% 50%;
  }

  .create_button,
  .back_button {
    width: 150px !important;
  }

  #event-image {
    width: 330px;
    height: 190px;
  }
}

@media screen and (max-width: 690px) {
  .create_button,
  .back_button {
    width: 120px !important;
  }

  .info-text,
  .info-description {
    font-size: 1.6em;
  }

  #event-image {
    width: 300px;
    height: 170px;
  }
}

@media screen and (max-width: 490px) {
  .popup-form {
    padding: 0px 40px !important;
  }

  #event-image {
    width: 250px;
    height: 150px;
  }
}
</style>
