<template>
  <div id="typebox">
    <div class="icon-box" v-bind:style="{ backgroundColor: bgcolorCode }">
      <img class="category-icon" :src="icon" />
    </div>
    <div id="text-box" :class="cssBox">
      <h1 v-bind:style="{ color: colorCode }">{{ nameCategory }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  methods: {},
  props: ["nameCategory", "icon", "colorCode", "bgcolorCode", "admin"],
  computed: {
    cssBox() {
      let adminBox = "box-admin";
      let no = "";
      if (this.admin) {
        return adminBox;
      }
      return no;
    }
  }
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
  height:27px;
  object-fit: cover;
  -o-object-fit:cover;
  padding: 5px 7px;
}

#text-box {
  background-color: #ffffff;
  width: 349px;
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

@media screen and (max-width: 2320px) {
  #text-box {
    width: 297px;
  }
}

@media screen and (max-width: 1920px) {
  #text-box {
    width: 233px;
  }
}

@media screen and (max-width: 1650px) {
  #text-box {
    width: 253px;
  }
}

@media screen and (max-width: 1350px) {
  #text-box {
    width: 162px;
  }

  #text-box > h1 {
    font-size: 1.75em;
  }
}

@media screen and (max-width: 800px) {
  #text-box {
    width: 272px;
  }
}

@media screen and (max-width: 768px) {
  #text-box {
    width: 242px;
  }
  #typebox,
  #typebox-dark {
    margin-right: 7.5px;
    margin-left: 7.5px;
  }
}

@media screen and (max-width: 690px) {
  #text-box {
    width: 222px;
  }

  .box-admin {
    width: 100px !important;
    padding-left: 10px !important;
    font-size: 0.8em !important;
  }
}

@media screen and (max-width: 650px) {
  #text-box {
    width: 202px;
  }
}

@media screen and (max-width: 600px) {
  #text-box {
    width: 182px;
  }
}

@media screen and (max-width: 570px) {
  #text-box {
    width: 169px;
  }

  .category-icon {
    width: 20px;
    height:20px;
  }
}

@media screen and (max-width: 525px) {
  #text-box {
    width: 161px;
    padding-left: 10px;
  }

  #text-box > h1 {
    font-size: 1.5em;
  }
}

@media screen and (max-width: 490px) {
  #text-box {
    width: 144px;
  }
}

@media screen and (max-width: 450px) {
  #text-box {
    width: 124px;
  }
}

@media screen and (max-width: 414px) {
  #text-box {
    width: auto;
    padding-left: 30px;
  }

  #typebox,
  #typebox-dark {
    margin-right: 0px;
    margin-left: 0px;
    justify-content: flex-start;
    margin-bottom: 10px;
  }

  #category-list {
    width: 100%;
  }
}
</style>
