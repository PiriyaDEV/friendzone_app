<template>
  <div id="rate-popup" class="popup">
    <div class="popup-section section">
      <div class="popup-form">
        <h1 v-if="checkParticipants == true" class="header_title">
          RATE PARTICIPANT
        </h1>
        <h1 v-else class="header_title">RATE EVENT</h1>
        <div class="rate-popup-section">
          <div id="left">
            <h1 class="orange_title">Event Details</h1>
            <div id="event-detail">
              <h1 class="black-color">
                {{ event.title }}
              </h1>
              <h1 class="black-color">
                ID :<span class="orange-color"> {{ event.event_id }}</span>
              </h1>
              <h1 class="detail-text gray-color">
                {{ event.location }}
              </h1>

              <div id="image-section">
                <img
                  class="user"
                  src="@/assets/event/icons8-customer-100.png"
                />
                <h1 class="detail-text black-color" style="margin: 0">
                  {{ participant }} (Including Host)
                </h1>
              </div>

              <h1 class="detail-text black-color">
                Hosted <span class="orange-color">by {{ event.username }}</span>
              </h1>
              <h1 class="detail-text black-color">
                Start on : <span class="gray-color">{{ start_at }}</span>
              </h1>
              <h1 class="detail-text black-color">
                End on : <span class="gray-color">{{ end_at }}</span>
              </h1>

              <div id="description">
                <h1 class="detail-text black-color" style="margin-right: 2px">
                  Description<span style="opacity: 0">.</span>:
                </h1>
                <h1 class="detail-text gray-color" style="margin-left: 2px">
                  {{ event.description }}
                </h1>
              </div>

              <h1 class="detail-text black-color">
                Category : <span class="gray-color">{{ category }}</span>
              </h1>
              <h1 class="detail-text black-color">
                Preferred Participants Gender :
                <span class="gray-color">{{ gender }}</span>
              </h1>
              <h1 class="detail-text black-color">
                Max Participants : <span class="gray-color">{{ event.max_participant }}</span>
              </h1>
              <h1 class="detail-text black-color">
                Age Limits : <span class="gray-color">{{ event.min_age }} - {{ event.max_age }}</span>
              </h1>
            </div>
          </div>
          <div id="right">
            <h1 class="orange_title">Rating Area</h1>
            <div id="rate-detail">
              <!-- Input -->
              <div v-if="checkParticipants == true">
                <h2 class="input_title">
                  Participants<span class="orange-color"> *</span>
                </h2>
                <select
                  name="gender"
                  class="input_select minimal"
                  v-model="user_selected"
                  required
                >
                  <option value="" disabled selected hidden>
                    select participants
                  </option>
                  <option value="1">Harry</option>
                  <option value="2">Piriya</option>
                  <option value="3">Bm</option>
                  <option value="3">Big</option>
                  <option value="3">4Most</option>
                </select>
              </div>
              <!-- Input -->

              <!-- Input -->
              <div>
                <h2 class="input_title">
                  Rating<span class="orange-color"> *</span>
                </h2>
                <div class="section">
                  <!-- Star -->
                  <div>
                    <!-- <img class="star" src="@/assets/icon/icons8-star-96.png" /> -->
                    <img
                      class="star"
                      src="@/assets/icon/icons8-star-96-orange.png"
                    />
                  </div>
                  <!-- Star -->

                  <!-- Star -->
                  <div>
                    <img class="star" src="@/assets/icon/icons8-star-96.png" />
                    <!-- <img class="star" src="@/assets/icon/icons8-star-96-orange.png" /> -->
                  </div>
                  <!-- Star -->

                  <!-- Star -->
                  <div>
                    <img class="star" src="@/assets/icon/icons8-star-96.png" />
                    <!-- <img class="star" src="@/assets/icon/icons8-star-96-orange.png" /> -->
                  </div>
                  <!-- Star -->

                  <!-- Star -->
                  <div>
                    <img class="star" src="@/assets/icon/icons8-star-96.png" />
                    <!-- <img class="star" src="@/assets/icon/icons8-star-96-orange.png" /> -->
                  </div>
                  <!-- Star -->

                  <!-- Star -->
                  <div>
                    <img class="star" src="@/assets/icon/icons8-star-96.png" />
                    <!-- <img class="star" src="@/assets/icon/icons8-star-96-orange.png" /> -->
                  </div>
                  <!-- Star -->
                </div>
              </div>
              <!-- Input -->

              <!-- Input -->
              <div>
                <h2 class="input_title">Comment</h2>
                <textarea
                  class="input_textarea_box bio"
                  maxlength="256"
                  size="256"
                  name="bio"
                  placeholder="enter your comment"
                >
                </textarea>
              </div>
              <!-- Input -->
            </div>
          </div>
        </div>

        <div class="button-section">
          <button class="back_button" @click="rateReturn()">Cancel</button>
          <button class="create_button" @click="test()">
            Submit Rating
          </button>
        </div>

        <img
          @click="rateReturn()"
          style="cursor: pointer"
          class="close"
          src="@/assets/icon/icons8-multiply-96.png"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RatePopup",
  props: ["checkParticipants", "event"],
  data() {
    return {
      user_selected: "",
      participant: "",
      start_at: "",
      end_at: "",
      gender: "-",
      category: "-",
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
  created() {
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

    if (this.event.joined == 1)
      this.participant = `${this.event.joined} Participant`;
    else if (this.event.joined > 1)
      this.participant = `${this.event.joined} Participants`;

    if (this.event.gender.length == 3) this.gender = "All genders";
    else if (this.event.gender.length == 2)
      this.gender = `${this.event.gender[0]}, ${this.event.gender[1]}`;
    else if (this.event.gender.length == 1)
      this.gender = `${this.event.gender[0]}`;
  },
  methods: {
    rateReturn() {
      this.$emit("clickShowed", false);
    },
    test() {
      alert(this.checkParticipants);
    },
  },
};
</script>

<style scoped>
.rate-popup-section {
  display: flex;
  justify-content: center;
}
#right {
  margin-left: 30px;
}

