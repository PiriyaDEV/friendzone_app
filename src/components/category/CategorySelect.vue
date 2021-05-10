<template>
  <div>
    <h1 id="event-title" class="event-header">CATEGORIES</h1>
    <div id="select-section">
      <div id="category-list" v-for="(item, i) in categoryList" :key="i">
        <TypeBox
          @click.native="clicktest($event, i)"
          :nameCategory="categoryList[i].category_name"
          :icon="categoryList[i].icon_white"
          :colorCode="categoryList[i].color_code"
          :bgcolorCode="categoryList[i].color_code"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TypeBox from "./TypeBox";
import CategoryService from "../../services/category.service";

export default {
  name: "category-select",
  components: {
    TypeBox
  },
  data() {
    return {
      categoryList: null
    };
  },
  created() {
    CategoryService.getCategoryList().then((res) => {
      if (res) {
        this.categoryList = res;
      }
    });
  },
  methods: {
    clicktest(ev, i) {
      this.$emit("idReturn", this.categoryList[i].category_id);
      this.$emit("nameReturn", this.categoryList[i].category_name);
      this.$emit("categoryClick", true);
    }
  }
};
</script>

<style scoped>
#select-section {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

@media screen and (max-width: 414px) {
  #category-list {
    width: 100%;
  }
}
</style>
