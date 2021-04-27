<template>
  <div>
    <div v-if="status == false" id="category-box">
      <img class="category-icon" @click="goMainpage()" :src="icon" />
      <h1 class="category-text">{{ nameCategory }}</h1>
    </div>
    <div v-if="status == true" id="category-box-click">
      <img
        class="category-icon-click"
        @click="goMainpage()"
        :style="changeBg"
        :src="icon"
      />
      <h1 class="category-text">{{ nameCategory }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  props: ["nameCategory", "icon", "colorCode", "status"],
};
</script>

<style scoped>
#category-box {
  border: 2px solid #e3e3e3;
  border-radius: 10px;
  padding: 7px 0px 7px 20px;
  margin: 5px 0px;
  width: 420px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

#category-box-click {
  border: 2px solid #ff8864;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 7px 0px 7px 20px;
  margin: 5px 0px;
  width: 420px;
  cursor: pointer;
}

.category-icon,
.category-icon-click {
  width: 18px;
  padding: 7px;
  border-radius: 6px;
  border: none;
}

.category-text {
  color: #cccccc;
  font-size: 1.75em;
  font-weight: 500;
  margin: 0px 0px 0px 25px;
  text-transform: uppercase;
}

@media screen and (max-width: 768px) {
  #category-box {
    width: inherit;
  }
}
</style>
