<template>
  <div id="category-section">
    <div id="left">
      <!-- Input -->
      <div>
        <h2 class="input_title">Select Category to edit</h2>
        <select
          name="gender"
          class="input_select minimal"
          v-model="selected"
          required
        >
          <option value="" disabled selected hidden>
            select category
          </option>
          <option
            v-for="(category, index) in categoryList"
            :key="index"
            :value="categoryList[index].category_name"
          >
            {{ categoryList[index].category_name }}
          </option>
        </select>
      </div>
      <!-- Input -->
    </div>
    <div id="right">
      <!-- Input -->
      <div>
        <h2 class="input_title">Title<span class="orange-color"> *</span></h2>
        <input
          class="input_box"
          type="text"
          maxlength="64"
          size="64"
          placeholder="enter your event title"
        />
      </div>
      <!-- Input -->
    </div>
  </div>
</template>

<script>
import CategoryService from "../../../services/category.service";
export default {
  data() {
    return {
      categoryList: null,
      selected: "",
    };
  },
  created() {
    CategoryService.getCategoryList().then((res) => {
      if (res) {
        this.categoryList = res;
      }
    });
  },
};
</script>

<style scoped>
#category-section {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

#left {
  margin-right: 10px;
}

#right {
  margin-left: 10px;
}

.input_box {
  width: 300px !important;
}

.input_select {
  font-size: 1.6em;
  font-weight: 450;
  width: 300px;
  padding: 9px 12px 9px 15px;
  border: 2px solid #e3e3e3;
  border-radius: 10px;
  margin-bottom: 2px;
  box-shadow: none;
  font-family: "Atten-Round-New";
}


select {
  /* styling */
  background-color: white;
  border: thin solid #e3e3e3;
  border-radius: 4px;
  display: inline-block;
  font: inherit;
  line-height: 1.5em;
  padding: 0.5em 3.5em 0.5em 1em;

  /* reset */

  margin: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
}

select.minimal {
  background-image: linear-gradient(45deg, transparent 50%, #e3e3e3 50%),
    linear-gradient(135deg, #e3e3e3 50%, transparent 50%);
  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;
}

select.minimal:focus {
  background-image: linear-gradient(45deg, #e3e3e3 50%, transparent 50%),
    linear-gradient(135deg, transparent 50%, #e3e3e3 50%);
  background-position: calc(100% - 15px) 1em, calc(100% - 20px) 1em,
    calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;
  border-color: #e3e3e3;
  outline: 0;
}

select:-moz-focusring {
  color: transparent;
  text-shadow: 0 0 0 #000;
}

select:required:invalid {
  color: #cccccc;
}
select,
option {
  color: #444444;
}
</style>
