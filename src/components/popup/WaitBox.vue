<template>
  <div id="wait-box" class="popup">
    <div class="popup-section section">
      <div class="popup-form">
        <h1 class="header_title">WAIT FOR APPROVAL</h1>
        <div class="section">
          <h1 id="info">
            Your event is now wait in the lists for approval and the event will
            be post after get approved by approver
          </h1>
        </div>

        <div class="section">
          <button class="back_button" @click="createdReturn()">Done</button>
        </div>
        <img
          @click="cancelManage()"
          style="cursor: pointer"
          class="close"
          src="@/assets/icon/icons8-multiply-96.png"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#info {
  font-size: 1.6em;
  color: #444444;
  margin: 0px;
  width: 220px;
  text-align: center;
  margin-top: 15px;
  font-weight: 400;
}

.header_title {
  margin-top: 20px;
  text-align: center;
  font-size: 2.75em !important;
}
</style>
