<template>
  <div id="wait-box" class="popup">
    <div class="popup-section section">
      <div class="popup-form">
        <h1 class="header_title">
          NOTIFICATION
        </h1>

        <div id="noti-list">
          <NotificationBox />
          <NotificationBox />
          <NotificationBox />
          <NotificationBox />
          <NotificationBox />
          <NotificationBox />
          <NotificationBox />
          <NotificationBox />
          <NotificationBox />
        </div>

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
export default {
  components: {
    NotificationBox,
  },
  methods: {
    cancel() {
      this.$emit("notificationShow", false);
    }
  },
};
</script>

<style scoped>
#noti-list {
  max-height: 390px;
  overflow-y: auto;
  padding: 0px;
  margin-bottom: 35px;
}

div::-webkit-scrollbar {
  height: 3px;
  width: 3px;
  padding-bottom: 30px;
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

  #noti-list {
    max-height: 375px;
  }
}
</style>
