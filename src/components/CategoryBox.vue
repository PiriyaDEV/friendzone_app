<template>
  <div>
    <div v-if="status == false" id="category-box">
      <img class="category-icon" @click="goMainpage()" :src="{ icon }" />
      <h1 class="category-text">{{ nameCategory }}</h1>
    </div>
    <div v-if="status == true" id="category-boxtest">
      <img class="category-icon" @click="goMainpage()" :src="{ icon }" />
      <h1 class="category-text">{{ nameCategory }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  props: ["nameCategory", "icon", "status"],
};
</script>

<style scoped>
#category-box {
  border: 2px solid #e3e3e3;
  border-radius: 10px;
  padding: 10px 0px 10px 28px;
  margin: 10px 0px;
  width: 420px;
  display: flex;
  align-items: center;
}

#category-boxtest {
  border: 2px solid #ff8864;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 10px 0px 10px 28px;
  margin: 10px 0px;
  width: 420px;
}

.category-icon {
  width: 25px;
}

.category-text {
  color: #cccccc;
  font-size: 1.75em;
  font-weight: 600;
  margin: 0px 0px 0px 25px;
}

@media screen and (max-width: 768px) {
  #category-box {
    width: inherit;
  }
}
</style>