<template>
  <div id="editdb-popup" class="popup">
    <div class="popup-section section">
      <div>
        <div class="popup-form">
          <h1 id="header" class="header_title">EDIT DATABASE</h1>
          <button id="cancel_button" @click="editReturn()">Cancle</button>
          <img
            @click="editReturn()"
            style="cursor: pointer"
            class="close"
            src="@/assets/icon/icons8-multiply-96.png"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#cancel_button,
#edit_button {
  font-size: 2em;
  font-family: "Atten-Round-New";
  text-align: center;
  width: 100%;
  padding: 9px 0px;
  border-radius: 35px;
  margin-top: 10px;
  transition: 0.3s;
  font-weight: 500;
}

#cancel_button {
  color: #ff8864;
  background-color: #ffffff;
  border: 2px solid #ff8864;
}
</style>
