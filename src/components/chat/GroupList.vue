<template>
  <div id="grouplist">
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
    EventList,
  },
  data() {
    return {
      chatList: [],
    };
  },
  created() {
    ChatService.getChatList().then((res) => {
      if (res) {
        this.chatList = res;
        this.$emit("eventChat", this.chatList[0].event_id);
      }
    });
  },
  methods: {
    getChat(value) {
      this.$emit("eventChat", value);
    },
  },
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
}
</style>
