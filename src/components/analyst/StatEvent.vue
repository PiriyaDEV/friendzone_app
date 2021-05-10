<template>
  <div>
    <h1 id="header">EVENTS</h1>
    <div id="approve-box">
      <div>
        <h1 class="category-font green-text">APPROVED</h1>
        <h1 class="normal-text">1056</h1>
      </div>
      <div>
        <h1 class="category-font red-text">DISAPPROVED</h1>
        <h1 class="normal-text">143</h1>
      </div>
      <div>
        <h1 class="category-font gray-text">PENDING</h1>
        <h1 class="normal-text">143</h1>
      </div>
    </div>
    <hr id="bar" />
    <h1 id="by-category" class="normal-text">BY CATEGORIES</h1>

    <div>
      <div id="category-list">
        <div v-for="(item, i) in categoryList" :key="i">
          <div id="category-box">
            <div id="category">
              <div
              id="category-img"
              v-bind:style="{ backgroundColor: categoryList[i].color_code }"
            >
              <img :src="categoryList[i].icon_white" alt="" />
            </div>
            <div id="category-text-box">
              <h1
                class="category-font uppercase"
                v-bind:style="{ color: categoryList[i].color_code }"
              >
                {{ categoryList[i].category_name }}
              </h1>
              <h1 class="category-font">56% of events</h1>
            </div>
            </div>
            <h1 class="big-number">593</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryService from "../../services/category.service";

export default {
  data() {
    return {
      categoryList: []
    };
  },
  components: {},
  created() {
    CategoryService.getCategoryList().then((res) => {
      if (res) {
        this.categoryList = res;
      }
    });
  }
};
</script>

<style scoped>
#header {
  font-size: 2.75em;
  color: #444444;
  margin: 0px;
}

#approve-box {
  margin-top: 10px;
  width: 100%;
  align-items: center;
}

#approve-box > div{
  border-radius: 10px;
  padding: 4px 13px;
}

#approve-box > div:nth-child(1){
  border: 1.75px solid #1ed32c;
}

#approve-box > div:nth-child(2){
  border: 1.75px solid #FD6363;
  margin-top:10px;
}

#approve-box > div:nth-child(3){
  border: 1.75px solid #A0A0A0;
  margin-top:10px;
}

#category-box, #category{
  display:flex;
  justify-content: space-between;
  align-items:center;
}

.green-text {
  color: #1ed32c !important;
}

.red-text {
  color: #fd6363 !important;
}

.gray-text{
  color:#A0A0A0 !important;
}

.uppercase {
  text-transform: uppercase;
}

.category-font {
  font-size: 1.5em;
  font-weight: 400;
  margin: 0px;
  color: #444444;
}

.normal-text {
  font-size: 2.25em;
  color: #444444;
  margin: 0px;
}

#bar {
  height: 2px;
  color: #e3e3e3;
  background-color: #e3e3e3;
  border: none;
  margin-top: 20px;
}

#by-category {
  margin: 15px 0px;
}

#category-img {
  padding: 8px;
  margin-right:10px;
  border-radius: 6px;
}

#category-img > img {
  width: 20px;
  height: 20px;
}

.big-number {
  font-size: 3em;
  font-weight: 500;
  color:#444444;
}
</style>
