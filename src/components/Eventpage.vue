<template>
  <div id="event-page" class="event-container">
    <div v-if="categorySelected == false">
      <h1 id="event-title" class="event-header">SUGGESTED</h1>

      <div>
        <NoInformation v-if="eventList.length == 0" />
      </div>

      <div id="event-page-section">
        <!-- Event -->
        <div class="event-section">
          <div id="container">
            <div class="event-container">
              <div class="list event-flex-section">
                <div v-for="(event, i) in eventList" :key="i">
                  <EventFlex
                    @detailReturn="detailReturn"
                    @thisEvent="thisEvent"
                    :event="event"
                    :eventPage="true"
                    @pendingClick="pendingClick"
                    @onEvent="onEvent"
                    @userProfile="userProfile"
                    @titleError="titleError"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Event -->

        <!-- Category -->
        <div>
          <CategorySelect
            @categoryClick="categoryClick"
            @idReturn="idReturn"
            @nameReturn="nameReturn"
          ></CategorySelect>
        </div>
        <!-- Category -->
      </div>
    </div>
    <div v-if="categorySelected == true">
      <EventCategory
        @categoryClick="categoryClick"
        @detailReturn="detailReturn"
        @thisEvent="thisEvent"
        @userProfile="userProfile"
        @pendingClick="pendingClick"
        @onEvent="onEvent"
        :nameCategorySelected="nameCategorySelected"
        :idCategorySelected="idCategorySelected"
      ></EventCategory>
    </div>
  </div>
</template>

<script>
import NoInformation from "@/components/NoInformation.vue";
import EventFlex from "@/components/EventFlex.vue";
import EventCategory from "@/components/EventCategory.vue";
import CategorySelect from "@/components/category/CategorySelect.vue";
import CategoryService from "../services/category.service";
import EventService from "@/services/event.service";

export default {
  name: "event-page",
  data() {
    return {
      hovered: false,
      selected: "all",
      eventList: [],
      categoryList: null,
      categorySelected: false,
      idCategorySelected: "",
      nameCategorySelected: ""
    };
  },
  created() {
    CategoryService.getCategoryList().then((res) => {
      if (res) {
        this.categoryList = res;
      }
    });
    this.getEventList();
  },
  components: {
    EventFlex,
    EventCategory,
    CategorySelect,
    NoInformation
  },
  methods: {
    userProfile(value) {
      this.$emit("userProfile", value);
    },
    categoryClick(value) {
      this.categorySelected = value;
    },
    idReturn(value) {
      this.idCategorySelected = value;
    },
    nameReturn(value) {
      this.nameCategorySelected = value;
    },
    pendingClick(value) {
      this.$emit("pendingShow", value);
    },
    onEvent(value) {
      this.$emit("onEvent", value);
    },
    titleError(value){
      this.$emit("titleError",value);
    },
    getEventList() {
      EventService.getUserCateogryInterestEvent()
        .then((res) => {
          if (res) {
            this.eventList = res;
          }
        })
        .catch(() => {
          this.eventList = [];
        });
    },
    detailReturn(value) {
      this.$emit("detail", true);
      this.$emit("thisEvent", this.event);
      this.$emit("clickManage", value);
    },
    thisEvent(value) {
      this.$emit("thisEvent", value);
    }
  }
};
</script>

<style scoped>
#event-page {
  margin-top: 110px;
  margin-bottom: 30px;
  overflow-x: hidden;
}

#event-title {
  margin-top: 0px;
}

.event-flex-section {
  margin-bottom: 20px;
}

@media screen and (max-width: 1350px) {
  #event-flex-box {
    margin-right: 20px;
    margin-left: 0px;
  }
}

@media screen and (max-width: 880px) {
  #event-page {
    margin-top: 0px;
  }
}

/* @media screen and (max-width: 768px) {
  .event-flex-section {
    margin-bottom: 0px;
  }
} */
</style>
