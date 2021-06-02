<template>
  <div id="create-discount" class="popup">
    <div class="popup-section section">
      <div class="popup-form">
        <h1 class="header_title">CREATE NEW DISCOUNT</h1>
        <div id="create-discount-section">
          <div id="left">
            <!-- Input -->
            <div>
              <h2 class="input_title">
                Discount Picture<span class="orange-color"> *</span>
              </h2>
              <div id="select-photo-section" class="section">
                <Upload v-model="discount.discount_pic">
                  <div
                    v-if="!discount.discount_pic"
                    slot="activator"
                    id="select-photo-inside"
                    class="section"
                  >
                    <img
                      id="addphoto"
                      src="@/assets/icon/icons8-add-image-96.png"
                    />
                    <h1 class="upload">upload photo</h1>
                  </div>
                  <div v-else slot="activator">
                    <img
                      class="pictureUpload"
                      style="position: relative"
                      :src="discount.discount_pic.imageURL"
                      alt="discount_pic"
                    />
                  </div>
                </Upload>
              </div>
            </div>
            <!-- Input -->

            <!-- Input -->
            <div>
              <h2 class="input_title">
                Discount Name<span class="orange-color"> *</span>
              </h2>
              <input
                v-model="discount.name"
                class="input_box"
                type="text"
                maxlength="64"
                size="64"
                placeholder="enter discount name"
              />
            </div>
            <!-- Input -->

            <!-- Input -->
            <div>
              <h2 class="input_title">
                Description<span class="orange-color"> *</span>
              </h2>
              <textarea
                v-model="discount.description"
                class="input_textarea_box bio"
                maxlength="256"
                size="256"
                name="bio"
                placeholder="enter discount description"
              >
              </textarea>
            </div>
            <!-- Input -->

            <!-- Input -->
            <div class="number-box box-computer">
              <h2 class="input_title">
                Point Required<span class="orange-color"> *</span>
              </h2>
              <div class="number">
                <span class="minus" @click="clickPoint(false)">-</span>
                <input v-if="discount.redeem_point == 0" type="text" disabled="disabled" v-model="free" />
                <input v-else type="number" v-model="discount.redeem_point" />
                <span class="plus" @click="clickPoint(true)">+</span>
              </div>
            </div>
            <!-- Input -->
          </div>
          <div id="right">
            <!-- Input -->
            <div>
              <h2 class="input_title">
                Start On<span class="orange-color"> *</span>
              </h2>
              <div class="date-section">
                <input
                  id="day"
                  class="date_box_popup"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="2"
                  size="2"
                  placeholder="day"
                  v-model="discount.period_start.day"
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
                  placeholder="month"
                  v-model="discount.period_start.month"
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
                  placeholder="year"
                  v-model="discount.period_start.year"
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
                  placeholder="0"
                  v-model="discount.period_start.h1"
                />
                <input
                  id="h2"
                  style="margin-left: 10px"
                  class="date_box_popup"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="1"
                  size="1"
                  placeholder="0"
                  v-model="discount.period_start.h2"
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
                  placeholder="0"
                  v-model="discount.period_start.m1"
                />
                <input
                  id="m2"
                  style="margin-left: 10px"
                  class="date_box_popup"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="1"
                  size="1"
                  placeholder="0"
                  v-model="discount.period_start.m2"
                />
              </div>
            </div>
            <!-- Input -->

            <!-- Input -->
            <div>
              <h2 class="input_title">
                End On<span class="orange-color"> *</span>
              </h2>
              <div class="date-section">
                <input
                  id="day"
                  class="date_box_popup"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="2"
                  size="2"
                  placeholder="day"
                  v-model="discount.period_end.day"
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
                  placeholder="month"
                  v-model="discount.period_end.month"
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
                  placeholder="year"
                  v-model="discount.period_end.year"
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
                  placeholder="0"
                  v-model="discount.period_end.h1"
                />
                <input
                  id="h2"
                  style="margin-left: 10px"
                  class="date_box_popup"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="1"
                  size="1"
                  placeholder="0"
                  v-model="discount.period_end.h2"
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
                  placeholder="0"
                  v-model="discount.period_end.m1"
                />
                <input
                  id="m2"
                  style="margin-left: 10px"
                  class="date_box_popup"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="1"
                  size="1"
                  placeholder="0"
                  v-model="discount.period_end.m2"
                />
              </div>
            </div>
            <!-- Input -->

            <!-- Input -->
            <div>
              <h2 class="input_title">
                Expire Date<span class="orange-color"> *</span>
              </h2>
              <div class="date-section">
                <input
                  id="day"
                  class="date_box_popup"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="2"
                  size="2"
                  placeholder="day"
                  v-model="discount.expired.day"
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
                  placeholder="month"
                  v-model="discount.expired.month"
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
                  placeholder="year"
                  v-model="discount.expired.year"
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
                  placeholder="0"
                  v-model="discount.expired.h1"
                />
                <input
                  id="h2"
                  style="margin-left: 10px"
                  class="date_box_popup"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="1"
                  size="1"
                  placeholder="0"
                  v-model="discount.expired.h2"
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
                  placeholder="0"
                  v-model="discount.expired.m1"
                />
                <input
                  id="m2"
                  style="margin-left: 10px"
                  class="date_box_popup"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="1"
                  size="1"
                  placeholder="0"
                  v-model="discount.expired.m2"
                />
              </div>
            </div>
            <!-- Input -->

            <!-- Input -->
            <div class="number-box box-tablet">
              <h2 class="input_title">
                Point Required<span class="orange-color"> *</span>
              </h2>
              <div class="number">
                <span class="minus" @click="clickPoint(false)">-</span>
                <input v-if="discount.redeem_point == 0" type="text" disabled="disabled" v-model="free" />
                <input v-else type="number" v-model="discount.redeem_point" />
                <span class="plus" @click="clickPoint(true)">+</span>
              </div>
            </div>
            <!-- Input -->

            <!-- Input -->
            <div class="number-box">
              <h2 class="input_title">
                Limit buy per user<span class="orange-color"> *</span>
              </h2>
              <div class="number">
                <span class="minus" @click="clickLimit(false)">-</span>
                  <input v-if="discount.limits == 0" type="text" disabled="disabled" v-model="unlimited" />
                  <input v-else type="number" v-model="discount.limits" />
                <span class="plus" @click="clickLimit(true)">+</span>
              </div>
            </div>
            <!-- Input -->
          </div>
        </div>

        <div class="button-section">
          <button class="back_button" @click="createReturn()">Cancel</button>
          <button class="create_button" @click="ClickCreate()">
            Create Now
          </button>
        </div>

        <img
          @click="createReturn()"
          style="cursor: pointer"
          class="close"
          src="@/assets/icon/icons8-multiply-96.png"
        />
      </div>
    </div>
  </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<script>
