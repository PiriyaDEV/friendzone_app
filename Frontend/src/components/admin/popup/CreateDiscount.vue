<template>
  <div id="create-discount" class="popup">
    <div class="popup-section section">
      <div class="popup-form">
        <h1 v-if="!edit" class="header_title">CREATE NEW DISCOUNT</h1>
        <h1 v-if="edit" class="header_title">REVIEW DISCOUNT</h1>
        <h1 v-if="edit" class="orange_title">Discount Detail</h1>
        <div id="create-discount-section">
          <div id="left">
            <!-- Input -->
            <div>
              <h2 class="input_title">
                Discount Picture<span class="orange-color"> *</span>
                <span class="orange-color" v-if="invalidDiscount_pic">
                  {{ alertDiscount_pic }}</span
                >
              </h2>
              <div v-if="!edit" id="select-photo-section" class="section">
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
                      :class="cssDeletePic"
                      style="position: relative"
                      :src="discount.discount_pic.imageURL"
                      alt="discount_pic"
                    />
                  </div>
                </Upload>
              </div>
            </div>
            <div v-if="edit" id="select-photo-section" class="section">
              <div v-if="disable">
                <img
                  slot="activator"
                  :class="cssDeletePic"
                  style="position: relative"
                  :src="discountList.discount_pic"
                />
              </div>
              <div v-else>
                <Upload v-model="discount.discount_pic">
                  <img
                    v-if="!discount.discount_pic"
                    slot="activator"
                    :class="cssDeletePic"
                    style="position: relative"
                    :src="discountList.discount_pic"
                  />
                  <div v-else slot="activator">
                    <img
                      :class="cssDeletePic"
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
              <h2 v-if="!edit" class="input_title">
                Discount Name<span class="orange-color"> *</span>
                <span class="orange-color" v-if="invalidName">
                  {{ alertName }}</span
                >
              </h2>
              <h2 v-if="edit" class="input_title">
                Title<span class="orange-color"> *</span
                ><span class="orange-color" v-if="invalidName">
                  {{ alertName }}</span
                >
              </h2>

              <input
                v-model="discount.name"
                :class="cssInput"
                :disabled="disable"
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
                Description<span v-if="!edit" class="orange-color"> *</span>
                <span class="orange-color" v-if="invalidDescription">
                  {{ alertDescription }}</span
                >
              </h2>
              <textarea
                v-model="discount.description"
                :class="cssInputBio"
                :disabled="disable"
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
                Point Required<span v-if="!edit" class="orange-color"> *</span>
                <span class="orange-color" v-if="invalidPoint">
                  {{ alertPoint }}</span
                >
              </h2>
              <div class="number">
                <span class="minus" @click="clickPoint(false)">-</span>
                <input
                  v-if="discount.redeem_point == 0"
                  type="text"
                  disabled="disabled"
                  v-model="free"
                  :class="cssPoint"
                />
                <input
                  v-else
                  type="number"
                  :class="cssPoint"
                  :disabled="disable"
                  v-model="discount.redeem_point"
                />
                <span class="plus" @click="clickPoint(true)">+</span>
              </div>
            </div>
            <!-- Input -->
          </div>
          <div id="right">
            <!-- Input -->
            <div>
              <h2 class="input_title">
                Start On<span v-if="!edit" class="orange-color"> *</span>
                <span class="orange-color" v-if="invalidStartDate">
                  {{ alertStartDate }}</span
                >
              </h2>
              <div class="date-section">
                <input
                  id="day"
                  :class="cssDateBox"
                  :disabled="disable"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="2"
                  size="2"
                  placeholder="day"
                  v-model="period_start.day"
                />
                <h1 style="margin-left: 10px; color: #e3e3e3">/</h1>
                <input
                  id="month"
                  style="margin-left: 10px"
                  :class="cssDateBox"
                  :disabled="disable"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="2"
                  size="2"
                  placeholder="month"
                  v-model="period_start.month"
                />
                <h1 style="margin-left: 10px; color: #e3e3e3">/</h1>
                <input
                  id="year"
                  style="margin-left: 10px"
                  :class="cssDateBox"
                  :disabled="disable"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="4"
                  size="4"
                  placeholder="year"
                  v-model="period_start.year"
                />
              </div>
              <div class="time-section">
                <input
                  id="h1"
                  :class="cssDateBox"
                  :disabled="disable"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="1"
                  size="1"
                  placeholder="0"
                  v-model="period_start.h1"
                />
                <input
                  id="h2"
                  style="margin-left: 10px"
                  :class="cssDateBox"
                  :disabled="disable"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="1"
                  size="1"
                  placeholder="0"
                  v-model="period_start.h2"
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
                  :class="cssDateBox"
                  :disabled="disable"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="1"
                  size="1"
                  placeholder="0"
                  v-model="period_start.m1"
                />
                <input
                  id="m2"
                  style="margin-left: 10px"
                  :class="cssDateBox"
                  :disabled="disable"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="1"
                  size="1"
                  placeholder="0"
                  v-model="period_start.m2"
                />
              </div>
            </div>
            <!-- Input -->

            <!-- Input -->
            <div>
              <h2 class="input_title">
                End On<span v-if="!edit" class="orange-color"> *</span>
                <span class="orange-color" v-if="invalidEndDate">
                  {{ alertEndDate }}</span
                >
              </h2>
              <div class="date-section">
                <input
                  id="day"
                  :class="cssDateBox"
                  :disabled="disable"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="2"
                  size="2"
                  placeholder="day"
                  v-model="period_end.day"
                />
                <h1 style="margin-left: 10px; color: #e3e3e3">/</h1>
                <input
                  id="month"
                  style="margin-left: 10px"
                  :class="cssDateBox"
                  :disabled="disable"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="2"
                  size="2"
                  placeholder="month"
                  v-model="period_end.month"
                />
                <h1 style="margin-left: 10px; color: #e3e3e3">/</h1>
                <input
                  id="year"
                  style="margin-left: 10px"
                  :class="cssDateBox"
                  :disabled="disable"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="4"
                  size="4"
                  placeholder="year"
                  v-model="period_end.year"
                />
              </div>
              <div class="time-section">
                <input
                  id="h1"
                  :class="cssDateBox"
                  :disabled="disable"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="1"
                  size="1"
                  placeholder="0"
                  v-model="period_end.h1"
                />
                <input
                  id="h2"
                  style="margin-left: 10px"
                  :class="cssDateBox"
                  :disabled="disable"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="1"
                  size="1"
                  placeholder="0"
                  v-model="period_end.h2"
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
                  :class="cssDateBox"
                  :disabled="disable"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="1"
                  size="1"
                  placeholder="0"
                  v-model="period_end.m1"
                />
                <input
                  id="m2"
                  style="margin-left: 10px"
                  :class="cssDateBox"
                  :disabled="disable"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="1"
                  size="1"
                  placeholder="0"
                  v-model="period_end.m2"
                />
              </div>
            </div>
            <!-- Input -->

            <!-- Input -->
            <div>
              <h2 class="input_title">
                Expire Date<span v-if="!edit" class="orange-color"> *</span>
                <span class="orange-color" v-if="invalidExpireDate">
                  {{ alertExpireDate }}</span
                >
              </h2>
              <div class="date-section">
                <input
                  id="day"
                  :class="cssDateBox"
                  :disabled="disable"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="2"
                  size="2"
                  placeholder="day"
                  v-model="expired.day"
                />
                <h1 style="margin-left: 10px; color: #e3e3e3">/</h1>
                <input
                  id="month"
                  style="margin-left: 10px"
                  :class="cssDateBox"
                  :disabled="disable"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="2"
                  size="2"
                  placeholder="month"
                  v-model="expired.month"
                />
                <h1 style="margin-left: 10px; color: #e3e3e3">/</h1>
                <input
                  id="year"
                  style="margin-left: 10px"
                  :class="cssDateBox"
                  :disabled="disable"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="4"
                  size="4"
                  placeholder="year"
                  v-model="expired.year"
                />
              </div>
              <div class="time-section">
                <input
                  id="h1"
                  :class="cssDateBox"
                  :disabled="disable"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="1"
                  size="1"
                  placeholder="0"
                  v-model="expired.h1"
                />
                <input
                  id="h2"
                  style="margin-left: 10px"
                  :class="cssDateBox"
                  :disabled="disable"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="1"
                  size="1"
                  placeholder="0"
                  v-model="expired.h2"
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
                  :class="cssDateBox"
                  :disabled="disable"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="1"
                  size="1"
                  placeholder="0"
                  v-model="expired.m1"
                />
                <input
                  id="m2"
                  style="margin-left: 10px"
                  :class="cssDateBox"
                  :disabled="disable"
                  type="text"
                  pattern="[0-9]*"
                  maxlength="1"
                  size="1"
                  placeholder="0"
                  v-model="expired.m2"
                />
              </div>
            </div>
            <!-- Input -->

            <!-- Input -->
            <div class="number-box box-tablet">
              <h2 class="input_title">
                Point Required<span v-if="!edit" class="orange-color"> *</span>
                <span class="orange-color" v-if="invalidPoint">
                  {{ alertPoint }}</span
                >
              </h2>
              <div class="number">
                <span class="minus" @click="clickPoint(false)">-</span>
                <input
                  v-if="discount.redeem_point == 0"
                  type="text"
                  disabled="disabled"
                  v-model="free"
                  :class="cssPoint"
                />
                <input
                  v-else
                  type="number"
                  :class="cssPoint"
                  :disabled="disable"
                  v-model="discount.redeem_point"
                />
                <span class="plus" @click="clickPoint(true)">+</span>
              </div>
            </div>
            <!-- Input -->

            <!-- Input -->
            <div class="number-box">
              <h2 class="input_title">
                Limit buy per user<span v-if="!edit" class="orange-color">
                  *</span
                >
                <span class="orange-color" v-if="invalidLimit">
                  {{ alertLimit }}</span
                >
              </h2>
              <div class="number">
                <span class="minus" @click="clickLimit(false)">-</span>
                <input
                  v-if="discount.limits == 0 || discount.limits == ''"
                  type="text"
                  disabled="disabled"
                  v-model="unlimited"
                  :class="cssPoint"
                />
                <input
                  v-else
                  type="number"
                  :class="cssPoint"
                  :disabled="disable"
                  v-model="discount.limits"
                />
                <span class="plus" @click="clickLimit(true)">+</span>
              </div>
            </div>
            <!-- Input -->
          </div>
        </div>

        <div v-if="!edit" class="button-section">
          <button class="back_button" @click="createReturn()">Cancel</button>
          <button class="create_button" @click="ClickCreate()">
            Create Now
          </button>
        </div>

        <div v-if="edit && status != 'Deleted'" class="button-section">
          <button
            v-if="status == `Inactive` || status == `Active`"
            class="back_button"
            @click="deleteClick()"
          >
            Delete Discount
          </button>
          <button
            v-if="status == `Inactive`"
            class="create_button"
            @click="saveClick()"
          >
            Save Change
          </button>
          <button
            v-if="status == 'Active'"
            class="create_button"
            @click="createReturn()"
          >
            Done
          </button>
        </div>

        <div v-if="edit && status == 'Deleted'" id="single-button">
          <button class="create_button" @click="createReturn()">
            Done
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

