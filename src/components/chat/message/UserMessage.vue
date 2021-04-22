<template>
  <div id="message">
    <img id="profile-logo" src="@/assets/profile/pfpic.jpg" />
    <div>
      <h1 id="username">pd.piriya</h1>
      <div>
        <WhiteMessage></WhiteMessage>
        <WhiteMessage></WhiteMessage>
        <WhiteMessage></WhiteMessage>
        <WhiteMessage></WhiteMessage>
      </div>
    </div>
  </div>
</template>

<script>
import WhiteMessage from "@/components/chat/message/WhiteMessage.vue";
export default {
  components: {
    WhiteMessage,
  },
};
</script>

<style scoped>
#profile-logo {
  border-radius: 50%;
  width: 34px;
  height: 34px;
  margin-right: 13px;
}

#message {
  display: flex;
  justify-content: flex-start;
  margin-top: 15px;
}

#username {
  margin: 0;
  font-size: 1.75em;
  color: #444444;
  font-weight: 500;
}
</style>
