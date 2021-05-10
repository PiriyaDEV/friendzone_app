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
      <h1>{{ interest }}</h1>
      <div class="button-section">
        <button class="back_button" @click="cancel()">Cancel</button>
        <button class="create_button" @click="save()">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryBox from "@/components/CategoryBox.vue";
import CategoryService from "../../../services/category.service";
// import EventService from "@/services/event.service";

export default {
  data() {
    return {
      categoryList: null,
      interest: [],
    };
  },
  props: ["profileDetail"],
  created() {
    CategoryService.getCategoryList().then((res) => {
      if (res) {
        this.categoryList = res;
      }
    });
  },
  components: {
    CategoryBox,
  },
  methods: {
    clicktest(ev, i) {
      console.log(i + 1);
      this.categoryList[i].status = !this.categoryList[i].status;
    },
    cancel() {
      this.$emit("showBack", false);
    },
    // getInterest() {
    //   EventService.getUserCateogryInterestEvent().then((res) => {
    //       this.interest = res;
    //   });
    // }
  },
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
  }

  #term{
    display: none;
  }

  .create_button,
  .back_button {
    width: 125px !important;
  }
}
</style>
