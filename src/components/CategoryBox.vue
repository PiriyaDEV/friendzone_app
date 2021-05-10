<template>
  <div>
    <div v-if="status == false" :id="cssBox">
      <img class="category-icon" @click="goMainpage()" :src="icon" />
      <h1 class="category-text">{{ nameCategory }}</h1>
    </div>
    <div v-if="status == true" :id="cssBoxClick">
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
  props: ["nameCategory", "icon", "colorCode", "status", "profileDetail"],
  data() {
    return {
    }
  },
  created() {
  },
  computed: {
    cssBox() {
      let afterStart = "category-box";
      let beforeStart = "category-box-short";
      if (this.profileDetail == true) {
        return beforeStart;
      }
      return afterStart;
    },
    cssBoxClick() {
      let afterStart = "category-box-click";
      let beforeStart = "category-box-click-short";
      if (this.profileDetail == true) {
        return beforeStart;
      }
      return afterStart;
    }
  }
};
</script>

<style scoped>
#category-box,
#category-box-short {
  border: 2px solid #e3e3e3;
  border-radius: 10px;
  margin: 5px 0px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

#category-box-click,
#category-box-click-short {
  border: 2px solid #ff8864;
  border-radius: 10px;
  display: flex;
  align-items: center;
  margin: 5px 0px;
  cursor: pointer;
}

#category-box,
#category-box-click {
  padding: 7px 0px 7px 20px;
  width: 420px;
}

#category-box-short,
#category-box-click-short {
  padding: 5px 0px 5px 20px;
  width: 200px;
}

.category-icon,
.category-icon-click {
  width: 18px;
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
