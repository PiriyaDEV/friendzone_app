<template>
  <div>
    <div v-if="showTitle === true" class="event-container">
      <div class="title" @click="back()">
        <i class="fa fa-angle-left" aria-hidden="true"></i>
        <h1 id="eventcat-title" class="event-header">
          {{ nameCategorySelected }}
        </h1>
      </div>

      <div class="second-section">
        <h1 class="event-second-header">FOLLOWING</h1>
        <div @click="clickSeeAll()" class="second-title">
          <h1>See All</h1>
          <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
        </div>
      </div>

      <div id="discount-page-section">
        <!-- Event -->
        <div class="event-section">
          <div id="container">
            <div id="list-container" class="event-container">
              <div class="list event-flex-section">
                <!-- <div v-for="(item, i) in eventList" :key="i">
                  <EventFlex
                    :user="dataUser[i]"
                    :date="dataDate"
                    :title="dataTitle"
                    :location="dataLocation"
                    :host="dataHost"
                    @clickRate="clickRate"
                    @checkRate="checkRate"
                  />
                </div> -->
              </div>
            </div>
          </div>
        </div>
        <!-- Event -->
      </div>

      <div>
        <div id="joined-menu">
          <h1 class="event-second-header">OTHERS</h1>
          <div>
            <div>
              <!-- Event -->
              <div id="container">
                <div class="event-container">
                  <div class="list event-flex-wrap-section">
                    <div v-for="(event, i) in eventList" :key="i">
                      <EventFlex
                        @manageReturn="manageReturn"
                        @thisEvent="thisEvent"
                        :event="event"
                        :eventPage="true"
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
    <!-- See All -->
    <div v-else class="event-container">
      <div class="title" @click="backCategory()">
        <i class="fa fa-angle-left" aria-hidden="true"></i>
        <h1 id="eventcat-title" class="event-header">FOLLOWING</h1>
      </div>
      <!-- Event -->
      <div id="container">
        <div class="event-container">
          <div class="list event-flex-wrap-section">
            <!-- <div v-for="(item, i) in eventList" :key="i">
              <EventFlex
                :user="dataUser[i]"
                :date="dataDate"
                :title="dataTitle"
                :location="dataLocation"
                :host="dataHost"
                @clickRate="clickRate"
                @checkRate="checkRate"
              />
            </div> -->
          </div>
        </div>
      </div>
      <!-- Event -->
    </div>
    <!-- See All -->
  </div>
</template>

<script>
import EventFlex from "@/components/EventFlex.vue";
import EventService from "@/services/event.service";

export default {
  data() {
    return {
      showTitle: true,
      eventList: [],
      categorySelected: false
    };
  },
  props: ["idCategorySelected", "nameCategorySelected"],
  created() {
    this.getCategory();
  },
  methods: {
    back() {
      this.$emit("categoryClick", false);
    },
    backCategory() {
      this.showTitle = true;
    },
    clickSeeAll() {
      this.showTitle = false;
    },
    getCategory() {
      EventService.getEventByCategory(this.idCategorySelected)
        .then((res) => {
          if (res) {
            console.log("terst" + this.idCategorySelected);
            this.eventList = res;
          }
        })
        .catch(() => {
          this.eventList = [];
        });
    },
    thisEvent(value) {
      this.$emit("thisEvent", value);
    },
    manageReturn(value) {
      this.$emit("manageReturn", value);
    }
  },
  components: {
    EventFlex
  }
};
</script>

<style scoped>
#eventcat-title {
  margin: 0px;
  cursor: pointer;
  text-transform: uppercase;
}

.event-second-header {
  color: #444444;
  font-weight: 600;
  font-size: 3.25em;
}

.title,
.second-title,
.second-section {
  display: flex;
  align-items: center;
}

.title {
  margin-bottom: 20px;
}

.second-title {
  margin-left: 15px;
}

.fa-long-arrow-right,
.second-title > h1 {
  color: #444444;
  margin: 0px 0px 0px 7px;
  font-size: 2em;
  font-weight: 500;
  cursor: pointer;
}

.fa-angle-left {
  font-size: 4.25em;
  color: #444444;
  padding-bottom: 3px;
  padding-right: 17px;
  cursor: pointer;
}
</style>
