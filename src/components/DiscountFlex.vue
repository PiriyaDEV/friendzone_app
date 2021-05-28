<template>
  <div id="discount-box" @click="Onclick()">
    <img class="cover" :src="discount.discount_pic" />
    <div id="text-box">
      <h1 class="discount-title">
        {{ discount.name }}
      </h1>
      <h1 class="discount-description">
        {{ discount.description }}
      </h1>
      <div id="value">
        <div class="coin-section">
          <img id="coin-icon" src="@/assets/icon/coin.png" />
          <h1 class="coin-title">
            <span v-if="discount.redeem_point == 0">
              FREE
            </span>
            <span v-else>
              {{discount.redeem_point}}
            </span>
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DiscountFlex",
  props: ["discount"],
  methods: {
    Onclick() {
      this.$emit("clickDiscountFlex", true);
      this.$emit("discountData", this.discount);
    }
  }
};
</script>

<style scoped>
#discount-box {
  display: flex;
  background-color: #ffffff;
  border-radius: 14px;
  margin-right: 20px;
  height: 150px;
  margin-bottom: 20px;
  cursor: pointer;
}

.cover {
  width: 150px;
  border-top-left-radius: 14px;
  border-bottom-left-radius: 14px;
  height: inherit;
  object-fit: cover;
}

#text-box {
  padding: 15px;
}

.discount-title {
  width: 200px;
  padding-top:4px;
  height: 34px;
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: 1.75em;
  font-weight: 450;
  color: #444444;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.coin-title {
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: 1.75em;
  font-weight: 450;
  color: #444444;
}

.coin-section {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 15px 10px 10px 0px;
}

.discount-description {
  width: 200px;
  height: 29px;
  margin-top: 6px;
  margin-bottom: 6px;
  font-size: 1.5em;
  font-weight: 400;
  color: #a0a0a0;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

#coin-icon {
  width: 25px;
  height: 25px;
  margin-right: 5px;
}

#value {
  margin-top: 10px;
}

@media screen and (max-width: 880px) {
  #discount-box {
    height: 120px;
  }

  .coin-section {
    padding: 0px 10px 10px 0px;
  }

  #value {
    margin-top: 5px;
  }

  .cover {
    width: 125px;
  }

  .discount-title,
  .discount-description {
    width: 175px;
  }
}

@media screen and (max-width: 490px) {
  #discount-box {
    height: 118px;
  }

  #coin-icon {
    width: 20px;
    height: 20px;
  }

  .coin-section {
    padding: 0px;
  }

  #value {
    margin-top: 5px;
  }

  .cover {
    width: 85px;
  }

  .discount-title,
  .discount-description {
    width: 175px;
  }
}
</style>
