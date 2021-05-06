<template>
  <div v-if="showChat" id="chatbox-section">
    <div id="chat-container">
      <div id="chat-head">
        <div id="chat-box">
          <h1 class="large-text">
            {{ headChat.title }}
          </h1>
          <div id="user-count" class="section">
            <img class="user" src="@/assets/chat/icons8-customer-white.png" />
            <h1 class="large-text">
              {{ headChat.joined }}/{{ headChat.max_participant }}
            </h1>
          </div>
        </div>
        <h1 class="host-text">Hosted by {{ headChat.username }}</h1>
      </div>
    </div>

    <div id="message-container" ref="messagecontainer">
      <div v-show="messages.length" v-for="(chat, i) in messages" :key="i">
        <div v-if="chat.showDate" class="section">
          <div id="date">
            <h1>{{ chat.date }}</h1>
          </div>
        </div>
        <div v-if="chat.me">
          <OrangeMessage :chat="chat"></OrangeMessage>
        </div>
        <div v-else>
          <UserMessage
            :chat="chat"
            :nextUserId="messages[i + 1]"
            :previousUserId="messages[i - 1]"
          ></UserMessage>
        </div>
      </div>
    </div>

    <div id="sending-box">
      <div id="sending-section">
        <input
          @keyup.enter="sendMessage()"
          id="input"
          type="text"
          maxlength="256"
          v-model="inputMessage"
        />
        <div @click="sendMessage()" id="send-btn">
          Send
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserMessage from "@/components/chat/message/UserMessage.vue";
import OrangeMessage from "@/components/chat/message/OrangeMessage.vue";
import ChatService from "@/services/chat.service";
import decode from "jwt-decode";

export default {
  name: "chatbox",
  data() {
    return {
      messages: [],
      headChat: [],
      messagesMe: [],
      messagesOther: [],
      UserData: [],
      tempUserID: "",
      inputMessage: "",
      countUser: 0,
      clock: 0,
      day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    };
  },
  components: {
    UserMessage,
    OrangeMessage,
  },
  props: ["event_id", "showChat"],
  watch: {
    event_id: function() {
      this.userData = decode(localStorage.getItem("user"));
      ChatService.getChatHead(this.event_id).then((res) => {
        if (res) {
          this.headChat = res;
        }
      });

      this.getChatData();
    },
  },
  created() {
    setInterval(this.clock++, 1000);
  },
  destroyed() {
    clearInterval();
  },
  mounted() {
    this.scrollToEnd();
  },
  updated() {
    this.scrollToEnd();
  },
  methods: {
    scrollToEnd() {
      var content = this.$refs.messagecontainer;
      content.scrollTop = content.scrollHeight;
    },
    sendMessage() {
      if (this.inputMessage) {
        ChatService.create({
          event_id: this.event_id,
          message: this.inputMessage,
        })
          .then((res) => {
            if (res.message == "chat created") {
              this.inputMessage = "";
              this.getChatData();
            }
          })
          .catch(() => {
            console.log("Couldn't send the message!");
          });
      } else console.log("Nothing to send!");
    },
    getChatData() {
      ChatService.getMessages(this.event_id).then((res) => {
        if (res) {
          this.messages = res;
          if (this.messages.message != "not_found") {
            this.messages.forEach((message, index) => {
              let createTime = new Date(message.created_at);
              message.date =
                this.day[createTime.getDay()] +
                ", " +
                createTime
                  .getDate()
                  .toString()
                  .padStart(2, "0") +
                "/" +
                (createTime.getMonth() + 1).toString().padStart(2, "0") +
                "/" +
                createTime
                  .getFullYear()
                  .toString()
                  .substr(-2);
              if (index) {
                if (message.date == this.messages[index - 1].date)
                  message.showDate = false;
                else message.showDate = true;
              } else {
                message.showDate = true;
              }

              if (message.user_id == this.userData.user_id) message.me = true;
              else message.me = false;
            });
          }
        }
      });
    },
  },
};
</script>

<style scoped>
#chatbox-section {
  /* width: 650px; */
  margin-right: 20px;
}

#chat-container {
  width: 100%;
}

#chat-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#chat-head {
  background-color: #444444;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  padding: 10px 20px 7px 15px;
}
.user {
  width: 20px;
  margin-right: 5px;
}

div::-webkit-scrollbar {
  display: none;
}

.large-text {
  font-size: 2em;
  color: #ffffff;
  font-weight: 400;
  margin: 0px;
}

.host-text {
  font-size: 1.25em;
  color: #ffc661;
  font-weight: 400;
  margin: 5px 0px 0px 0px;
}

#date {
  background-color: #a0a0a0;
  color: #ffffff;
  padding: 4px 7px;
  text-align: center;
  border: none;
  border-radius: 24px;
}

#date > h1 {
  font-size: 1.25em;
  font-weight: 400;
  margin: 0px;
}

#message-container {
  background-color: #ffffff;
  padding: 10px 20px 7px 15px;
  height: 400px;
  overflow-y: auto;
  box-shadow: inset 0px -14px 8px -11px #0000000d;
}

#sending-box {
  background-color: #ffffff;
  padding: 15px 18px;
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;
}

#input {
  border-radius: 3px;
  background-color: #f7f7f7;
  border: none;
  padding: 5px 7px;
  font-size: 1.75em;
  color: #a0a0a0;
  font-weight: 400;
  width: 100%;
}

#send-btn {
  border-radius: 17px;
  background-color: #ff8864;
  color: #ffffff;
  font-size: 2em;
  border: none;
  padding: 4px 30px;
  margin-left: 14px;
  cursor: pointer;
}

#sending-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media screen and (max-width: 880px) {
  #chatbox-section {
    margin-right: 0px;
    margin-bottom: 50px;
  }
}

@media screen and (max-width: 490px) {
  #send-btn {
    padding: 4px 17px;
  }

  .user {
    width: 16px;
  }

  #input {
    padding: 5px;
  }
}
</style>
