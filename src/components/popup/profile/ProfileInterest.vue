<template>
  <div id="interest-box">
    <div>
      <div id="profile_interest">
        <h1 id="header_title">PICK YOUR INTEREST</h1>
        <div id="term">
          <p>
            We <span style="color: #ff8864">recommend</span> you to choose
            <span style="color: #ff8864">at least 1</span> <br />so we can
            suggest an event you might interested in.
          </p>
        </div>

        <div class="section">
          <div id="category-list">
            <div v-for="(item, i) in categoryList" :key="i">
              <CategoryBox
                @click.native="clicktest($event, i)"
                :nameCategory="categoryList[i].category_name"
                :icon="categoryList[i].icon_black"
                :colorCode="categoryList[i].color_code"
                :status="categoryList[i].status"
                :profileDetail="profileDetail"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="button-section">
        <button class="back_button" @click="cancel()">Cancel</button>
        <button class="create_button" @click="clickSave()">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryBox from "@/components/CategoryBox.vue";
import CategoryService from "../../../services/category.service";
import UserService from "../../../services/user.service";

export default {
  data() {
    return {
      categoryList: null,
      interest: [],
      interestList: []
    };
  },
  props: ["profileDetail"],
  created() {
    CategoryService.getCategoryList().then((res) => {
      if (res) {
        this.categoryList = res;
        CategoryService.getCategoryFromUserID().then((res) => {
          if (res) {
            this.interest = res;
            this.interestData();
          }
        });
      }
    });
  },
  components: {
    CategoryBox
  },
  methods: {
    clicktest(ev, i) {
      this.categoryList[i].status = !this.categoryList[i].status;
    },
    cancel() {
      this.$emit("showBack", false);
    },
    interestData() {
      for (let i = 0; i < this.categoryList.length; i++) {
        let check = false;
        for (let j = 0; j < this.interest.length; j++) {
          if (
            this.categoryList[i].category_name == this.interest[j].category_name
          ) {
            this.interestList[i] = true;
            check = true;
          }
        }
        if (check == false) {
          this.interestList[i] = false;
        }
        this.categoryList[i].status = this.interestList[i];
      }
    },
    clickSave() {
      var categoryInterest = [];

      this.categoryList.forEach((category) => {
        categoryInterest.push({
          category_id: category.category_id,
          interest: category.status
        });
      });

      if (categoryInterest.length > 0) {
        UserService.updateUserCategory(categoryInterest).then((res) => {
          if (res) window.location.href = "/mainpage";
        });
      } else {
        window.location.href = "/mainpage";
      }
    }
  }
};
</script>

<style scoped>
#profile_interest {
  border-radius: 10px;
  border: 1.75px solid #e3e3e3;
  padding: 10px 0px;
  max-height: 300px;
  overflow-y: auto;
}
#header_title,
#term {
  color: #444444;
  text-align: center;
}

#header_title {
  font-size: 2em;
  margin: 0px;
}

#term {
  font-size: 1.6em;
  line-height: 20px;
  letter-spacing: 0.2px;
  font-weight: 100;
  display: flex;
  justify-content: center;
  margin: 12px 0px;
}
#term > p {
  margin: 0;
}

#category-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  max-width: 500px;
}

div::-webkit-scrollbar {
  height: 3px;
  width: 3px;
}

.back_button,
.create_button {
  margin: 10px 0px 25px 0px !important;
}

@media screen and (max-width: 1024px) {
  #category-list {
    display: block;
  }

  .create_button,
  .back_button {
    width: 170px !important;
  }
}

@media screen and (max-width: 690px) {
  #profile_interest {
    margin-top: 10px;
    margin-bottom: 15px;
  }

  #term {
    display: none;
  }

  .create_button,
  .back_button {
    width: 125px !important;
  }
}
</style>
