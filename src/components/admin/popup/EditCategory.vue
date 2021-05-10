<template>
  <div>
    <div class="title" @click="back()">
      <i class="fa fa-angle-left" aria-hidden="true"></i>
      <h1 id="header" class="header_title">EDIT CATEGORY</h1>
    </div>

    <div id="category-list">
      <h1 class="sub-header">Current Existing Category</h1>
      <div class="section">
        <div id="category-list-box">
          <div v-for="(item, i) in categoryList" :key="i">
            <div id="category-container">
              <img class="category-icon" :src="categoryList[i].icon_black" />
              <h1 class="category-text">{{ categoryList[i].category_name }}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div id="menu">
        <h1 @click="edit()" :class="cssEdit">Edit Category</h1>
        <h1 @click="addNew()" :class="cssAdd">Add New Category</h1>
      </div>
      <hr id="bar" />

      <div>
        <CategorySection :Case="caseCategory" />
      </div>
    </div>
  </div>
</template>

<script>
import CategorySection from "@/components/admin/popup/CategorySection.vue";
import CategoryService from "../../../services/category.service";

export default {
  data() {
    return {
      categoryList: null,
      caseCategory: true,
    };
  },
  created() {
    CategoryService.getCategoryList().then((res) => {
      if (res) {
        this.categoryList = res;
      }
    });
  },
  components: {
    CategorySection,
  },
  methods: {
    back() {
      this.$emit("categoryReturn", false);
    },
    edit() {
      this.caseCategory = true;
    },
    addNew() {
      this.caseCategory = false;
    },
  },
  computed: {
    cssEdit() {
      let select = "menu-text selected";
      let unselect = "menu-text";
      if (this.caseCategory == true) {
        return select;
      }
      return unselect;
    },
    cssAdd() {
      let select = "menu-text selected";
      let unselect = "menu-text";
      if (this.caseCategory == false) {
        return select;
      }
      return unselect;
    },
  },
};
</script>

<style scoped>
h1 {
  color: #444444;
}

.fa-angle-left {
  font-size: 4.25em;
  color: #444444;
  padding-bottom: 3px;
  padding-right: 17px;
  cursor: pointer;
}

.header_title {
  margin: 0px !important;
  padding: 0px !important;
}

.sub-header {
  color: #444444;
  font-size: 2em;
  font-weight: 600;
  margin: 0px;
}

.title {
  padding: 25px 0px 13px 0px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

#category-list-box {
  border: 1.75px solid #444444;
  border-radius: 10px;
  padding: 0px 15px 10px 15px;
  margin-top: 10px;
  width: 600px;
  height: 90px;
  overflow-y: auto;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

#category-container {
  display: flex;
  align-items: center;
  width: 190px;
  margin-top: 10px;
}

.category-icon {
  width: 15px;
  height: 15px;
  margin-right: 10px;
}

.category-text {
  font-size: 1.85em;
  font-weight: 400;
  margin: 0px;
  color: #444444;
  text-transform: uppercase;
}

#menu {
  display: flex;
  margin-top: 10px;
}

#bar {
  height: 0.1px;
  border-width: 0;
  color: #a0a0a0;
  background-color: #a0a0a0;
  margin-top: -13px;
}

.menu-text {
  font-size: 1.85em;
  font-weight: 500;
  padding-right: 19px;
  padding-left: 10px;
  margin-top: 5px;
  padding-bottom: 7px;
  cursor: pointer;
}

.selected {
  font-weight: 600;
  border-bottom: 5px solid #fe8864;
}

@media screen and (max-width: 1024px) {
  #category-list-box {
    width: 420px;
  }
}

@media screen and (max-width: 690px) {
  #category-list-box {
    width: 250px;
    display: block;
  }
}

@media screen and (max-width: 490px) {
  .popup-form {
    padding: 0px 40px !important;
  }

  #category-list-box {
    width: 220px;
    display: block;
  }
}
</style>
