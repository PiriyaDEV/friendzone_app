<template>
  <div id="search-page" class="event-container">
    <div id="mobile-filter">
      <MobileFilter />
    </div>
    <div id="flex-section">
      <h1 id="searchtext" class="event-header">
        {{
          searchUserShow.length +
            searchEventShow.length +
            searchDiscountShow.length
        }}
        items match your search
        <span class="orange-color">“{{ searchValue }}”</span>
      </h1>
      <div id="menu">
        <h1 @click="friendClick()" :class="cssFriend">
          FRIENDS ({{ searchUserShow.length }})
        </h1>
        <h1 @click="eventClick()" :class="cssEvent">
          EVENTS ({{ searchEventShow.length }})
        </h1>
        <h1 @click="discountClick()" :class="cssDiscount">
          DISCOUNT ({{ searchDiscountShow.length }})
        </h1>
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
              <NoInformation v-if="searchUserShow.length == 0" />
              <!-- No Information -->

              <div v-for="(searchUser, i) in searchUserShow" :key="i">
                <FriendFlex
                  :searchUser="searchUser"
                  @showProfile="showProfile"
                />
              </div>
            </div>

            <div
              v-if="eventSelect == true"
              class="list event-flex-wrap-section"
            >
              <!-- No Information -->
              <NoInformation v-if="searchEventShow.length == 0" />
              <!-- No Information -->

              <div v-for="(event, i) in searchEventShow" :key="i">
                <EventFlex
                  :event="event"
                  @clickRate="clickRate"
                  @checkRate="checkRate"
                  @thisEvent="thisEvent"
                  @manageReturn="manageReturn"
                  @detailReturn="detailReturn"
                  @showProfile="showProfile"
                  @titleError="titleError"
                />
              </div>
            </div>

            <div
              v-if="discountSelect == true"
              class="list event-flex-wrap-section"
            >
              <!-- No Information -->
              <NoInformation v-if="searchDiscountShow.length == 0" />
              <!-- No Information -->

              <div v-for="(item, i) in searchDiscountShow" :key="i">
                <DiscountLongFlex
                  :discount="item"
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
    <div id="filterbar">
      <Filterbar
        @friendFilter="setFriendFilter"
        @eventFilter="setEventFilter"
        @discountFilter="setDiscountFilter"
      ></Filterbar>
    </div>
  </div>
</template>

<script>
import MobileFilter from "@/components/MobileFilter.vue";
import Filterbar from "@/components/Filterbar.vue";
import EventFlex from "@/components/EventFlex.vue";
import FriendFlex from "@/components/FriendFlex.vue";
import DiscountLongFlex from "@/components/DiscountLongFlex.vue";
import SearchService from "@/services/search.service";
import NoInformation from "@/components/NoInformation.vue";

export default {
  props: ["searchValue"],
  data() {
    return {
      friendSelect: true,
      eventSelect: false,
      discountSelect: false,
      hovered: false,
      friendFilter: [],
      eventFilter: [],
      discountFilter: [],
      searchUserShow: [],
      searchUserList: [],
      searchEventShow: [],
      searchEventList: [],
      searchDiscountShow: [],
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
      this.searchUserShow = [];
      this.searchEventShow = [];
      this.searchDiscountShow = [];
      this.searchUserList = [];
      this.searchEventList = [];
      this.searchDiscountList = [];
      this.functionGetApi(searchValue);
    },
    friendFilter: function() {
      if (this.friendFilter.length) {
        this.searchUserShow = [];
        if (this.friendFilter.length == 1) {
          this.searchUserShow = this.searchUserList.filter(
            (user) => this.friendFilter[0] == user.status_id
          );
        } else if (this.friendFilter.length == 2)
          this.searchUserShow = this.searchUserList;
      } else {
        this.searchUserShow = this.searchUserList;
      }
    },
    eventFilter: function() {
      if (this.eventFilter.length) {
        this.searchEventShow = [];
        this.searchEventShow = this.searchEventList.filter((event) =>
          this.eventFilter.every((id) => event[`${id}`])
        );
      } else {
        this.searchEventShow = this.searchEventList;
      }
    },
    discountFilter: function() {
      if (this.discountFilter.length) {
        this.searchDiscountShow = [];
        let max = Math.max(...this.discountFilter);
        this.searchDiscountShow = this.searchDiscountList.filter(
          (discount) => discount.redeem_point < max
        );
      } else {
        this.searchDiscountShow = this.searchDiscountList;
      }
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
  },
  methods: {
    clickDiscountLongFlex(value) {
      this.$emit("clickDiscount2", value);
    },
    titleError(value) {
      this.$emit("titleError", value);
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
      console.log(value);
      this.$emit("userProfile", value);
    },
    manageReturn(value) {
      this.$emit("manage", true);
      this.$emit("clickManage", value);
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
            this.searchUserShow = res;
            this.searchUserList = res;
          }
        })
        .catch(() => {
          this.searchUserShow = [];
          this.searchUserList = [];
        });

      SearchService.getSearchEvent(value)
        .then((res) => {
          if (res) {
            this.searchEventShow = res;
            this.searchEventList = res;
          }
        })
        .catch(() => {
          this.searchEventShow = [];
          this.searchEventList = [];
        });

      SearchService.getSearchDiscount(value)
        .then((res) => {
          if (res) {
            this.searchDiscountShow = res;
            this.searchDiscountList = res;
          }
        })
        .catch(() => {
          this.searchDiscountShow = [];
          this.searchDiscountList = [];
        });
    },
    setFriendFilter(value) {
      this.friendFilter = value;
    },
    setEventFilter(value) {
      this.eventFilter = value;
    },
    setDiscountFilter(value) {
      this.discountFilter = value;
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