import $ from "jquery";
import Discount from "@/models/discount";
import DiscountService from "@/services/discount.service";
import Upload from "../../../components/UploadPic.vue";

class constructDate {
  constructor(date) {
    this.day = date.day;
    this.month = date.month;
    this.year = date.year;
    this.h1 = date.h1;
    this.h2 = date.h2;
    this.m1 = date.m1;
    this.m2 = date.m2;
  }
}

export default {
  data() {
    return {
      discount: new Discount(""),
      unlimited : "No Limit",
      free: "Free"
    };
  },
  components: {
    Upload,
  },
  mounted() {
    $(document).ready(function() {
      $("input").keyup(function() {
        if ($(this).val().length == $(this).attr("maxlength")) {
          const i = $("input").index(this);
          $("input")
            .eq(i + 1)
            .focus();
        }
      });
    });
  },
  created() {
    this.discount.period_start = new constructDate(0);
    this.discount.period_end = new constructDate(0);
    this.discount.expired = new constructDate(0);
    this.discount.redeem_point = 0;
    this.discount.limits = 0;
  },
  methods: {
    createReturn() {
      this.$emit("clickCreate", false);
    },
    clickPoint(status) {
      this.discount.redeem_point = parseInt(this.discount.redeem_point);
      if (!status) {
        if (this.discount.redeem_point > 0)
          this.discount.redeem_point = this.discount.redeem_point - 1;
      } else this.discount.redeem_point = this.discount.redeem_point + 1;
    },
    clickLimit(status) {
      this.discount.limits = parseInt(this.discount.limits);
      if (!status) {
        if (this.discount.limits > 0)
          this.discount.limits = this.discount.limits - 1;
      } else this.discount.limits = this.discount.limits + 1;
    },
    ClickCreate() {
      this.hs = this.discount.period_start.h1 + this.discount.period_start.h2;
      this.ms = this.discount.period_start.m1 + this.discount.period_start.m2;
      this.he = this.discount.period_end.h1 + this.discount.period_end.h2;
      this.me = this.discount.period_end.m1 + this.discount.period_end.m2;
      this.hx = this.discount.expired.h1 + this.discount.expired.h2;
      this.mx = this.discount.expired.m1 + this.discount.expired.m2;

      this.discount.period_start = new Date(
        this.discount.period_start.year +
          "-" +
          this.discount.period_start.month +
          "-" +
          this.discount.period_start.day +
          " " +
          this.hs +
          ":" +
          this.ms +
          ":00 GMT+0700"
      ).getTime();

      this.discount.period_end = new Date(
        this.discount.period_end.year +
          "-" +
          this.discount.period_end.month +
          "-" +
          this.discount.period_end.day +
          " " +
          this.he +
          ":" +
          this.me +
          ":00 GMT+0700"
      ).getTime();

      this.discount.expired = new Date(
        this.discount.expired.year +
          "-" +
          this.discount.expired.month +
          "-" +
          this.discount.expired.day +
          " " +
          this.hx +
          ":" +
          this.mx +
          ":00 GMT+0700"
      ).getTime();

      DiscountService.create(this.discount).then(
        (res) => {
          if (res.discount_id) {
            DiscountService.uploadDiscountPic(
              this.discount.discount_pic.formData,
              res.discount_id
            ).then((res) => {
              if (res) {
                console.log(res);
                this.$emit("informationShow", true);
                this.$emit("clickCreate", false);
              }
            });
          }
        },
        (error) => {
          console.log(error.message);
        }
      );
    }
  }
};
</script>

