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

      <div>
        <NoInformation v-if="limitEventList.length == 0" />
      </div>

      <div id="page-section">
        <!-- Event -->
        <div class="event-section">
          <div id="container">
            <div id="list-container" class="event-container">
              <div class="list event-flex-section">
                <div v-for="(event, i) in limitEventList" :key="i">
                  <EventFlex
                    @manageReturn="manageReturn"
                    @thisEvent="thisEvent"
                    :event="event"
                    :eventPage="true"
                    @detailReturn="detailReturn"
                    @userProfile="userProfile"
                    @titleError="titleError"
                  />
                </div>
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
              <NoInformation v-if="otherEventList.length == 0" />
            </div>
            <div>
              <!-- Event -->
              <div id="container">
                <div class="event-container">
                  <div class="list event-flex-wrap-section">
                    <div v-for="(event, i) in otherEventList" :key="i">
                      <EventFlex
                        @manageReturn="manageReturn"
                        @thisEvent="thisEvent"
                        :event="event"
                        :eventPage="true"
                        @detailReturn="detailReturn"
                        @userProfile="userProfile"
                        @titleError="titleError"
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

      <div>
        <NoInformation v-if="followingEventList.length == 0" />
      </div>

      <!-- Event -->
      <div id="container">
        <div class="event-container">
          <div class="list event-flex-wrap-section">
            <div v-for="(event, i) in followingEventList" :key="i">
              <EventFlex
                @manageReturn="manageReturn"
                @thisEvent="thisEvent"
                :event="event"
                :eventPage="true"
                @detailReturn="detailReturn"
                @userProfile="userProfile"
                @titleError="titleError"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Event -->
    </div>
    <!-- See All -->
  </div>
</template>

<script>
import NoInformation from "@/components/NoInformation.vue";
import EventFlex from "@/components/EventFlex.vue";
import EventService from "@/services/event.service";

export default {
  data() {
    return {
      showTitle: true,
      limitEventList: [],
      followingEventList: [],
      otherEventList: [],
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
    userProfile(value) {
      this.$emit("userProfile", value);
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
          if (res.length) {
            res.forEach((event) => {
              if (event.followHost) {
                if (this.limitEventList.length < 20) {
                  this.limitEventList.push(event);
                }
                this.followingEventList.push(event);
              } else this.otherEventList.push(event);
            });
          }
        })
        .catch(() => {
          this.limitEventList = [];
          this.followingEventList = [];
          this.otherEventList = [];
        });
    },
    pendingClick(value) {
      this.$emit("pendingClick", value);
    },
    onEvent(value) {
      this.$emit("onEvent", value);
    },
    thisEvent(value) {
      this.$emit("thisEvent", value);
    },
    manageReturn(value) {
      this.$emit("manageReturn", value);
    },
    detailReturn(value) {
      this.$emit("detailReturn", value);
    },
    titleError(value) {
      this.$emit("titleError", value);
    }
  },
  components: {
    EventFlex,
    NoInformation
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
