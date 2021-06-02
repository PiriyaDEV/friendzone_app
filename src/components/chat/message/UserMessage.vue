<template>
  <div id="message">
    <img v-if="newId == true" id="profile-logo" :src="pic" />
    <div>
      <h1 v-if="newId == true" id="username">
        {{ chat.username }}
      </h1>
      <!-- <div v-for="(item,i) in tempUserId" :key="i"> -->
      <WhiteMessage :chat="chat" :sameId="sameUser"></WhiteMessage>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import WhiteMessage from "@/components/chat/message/WhiteMessage.vue";
export default {
  props: ["chat", "nextUserId", "previousUserId"],
  data() {
    return {
      nextId: "",
      previousId: "",
      sameUser: false,
      newId: false
    };
  },
  components: {
    WhiteMessage
  },
  created() {
    if (this.previousUserId == null) {
      this.newId = true;
    } else if (this.nextUserId == null) {
      if (this.previousUserId.user_id !== this.chat.user_id) {
        this.newId = true;
      } else {
        this.sameUser = true;
      }
    } else {
      if (this.previousUserId.user_id !== this.chat.user_id) {
        this.newId = true;
      } else {
        this.sameUser = true;
      }
    }
  },
  computed: {
    pic() {
      let link = "http://localhost:8080/api/user/displayPic/";
      return link + this.chat.user_id;
    }
  }
};
</script>

<style scoped>
#profile-logo {
  border-radius: 50%;
  width: 34px;
  height: 34px;
  margin-right: 13px;
  margin-top: 15px;
  object-fit: cover;
}

#message {
  display: flex;
  justify-content: flex-start;
  position:relative;
}

#username {
  margin: 0;
  font-size: 1.75em;
  color: #444444;
  font-weight: 500;
  margin-top: 15px;
}

@media screen and (max-width: 490px) {
  #profile-logo {
    width: 25px;
    height: 25px;
    margin-top: 13px;
  }
}
</style>
