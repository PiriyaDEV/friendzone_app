<template>
  <div id="filter-bar">
    <div id="filter-icon">
      <img src="@/assets/icon/icons8-filter-96@2x.png" />
      <h1 class="header">FILTER</h1>
    </div>

    <div>
      <h1 class="title">friends</h1>
      <div class="checkbox" v-for="item in FriendData" :key="item">
        <!-- <input
            type="checkbox"
            :value="item.location"
            v-model="selectedLocations"
          />
          <span class="checkbox-label"> {{ item.location }} </span> <br /> -->
        <label class="check-container checkbox-label"
          >{{ item.name }}
          <input type="checkbox" :value="item.name" v-model="selectedFriend" />
          <span class="checkmark"></span>
        </label>
      </div>
    </div>

    <div>
      <h1 class="title">events</h1>
      <h1 class="subtitle">categories</h1>
      <div class="checkbox" v-for="item in CategoriesData" :key="item">
        <!-- <input
            type="checkbox"
            :value="item.location"
            v-model="selectedLocations"
          />
          <span class="checkbox-label"> {{ item.location }} </span> <br /> -->
        <label class="check-container checkbox-label"
          >{{ item.name }}
          <input
            type="checkbox"
            :value="item.name"
            v-model="selectedCategories"
          />
          <span class="checkmark"></span>
        </label>
      </div>

      <h1 class="subtitle sub-top">others</h1>
      <div class="checkbox" v-for="item in GenderData" :key="item">
        <!-- <input
            type="checkbox"
            :value="item.location"
            v-model="selectedLocations"
          />
          <span class="checkbox-label"> {{ item.location }} </span> <br /> -->
        <label class="check-container checkbox-label"
          >{{ item.name }}
          <input type="checkbox" :value="item.name" v-model="selectedGender" />
          <span class="checkmark"></span>
        </label>
      </div>
      <div class="checkbox" v-for="item in AgeData" :key="item">
        <!-- <input
            type="checkbox"
            :value="item.location"
            v-model="selectedLocations"
          />
          <span class="checkbox-label"> {{ item.location }} </span> <br /> -->
        <label class="check-container checkbox-label"
          >{{ item.name }}
          <input type="checkbox" :value="item.name" v-model="selectedAge" />
          <span class="checkmark"></span>
        </label>
      </div>
    </div>

    <div>
      <h1 class="title">discount</h1>

      <div class="checkbox" v-for="item in DiscountData" :key="item">
        <!-- <input
            type="checkbox"
            :value="item.location"
            v-model="selectedLocations"
          />
          <span class="checkbox-label"> {{ item.location }} </span> <br /> -->
        <label class="check-container checkbox-label"
          >{{ item.name }}
          <input
            type="checkbox"
            :value="item.name"
            v-model="selectedDiscount"
          />
          <span class="checkmark"></span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      FriendData: [{ name: "not following" }, { name: "following" }],
      selectedFriend: [""],
      CategoriesData: [
        { name: "food" },
        { name: "entertainment" },
        { name: "travel" },
        { name: "festival / concert" },
        { name: "education" },
        { name: "sport" },
        { name: "game" }
      ],
      selectedCategories: [""],
      GenderData: [{ name: "male" }, { name: "female" }, { name: "lgbtq+" }],
      selectedGender: [""],
      AgeData: [
        { name: "specific age range" },
        { name: "specific start date" }
      ],
      selectedAge: [""],
      DiscountData: [
        { name: "point < 500" },
        { name: "point < 1000" },
        { name: "point < 5000" },
        { name: "point < 10000" },
        { name: "point < 100000" }
      ],
      selectedDiscount: [""]
    };
  }
};
</script>

<style scoped>
h1 {
  color: #444444;
}

#filter-bar {
  width: 150px;
  /* position : fixed */
}

#filter-icon {
  display: flex;
  align-items: center;
}

#filter-icon > img {
  width: 20px;
  margin-right: 5px;
}

/* Text Size */
.header {
  font-size: 2em;
  margin: 0px;
}

.title {
  font-size: 1.85em;
  margin: 10px 0px 0px 0px;
}

.subtitle {
  font-size: 1.65em;
  font-weight: 400;
  margin: 2px 0px 5px 4px;
}

.sub-top {
  margin-top: 7px;
}

.checkbox {
  margin-left: 5px;
  display: flex;
  align-items: center;
  margin-top: 5px;
}

.checkbox-label {
  font-size: 1.5em;
  font-weight: 400;
  margin-left: 8px;
  color: #444444;
}
/* Text Size */

/* Checkmark */
.check-container {
  display: block;
  position: relative;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin-left: 20px;
}

.check-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0px;
  left: -20px;
  height: 12px;
  width: 12px;
  background-color: inherit;
  border-radius: 2px;
  border: 1.5px solid #444444;
}

.check-container input:checked ~ .checkmark {
  background-color: rgba(0, 0, 0, 0.4);
}

/* Checkmark */
</style>
