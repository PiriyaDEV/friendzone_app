<template>
  <div v-if="chatList.length" id="grouplist">
    <div id="list-box">
      <div
        v-for="(event, i) in chatList"
        :key="i"
        @click="getChat(event.event_id)"
      >
        <EventList :event="event" />
      </div>
    </div>
  </div>
</template>

<script>
import EventList from "@/components/chat/message/EventList.vue";
import ChatService from "../../services/chat.service";

export default {
  name: "grouplist",
  components: {
    EventList
  },
  data() {
    return {
      chatList: [],
      interval: null,
      time: null
    };
  },
  created() {
    ChatService.getChatList().then((res) => {
      if (res) {
        this.chatList = res;
        this.$emit("eventChat", this.chatList[0].event_id);
        this.$emit("chatListLength", this.chatList.length);
      }
    });
    this.interval = setInterval(() => {
      // Concise way to format time according to system locale.
      // In my case this returns "3:48:00 am"
      this.time = Intl.DateTimeFormat(navigator.language, {
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
      }).format();
    }, this.refresh);
  },
  watch: {
    time: function() {
      this.getList();
    }
  },
  methods: {
    getChat(value) {
      this.$emit("eventChat", value);
    },
    getList() {
      ChatService.getChatList().then((res) => {
        if (res) {
          this.chatList = res;
        }
      });
    }
  }
};
</script>

<style scoped>
#grouplist {
  width: 320px;
}

#list-box {
  background-color: #ffffff;
  border: none;
  padding: 12px 17px;
  border-radius: 10px;
  height: 505px;
  overflow-y: auto;
}

div::-webkit-scrollbar {
  display: none;
}

@media screen and (max-width: 1350px) {
  #grouplist {
    width: 275px;
  }

  #list-box {
    padding: 12px 15px;
  }
}

@media screen and (max-width: 880px) {
  #list-box {
    padding: 0px;
    display: flex;
    height: auto;
    background-color: inherit;
  }

  #grouplist {
    width: 100%;
    margin-bottom: 20px;
  }
}
</style>