class constructEmptyDate {
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

class constructDate {
  constructor(date) {
    this.day = date
      .getDate()
      .toString()
      .padStart(2, "0");
    this.month = (date.getMonth() + 1).toString().padStart(2, "0");
    this.year = date.getFullYear();
    this.h1 = date
      .getHours()
      .toString()
      .padStart(2, "0")[0];
    this.h2 = date
      .getHours()
      .toString()
      .padStart(2, "0")[1];
    this.m1 = date
      .getMinutes()
      .toString()
      .padStart(2, "0")[0];
    this.m2 = date
      .getMinutes()
      .toString()
      .padStart(2, "0")[1];
  }
}

export default {
  props: ["discountList"],
  data() {
    return {
      discount: new Discount(""),
      period_start: new constructEmptyDate(""),
      period_end: new constructEmptyDate(""),
      expired: new constructEmptyDate(""),
      unlimited: "No Limit",
      free: "Free",
      edit: false,
      disable: false,
      delete_pic: false,
      status: "",
      invalidDiscount_pic: false,
      invalidName: false,
      invalidDescription: false,
      invalidStartDate: false,
      invalidEndDate: false,
      invalidExpireDate: false,
      invalidPoint: false,
      invalidLimit: false,
      alertDiscount_pic: "",
      alertName: "",
      alertDescription: "",
      alertStartDate: "",
      alertEndDate: "",
      alertExpireDate: "",
      alertPoint: "",
      alertLimit: ""
    };
  },
  components: {
    Upload
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
    if (this.discountList != null) {
      if (
        this.discountList.status == "Active" ||
        this.discountList.status == "Deleted"
      ) {
        this.disable = true;
      }
      if (this.discountList.status == "Deleted") {
        this.delete_pic = true;
      }
      this.edit = true;
      this.discount.discount_id = this.discountList.discount_id;
      this.discount.name = this.discountList.name;
      this.discount.description = this.discountList.description;
      this.discount.redeem_point = this.discountList.redeem_point;
      this.discount.limits = this.discountList.limits;
      this.status = this.discountList.status;
      this.period_start = new constructDate(
        new Date(this.discountList.period_start)
      );
      this.period_end = new constructDate(
        new Date(this.discountList.period_end)
      );
      this.expired = new constructDate(new Date(this.discountList.expired));
    } else {
      this.discount.redeem_point = 0;
      this.discount.limits = 0;
    }
  },
  computed: {
    cssInput() {
      let normal = "input_box";
      let block = "input_box disable";
      if (!this.disable) {
        return normal;
      }
      return block;
    },
    cssDeletePic() {
      let normal = "pictureUpload";
      let deletepic = "pictureUpload discount-delete-pic";
      if (this.delete_pic) {
        return deletepic;
      }
      return normal;
    },
    cssDateBox() {
      let normal = "date_box_popup";
      let block = "date_box_popup disable";
      if (!this.disable) {
        return normal;
      }
      return block;
    },
    cssPoint() {
      let normal = "";
      let block = "disable";
      if (!this.disable) {
        return normal;
      }
      return block;
    },
    cssInputBio() {
      let normal = "input_textarea_box bio";
      let block = "input_textarea_box bio disable";
      if (!this.disable) {
        return normal;
      }
      return block;
    }
  },
  watch: {
    "discount.discount_pic": function() {
      this.invalidDiscount_pic = false;
    },
    "discount.name": function() {
      this.invalidName = false;
    },
    "discount.description": function() {
      this.invalidDescription = false;
    },
    "discount.redeem_point": function() {
      this.invalidPoint = false;
    },
    "discount.limits": function() {
      this.invalidLimit = false;
    },
    "period_start.day": function() {
      this.invalidStartDate = false;
    },
    "period_start.month": function() {
      this.invalidStartDate = false;
    },
    "period_start.year": function() {
      this.invalidStartDate = false;
    },
    "period_start.h1": function() {
      this.invalidStartDate = false;
    },
    "period_start.h2": function() {
      this.invalidStartDate = false;
    },
    "period_start.m1": function() {
      this.invalidStartDate = false;
    },
    "period_start.m2": function() {
      this.invalidStartDate = false;
    },
    "period_end.day": function() {
      this.invalidEndDate = false;
    },
    "period_end.month": function() {
      this.invalidEndDate = false;
    },
    "period_end.year": function() {
      this.invalidEndDate = false;
    },
    "period_end.h1": function() {
      this.invalidEndDate = false;
    },
    "period_end.h2": function() {
      this.invalidEndDate = false;
    },
    "period_end.m1": function() {
      this.invalidEndDate = false;
    },
    "period_end.m2": function() {
      this.invalidEndDate = false;
    },
    "expired.day": function() {
      this.invalidExpireDate = false;
    },
    "expired.month": function() {
      this.invalidExpireDate = false;
    },
    "expired.year": function() {
      this.invalidExpireDate = false;
    },
    "expired.h1": function() {
      this.invalidExpireDate = false;
    },
    "expired.h2": function() {
      this.invalidExpireDate = false;
    },
    "expired.m1": function() {
      this.invalidExpireDate = false;
    },
    "expired.m2": function() {
      this.invalidExpireDate = false;
    }
  },
  methods: {
    createReturn() {
      this.$emit("clickCreate", false);
    },
    clickPoint(status) {
      if (!this.disable) {
        this.discount.redeem_point = parseInt(this.discount.redeem_point);
        if (!status) {
          if (this.discount.redeem_point > 0)
            this.discount.redeem_point = this.discount.redeem_point - 1;
        } else this.discount.redeem_point = this.discount.redeem_point + 1;
      }
    },
    clickLimit(status) {
      if (!this.disable) {
        this.discount.limits = parseInt(this.discount.limits);
        if (!status) {
          if (this.discount.limits > 0)
            this.discount.limits = this.discount.limits - 1;
        } else this.discount.limits = this.discount.limits + 1;
      }
    },
    ClickCreate() {
      if (this.validateData()) {
        DiscountService.create(this.discount).then(
          (res) => {
            if (res.discount_id) {
              DiscountService.uploadDiscountPic(
                this.discount.discount_pic.formData,
                res.discount_id
              ).then((res) => {
                if (res) {
                  this.$emit("informationShow", true);
                  window.location.href = "/admin";
                }
              });
            }
          },
          (error) => {
            console.log(error.message);
          }
        );
      }
    },
    saveClick() {
      if (this.validateData()) {
        DiscountService.editDiscount(this.discount).then(
          (res) => {
            if (res.discount_id) {
              if (this.discount.discount_pic) {
                DiscountService.uploadDiscountPic(
                  this.discount.discount_pic.formData,
                  res.discount_id
                ).then((res) => {
                  if (res) {
                    window.location.href = "/admin";
                  }
                });
              } else {
                window.location.href = "/admin";
              }
            }
          },
          (error) => {
            console.log(error.message);
          }
        );
      }
    },
    validateData() {
      var reg = /^\d*\.?\d+$/;

      if (!this.discount.discount_pic && this.discountList == null) {
        this.invalidDiscount_pic = true;
        this.alertDiscount_pic = "required discount picture";
      }
      if (!this.discount.name) {
        this.invalidName = true;
        this.alertName = "required name";
      }
      if (!this.discount.description) {
        this.invalidDescription = true;
        this.alertDescription = "required description";
      }

      if (
        !this.period_start.day ||
        !this.period_start.month ||
        !this.period_start.year
      ) {
        this.invalidStartDate = true;
        this.alertStartDate = "required start date";
      } else if (
        !this.period_start.h1 ||
        !this.period_start.h2 ||
        !this.period_start.m1 ||
        !this.period_start.m2
      ) {
        this.invalidStartDate = true;
        this.alertStartDate = "required start time";
      } else {
        this.validateStartDate();
      }

      if (
        !this.period_end.day ||
        !this.period_end.month ||
        !this.period_end.year
      ) {
        this.invalidEndDate = true;
        this.alertEndDate = "required end date";
      } else if (
        !this.period_end.h1 ||
        !this.period_end.h2 ||
        !this.period_end.m1 ||
        !this.period_end.m2
      ) {
        this.invalidEndDate = true;
        this.alertEndDate = "required end time";
      } else {
        this.validateEndDate();
      }

      if (!this.expired.day || !this.expired.month || !this.expired.year) {
        this.invalidExpireDate = true;
        this.alertExpireDate = "required expired date";
      } else if (
        !this.expired.h1 ||
        !this.expired.h2 ||
        !this.expired.m1 ||
        !this.expired.m2
      ) {
        this.invalidExpireDate = true;
        this.alertExpireDate = "required expired time";
      } else {
        this.validateExpireDate();
      }

      if (
        this.discount.redeem_point == "" ||
        isNaN(this.discount.redeem_point)
      ) {
        this.discount.redeem_point = 0;
      } else if (!reg.test(this.discount.redeem_point)) {
        this.invalidPoint = true;
        this.alertPoint = "must be only numbers";
      }
      if (this.discount.limits == "" || isNaN(this.discount.limits)) {
        this.discount.limits = 0;
      } else if (!reg.test(this.discount.limits)) {
        this.invalidLimit = true;
        this.alertLimit = "must be only numbers";
      }
      if (
        !this.invalidStartDate &&
        !this.invalidEndDate &&
        !this.invalidExpireDate
      ) {
        this.hs = this.period_start.h1 + this.period_start.h2;
        this.ms = this.period_start.m1 + this.period_start.m2;
        this.he = this.period_end.h1 + this.period_end.h2;
        this.me = this.period_end.m1 + this.period_end.m2;
        this.hx = this.expired.h1 + this.expired.h2;
        this.mx = this.expired.m1 + this.expired.m2;

        this.discount.period_start = new Date(
          this.period_start.year +
            "-" +
            this.period_start.month +
            "-" +
            this.period_start.day +
            " " +
            this.hs +
            ":" +
            this.ms +
            ":00 GMT+0700"
        ).getTime();

        this.discount.period_end = new Date(
          this.period_end.year +
            "-" +
            this.period_end.month +
            "-" +
            this.period_end.day +
            " " +
            this.he +
            ":" +
            this.me +
            ":00 GMT+0700"
        ).getTime();

        this.discount.expired = new Date(
          this.expired.year +
            "-" +
            this.expired.month +
            "-" +
            this.expired.day +
            " " +
            this.hx +
            ":" +
            this.mx +
            ":00 GMT+0700"
        ).getTime();

        if (this.discount.period_start <= new Date().getTime()) {
          this.invalidStartDate = true;
          this.alertStartDate = "must start after the current time";
        }
        if (this.discount.period_end <= this.discount.period_start) {
          this.invalidEndDate = true;
          this.alertEndDate = "end date must be after start date";
        }
        if (this.discount.expired <= this.discount.period_end) {
          this.invalidExpireDate = true;
          this.alertExpireDate = "expire date must be after end date";
        }

        if (
          !this.invalidDiscount_pic &&
          !this.invalidName &&
          !this.invalidDescription &&
          !this.invalidStartDate &&
          !this.invalidEndDate &&
          !this.invalidExpireDate &&
          !this.invalidPoint &&
          !this.invalidLimit
        ) {
          return true;
        } else {
          return false;
        }
      }
    },
    validateStartDate() {
      this.invalidStartDate = false;
      var reg = /^\d*\.?\d+$/;

      if (!reg.test(this.period_start.day)) {
        this.invalidStartDate = true;
        this.alertStartDate = "date must be only numbers";
      } else if (this.period_start.day < 1 || this.period_start.day > 31) {
        this.invalidStartDate = true;
        this.alertStartDate = "day must be only 1-31";
      } else if (
        (this.period_start.month == 4 && this.period_start.day > 30) ||
        (this.period_start.month == 6 && this.period_start.day > 30) ||
        (this.period_start.month == 9 && this.period_start.day > 30) ||
        (this.period_start.month == 11 && this.period_start.day > 30)
      ) {
        this.invalidStartDate = true;
        this.alertStartDate = "day or month is invalid";
      } else if (this.period_start.month == 2 && this.period_start.day > 29) {
        this.invalidStartDate = true;
        this.alertStartDate = "day or month is invalid";
      } else if (
        this.period_start.month == 2 &&
        this.period_start.day == 29 &&
        !(
          (0 == this.period_start.year % 4 &&
            0 != this.period_start.year % 100) ||
          0 == this.period_start.year % 400
        )
      ) {
        this.invalidStartDate = true;
        this.alertStartDate = "not a leap year";
      } else if (!reg.test(this.period_start.month)) {
        this.invalidStartDate = true;
        this.alertStartDate = "date must be only numbers";
      } else if (this.period_start.month < 1 || this.period_start.month > 12) {
        this.invalidStartDate = true;
        this.alertStartDate = "month must be only 1-12";
      } else if (!reg.test(this.period_start.year)) {
        this.invalidStartDate = true;
        this.alertStartDate = "date must be only numbers";
      } else if (this.period_start.year < 2021) {
        this.invalidStartDate = true;
        this.alertStartDate = "year must start at 2021";
      } else if (
        !reg.test(this.period_start.h1) ||
        !reg.test(this.period_start.h2) ||
        !reg.test(this.period_start.m1) ||
        !reg.test(this.period_start.m2)
      ) {
        this.invalidStartDate = true;
        this.alertStartDate = "time must be only numbers";
      } else if (
        (this.period_start.h1 == 2 && this.period_start.h2 > 3) ||
        this.period_start.h1 > 2
      ) {
        this.invalidStartDate = true;
        this.alertStartDate = "hour must be in 00-23";
      } else if (
        (this.period_start.m1 == 5 && this.period_start.m2 > 9) ||
        this.period_start.m1 > 5
      ) {
        this.invalidStartDate = true;
        this.alertStartDate = "minute must be in 00-59";
      }
    },
    validateEndDate() {
      this.invalidEndDate = false;
      var reg = /^\d*\.?\d+$/;

      if (!reg.test(this.period_end.day)) {
        this.invalidEndDate = true;
        this.alertEndDate = "date must be only numbers";
      } else if (this.period_end.day < 1 || this.period_end.day > 31) {
        this.invalidEndDate = true;
        this.alertEndDate = "day must be only 1-31";
      } else if (
        (this.period_end.month == 4 && this.period_end.day > 30) ||
        (this.period_end.month == 6 && this.period_end.day > 30) ||
        (this.period_end.month == 9 && this.period_end.day > 30) ||
        (this.period_end.month == 11 && this.period_end.day > 30)
      ) {
        this.invalidEndDate = true;
        this.alertEndDate = "day or month is invalid";
      } else if (this.period_end.month == 2 && this.period_end.day > 29) {
        this.invalidEndDate = true;
        this.alertEndDate = "day or month is invalid";
      } else if (
        this.period_end.month == 2 &&
        this.period_end.day == 29 &&
        !(
          (0 == this.period_end.year % 4 && 0 != this.period_end.year % 100) ||
          0 == this.period_end.year % 400
        )
      ) {
        this.invalidEndDate = true;
        this.alertEndDate = "not a leap year";
      } else if (!reg.test(this.period_end.month)) {
        this.invalidEndDate = true;
        this.alertEndDate = "date must be only numbers";
      } else if (this.period_end.month < 1 || this.period_end.month > 12) {
        this.invalidEndDate = true;
        this.alertEndDate = "month must be only 1-12";
      } else if (!reg.test(this.period_end.year)) {
        this.invalidEndDate = true;
        this.alertEndDate = "date must be only numbers";
      } else if (this.period_end.year < 2021) {
        this.invalidEndDate = true;
        this.alertEndDate = "year must start at 2021";
      } else if (
        !reg.test(this.period_end.h1) ||
        !reg.test(this.period_end.h2) ||
        !reg.test(this.period_end.m1) ||
        !reg.test(this.period_end.m2)
      ) {
        this.invalidEndDate = true;
        this.alertEndDate = "time must be only numbers";
      } else if (
        (this.period_end.h1 == 2 && this.period_end.h2 > 3) ||
        this.period_end.h1 > 2
      ) {
        this.invalidEndDate = true;
        this.alertEndDate = "hour must be in 00-23";
      } else if (
        (this.period_end.m1 == 5 && this.period_end.m2 > 9) ||
        this.period_end.m1 > 5
      ) {
        this.invalidEndDate = true;
        this.alertEndDate = "minute must be in 00-59";
      }
    },
    validateExpireDate() {
      this.invalidExpireDate = false;
      var reg = /^\d*\.?\d+$/;

      if (!reg.test(this.expired.day)) {
        this.invalidExpireDate = true;
        this.alertExpireDate = "date must be only numbers";
      } else if (this.expired.day < 1 || this.expired.day > 31) {
        this.invalidExpireDate = true;
        this.alertExpireDate = "day must be only 1-31";
      } else if (
        (this.expired.month == 4 && this.expired.day > 30) ||
        (this.expired.month == 6 && this.expired.day > 30) ||
        (this.expired.month == 9 && this.expired.day > 30) ||
        (this.expired.month == 11 && this.expired.day > 30)
      ) {
        this.invalidExpireDate = true;
        this.alertExpireDate = "day or month is invalid";
      } else if (this.expired.month == 2 && this.expired.day > 29) {
        this.invalidExpireDate = true;
        this.alertExpireDate = "day or month is invalid";
      } else if (
        this.expired.month == 2 &&
        this.expired.day == 29 &&
        !(
          (0 == this.expired.year % 4 && 0 != this.expired.year % 100) ||
          0 == this.expired.year % 400
        )
      ) {
        this.invalidExpireDate = true;
        this.alertExpireDate = "not a leap year";
      } else if (!reg.test(this.expired.month)) {
        this.invalidExpireDate = true;
        this.alertExpireDate = "date must be only numbers";
      } else if (this.expired.month < 1 || this.expired.month > 12) {
        this.invalidExpireDate = true;
        this.alertExpireDate = "month must be only 1-12";
      } else if (!reg.test(this.expired.year)) {
        this.invalidExpireDate = true;
        this.alertExpireDate = "date must be only numbers";
      } else if (this.expired.year < 2021) {
        this.invalidExpireDate = true;
        this.alertExpireDate = "year must start at 2021";
      } else if (
        !reg.test(this.expired.h1) ||
        !reg.test(this.expired.h2) ||
        !reg.test(this.expired.m1) ||
        !reg.test(this.expired.m2)
      ) {
        this.invalidExpireDate = true;
        this.alertExpireDate = "time must be only numbers";
      } else if (
        (this.expired.h1 == 2 && this.expired.h2 > 3) ||
        this.expired.h1 > 2
      ) {
        this.invalidExpireDate = true;
        this.alertExpireDate = "hour must be in 00-23";
      } else if (
        (this.expired.m1 == 5 && this.expired.m2 > 9) ||
        this.expired.m1 > 5
      ) {
        this.invalidExpireDate = true;
        this.alertExpireDate = "minute must be in 00-59";
      }
    },
    deleteClick() {
      if (this.discountList.status_id == "ST02") {
        DiscountService.deleteDiscount({
          discount_id: this.discount.discount_id
        }).then((res) => {
          if (res.discount_id) {
            this.discountList.status = "Deleted";
            this.discountList.status_id = res.status_id;
            this.$emit("clickCreate", false);
          }
        });
      }
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

.orange_title {
  padding-top: 0px;
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

#single-button {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.pictureUpload {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 420px;
  height: 153px;
  object-fit: cover;
  cursor: pointer;
}

.disable {
  color: #a0a0a0 !important;
  background-color: #e3e3e3;
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

.discount-delete-pic {
  filter: grayscale(100%) !important;
}

/* Firefox */
input[type="number"] {
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

.number > input {
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
    padding: 0px 30px !important;
  }
}
</style>
