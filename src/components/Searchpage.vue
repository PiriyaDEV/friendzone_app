<template>
  <div id="search-page" class="event-container">
    <div id="mobile-filter">
      <MobileFilter />
    </div>
    <div id="flex-section">
      <h1 id="searchtext" class="event-header">
        {{ searchUserList.length + searchEventList.length }} items match your
        search
        <span class="orange-color">“{{ searchValue }}”</span>
      </h1>

      <div id="menu">
        <h1 @click="friendClick()" :class="cssFriend">
          FRIENDS ({{ searchUserList.length }})
        </h1>
        <h1 @click="eventClick()" :class="cssEvent">
          EVENTS ({{ searchEventList.length }})
        </h1>
        <h1 @click="discountClick()" :class="cssDiscount">
          DISCOUNT ({{ searchDiscountList.length }})</h1>
      </div>
      <hr id="bar" />

      <div id="flex-box"></div>
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
              <!-- No Information -->
              <NoInformation v-if="searchUserList.length == 0" />
              <!-- No Information -->

              <div v-for="(searchUser, i) in searchUserList" :key="i">
                <FriendFlex :searchUser="searchUser" @showProfile="showProfile" />
              </div>
            </div>

            <div
              v-if="eventSelect == true"
              class="list event-flex-wrap-section"
            >
              <!-- No Information -->
              <NoInformation v-if="searchEventList.length == 0" />
              <!-- No Information -->

              <div v-for="(event, i) in searchEventList" :key="i">
                <EventFlex
                  :event="event"
                  @clickRate="clickRate"
                  @checkRate="checkRate"
                  @thisEvent="thisEvent"
                  @manageReturn="manageReturn"
                  @detailReturn="detailReturn"
                  @showProfile="showProfile"
                />
              </div>
            </div>

            <div
              v-if="discountSelect == true"
              class="list event-flex-wrap-section"
            >
              <!-- No Information -->
              <NoInformation v-if="searchDiscountList.length == 0" />
              <!-- No Information -->

              <div v-for="(item, i) in searchDiscountList" :key="i">
                <DiscountLongFlex :discount="item" @clickDiscountLongFlex="clickDiscountLongFlex"
                      @discountData="discountData"/>
              </div>
            </div>
          </div>
        </div>
        <!-- Event -->
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
import SearchService from "../services/search.service";
import NoInformation from "@/components/NoInformation.vue";

export default {
  props: ["searchValue"],
  data() {
    return {
      friendSelect: true,
      eventSelect: false,
      discountSelect: false,
      hovered: false,
      selected: "all",
      searchUserList: [],
      searchEventList: [],
      searchDiscountList: []
    };
  },
  created() {
    this.functionGetApi(this.searchValue);
  },
  components: {
    Filterbar,
    DiscountLongFlex,
    EventFlex,
    FriendFlex,
    NoInformation,
    MobileFilter
  },
  watch: {
    searchValue: function(searchValue) {
      this.searchUserList = [];
      this.searchEventList = [];
      this.searchDiscountList = [];
      this.functionGetApi(searchValue);
    }
  },
  methods: {
    clickDiscountLongFlex(value) {
      this.$emit("clickDiscount2", value);
    },
    discountData(value) {
      this.$emit("discountData", value);
    },
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
    showProfile(value) {
      console.log(value)
      this.$emit("userProfile",value)
    },
    detailReturn(value) {
      this.$emit("detail", true);
      this.$emit("clickManage", value);
    },
    thisEvent(value) {
      this.$emit("thisEvent", value);
    },
    functionGetApi(value) {
      SearchService.getSearchUser(value)
        .then((res) => {
          if (res) {
            this.searchUserList = res;
          }
        })
        .catch(() => {
          this.searchUserList = [];
        });

      SearchService.getSearchEvent(value)
        .then((res) => {
          if (res) {
            this.searchEventList = res;
          }
        })
        .catch(() => {
          this.searchEventList = [];
        });

          SearchService.getSearchDiscount(value)
        .then((res) => {
          if (res) {
            this.searchDiscountList = res;
          }
        })
        .catch(() => {
          this.searchDiscountList = [];
        });
    }
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
    }
  }
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
    margin-bottom: 20px;
  }
}

@media screen and (max-width: 490px) {
  .menu-text {
    font-size: 1.6em;
  }
}
</style>
