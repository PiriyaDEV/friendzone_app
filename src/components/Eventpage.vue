<template>
  <div id="event-page" class="event-container">
    <div v-if="categorySelected == false">
      <h1 id="event-title" class="event-header">SUGGESTED</h1>

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
        :nameCategorySelected="nameCategorySelected"
        :idCategorySelected="idCategorySelected"
      ></EventCategory>
    </div>
  </div>
</template>

<script>
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
      nameCategorySelected: "",
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
  },
  methods: {
    categoryClick(value) {
      this.categorySelected = value;
    },
    idReturn(value) {
      this.idCategorySelected = value;
    },
    nameReturn(value) {
      this.nameCategorySelected = value;
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
    moreDetailReturn(value) {
      this.$emit("detailReturn", true);
      this.$emit("detail", true);
      this.$emit("thisEvent", this.event);
      this.$emit("clickManage", value);
    },
    thisEvent(value) {
      this.$emit("thisEvent", value);
    },
  },
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
</style>
