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

    <!-- Menubar -->
    <div id="menubar">
      <div @click="host = true" :class="selectHost">
        <h1>HOST</h1>
      </div>
      <div @click="join = true" :class="selectJoin">
        <h1>JOINED</h1>
      </div>
      <div @click="request = true" :class="selectRequest">
        <h1>REQUEST</h1>
      </div>
      <div @click="discount = true" :class="selectDiscount">
        <h1>DISCOUNT</h1>
      </div>
    </div>
    <!-- Menubar -->

    <div id="event-display">
      <!-- YOUR EVENT -->

      <div v-if="host == true" id="host-menu">
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
              @mouseover="hovered = true"
              @mouseleave="hovered = false"
              class="event-container"
            >
              <div class="list event-flex-wrap-section">
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
            <!-- Event -->
          </div>
        </div>

        <!-- YOUR EVENT -->
      </div>

      <div v-if="join == true" id="joined-menu">
        <div class="event-section">
          <h1 class="event-header">JOINED</h1>
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
              @mouseover="hovered = true"
              @mouseleave="hovered = false"
              class="event-container"
            >
              <div class="list event-flex-wrap-section">
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

      <div v-if="request == true" id="request-menu">
        <div class="event-section">
          <h1 class="event-header">REQUEST</h1>
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
              @mouseover="hovered = true"
              @mouseleave="hovered = false"
              class="event-container"
            >
              <div class="list event-flex-wrap-section">
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

            <!-- Event -->
          </div>
        </div>

        <!-- YOUR EVENT -->
      </div>

      <div v-if="discount == true" id="discount-menu">
        <div class="event-section">
          <h1 class="event-header">DISCOUNT</h1>
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
              @mouseover="hovered = true"
              @mouseleave="hovered = false"
              class="event-container"
            >
              <div class="list event-flex-wrap-section">
                <div v-for="(item, i) in eventList" :key="i">
                  <DiscountLongFlex
                    :statusYourZone="checkStatus"
                    @discountReturn="discountReturn"
                  />
                </div>
              </div>
            </div>

            <!-- Event -->
          </div>
        </div>
        <!-- YOUR EVENT -->
      </div>
    </div>
  </div>
</template>

<script>
import EventFlex from "@/components/EventFlex.vue";
import DiscountLongFlex from "@/components/DiscountLongFlex.vue";

export default {
  name: "Yourzone",
  data() {
    return {
      host: true,
      join: false,
      request: false,
      discount: false,
      hovered: false,
      selectHost: "menu-box-orange",
      selectJoin: "menu-box-white",
      selectRequest: "menu-box-white",
      selectDiscount: "menu-box-white",
      selected: "all",
      eventList: 5,
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
  props:["discountSelect"],
  watch: {
    host: function() {
      if (this.host == true) {
        this.selectHost = "menu-box-orange";
        this.join = false;
        this.request = false;
        this.discount = false;
      } else this.selectHost = "menu-box-white";
    },
    join: function() {
      if (this.join == true) {
        this.selectJoin = "menu-box-orange";
        this.host = false;
        this.request = false;
        this.discount = false;
      } else this.selectJoin = "menu-box-white";
    },
    request: function() {
      if (this.request == true) {
        this.selectRequest = "menu-box-orange";
        this.host = false;
        this.join = false;
        this.discount = false;
      } else this.selectRequest = "menu-box-white";
    },
    discount: function() {
      if (this.discount == true) {
        this.selectDiscount = "menu-box-orange";
        this.host = false;
        this.join = false;
        this.request = false;
      } else this.selectDiscount = "menu-box-white";
    },
  },
  components: {
    EventFlex,
    DiscountLongFlex,
  },
  methods: {
    clickRate(value) {
      this.$emit("clickShowed", value);
    },
    checkRate(value) {
      this.$emit("checkShow", value);
    },
    discountReturn(value) {
      this.$emit("clickDiscount", value);
    },
  },
  computed: {
    checkStatus() {
      if(this.discountSelect == 1) {
        return true;
      }
      return false;
    },
  }
};
</script>

<style scoped>
#detail {
  margin-top: 110px;
  margin-bottom: 30px;
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
  margin-bottom: 30px;
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

/* menubar css  */

#menubar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-radius: 20px;
  margin: 0px 100px 10px 100px;
  padding: 3px;
}

.menu-box-orange,
.menu-box-white {
  padding: 8px 50px;
  border-radius: 20px;
  color: #444444;
  cursor: pointer;
}

.menu-box-orange {
  background-color: #fe8864;
  color: #ffffff;
}

.menu-box-orange > h1,
.menu-box-white > h1 {
  font-size: 2em;
  font-weight: 600;
  margin: 0px;
}

/* menubar css  */

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

.arrow {
  width: 30px;
  opacity: 70;
}
</style>
