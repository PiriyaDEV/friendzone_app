<template>
  <div>
    <h1 id="header">EVENTS</h1>
    <div id="approve-box">
      <div>
        <h1 class="category-font green-text">APPROVED</h1>
        <h1 class="normal-text">{{ approved }}</h1>
      </div>
      <div>
        <h1 class="category-font red-text">DISAPPROVED</h1>
        <h1 class="normal-text">{{ disapproved }}</h1>
      </div>
      <div>
        <h1 class="category-font black-color">DELETE</h1>
        <h1 class="normal-text">{{ deleted }}</h1>
      </div>
      <div>
        <h1 class="category-font gray-text">PENDING</h1>
        <h1 class="normal-text">{{ pending }}</h1>
      </div>
    </div>
    <hr id="bar" />
    <h1 id="by-category" class="normal-text">BY CATEGORIES</h1>

    <div>
      <div id="category-list">
        <div v-for="(category, i) in categoryList" :key="i">
          <div id="category-box">
            <div id="category">
              <div
                id="category-img"
                v-bind:style="{ backgroundColor: category.color_code }"
              >
                <img :src="category.icon_white" alt="" />
              </div>
              <div id="category-text-box">
                <h1
                  class="category-font uppercase"
                  v-bind:style="{ color: category.color_code }"
                >
                  {{ category.category_name }}
                </h1>
                <h1 class="category-font">
                  {{ category.percent.toFixed(2) }}% of events
                </h1>
              </div>
            </div>
            <h1 class="big-number">{{ category.count }}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AnalystService from "@/services/analyst.service";

export default {
  data() {
    return {
      approved: 0,
      disapproved: 0,
      pending: 0,
      deleted: 0,
      categoryList: []
    };
  },
  components: {},
  created() {
    AnalystService.getEventSummary().then((res) => {
      if (res) {
        res.forEach((item) => {
          if (item.status === "APPROVED") this.approved = item.count;
          else if (item.status === "REJECTED") this.disapproved = item.count;
          else if (item.status === "PENDING") this.pending = item.count;
          else if (item.status === "DELETED") this.deleted = item.count;
        });
      }
    });
    AnalystService.getEventCategorySummary().then((res) => {
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

#approve-box > div {
  border-radius: 10px;
  padding: 4px 13px;
}

#approve-box > div:nth-child(1) {
  border: 1.75px solid #1ed32c;
}

#approve-box > div:nth-child(2) {
  border: 1.75px solid #fd6363;
  margin-top: 10px;
}

#approve-box > div:nth-child(4) {
  border: 1.75px solid #a0a0a0;
  margin-top: 10px;
}

#approve-box > div:nth-child(3) {
  border: 1.75px solid #444444;
  margin-top: 10px;
}

#category-box,
#category {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.green-text {
  color: #1ed32c !important;
}

.red-text {
  color: #fd6363 !important;
}

.gray-text {
  color: #a0a0a0 !important;
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
  margin-right: 10px;
  border-radius: 6px;
}

#category-img > img {
  width: 20px;
  height: 20px;
}

.big-number {
  font-size: 3em;
  font-weight: 500;
  color: #444444;
}
</style>
