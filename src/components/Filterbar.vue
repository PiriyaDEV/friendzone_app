<template>
  <div id="filter-bar">
    <div id="filter-icon">
      <img src="@/assets/icon/icons8-filter-96@2x.png" />
      <h1 class="header">FILTER</h1>
    </div>

    <div>
      <h1 class="title">Friends</h1>

      <div class="checkbox" v-for="item in FriendData" :key="item.value">
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
            :value="item.isFollow"
            v-model="selectedFriend"
          />
          <span class="checkmark"></span>
        </label>
      </div>
    </div>

    <div>
      <h1 class="title">Events</h1>

      <h1 class="subtitle">Categories</h1>
      <div
        class="checkbox"
        v-for="item in CategoriesData"
        :key="item.category_id"
      >
        <!-- <input
            type="checkbox"
            :value="item.location"
            v-model="selectedLocations"
          />
          <span class="checkbox-label"> {{ item.location }} </span> <br /> -->
        <label class="check-container checkbox-label"
          >{{ item.category_name }}
          <input
            type="checkbox"
            :value="item.category_id"
            v-model="selectedCategories"
          />
          <span class="checkmark"></span>
        </label>
      </div>

      <h1 class="subtitle sub-top">Gender</h1>

      <div class="checkbox" v-for="item in GenderData" :key="item.gender_id">
        <!-- <input
            type="checkbox"
            :value="item.location"
            v-model="selectedLocations"
          />
          <span class="checkbox-label"> {{ item.location }} </span> <br /> -->
        <label class="check-container checkbox-label"
          >{{ item.gender_name }}
          <input
            type="checkbox"
            :value="item.gender_id"
            v-model="selectedGender"
          />
          <span class="checkmark"></span>
        </label>
      </div>
    </div>

    <div>
      <h1 class="title">Discount</h1>

      <div class="checkbox" v-for="item in DiscountData" :key="item.value">
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
            :value="item.value"
            v-model="selectedDiscount"
          />
          <span class="checkmark"></span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryService from "@/services/category.service";
import GenderService from "@/services/gender.service";

export default {
  data() {
    return {
      selectedFriend: [],
      FriendData: [
        { name: "Not following", isFollow: false },
        { name: "Following", isFollow: true }
      ],
      selectedCategories: [],
      CategoriesData: [],
      selectedGender: [],
      GenderData: [],
      selectedDiscount: [],
      DiscountData: [
        { name: "Free", value: 0 },
        { name: "Point < 100", value: 100 },
        { name: "Point < 500", value: 500 },
        { name: "Point < 1000", value: 1000 },
        { name: "Point < 5000", value: 5000 },
        { name: "Point < 10000", value: 10000 }
      ]
    };
  },

  created() {
    CategoryService.getCategoryList().then((res) => {
      if (res) {
        this.CategoriesData = res;
      }
    });
    GenderService.getGenderList().then((res) => {
      if (res) {
        this.GenderData = res;
      }
    });
  },
  watch: {
    selectedFriend: function() {
      this.$emit("friendFilter", this.selectedFriend);
    },
    selectedCategories: function() {
      this.$emit(
        "eventFilter",
        this.selectedCategories.concat(this.selectedGender)
      );
    },
    selectedGender: function() {
      this.$emit(
        "eventFilter",
        this.selectedCategories.concat(this.selectedGender)
      );
    },
    selectedDiscount: function() {
      this.$emit("discountFilter", this.selectedDiscount);
    }
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
