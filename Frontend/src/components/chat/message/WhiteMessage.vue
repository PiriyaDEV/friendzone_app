<template>
  <div id="message-box">
    <div id="white-message">
      <div>
        <h1 v-if="sameId == false" id="message">{{ chat.message }}</h1>
        <h1 v-if="sameId == true" id="message" class="new">
          {{ chat.message }}
        </h1>
      </div>
    </div>
    <h1 id="time">{{ time }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: ""
    };
  },
  props: ["chat", "sameId"],
  created() {
    let createTime = new Date(this.chat.created_at);
    this.time =
      createTime
        .getHours()
        .toString()
        .padStart(2, "0") +
      ":" +
      createTime
        .getMinutes()
        .toString()
        .padStart(2, "0");
  }
};
</script>

<style scoped>
#white-message {
  margin-top: 10px;
  margin-bottom: 0px;
}

#message,
#time {
  font-size: 1.75em;
  font-weight: 400;
}

#message {
  background-color: #ffffff;
  border: 1px solid #707070;
  padding: 5px 16px;
  border-radius: 20px;
  color: #444444;
  margin: 0px;
  word-wrap: break-word;
}

.new {
  margin: 0px 0px 0px 47px !important;
}

#time {
  margin-top: 20px;
  margin-left: 6px;
  color: #a0a0a0;
  margin-bottom: 0px;
}

#message-box {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

@media screen and (max-width: 490px) {
  #message {
    font-size: 1.6em;
    padding: 3px 9px;
  }

  #white-message {
    margin-top: 6px;
  }

  .new {
    margin: 0px 0px 0px 38px !important;
  }

  #time {
    margin-top: 17px;
    font-size: 1.3em;
    margin-left: 5px;
  }
}
</style>
