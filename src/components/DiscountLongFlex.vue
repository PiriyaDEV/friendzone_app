<template>
  <div>
    <div
      @click="clickDiscount()"
      id="discount-flex-box"
      :class="discountCursor"
    >
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />

      <!-- ShowBox -->
      <div v-if="discount.status_id == 'ST17'" id="used-box">
        <h1>DISCOUNT HAS BEEN USED</h1>
      </div>
      <!-- ShowBox -->

      <!-- ShowBox -->
      <div v-if="(discount.status_id == 'ST16') && discount.isExpired" id="expired-box">
        <h1>DISCOUNT IS EXPIRED</h1>
      </div>
      <!-- ShowBox -->

      <img :class="cssImgEnd" :src="discount.discount_pic" />
      

      <div id="title-section">
        <h1 class="discount-title">
          {{ discount.name }}
        </h1>
        <h1 class="discount-description">
          {{ discount.description }}
        </h1>
      </div>

      <div v-if="statusYourZone != true" id="coin-section">
        <div>
          <img id="coin-icon" src="@/assets/icon/coin.png" />
          <h1 class="coin-title">
            <span v-if="discount.redeem_point == 0">
              FREE
            </span>
            <span v-else>
              {{ discount.redeem_point }}
            </span>
          </h1>
        </div>
      </div>
      <!-- Button -->
      <div v-else id="button">
        <button @click="moreDetail()">MORE DETAIL</button>
      </div>
      <!-- Button -->
    </div>
  </div>
</template>

<script>
export default {
  name: "DiscountLongFlex",
  methods: {
    moreDetail() {
      if (this.statusYourZone == true) {
        this.$emit("discountReturn", true);
        this.$emit("discountData", this.discount);
      }
    },
    clickDiscount() {
      if (!this.statusYourZone) {
        this.$emit("clickDiscountLongFlex", true);
        this.$emit("discountData", this.discount);
      }
    }
  },
  computed:{
    cssImgEnd() {
      let default_pic = "discount-pic";
      let end_pic = "discount-pic end-pic";
      if (this.discount.status_id == 'ST17' || this.discount.isExpired) {
        return end_pic;
      } else {
        return default_pic;
      }
    },
    discountCursor() {
      let default_cursor = "";
      let pointer_cursor = "discount-cursor";
      if (this.statusYourZone == true) {
        return default_cursor;
      } else {
        return pointer_cursor;
      }
    },
  },
  props: ["statusYourZone", "discount"]
};
</script>

<style scoped>
.discount-pic {
  width: 100%;
  height: 130px;
  object-fit: cover;
  border-top-left-radius: 17px;
  border-top-right-radius: 17px;
}

.discount-title {
  padding-top:2px;
  margin: 0px 15px;
  color: #444444;
  font-size: 1.75em;
  font-weight: 450;
  text-overflow: ellipsis;
  overflow: hidden;
  width: calc(100% - 30px);
  height: 33px;
  line-height: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.discount-cursor{
  cursor: pointer;
}

.end-pic{
  filter: grayscale(100%) !important;
}

.discount-description {
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 6px;
  color: #a0a0a0;
  margin-bottom: 0px;
  font-size: 1.5em;
  font-weight: 400;
  text-overflow: ellipsis;
  overflow: hidden;
  width: calc(100% - 30px);
  height: 32px;
  line-height: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

#title-section {
  margin-top: 10px;
}

.highlight-text {
  color: #ff8864;
}

#coin-icon {
  width: 25px;
  height: 25px;
  margin-right: 5px;
}

.coin-title {
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: 1.75em;
  font-weight: 450;
  color: #444444;
}

#button {
  text-align: right;
  margin-right: 20px;
  margin-top: 20px;
  padding-bottom: 15px;
}

#button > button {
  color: #ff8864;
  border: 1.75px solid #ff8864;
  background-color: #ffffff;
  font-family: "Atten-Round-New";
  font-size: 1.25em;
  font-weight: 550;
  padding: 3px 15px;
  margin: 0;
  border-radius: 16px;
}

#coin-section > div {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 15px 15px 0px;
  /* padding: 50px 15px 0px; */
}

#used-box > h1, #expired-box > h1{
  margin: 0;
  font-size: 1em;
  font-weight: 500;
}

#expired-box,#used-box {
  padding: 5px 10px;
  border-radius: 16px;
  text-align: center;
  position: absolute;
  top: 102px;
  left: 13px;
  z-index: 3;
}

#expired-box{
  color: #ff8864;
  background-color: white;
}

#used-box{
  color: white;
  background-color: #ff8864;
}
</style>
