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
                <div v-for="(item, i) in eventList" :key="i">
                  <EventFlex />
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
            @nameReturn="nameReturn"
          ></CategorySelect>
        </div>
        <!-- Category -->
      </div>
    </div>
    <div v-if="categorySelected == true">
      <EventCategory
        @categoryClick="categoryClick"
        :nameCategorySelected="nameCategorySelected"
      ></EventCategory>
    </div>
  </div>
</template>

<script>
import EventFlex from "@/components/EventFlex.vue";
import EventCategory from "@/components/EventCategory.vue";
import CategorySelect from "@/components/category/CategorySelect.vue";
import CategoryService from "../services/category.service";

export default {
  name: "event-page",
  data() {
    return {
      hovered: false,
      selected: "all",
      eventList: 20,
      joinList: 10,
      categoryList: null,
      categorySelected: false,
      nameCategorySelected: "",
    };
  },
  created() {
    CategoryService.getCategoryList().then((res) => {
      if (res) {
        this.categoryList = res;
      }
    });
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
    nameReturn(value) {
      this.nameCategorySelected = value;
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

/* div::-webkit-scrollbar {
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
} */
</style>
