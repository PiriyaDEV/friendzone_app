<template>
  <div id="discount-page" class="event-container">
    <div id="banner">
      <img
        src="https://assets.grab.com/wp-content/uploads/sites/10/2020/03/31121328/27.03-GRABPAY-CITI-WEEKDAY-PROMO-Blog.jpg"
        alt=""
      />
    </div>

    <h1 id="discount-title" class="event-header">HOT DISCOUNT</h1>

    <div id="discount-page-section">
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
              <div v-for="(item, i) in eventList" :key="i">
                <DiscountFlex
                  @clickDiscountFlex="clickDiscountFlex"
                ></DiscountFlex>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Event -->
    </div>

    <div>
      <div id="joined-menu">
        <h1 class="event-header">BROWSE</h1>
        <div>
          <div>
            <!-- Event -->
            <div id="container">
              <div
                @mouseover="hovered = true"
                @mouseleave="hovered = false"
                class="event-container"
              >
                <div class="list event-flex-wrap-section">
                  <div v-for="(item, i) in eventList" :key="i">
                    <DiscountLongFlex
                      @clickDiscountLongFlex="clickDiscountLongFlex"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- Event -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DiscountFlex from "@/components/DiscountFlex.vue";
import DiscountLongFlex from "@/components/DiscountLongFlex.vue";
export default {
  name: "discount-page",
  data() {
    return {
      hovered: false,
      selected: "all",
      eventList: 5,
      joinList: 10,
    };
  },
  components: {
    DiscountFlex,
    DiscountLongFlex,
  },
  methods: {
    clickDiscountLongFlex(value) {
      this.$emit("clickDiscount2", value);
    },
    clickDiscountFlex(value) {
      this.$emit("clickDiscount2", value);
    },
  },
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

/* #discount-page-section {
} */
</style>
