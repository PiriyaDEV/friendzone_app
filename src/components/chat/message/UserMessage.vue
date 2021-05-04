<template>
  <div id="message">
    <img
      v-if="newId == true || chat.user_id == nextId"
      id="profile-logo"
      :src="pic"
    />
    <div>
      <h1 v-if="chat.user_id == nextId || newId == true" id="username">
        {{ chat.username }}
      </h1>
      <!-- <div v-for="(item,i) in tempUserId" :key="i"> -->
      <WhiteMessage :chatData="chat"></WhiteMessage>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import WhiteMessage from "@/components/chat/message/WhiteMessage.vue";
export default {
  props: ["chat", "tempUserId", "nextUserId"],
  data() {
    return {
      tempId: "",
      nextId: "",
      previousId: "",
      newId: false,
    };
  },
  components: {
    WhiteMessage,
  },
  created() {
    this.tempId = this.chat.user_id;
    if (this.nextUserId == null) {
      console.log("1");
      this.newId = true;
    } else {
      console.log("2");
      this.nextId = this.nextUserId.user_id;
    }
  },
  computed: {
    pic() {
      let link = "http://localhost:8080/api/user/displayPic/";
      return link + this.chat.user_id;
    },
    counter() {
      return this.count + 1;
    },
  },
  mounted() {},
  // methods: {
  //   test() {
  //      if (this.nextId == null) {
  //         this.newId = true;
  //      }
  //   }
  // },
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
}

#username {
  margin: 0;
  font-size: 1.75em;
  color: #444444;
  font-weight: 500;
  margin-top: 15px;
}
</style>
