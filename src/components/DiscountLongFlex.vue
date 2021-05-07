<template>
  <div>
    <div v-if="statusYourZone == true" id="discount-flex-box">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />

      <img
        class="discount-pic"
        src="https://www-cms.majorcineplex.com/uploads/content/16217/cover_16217.jpg"
      />

      <div id="title-section">
        <h1 class="discount-title">
          FREE popcorn and soft drink FREE popcorn and soft drink
        </h1>
        <h1 class="discount-description">
          1 free big popcorn and 1 big glass of soft drink of your selection
        </h1>
      </div>

      <!-- Button -->
      <div id="button">
        <button @click="moreDetail()">MORE DETAIL</button>
      </div>
      <!-- Button -->
    </div>

    <div
      v-else
      @click="clickDiscount()"
      style="cursor:pointer;"
      id="discount-flex-box"
    >
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />

      <img
        class="discount-pic"
        src="https://www-cms.majorcineplex.com/uploads/content/16217/cover_16217.jpg"
      />

      <div id="title-section">
        <h1 class="discount-title">
          FREE popcorn and soft drink FREE popcorn and soft drink
        </h1>
        <h1 class="discount-description">
          1 free big popcorn and 1 big glass of soft drink of your selection
        </h1>
      </div>

      <div id="coin-section">
        <div>
          <img id="coin-icon" src="@/assets/icon/coin.png" />
          <h1 class="coin-title">2500</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DiscountLongFlex",
  methods: {
    moreDetail() {
      this.$emit("discountReturn", true);
    },
    clickDiscount() {
      this.$emit("clickDiscountLongFlex", true);
    },
  },
  props: ["statusYourZone"],
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
  margin: 0px 15px;
  color: #444444;
  font-size: 1.75em;
  font-weight: 450;
  /* max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; */
}

.discount-description {
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 6px;
  color: #a0a0a0;
  margin-bottom: 0px;
  font-size: 1.5em;
  font-weight: 400;
  /* max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; */
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
  padding: 20px 15px 0px;
  /* padding: 50px 15px 0px; */
}
</style>
