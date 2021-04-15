<template>
  <div id="discount-page" class="event-container">
    <div id="banner">
        <img src="https://assets.grab.com/wp-content/uploads/sites/10/2020/03/31121328/27.03-GRABPAY-CITI-WEEKDAY-PROMO-Blog.jpg" alt="">
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
                <DiscountFlex></DiscountFlex>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Event -->
    </div>

    <h1 id="discount-title" class="event-header">ALL DISCOUNT</h1>

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
                <DiscountFlex></DiscountFlex>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Event -->
    </div>


  </div>
</template>

<script>
import DiscountFlex from "@/components/DiscountFlex.vue";
export default {
  name: "discount-page",
  data() {
    return {
      hovered: false,
      selected: "all",
      eventList: 20,
      joinList: 10,
      dataUser: [
        "05/20",
        "06/20",
        "07/20",
        "08/20",
        "09/20",
        "10/20",
        "11/20",
        "12/20",
        "13/20",
        "14/20",
      ],
      dataDate: "14 Oct 2021 - 15 Oct 2021",
      dataTitle: "Chai Miang Chiang Mai Camp with Aj.Harryfer",
      dataLocation: "Localhost Resort Chiang Mai, Thailand",
      dataHost: "pd.piriya",
    };
  },
  components: {
    DiscountFlex,
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

div::-webkit-scrollbar {
  height: 10px;
  padding-bottom: 30px;
}

div::-webkit-scrollbar-track {
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.2);
}

div::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 0 0 1px rgba(255, 255, 255, 1);
}

div::-webkit-scrollbar:vertical {
  display: none;
}

#banner{
  box-shadow: 0px 3px 30px #0000000D;
  margin-bottom:25px;
}

#banner > img{
  width:100%;
  height:180px;
  border-radius: 10px;  
  object-fit: cover;
}

/* #discount-page-section {
} */
</style>