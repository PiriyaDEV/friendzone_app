<template>
  <div id="discount-popup" class="popup">
    <div class="popup-section section">
      <div class="popup-form">
        <h1 id="header" class="header_title">
          DISCOUNT DETAILS
        </h1>

        <div class="section">
          <img
            class="discount-pic"
            src="https://www-cms.majorcineplex.com/uploads/content/16217/cover_16217.jpg"
          />
        </div>

        <h1 id="title">
          FREE popcorn and soft drink
        </h1>

        <h1 class="detail">
          1 free big popcorn and 1 big glass of soft drink of your selection
          <br />
          <br />
          NOTE : Can be used at any branch of Minor Cineplex (Except ICONSIAM)
        </h1>

        <div id="condition">
          <div class="left">
            <h1 v-if="clickFromYourZone == true" class="header_description">
              Bought on
            </h1>
            <h1 v-else class="header_description">Buy within</h1>
            <h1 class="header_description">Point Used</h1>
            <h1 class="header_description">Use within</h1>
          </div>
          <div class="right">
            <h1 class="description">30 May 2021 23:59</h1>
            <div id="coin">
              <img src="@/assets/icon/coin.png" />
              <h1 class="discount-title header_description">2500</h1>
            </div>
            <h1 class="description">11 Oct 2021 23:59</h1>
          </div>
        </div>

        <!-- Button -->
        <div v-if="clickFromYourZone == true" id="button">
          <button>Use Now</button>
        </div>
        <div v-else id="button">
          <button>Buy with point</button>
        </div>

        <h1 id="caution">Please show this page to officer before use</h1>

        <img
          @click="cancelDiscount()"
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
  props: ["clickFromYourZone"],
  methods: {
    cancelDiscount() {
      this.$emit("clickDiscount", false);
      this.$emit("clickDiscount2", false);
    },
  },
};
</script>

<style scoped>
h1 {
  color: #444444;
}

#title,
.detail,
#caution {
  max-width: 250px;
}

#title {
  font-size: 2.25em;
  text-align: center;
}

.detail {
  padding-bottom: 10px;
}

.description,
.detail {
  font-size: 1.75em;
  font-weight: 400;
  color: #a0a0a0;
  margin: 10px 0px 0px 0px;
}

#caution {
  font-size: 1.5em;
  font-weight: 400;
  color: #fe8864;
  margin: 0px;
  padding-bottom: 20px;
  text-align: center;
}

.header_description {
  font-size: 1.75em;
  font-weight: 500;
  color: #444444;
  margin: 10px 0px 0px 0px;
}

#header {
  margin-top: 10px;
  text-align: center;
}

#condition {
  display: flex;
  justify-content: center;
}

.left {
  padding-right: 70px;
}

.discount-pic {
  width: 230px;
  height: 180px;
  object-fit: cover;
  border-radius: 19px;
  border: 3px solid #444444;
}

#coin {
  display: flex;
  align-items: center;
}

#coin > img {
  padding-right: 5px;
  width: 15px;
  height: 15px;
  margin: 10px 0px 0px 0px;
}

#button {
  margin: 15px 0px;
}

#button > button {
  color: #ffffff;
  background-color: #ff8864;
  width: 100%;
  text-align: center;
  font-family: "Atten-Round-New";
  font-size: 2.25em;
  font-weight: 600;
  border: none;
  padding: 7px 15px;
  margin: 0;
  border-radius: 16px;
}
</style>
