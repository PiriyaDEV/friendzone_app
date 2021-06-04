<template>
  <div id="admin-discount" class="event-container">
    <div>
      <div id="title-box">
        <h1 class="title header white-color">DISCOUNT</h1>
        <select id="select-report" v-model="filter">
          <option value="all">All Discounts</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="deleted">Deleted</option>
        </select>
      </div>

      <div>
        <div id="report-menu">
          <div id="report-middle-menu" v-if="discountListShow.length != 0">
            <h1 id="menu-text-id" class="menu-text">ID</h1>
            <h1 class="menu-text">TITLE</h1>
            <h1 class="menu-text">POINT USED</h1>
            <h1 class="menu-text report-cat">BUY WITHIN</h1>
            <h1 class="menu-text report-cat">USED WITHIN</h1>
            <h1 class="menu-text">STATUS</h1>
          </div>
          <div id="space-button"></div>
        </div>
        <div id="report-box">
          <NoInformation v-if="discountListShow.length == 0"/>
          <div v-for="(discount, i) in discountListShow" :key="i">
            <ReportBox
              :discountList="discount"
              :discount="true"
              @discountData="discountData"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReportBox from "@/components/admin/report/ReportBox.vue";
import AdminService from "@/services/admin.service";
import NoInformation from "@/components/NoInformation.vue";

export default {
  name: "admin-discount",
  data() {
    return {
      discountListShow: [],
      discountList: [],
      filter: "all"
    };
  },
  components: {
    ReportBox,
    NoInformation
  },
  watch: {
    filter: function() {
      this.discountListShow = [];
      if (this.filter == "all") this.discountListShow = this.discountList;
      else if (this.filter == "active") {
        this.discountListShow = this.discountList.filter((discount) => {
          return discount.status == "Active";
        });
      } else if (this.filter == "inactive") {
        this.discountListShow = this.discountList.filter((discount) => {
          return discount.status == "Inactive";
        });
      }else if (this.filter == "deleted") {
        this.discountListShow = this.discountList.filter((discount) => {
          return discount.status == "Deleted";
        });
      }
    }
  },
  created() {
    this.getDiscount();
  },
  methods: {
    getDiscount() {
      AdminService.getDiscountList()
        .then((res) => {
          if (res) {
            this.discountListShow = res;
            this.discountList = res;
          }
        })
        .catch(() => {
          this.discountListShow = [];
          this.discountList = [];
        });
    },
    discountData(value) {
      this.$emit("editDiscountData", value);
    }
  }
};
</script>

<style scoped>
#admin-discount {
  margin-top: 110px;
  margin-bottom: 30px;
  overflow-x: hidden;
}

option {
  background-color: #a0a0a0;
}

.title {
  margin-top: 0px;
}

.header {
  font-size: 3.75em;
  margin: 0px;
}

#title-box {
  display: flex;
  align-items: center;
}

#select-report {
  color: #ffffff;
  height: 20px;
  margin-left: 15px;
  border: none;
  background-color: transparent;
  font-size: 2em;
  font-family: "Atten-Round-New";
  font-weight: 500;
}

#report-menu {
  align-items: center;
  display: flex;
  width: 100%;
  padding: 3px;
}

#report-middle-menu {
  display: grid;
  grid-template-columns: 15% 20% 15% 15% 15% 20%;
  align-items: center;
  width: 100%;
}

.menu-text {
  font-size: 1.5em;
  font-weight: 400;
  color: #b2b2b2;
  margin-bottom: 0px;
}

#menu-text-id {
  padding: 0px 30px;
}

#space-button {
  width: 48px;
}

@media screen and (max-width: 880px) {
  #admin-discount {
    margin-top: 0px;
  }
}

@media screen and (max-width: 690px) {
  #report-middle-menu {
    grid-template-columns: 25% 40% 20% 15%;
  }

  .menu-text {
    font-size: 1.2em;
  }

  #space-button {
    width: 42px;
  }

  .report-cat {
    display: none;
  }
}
</style>
