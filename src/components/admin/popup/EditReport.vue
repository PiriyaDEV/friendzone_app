<template>
  <div>
    <div class="title">
      <i @click="back()" class="fa fa-angle-left" aria-hidden="true"></i>
      <h1 @click="back()" id="header" class="header_title">EDIT REPORT</h1>
    </div>

    <h1 class="sub-header">Current Existing Category</h1>

    <div id="report-list">
      <div id="left">
        <div id="report-title-section">
          <h1 class="report-title">Report User</h1>
          <div>
            <hr id="bar" />
          </div>
        </div>
        <h1 class="report-name">pretending to be someone else</h1>
        <h1 class="report-name">pretending to be someone else</h1>
        <h1 class="report-name">pretending to be someone else</h1>
        <h1 class="report-name">pretending to be someone else</h1>
        <h1 class="report-name">pretending to be someone else</h1>
        <h1 class="report-name">pretending to be someone else</h1>
        <h1 class="report-name">pretending to be someone else</h1>
        <h1 class="report-name">pretending to be someone else</h1>
        <div id="report-title-section">
          <h1 class="report-title">Report Event</h1>
          <div>
            <hr id="bar" />
          </div>
        </div>
        <h1 class="report-name">pretending to be someone else</h1>
        <h1 class="report-name">pretending to be someone else</h1>
        <h1 class="report-name">pretending to be someone else</h1>
        <h1 class="report-name">pretending to be someone else</h1>
        <h1 class="report-name">pretending to be someone else</h1>
        <h1 class="report-name">pretending to be someone else</h1>
        <h1 class="report-name">pretending to be someone else</h1>
        <h1 class="report-name">pretending to be someone else</h1>
        <div id="report-title-section">
          <h1 class="report-title">Report Web App</h1>
          <div>
            <hr id="bar" />
          </div>
        </div>
        <h1 class="report-name">pretending to be someone else</h1>
        <h1 class="report-name">pretending to be someone else</h1>
        <h1 class="report-name">pretending to be someone else</h1>
        <h1 class="report-name">pretending to be someone else</h1>
        <h1 class="report-name">pretending to be someone else</h1>
        <h1 class="report-name">pretending to be someone else</h1>
        <h1 class="report-name">pretending to be someone else</h1>
        <h1 class="report-name">pretending to be someone else</h1>
      </div>
      <div id="right">
        <!-- Input -->
        <div>
          <h2 class="input_title">Select Report Type</h2>
          <select
            name="gender"
            class="input_select minimal"
            v-model="selected"
            required
          >
            <option value="" disabled selected hidden>select type</option>
            <option
              v-for="(category, index) in categoryList"
              :key="index"
              :value="category"
            >
              {{ categoryList[index].category_name }}
            </option>
          </select>
        </div>
        <!-- Input -->
        <div>
          <hr id="dark-bar" />
        </div>
        <!-- Input -->
        <div>
          <h2 class="input_title">Delete Report</h2>
          <select
            name="gender"
            class="input_select minimal"
            v-model="selected"
            required
          >
            <option value="" disabled selected hidden>select report</option>
            <option
              v-for="(category, index) in categoryList"
              :key="index"
              :value="category"
            >
              {{ categoryList[index].category_name }}
            </option>
          </select>
          <div class="button">
            <button @click="renameCategory()">Delete</button>
          </div>
        </div>
        <!-- Input -->
        <!-- Input -->
        <div>
          <h2 class="input_title">Rename Report</h2>
          <select
            name="gender"
            class="input_select minimal"
            v-model="selected"
            required
          >
            <option value="" disabled selected hidden>select report</option>
            <option
              v-for="(category, index) in categoryList"
              :key="index"
              :value="category"
            >
              {{ categoryList[index].category_name }}
            </option>
          </select>
          <div>
            <input
              class="input_box"
              type="text"
              maxlength="7"
              size="7"
              placeholder="enter new report name"
            />
          </div>

          <div class="button">
            <button @click="renameCategory()">Rename</button>
          </div>
        </div>
        <!-- Input -->
        <!-- Input -->
        <div>
          <h2 class="input_title">Add New Report Type</h2>
          <div>
            <input
              class="input_box"
              type="text"
              maxlength="7"
              size="7"
              placeholder="enter new report name"
            />
          </div>

          <div class="button">
            <button @click="renameCategory()">Rename</button>
          </div>
        </div>
        <!-- Input -->
        <div class="button-section">
          <button class="back_button" @click="cancel()">Cancel</button>
          <button class="create_button" @click="save()">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryService from "../../../services/category.service";
export default {
  data() {
    return {
      categoryList: null,
      selected: ""
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
    back() {
      this.$emit("reportReturn", false);
    }
  }
};
</script>

<style scoped>
h1 {
  color: #444444;
}

#left {
  margin-right: 15px;
  border: 1.75px solid #444444;
  border-radius: 10px;
  overflow-y: auto;
  padding: 5px 10px;
  height: 500px;
  width: 300px;
}

#report-title-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0px;
}

#report-title-section > div {
  width: 150px;
}

#bar {
  height: 2px;
  border-width: 0;
  color: #ff8864;
  background-color: #ff8864;
}

#dark-bar {
  height: 1.75px;
  margin: 10px 0px;
  border-width: 0;
  color: #444444;
  background-color: #444444;
}

.report-title,
.report-name {
  color: #444444;
  font-weight: 500;
  margin: 0px;
}

.report-title {
  font-size: 1.85em;
  font-weight: 600;
  text-transform: uppercase;
}

.report-name {
  font-size: 1.6em;
  font-weight: 500;
  padding: 3px 0px 5px 5px;
}

#right {
  margin-left: 15px;
}

.fa-angle-left {
  font-size: 4.25em;
  color: #444444;
  padding-bottom: 3px;
  padding-right: 17px;
  cursor: pointer;
}

.back_button,
.create_button {
  font-size: 1.75em !important;
  width: 120px !important;
}

.back_button {
  margin-right: 10px !important;
}

.header_title {
  margin: 0px !important;
  padding: 0px !important;
}

.title {
  padding: 25px 0px 13px 0px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

#report-list {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.sub-header {
  color: #444444;
  font-size: 2em;
  font-weight: 600;
  margin: 0px;
}

.input_select {
  font-size: 1.6em;
  font-weight: 450;
  width: 100%;
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

.button {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
}

.button > button {
  background-color: #ffffff;
  font-family: "Atten-Round-New";
  text-transform: uppercase;
  font-size: 1.25em;
  font-weight: 600;
  width: 80px;
  margin: 0px;
  color: #ff8864;
  border: 2px solid #ff8864;
  border-radius: 16px;
  padding: 5px 18px;
}

.input_box {
  width: calc(100% - 30px) !important;
  margin-top: 10px !important;
}

@media screen and (max-width: 1024px) {
  #report-list {
    display: block;
  }

  .button-section {
    margin-top: 10px;
  }

  #left {
    margin: 0px;
    height: 200px;
  }

  #right {
    margin: 20px 0px 0px 0px;
  }
}

@media screen and (max-width: 690px) {
  #left {
    width: 250px;
  }

  #report-title-section > div {
    width: 70px;
  }

  div::-webkit-scrollbar {
    height: 3px;
    width: 3px;
  }
}
</style>
