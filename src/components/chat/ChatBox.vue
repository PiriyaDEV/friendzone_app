<template>
  <div id="chatbox-section">
    <div id="chat-container">
      <div id="chat-head">
        <div id="chat-box">
          <h1 class="large-text">
            Chai Miang Chiang Mai Camp with Aj.Harryfer
          </h1>
          <div id="user-count" class="section">
            <img class="user" src="@/assets/chat/icons8-customer-white.png" />
            <h1 class="large-text">01/20</h1>
          </div>
        </div>
        <h1 class="host-text">Hosted by harryfer</h1>
      </div>
    </div>

    <div id="message-container">
      <UserMessage></UserMessage>
      <OrangeMessage></OrangeMessage>
      <UserMessage></UserMessage>
      <UserMessage></UserMessage>

    </div>

    <div id="sending-box">
      <div id="sending-section">
        <input id="input" type="text" autocomplete="off" />
        <button id="send-btn">send</button>
      </div>
    </div>
  </div>
</template>

<script>
import UserMessage from "@/components/chat/message/UserMessage.vue";
import OrangeMessage from "@/components/chat/message/OrangeMessage.vue";
export default {
  name: "chatbox",
  components: {
    UserMessage,
    OrangeMessage,
  },
};
</script>

<style scoped>
#chatbox-section {
  width: 650px;
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

#message-container {
  background-color: #ffffff;
  padding: 10px 20px 7px 15px;
  height: 400px;
  overflow-y: scroll;
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
  padding: 5px 15px;
  font-size: 1.75em;
  color: #a0a0a0;
  font-weight: 600;
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
}

#sending-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>