<template>
  <div id="search-page" class="event-container">
    <div id="mobile-filter">
      <MobileFilter/>
    </div>
    <div id="flex-section">
      <h1 id="searchtext" class="event-header">
        20 items match your search
        <span class="orange-color">“{{ searchValue }}”</span>
      </h1>

      <div id="menu">
        <h1 @click="friendClick()" :class="cssFriend">FRIENDS (34)</h1>
        <h1 @click="eventClick()" :class="cssEvent">EVENTS (12)</h1>
        <h1 @click="discountClick()" :class="cssDiscount">DISCOUNT (30)</h1>
      </div>
      <hr id="bar" />

      <div id="flex-box">
        <div>
          <!-- Event -->
          <div id="container">
            <div
              @mouseover="hovered = true"
              @mouseleave="hovered = false"
              class="search-flex-container"
            >
              <div
                v-if="friendSelect == true"
                class="list event-flex-wrap-section"
              >
                <div v-for="(item, i) in eventList" :key="i">
                  <FriendFlex />
                </div>
              </div>

              <div
                v-if="eventSelect == true"
                class="list event-flex-wrap-section"
              >
                <div v-for="(item, i) in eventList" :key="i">
                  <EventFlex
                    :user="dataUser[i]"
                    :date="dataDate"
                    :title="dataTitle"
                    :location="dataLocation"
                    :host="dataHost"
                    @clickRate="clickRate"
                    @checkRate="checkRate"
                  />
                </div>
              </div>

              <div
                v-if="discountSelect == true"
                class="list event-flex-wrap-section"
              >
                <div v-for="(item, i) in eventList" :key="i">
                  <DiscountLongFlex />
                </div>
              </div>
            </div>
          </div>
          <!-- Event -->
        </div>
      </div>
    </div>
    <div id="filterbar">
      <Filterbar></Filterbar>
    </div>
  </div>
</template>

<script>
import MobileFilter from "@/components/MobileFilter.vue";
import Filterbar from "@/components/Filterbar.vue";
import EventFlex from "@/components/EventFlex.vue";
import FriendFlex from "@/components/FriendFlex.vue";
import DiscountLongFlex from "@/components/DiscountLongFlex.vue";
export default {
  props: ["searchValue"],
  data() {
    return {
      friendSelect: true,
      eventSelect: false,
      discountSelect: false,
      hovered: false,
      selected: "all",
      eventList: 20,
      joinList: 15,
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
    Filterbar,
    DiscountLongFlex,
    EventFlex,
    FriendFlex,
    MobileFilter
  },
  methods: {
    friendClick() {
      this.friendSelect = true;
      this.eventSelect = false;
      this.discountSelect = false;
    },
    eventClick() {
      this.friendSelect = false;
      this.eventSelect = true;
      this.discountSelect = false;
    },
    discountClick() {
      this.friendSelect = false;
      this.eventSelect = false;
      this.discountSelect = true;
    },
  },
  computed: {
    cssFriend() {
      let select = "menu-text selected";
      let deselect = "menu-text";
      if (this.friendSelect == true) {
        return select;
      }
      return deselect;
    },
    cssEvent() {
      let select = "menu-text selected";
      let deselect = "menu-text";
      if (this.eventSelect == true) {
        return select;
      }
      return deselect;
    },
    cssDiscount() {
      let select = "menu-text selected";
      let deselect = "menu-text";
      if (this.discountSelect == true) {
        return select;
      }
      return deselect;
    },
  },
};
</script>

<style scoped>
h1 {
  color: #444444;
}

#search-page {
  margin-top: 110px;
  margin-bottom: 30px;
  overflow-x: hidden;
  display: flex;
  justify-content: space-between;
}

#menu {
  display: flex;
}

#mobile-filter {
  display: none;
}

#searchtext {
  margin-top: 0px;
  font-size: 2em;
  font-weight: 500;
  margin-bottom: 15px;
}

#flex-section {
  width: calc(100% - 150px);
  margin-right: 35px;
}

.menu-text {
  font-size: 1.85em;
  font-weight: 400;
  padding-right: 19px;
  padding-left: 10px;
  margin-top: 5px;
  padding-bottom: 7px;
  cursor: pointer;
}

.selected {
  font-weight: 600;
  border-bottom: 4.5px solid #444444;
}

#bar {
  height: 0.1px;
  border-width: 0;
  color: #a0a0a0;
  background-color: #a0a0a0;
  margin-top: -11px;
}

#flex-box {
  margin-top: 30px;
}

@media screen and (max-width: 880px) {
  #search-page {
    margin-top: 0px;
    display: block;
  }

  #filterbar {
    display: none;
  }

  #flex-section {
    width: 100%;
    margin-right: 0px;
  }

  #mobile-filter {
    display: flex;
    margin-bottom:20px;
  }
}

@media screen and (max-width: 490px) {
  .menu-text{
    font-size:1.6em;
  }
}
</style>
