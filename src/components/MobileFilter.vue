<template>
  <div id="filter">
    <div id="filter-icon">
      <img src="@/assets/icon/icons8-filter-96@2x.png" />
      <h1 class="header">FILTER</h1>
    </div>
    <div id="filter-select">
      <multiselect
        v-model="value"
        :options="options"
        :multiple="true"
        group-values="data"
        group-label="groupname"
        :group-select="true"
        placeholder="select specific filter"
        track-by="name"
        label="name"
      >
        <span slot="noResult">Sorry, No filter founded.</span>
      </multiselect>
      <!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
export default {
  components: {
    Multiselect
  },
  data() {
    return {
      options: [
        {
          groupname: "FRIENDS",
          data: [{ name: "not following" }, { name: "following" }]
        },
        {
          groupname: "EVENTS (CATEGORIES)",
          data: [
            { name: "food" },
            { name: "entertainment" },
            { name: "travel" },
            { name: "festival / concert" },
            { name: "education" },
            { name: "sport" },
            { name: "game" }
          ]
        },
        {
          groupname: "EVENTS (OTHERS)",
          data: [
            { name: "male" },
            { name: "female" },
            { name: "lgbtq+" },
            { name: "specific age range" },
            { name: "specific start date" }
          ]
        },
        {
          groupname: "DISCOUNT",
          data: [
            { name: "point < 500" },
            { name: "point < 1000" },
            { name: "point < 5000" },
            { name: "point < 10000" },
            { name: "point < 100000" }
          ]
        }
      ],
      value: []
    };
  }
};
</script>

<style scoped>
.multiselect,
#filter-select {
  width: 100% !important;
}

#filter {
  display: flex;
  align-items: center;
  width: 100%;
}

#filter-icon {
  display: flex;
  align-items: center;
  margin-right: 15px;
}

#filter-icon > img {
  width: 20px;
  margin-right: 5px;
}

/* Text Size */
.header {
  font-size: 2em;
  margin: 0px;
  color: #444444;
}
</style>
