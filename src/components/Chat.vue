<template>
  <div id="chat" class="event-container">
    <h1 id="chat-title" class="event-header">CHAT</h1>

    <div id="chat-section">
      <div>
        <ChatBox></ChatBox>
      </div>

      <div>
        <GroupList></GroupList>
      </div>
    </div>
  </div>
</template>

<script>
import ChatBox from "@/components/chat/ChatBox.vue";
import GroupList from "@/components/chat/GroupList.vue";
export default {
  name: "chat",
  components: {
    ChatBox,
    GroupList,
  },
};
</script>

<style scoped>
#chat {
  margin-top: 110px;
  margin-bottom: 30px;
  overflow-x: hidden;
}

#chat-title {
  margin-top: 0px;
}

#chat-section {
  display: flex;
  justify-content: space-between;
}
</style>