<template>
  <div id="chat" class="event-container">
    <h1 id="chat-title" class="event-header">CHAT</h1>

    <div id="grouplist-horizontal">
      <GroupList
        @eventChat="eventChat"
        @chatListLength="chatListLength"
      ></GroupList>
    </div>

    <div id="chat-section">
      <div id="message-section">
        <ChatBox :event_id="chat" :showChat="showChat"></ChatBox>
      </div>

      <div id="grouplist-vertical">
        <GroupList
          @eventChat="eventChat"
          @chatListLength="chatListLength"
        ></GroupList>
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
      showChat: 0,
    };
  },
  components: {
    ChatBox,
    GroupList,
  },
  methods: {
    eventChat(value) {
      this.chat = value;
    },
    chatListLength(value) {
      this.showChat = value;
    },
  },
};
</script>

<style scoped>
#chat {
  margin-top: 110px;
  margin-bottom: 30px;
  overflow-x: hidden;
}

#grouplist-horizontal {
  display: none;
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

@media screen and (max-width: 880px) {
  #chat {
    margin-top: 0px;
  }

  #grouplist-vertical {
    display: none;
  }

  #grouplist-horizontal {
    display: block;
  }

  #chat-section {
    display: block;
  }
}
</style>
