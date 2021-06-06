<template>
  <div id="discount-box" @click="Onclick()">
    <img :class="cssImgEnd" :src="discount.discount_pic" />
    <div id="text-box">
      <!-- ShowBox -->
      <div id="delete-box" v-if="discount.status == `Deleted`">
        <h1>
          DELETED DISCOUNT<i style="margin-left:5px;" class="fa fa-trash-o"></i>
        </h1>
      </div>
      <!-- ShowBox -->

      <!-- ShowBox -->
      <div v-if="discount.status == `Active`" id="ongoing-box">
        <h1>
          DISCOUNT ON-GOING<i
            style="margin-left:5px;"
            class="fa fa-play-circle-o"
          ></i>
        </h1>
      </div>
      <!-- ShowBox -->

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
              {{ discount.redeem_point }}
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
  },
  computed: {
    cssImgEnd() {
      let default_pic = "cover";
      let end_pic = "cover end-pic";
      if (this.discount.status == "Deleted") {
        return end_pic;
      } else {
        return default_pic;
      }
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
  position: relative;
}

.end-pic {
  filter: grayscale(100%) !important;
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
  padding-top: 4px;
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

#ongoing-box > h1,
#delete-box > h1 {
  margin: 0;
  font-size: 1em;
  font-weight: 500;
}

#delete-box,#ongoing-box {
  padding: 5px 10px;
  border-radius: 16px;
  text-align: center;
  position: absolute;
  top: 123px;
  left: 13px;
  z-index: 3;
}

#ongoing-box {
  color: #ffffff;
  background-color: #ff8864;
}

#delete-box {
  color: #fd6363;
  background-color: white;
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

  #ongoing-box,#delete-box {
    top: 93px;
    left: 13px;
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
