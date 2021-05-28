<template>
  <div id="discount-popup" class="popup">
    <div class="popup-section section">
      <div class="popup-form">
        <h1 id="header" class="header_title" v-if="!showConfirm">
          DISCOUNT DETAILS
        </h1>
        <div v-else style="height: 50px"></div>

        <div class="section">
          <img class="discount-pic" :src="Discount.discount_pic" />
        </div>

        <div class="section">
          <div id="info-box">
            <h1 id="title">{{ Discount.name }}</h1>

            <h1 class="detail">
              {{ Discount.description }}
              <br v-if="!used" />
              <br v-if="!used" />
            </h1>
          </div>
        </div>

        <h1 id="confirm" v-if="showConfirm">
          Do you confirm to <br />
          use the discount?
        </h1>

        <div id="condition" v-if="!showConfirm">
          <div class="left">
            <h1 v-if="clickFromYourZone" class="header_description">
              Bought on
            </h1>
            <h1 v-else class="header_description">Buy within</h1>
            <h1 class="header_description">Point Used</h1>
            <h1 v-if="!clickFromYourZone" class="header_description">
              Quota(s)
            </h1>
            <h1 class="header_description">Use within</h1>
            <h1 v-if="used" class="header_description">Use On</h1>
          </div>
          <div class="right">
            <h1 v-if="clickFromYourZone" class="description">
              {{ Discount.created_at }}
            </h1>
            <h1 v-else class="description">{{ Discount.period_end }}</h1>
            <div id="coin">
              <img src="@/assets/icon/coin.png" />
              <h1 class="discount-title header_description">
                <span v-if="Discount.redeem_point == 0">
                  FREE
                </span>
                <span v-else>
                  {{ Discount.redeem_point }}
                </span>
              </h1>
            </div>
            <h1 v-if="!clickFromYourZone" class="header_description">
              <span v-if="Discount.limits == 0">
                No Limit
              </span>
              <span v-else> {{ Discount.limits }} Left </span>
            </h1>
            <h1 class="description">{{ Discount.expiredText }}</h1>
            <h1 v-if="used" class="description">{{ Discount.updated_at }}</h1>
          </div>
        </div>

        <!-- Button -->
        <div v-if="clickFromYourZone == true" id="button">
          <span v-if="!showConfirm">
            <button
              class="create_button"
              v-if="!used && !Discount.isExpired"
              @click="clickUseNow()"
            >
              Use Now
            </button>
            <button v-if="used" class="create_button used">
              Used
            </button>
            <button v-if="!used && Discount.isExpired" class="create_button used">
              Expired
            </button>
          </span>
          <div v-else class="section double-button">
            <div id="button-container">
              <div>
                <button class="create_button" @click="clickConfirmUse()">
                  Confirm
                </button>
              </div>
              <div>
                <button class="back_button" @click="cancelUse()">Cancel</button>
              </div>
            </div>
          </div>
        </div>
        <div v-else id="button">
          <!-- <button :class="cssBuy">Buy with point</button> -->
          <button
            v-if="isPointEnough"
            class="create_button"
            @click="clickToBuy()"
          >
            Buy with point
          </button>
          <span v-else>
            <button class="create_button used">
              Your Point is not enough.
            </button>
          </span>
        </div>

        <h1 class="caution" v-if="used">
          Please show this page to officer before use
        </h1>
        <div v-else class="bottom-space">
          <span></span>
        </div>

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
import DiscountService from "@/services/discount.service";
import PointTransactionService from "@/services/pointTransaction.service";

export default {
  data() {
    return {
      used: false,
      showConfirm: false,
      isPointEnough: true
    };
  },
  props: ["clickFromYourZone", "Discount"],
  created() {
    if (this.Discount.status_id == "ST17") {
      this.used = true;
    }
    if (!this.clickFromYourZone) {
      PointTransactionService.getPoint().then((res) => {
        if (res.point >= this.Discount.redeem_point) {
          this.isPointEnough = true;
        } else this.isPointEnough = false;
      });
    }
  },
  methods: {
    cancelDiscount() {
      this.$emit("clickDiscount", false);
      this.$emit("clickDiscount2", false);
    },
    clickUseNow() {
      if (!this.Discount.isExpired) this.showConfirm = true;
    },
    clickToBuy() {
      DiscountService.buyDiscount({
        discount_id: this.Discount.discount_id,
        redeem_point: this.Discount.redeem_point
      })
        .then((res) => {
          if (res.user_discount_id) {
            this.$store.state.point = this.$store.state.point - this.Discount.redeem_point;
            this.cancelDiscount();
          }
        })
        .catch(() => {
          console.log("Error when buy the discount");
        });
    },
    clickConfirmUse() {
      if (!this.used) {
        DiscountService.useDiscount({
          user_discount_id: this.Discount.user_discount_id
        })
          .then((res) => {
            if (res) {
              this.used = true;
              this.showConfirm = false;
              this.Discount.status_id = "ST17";
            }
          })
          .catch(() => {
            console.log("Error when use the discount");
          });
      }
    },
    cancelUse() {
      this.showConfirm = false;
    }
  },
  computed: {
    cssBuy() {
      let purchasable = "create_button";
      let unpurchasable = "create_button block_buy";
      if (this.te == true) {
        return purchasable;
      }
      return unpurchasable;
    }
  }
};
</script>

<style scoped>
h1 {
  color: #444444;
}

#title,
.detail,
.caution {
  width: 100%;
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

.double-button > div > div > button {
  margin: 0px 0px 10px 0px !important;
}

.double-button {
  margin-bottom: 20px;
}

.bottom-space {
  height: 15px;
}

.caution {
  font-size: 1.5em;
  font-weight: 400;
  color: #fe8864;
  margin: 0px;
  padding-bottom: 20px;
  text-align: center;
}

#confirm {
  font-size: 2.75em;
  color: #444444;
  font-weight: 500;
  text-align: center;
  margin: 10px 0px 0px 0px;
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
  justify-content: space-between;
}

.left {
  padding-right: 70px;
}

.discount-pic {
  height: 180px;
  width: 250px;
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

.create_button {
  margin: 20px 0px 15px 0px;
}

.create_button,
.back_button {
  width: 100% !important;
}

#button > span {
  display: flex;
  justify-content: center;
}

.double-button {
  margin-top: 20px;
}

.used {
  background-color: #a0a0a0 !important;
  cursor: default !important;
}

#info-box,
#button-container {
  width: 250px;
}

.block_buy {
  background-color: #a0a0a0;
  cursor: default;
}

@media screen and (max-width: 690px) {
  #title,
  .detail,
  .caution {
    max-width: 100% !important;
  }

  .discount-pic {
    width: 230px !important;
  }

  #info-box {
    width: 230px;
  }
}

@media screen and (max-width: 490px) {
  .popup-form {
    padding: 0px 40px !important;
  }
}
</style>
