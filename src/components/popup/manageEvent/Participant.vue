<template>
  <div id="participant">
    <div v-if="status == 1">
      <h1 class="title">Participants (3/5)</h1>

      <div v-for="(item, i) in eventList" :key="i">
        <Userbox :select="status" />
      </div>

      <h1 class="title">Pending (1)</h1>
      <div v-for="(item, i) in eventList" :key="i">
        <Userbox :select="status" />
      </div>
    </div>
    <div v-if="status == 2">
      <h1 class="title">Request (1)</h1>
      <div v-for="(item, i) in eventList" :key="i">
        <Userbox :select="status" />
      </div>
    </div>
    <div v-if="status == 3" style="margin-top:20px;">
      <!-- Input -->
      <div class="left-inner-addon input-container">
        <i class="fa fa-search"></i>
        <input
          type="text"
          class="search-input"
          placeholder="find friend to invite using username"
          v-model="search"
        />
      </div>
      <!-- Input -->
      <div v-if="search">
        <h1 class="title">Followers ({{eventList}})</h1>
        <div v-for="(item, i) in eventList" :key="i">
          <Userbox :select="status" />
        </div>
        <h1 class="title">Others ({{eventList}})</h1>
        <div v-for="(item, i) in eventList" :key="i">
          <Userbox :select="status" />
        </div>
      </div>
    </div>

    <div id="button">
      <button>Done</button>
    </div>
  </div>
</template>

<script>
import Userbox from "@/components/popup/manageEvent/Userbox.vue";
export default {
  data() {
    return {
      eventList: 3,
      search:"",
    };
  },
  props: ["status"],
  components: {
    Userbox,
  },
  watch: {
  },
};
</script>

<style scoped>
h1 {
  color: #444444;
}
.title {
  font-size: 2em;
  margin: 15px 0px;
}

#participant {
  margin-top: 5px;
}

#button {
  margin: 30px 0px;
  position: absolute;
  z-index: 3;
  bottom: -10px;
  right: 60px;
}

#button > button {
  color: #ffffff;
  background-color: #ff8864;
  text-align: center;
  font-family: "Atten-Round-New";
  font-size: 2.25em;
  font-weight: 450;
  border: none;
  padding: 7px 70px;
  margin: 0;
  border-radius: 24px;
}

.left-inner-addon {
  position: relative;
  display: flex;
  align-items: center;
}
.left-inner-addon input {
  padding-left: 42px !important;
}
.left-inner-addon i {
  position: absolute;
  padding: 14px 13px;
  pointer-events: none;
}

.input-container {
  padding-bottom: 1em;
}

.search-input {
  width: 100%;
  font-size: 1.75em;
  font-weight: 400;
  background-color: #f0f0f0;
  color: #606060;
  border-radius: 8px;
  border: none;
  padding: 10px 20px;
}

::placeholder {
  color: #606060 !important;
}

i {
  color: #606060;
  width: 30px;
  display: block;
}

.fa {
  font-size: initial;
}
</style>
