<template>
  <div id="discount-page" class="event-container">
    <div id="banner">
      <img
        class="banner-pc"
        src="../assets/Banner/Promotion_Banner_long-01.png"
      />
      <img
        class="banner-tablet"
        src="../assets/Banner/Promotion_Banner-01.png"
      />
    </div>

    <h1 id="discount-title" class="event-header">HOT DISCOUNT</h1>

    <div v-if="discountHotList.length" id="discount-page-section">
      <!-- Event -->
      <div class="event-section">
        <div id="container">
          <div
            id="list-container"
            @mouseover="hovered = true"
            @mouseleave="hovered = false"
            class="event-container"
          >
            <div class="list event-flex-section">
              <div v-for="(discount, i) in discountHotList" :key="i">
                <DiscountFlex
                  :discount="discount"
                  @clickDiscountFlex="clickDiscountFlex"
                  @discountData="discountData"
                ></DiscountFlex>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Event -->
    </div>
    <div v-else><NoInformation /></div>

    <div>
      <div id="joined-menu">
        <h1 class="event-header">BROWSE</h1>
        <div v-if="discountBrowseList.length">
          <div>
            <!-- Event -->
            <div id="container">
              <div
                @mouseover="hovered = true"
                @mouseleave="hovered = false"
                class="event-container"
              >
                <div class="list event-flex-wrap-section">
                  <div v-for="(discount, i) in discountBrowseList" :key="i">
                    <DiscountLongFlex
                      :discount="discount"
                      @clickDiscountLongFlex="clickDiscountLongFlex"
                      @discountData="discountData"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- Event -->
          </div>
        </div>
        <div v-else><NoInformation /></div>
      </div>
    </div>
  </div>
</template>

<script>
import DiscountFlex from "@/components/DiscountFlex.vue";
import DiscountLongFlex from "@/components/DiscountLongFlex.vue";
import DiscountService from "@/services/discount.service";
import NoInformation from "@/components/NoInformation.vue";

export default {
  name: "discount-page",
  data() {
    return {
      hovered: false,
      selected: "all",
      discountBrowseList: [],
      discountHotList: []
    };
  },
  components: {
    DiscountFlex,
    DiscountLongFlex,
    NoInformation
  },
  props: ["decrement"],
  watch: {
    decrement: function() {
      if (this.decrement != null) {
        this.discountBrowseList.forEach((discount) => {
          if (discount.discount_id == this.decrement) {
            discount.myDiscount++;
          }
        });
        this.discountHotList.forEach((discount) => {
          if (discount.discount_id == this.decrement) {
            discount.myDiscount++;
          }
        });
      }
    }
  },
  created() {
    this.getHotDiscount();
    this.getBrowseDiscount();
  },
  methods: {
    clickDiscountLongFlex(value) {
      this.$emit("clickDiscount2", value);
    },
    clickDiscountFlex(value) {
      this.$emit("clickDiscount2", value);
    },
    discountData(value) {
      this.$emit("discountData", value);
    },
    getHotDiscount() {
      DiscountService.getHotDiscount()
        .then((res) => {
          if (res) {
            this.discountHotList = res;
          }
        })
        .catch(() => {
          this.discountHotList = [];
        });
    },
    getBrowseDiscount() {
      DiscountService.getBrowseDiscount()
        .then((res) => {
          if (res) {
            this.discountBrowseList = res;
          }
        })
        .catch(() => {
          this.discountBrowseList = [];
        });
    }
  }
};
</script>

<style scoped>
#discount-page {
  margin-top: 110px;
  margin-bottom: 30px;
  overflow-x: hidden;
  overflow-y: auto;
}

#discount-title {
  margin-top: 0px;
}

#banner {
  box-shadow: 0px 3px 30px #0000000d;
  margin-bottom: 25px;
}

#banner > img {
  width: 100%;
  border-radius: 10px;
  object-fit: cover;
  height: 100%;
}

.banner-pc {
  display: block;
}

.banner-tablet,
.banner-mobile {
  display: none;
}

#container {
  width: 340px;
  height: 50px;
}

@media screen and (max-width: 1060px) {
  .banner-pc,
  .banner-mobile {
    display: none;
  }

  .banner-tablet {
    display: block;
  }
}

@media screen and (max-width: 768px) {
  #list-container {
    margin-bottom: 10px;
  }
}

@media screen and (max-width: 880px) {
  #discount-page {
    margin-top: 0px;
  }
}
</style>
