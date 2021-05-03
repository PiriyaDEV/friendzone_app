<template>
  <div id="chat" class="event-container">
    <h1 id="chat-title" class="event-header">CHAT</h1>

    <div id="chat-section">
      <div id="message-section">
        <ChatBox :event_id="chat"></ChatBox>
      </div>

      <div>
        <GroupList @eventChat="eventChat"></GroupList>
      </div>
    </div>
  </div>
</template>

<script>
import ChatBox from "@/components/chat/ChatBox.vue";
import GroupList from "@/components/chat/GroupList.vue";

export default {
  name: "chat",
  data() {
    return {
      chat: [],
    };
  },
  components: {
    ChatBox,
    GroupList,
  },
  methods: {
    eventChat(value) {
      this.chat = value;
    }
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

#message-section {
  width: 100%;
}

#chat-section {
  display: flex;
  justify-content: space-between;
}
</style>