<style scoped>
#create-discount-section {
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

.box-computer {
  display: flex !important;
}

.box-tablet {
  display: none !important;
}

.description {
  padding-bottom: 35px;
}

.pictureUpload {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 420px;
  height: 165px;
  object-fit: cover;
  cursor: pointer;
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

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
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
  padding: 3px 3px;
}

#select-photo-section {
  margin-top: 12px;
}

#select-photo-inside {
  margin-top: 60px;
  margin-bottom: 60px;
  cursor: pointer;
}

#right {
  margin-left: 30px;
}

#left {
  margin-right: 30px;
}

.input_textarea_box {
  font-size: 1.6em;
  font-weight: 500;
  color: #444444;
  padding: 7px 12px 7px 15px;
  border: 2px solid #e3e3e3;
  border-radius: 10px;
  margin-bottom: 2px;
  box-shadow: none;
  width: 400px;
  line-height: 21px;
}

.bio {
  padding-bottom: 20px;
}

.number-box,
.number {
  display: flex;
  align-items: center;
}

.number-box {
  margin-top: 10px;
}

.number {
  margin-left: 30px;
  justify-content: center;
}

.minus,
.plus {
  background-color: #ffffff;
  border: 2px solid #e3e3e3;
  font-size: 3em;
  color: #ffc661;
  font-weight: 600;
  padding: 0px 10px;
  margin: 0;
  cursor: pointer;
}

.minus {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.plus {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.number > input{
  text-align: center;
  border-top: 2px solid #e3e3e3;
  border-bottom: 2px solid #e3e3e3;
  border-left: none;
  border-right: none;
  font-size: 2.25em;
  font-weight: 500;
  color: #444444;
  padding: 3px 0px;
  width: 100px;
}

@media screen and (max-width: 1024px) {
  #create-discount-section {
    display: block;
  }

  #left,
  #right {
    margin: 0px;
  }

  .date-section,
  .time-section {
    width: 100% !important;
  }

  #participant-section {
    margin-top: 5px;
  }

  .box-computer {
    display: none !important;
  }

  .box-tablet {
    display: flex !important;
  }

  .number-box {
    justify-content: space-between !important;
  }

  .number > input {
    width: 150px;
  }
}

@media screen and (max-width: 690px) {
  .input_box,
  .input_textarea_box {
    width: 250px !important;
  }

  .create_button,
  .back_button {
    width: 120px !important;
  }

  .pictureUpload {
    width: 268px !important;
    height: 125px;
  }

  #select-photo-inside {
    margin: 40px 0px;
  }

  .number > input {
    width: 65px;
    font-size: 1.75em;
    padding: 6px 0px;
    margin-left: 0px;
  }
}

@media screen and (max-width: 490px) {
  .input_box,
  .input_textarea_box {
    width: 210px !important;
  }

  .minus,
  .plus {
    padding: 2px 5px;
    font-size: 2.5em;
  }

  .number > input {
    width: 50px;
  }

  #participant-section {
    display: block;
  }

  .input_participant {
    width: calc(100% - 30px);
  }

  .input_age {
    width: 100%;
  }

  .create_button,
  .back_button {
    width: 110px !important;
  }

  .popup-form {
    padding: 0px 40px !important;
  }
}
</style>
