<template>
  <div id="wait-box" class="popup">
    <div class="popup-section section">
      <div class="popup-form">
        <h1 class="header_title">
          NOTIFICATION
        </h1>

        <div v-if="notificationList.length" id="noti-list-box">
          <div v-for="(item, i) in notificationList" :key="i" id="noti-list">
            <NotificationBox :information="item" @decrementList="decrementList(i)"/>
          </div>
        </div>
        <div v-else class="no-info-noti"><NoInformation /></div>
        <img
          @click="cancel()"
          style="cursor: pointer"
          class="close"
          src="@/assets/icon/icons8-multiply-96.png"
        />
      </div>
    </div>
  </div>
</template>

<script>
import NotificationBox from "@/components/popup/notification/NotificationBox.vue";
import NotifyService from "@/services/eventInvited.service";
import NoInformation from "@/components/NoInformation.vue";

export default {
  components: {
    NotificationBox,
    NoInformation
  },
  data() {
    return {
      notificationList: []
    };
  },
  created() {
    NotifyService.getNotification().then((res) => {
      if (res) {
        this.notificationList = res;
      }
    });
  },
  methods: {
    cancel() {
      this.$emit("notificationShow", false);
    },
    decrementList(value) {
      if (value > -1) {
        this.notificationList.splice(value, 1);
      }
    },
  }
};
</script>

<style scoped>
#noti-list {
  padding: 0px;
  margin-bottom: 15px;
}

div::-webkit-scrollbar {
  height: 3px;
  width: 3px;
  padding-bottom: 30px;
}

#noti-list-box {
  max-height: 400px;
  min-height: 340px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 30px;
}

.no-info-noti{
  width: 300px;
}

@media screen and (max-width: 690px) {
  .popup-form {
    padding: 0px 40px !important;
  }

  #noti-list {
    max-height: 400px;
  }
}

@media screen and (max-width: 490px) {
  .popup-form {
    padding: 0px 30px !important;
  }

  .no-info-noti{
  width: 240px;
}

  #noti-list {
    max-height: 375px;
  }
}
</style>
