<template>
  <div id="event-page" class="event-container">
    <div v-if="categorySelected == false">
      <h1 id="event-title" class="event-header">NEW EVENTS</h1>

      <div id="event-page-section">
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
            </div>
          </div>
        </div>
        <!-- Event -->

        <!-- Category -->
        <div>
          <CategorySelect @categoryClick="categoryClick"></CategorySelect>
        </div>
        <!-- Category -->
      </div>
    </div>
    <div v-if="categorySelected == true">
      <EventCategory @categoryClick="categoryClick" ></EventCategory>
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
