<template>
  <div id="detail" style="background-color: #f8f3ec" class="event-container">
    <!-- Follow Box -->
    <div id="follow-box">
      <!-- Host -->
      <div class="verticle-box">
        <h1 class="number-box">2</h1>
        <h1 class="title-box">Host</h1>
      </div>
      <!-- Host -->

      <!-- Joined -->
      <div class="verticle-box">
        <h1 class="number-box">5</h1>
        <h1 class="title-box">Joined</h1>
      </div>
      <!-- Joined -->

      <!-- Followed -->
      <div class="verticle-box">
        <h1 class="number-box">2</h1>
        <h1 class="title-box">Followers</h1>
      </div>
      <!-- Followed -->

      <!-- Following -->
      <div class="verticle-box">
        <h1 class="number-box">17</h1>
        <h1 class="title-box">Following</h1>
      </div>
      <!-- Following -->

      <img id="egg" src="@/assets/profile/smallegg.png" alt="" />
    </div>
    <!-- Follow Box -->

    <div id="event-display">
      <!-- YOUR EVENT -->


      <div id="event">
        <div class="event-section">
          <h1 class="event-header">YOUR EVENT</h1>
          <select id="select-event" v-model="selected">
            <option value="all">All Event</option>
            <option value="host">Hosted</option>
            <option value="interest">Interested</option>
          </select>
        </div>
        <!-- YOUR EVENT -->

        <div>
          <!-- Event -->
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
          <!-- Event -->
        </div>
        <!-- YOUR EVENT -->
      </div>

      <div id="join">
        <div class="join-section">
          <h1 class="event-header">JOIN PENDING</h1>
        </div>

        <!-- Event -->
        <div id="container">
          <div
            id="list-container"
            @mouseover="hovered = true"
            @mouseleave="hovered = false"
            class="event-container"
          >
            <div class="list event-flex-section">
              <div v-for="(item, i) in joinList" :key="i">
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
        <!-- Event -->
      </div>


    </div>
  </div>
</template>

<script>
import EventFlex from "@/components/EventFlex.vue";

export default {
  name: "Yourzone",
  data() {
    return {
      hovered: false,
      selected: "all",
      eventList: 200,
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
    EventFlex,
  },
  methods: {
    clickRate(value) {
      this.$emit("clickShowed",value);
    },
    checkRate(value) {
      this.$emit("checkShow",value);
    },
  },
  mounted() {
  },
};
</script>

<style scoped>
#detail {
  margin-top: 110px;
  margin-bottom: 100px;
  overflow-x: hidden;
  overflow-y: auto;
}

#follow-box {
  background-color: #ffc45c;
  border-radius: 10px;
  position: relative;
  padding: 15px 90px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 40px;
}
.verticle-box {
  text-align: center;
}
#egg {
  width: 120px;
  position: absolute;
  z-index: 3;
  bottom: -27px;
  right: -25px;
}

#event-display {
  width: 400px;
}

.number-box {
  font-size: 4.25em;
  font-weight: 500;
  margin: 0;
  color: #444444;
}

.title-box {
  font-size: 2.5em;
  margin-top: -5px;
  margin-bottom: 0;
  color: #444444;
}

.event-section {
  display: flex;
  align-content: center;
}

.join-section {
  margin-top: 10px;
}

#select-event {
  color: #444444;
  height: 20px;
  margin-top: 28px;
  margin-left: 20px;
  border: none;
  background-color: transparent;
  font-size: 2em;
  font-family: "Atten-Round-New";
  font-weight: 500;
}

option {
  color: #444444;
}

.fade-in {
  animation: fadeIn ease 1s;
  -webkit-animation: fadeIn ease 1s;
  -moz-animation: fadeIn ease 1s;
  -o-animation: fadeIn ease 1s;
  -ms-animation: fadeIn ease 1s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-moz-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-o-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-ms-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

#container {
  width: 340px;
  height: 50px;
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

.arrow {
  width: 30px;
  opacity: 70;
}
</style>