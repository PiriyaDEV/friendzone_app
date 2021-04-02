<template>
  <div id="create-event" class="popup">
    <div class="popup-section section">
      <div class="popup-form">
        <h1 class="header_title">CREATE NEW EVENT</h1>
        <div id="create-event-section">
          <div id="left">
            <!-- Input -->
            <div>
              <h2 class="input_title">Event Picture<span class="orange-color"> *</span></h2>
              <div id="select-photo-section" class="section">
                <div id="select-photo-inside" class="section">
                  <img
                    id="addphoto"
                    @click="goMainpage()"
                    src="@/assets/icon/icons8-add-image-96.png"
                  />
                  <h1 class="upload">upload photo</h1>
                </div>
              </div>
            </div>
            <!-- Input -->

            <!-- Input -->
            <div>
              <h2 class="input_title">Title<span class="orange-color"> *</span></h2>
              <input
                v-model="username"
                class="input_box"
                type="text"
                maxlength="30"
                size="30"
                placeholder="enter your event title"
              />
            </div>
            <!-- Input -->

            <!-- Input -->
            <div>
              <h2 class="input_title">Description<span class="orange-color"> *</span></h2>
              <textarea
                class="input_textarea_box bio"
                maxlength="256"
                size="256"
                name="bio"
                placeholder="enter your event description"
              >
              </textarea>
            </div>
            <!-- Input -->

            <!-- Input -->
            <div>
              <h2 class="input_title">Location</h2>
              <input
                v-model="username"
                class="input_box"
                type="text"
                maxlength="30"
                size="30"
                placeholder="enter your location"
              />
            </div>
            <!-- Input -->
          </div>
          <div id="right">
            <!-- Input -->
            <div>
              <h2 class="input_title">Start On<span class="orange-color"> *</span></h2>
              <div class="date-section">
                <input
                  id="day"
                  class="date_box_popup"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="2"
                  size="2"
                  v-model="day"
                  placeholder="day"
                />
                <h1 style="margin-left: 10px; color: #e3e3e3">/</h1>
                <input
                  id="month"
                  style="margin-left: 10px"
                  class="date_box_popup"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="2"
                  size="2"
                  v-model="month"
                  placeholder="month"
                />
                <h1 style="margin-left: 10px; color: #e3e3e3">/</h1>
                <input
                  id="year"
                  style="margin-left: 10px"
                  class="date_box_popup"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="4"
                  size="4"
                  v-model="year"
                  placeholder="year"
                />
              </div>
              <div class="time-section">
                <input
                  id="h1"
                  class="date_box_popup"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="1"
                  size="1"
                  v-model="h1"
                  placeholder="0"
                />
                <input
                  id="h2"
                  style="margin-left: 10px"
                  class="date_box_popup"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="1"
                  size="1"
                  v-model="h2"
                  placeholder="0"
                />
                <h1
                  style="
                    font-size: 3em;
                    margin-top: 5px;
                    margin-left: 10px;
                    color: #e3e3e3;
                  "
                >
                  :
                </h1>
                <input
                  id="m1"
                  style="margin-left: 10px"
                  class="date_box_popup"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="1"
                  size="1"
                  v-model="m1"
                  placeholder="0"
                />
                <input
                  id="m2"
                  style="margin-left: 10px"
                  class="date_box_popup"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="1"
                  size="1"
                  v-model="m2"
                  placeholder="0"
                />
              </div>
            </div>
            <!-- Input -->

            <!-- Input -->
            <div>
              <h2 class="input_title">End On</h2>
              <div class="date-section">
                <input
                  id="day"
                  class="date_box_popup"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="2"
                  size="2"
                  v-model="day"
                  placeholder="day"
                />
                <h1 style="margin-left: 10px; color: #e3e3e3">/</h1>
                <input
                  id="month"
                  style="margin-left: 10px"
                  class="date_box_popup"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="2"
                  size="2"
                  v-model="month"
                  placeholder="month"
                />
                <h1 style="margin-left: 10px; color: #e3e3e3">/</h1>
                <input
                  id="year"
                  style="margin-left: 10px"
                  class="date_box_popup"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="4"
                  size="4"
                  v-model="year"
                  placeholder="year"
                />
              </div>
              <div class="time-section">
                <input
                  id="h1"
                  class="date_box_popup"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="1"
                  size="1"
                  v-model="h1"
                  placeholder="0"
                />
                <input
                  id="h2"
                  style="margin-left: 10px"
                  class="date_box_popup"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="1"
                  size="1"
                  v-model="h2"
                  placeholder="0"
                />
                <h1
                  style="
                    font-size: 3em;
                    margin-top: 5px;
                    margin-left: 10px;
                    color: #e3e3e3;
                  "
                >
                  :
                </h1>
                <input
                  id="m1"
                  style="margin-left: 10px"
                  class="date_box_popup"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="1"
                  size="1"
                  v-model="m1"
                  placeholder="0"
                />
                <input
                  id="m2"
                  style="margin-left: 10px"
                  class="date_box_popup"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="1"
                  size="1"
                  v-model="m2"
                  placeholder="0"
                />
              </div>
            </div>
            <!-- Input -->

            <!-- Input -->
            <div>
              <h2 class="input_title">Preferred Participant Gender<span class="orange-color"> *</span></h2>
              <select
                name="gender"
                class="input_select minimal"
                v-model="gender_selected"
                required
              >
                <option value="" disabled selected hidden>
                  select your preferred gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="lgbt">LBGTQ</option>
              </select>
            </div>
            <!-- Input -->

            <!-- Input -->
            <div>
              <h2 class="input_title">Event Category<span class="orange-color"> *</span></h2>
              <select
                name="gender"
                class="input_select minimal"
                v-model="category_selected"
                required
              >
                <option value="" disabled selected hidden>
                  select event category
                </option>
                <option value="eiei">Sport</option>
                <option value="eiei">Eating</option>
                <option value="eiei">Something</option>
              </select>
            </div>
            <!-- Input -->

            <div>
              <div id="participant-section">
                <!-- Input -->
                <div>
                  <h2 class="input_title">Max Participants<span class="orange-color"> *</span></h2>
                  <input
                    v-model="maxamount"
                    class="input_participant"
                    type="text"
                    maxlength="2"
                    size="2"
                    placeholder="Max amount"
                  />
                </div>
                <!-- Input -->

                <!-- Input -->
                <div>
                  <h2 class="input_title">Age Limits<span class="orange-color"> *</span></h2>
                  <div class="section">
                    <input
                      v-model="agefrom"
                      class="input_age"
                      type="text"
                      maxlength="2"
                      size="2"
                      placeholder="min"
                    />
                    <h1 class="input_title" id="to">to</h1>
                    <input
                      v-model="ageto"
                      class="input_age"
                      type="text"
                      maxlength="2"
                      size="2"
                      placeholder="max"
                    />
                  </div>
                </div>
                <!-- Input -->
              </div>
            </div>
          </div>
        </div>

        <div class="button-section">
          <button class="back_button" @click="createdReturn()">Cancel</button>
          <button class="create_button" @click="ClickCreate()">
            Create Now
          </button>
        </div>

        <img
          @click="createdReturn()"
          style="cursor: pointer"
          class="close"
          src="@/assets/icon/icons8-multiply-96.png"
        />
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      gender_selected: "",
      category_selected: "",
    };
  },
  methods: {
    createdReturn() {
      this.$emit("clickCreate", false);
    },
  },
  mounted() {
    $(document).ready(function () {
      $("input").keyup(function () {
        if ($(this).val().length == $(this).attr("maxlength")) {
          const i = $("input").index(this);
          $("input")
            .eq(i + 1)
            .focus();
        }
      });
    });
  },
};
</script>

<style scoped>
#create-event-section {
  display: flex;
  justify-content: center;
}

#participant-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  margin-top: 70px;
  transition: 0.3s;
  margin-bottom: 30px;
  font-weight: 500;
}

#to {
  padding: 0px 5px;
}

.description {
  padding-bottom: 35px;
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

.upload {
  color: #cccccc;
  font-size: 1.75em;
  font-weight: 600;
  margin: 0px 0px 0px 6px;
}

#addphoto {
  width: 25px;
}
#select-photo-section,
#select-photo-inside {
  border: 2px solid #e3e3e3;
  border-radius: 6px;
  padding: 3px 8px;
}

#select-photo-section {
  margin-top: 12px;
}

#select-photo-inside {
  margin-top: 60px;
  margin-bottom: 60px;
}

#right {
  margin-left: 30px;
}

#left {
  margin-right: 30px;
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
  width: 400px;
  line-height: 21px;
}

.bio {
  padding-bottom: 55px;
}
</style>