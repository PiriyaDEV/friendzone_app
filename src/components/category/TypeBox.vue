<template>
  <div id="typebox">
    <div class="icon-box" v-bind:style="{ backgroundColor: bgcolorCode }">
      <img class="category-icon" :src="icon" />
    </div>
    <div id="text-box">
      <h1 v-bind:style="{ color: colorCode }">{{ nameCategory }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  methods: {},
  props: ["nameCategory", "icon", "colorCode", "bgcolorCode"],
};
</script>

<style scoped>
#typebox,
#typebox-dark {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  padding: 4px 4px 4px 6px;
  border-radius: 10px;
  margin-bottom: 20px;
  cursor: pointer;
  margin-right: 15px;
}

.icon-box {
  border-radius: 6px;
  margin-left: 2px;
}

.category-icon {
  width: 27px;
  padding: 5px 7px;
}

#text-box {
  background-color: #ffffff;
  width: 250px;
  height: 100%;
  padding-left: 20px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  align-items: center;
}

#text-box > h1 {
  font-size: 2em;
  font-weight: 450;
  text-transform: uppercase;
}
</style>