#left {
  margin-right: 30px;
}

#image-section,
#description {
  display: flex;
}

#image-section {
  align-items: center;
}

.comment {
  font-size: 1.75em;
  font-weight: 600;
  color: #444444;
  width: calc(100% - 15px);
  border: 2px solid #e3e3e3;
  border-radius: 10px;
  margin-bottom: 2px;
  box-shadow: none;
  padding-bottom: 163px;
  padding-top: 12px;
  padding-left: 15px;
}

.user {
  width: 16px;
  margin-right: 4px;
}

.star {
  width: 50px;
  margin-right: 4px;
}

#back_button_popup {
  color: #ff8864;
  font-size: 2.5em;
  font-family: "Atten-Round-New";
  text-align: center;
  width: 287px;
  padding: 9px 0px;
  background-color: #ffffff;
  border-radius: 35px;
  border: 2px solid #ff8864;
  margin-top: 31px;
  transition: 0.3s;
  margin-bottom: 30px;
  font-weight: 500;
}

#event-detail {
  border: 2px solid #444444;
  border-radius: 10px;
  padding: 9px 20px;
  width: 300px;
}

#rate-detail {
  width: 300px;
}

.detail-text {
  font-size: 1.75em;
  font-weight: 500;
  margin: 8px 0px;
}

.input_select {
  font-size: 1.75em;
  font-weight: 600;
  width: 100%;
  padding: 9px 12px 9px 15px;
  border: 2px solid #e3e3e3;
  border-radius: 10px;
  margin-bottom: 2px;
  box-shadow: none;
  font-family: "Atten-Round-New";
}

select {
  /* styling */
  background-color: white;
  border: thin solid #e3e3e3;
  border-radius: 4px;
  display: inline-block;
  font: inherit;
  line-height: 1.5em;
  padding: 0.5em 3.5em 0.5em 1em;

  /* reset */

  margin: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
}

select.minimal {
  background-image: linear-gradient(45deg, transparent 50%, #e3e3e3 50%),
    linear-gradient(135deg, #e3e3e3 50%, transparent 50%);
  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;
}

select.minimal:focus {
  background-image: linear-gradient(45deg, #e3e3e3 50%, transparent 50%),
    linear-gradient(135deg, transparent 50%, #e3e3e3 50%);
  background-position: calc(100% - 15px) 1em, calc(100% - 20px) 1em,
    calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;
  border-color: #e3e3e3;
  outline: 0;
}

select:-moz-focusring {
  color: transparent;
  text-shadow: 0 0 0 #000;
}

select:required:invalid {
  color: #cccccc;
}
select,
option {
  color: #444444;
}

.input_textarea_box {
  font-size: 1.75em;
  font-weight: 600;
  color: #a0a0a0;
  padding: 7px 12px 7px 15px;
  border: 2px solid #e3e3e3;
  border-radius: 10px;
  margin-bottom: 2px;
  box-shadow: none;
  width: 270px;
  line-height: 21px;
}

.bio {
  padding-bottom: 140px;
}
</style>
