<template>
  <div id="discount-page" class="event-container">
    <div id="banner" hidden>
      <img
        src="https://assets.grab.com/wp-content/uploads/sites/10/2020/03/31121328/27.03-GRABPAY-CITI-WEEKDAY-PROMO-Blog.jpg"
        alt=""
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
  methods: {
    clickDiscountLongFlex(value) {
      this.$emit("clickDiscount2", value);
    },
    clickDiscountFlex(value) {
      this.$emit("clickDiscount2", value);
    },
    discountData(value) {
      this.$emit("discountData",value);
    }
  },
  created() {
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

#container {
  width: 340px;
  height: 50px;
}

#banner > img {
  width: 100%;
  height: 180px;
  border-radius: 10px;
  object-fit: cover;
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

@media screen and (max-width: 490px) {
  #banner > img {
    height: 135px;
  }
}
</style>
