<template>
  <div id="message-box">
    <h1 id="time">{{ time }}</h1>
    <div id="orange-message">
      <div>
        <h1 id="message">{{ chat.message }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: "",
    };
  },
  props: ["chat"],
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
  },
};
</script>

<style scoped>
#orange-message {
  margin-top: 10px;
  margin-bottom: 0px;
}

#message,
#time {
  font-size: 1.75em;
  font-weight: 400;
}

#message {
  background-color: #ffc661;
  border: 1px solid #ffc661;
  padding: 5px 16px;
  border-radius: 20px;
  margin: 0;
  color: #444444;
}

#time {
  margin-top: 20px;
  margin-right: 6px;
  color: #a0a0a0;
  margin-bottom: 0px;
}

#message-box {
  display: flex;
  justify-content: flex-end;
}

@media screen and (max-width: 490px) {
  #message {
    font-size: 1.6em;
    padding: 3px 9px;
  }

  #orange-message{
    margin-top:6px;
  }

  #time {
  margin-top: 17px;
  font-size:1.3em;
  margin-right: 5px;
  }
}
</style>
