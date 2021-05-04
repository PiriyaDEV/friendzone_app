<template>
  <div id="message">
    <img id="profile-logo" :src="pic" />
    <div>
      <h1 id="username">
        {{ event.title }} ({{ event.joined }}/{{ event.max_participant }})
      </h1>
      <div id="message-section">
        <h1 id="message-text">{{ event.message }}</h1>
        <h1 id="time">{{ event.created_at }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: ["event"],
  computed:{
    pic() {
      let link = "http://localhost:8080/api/event/displayPic/";
      return link + this.event.event_id;
    },
  }
};
</script>

<style scoped>
#profile-logo {
  border-radius: 50%;
  width: 34px;
  height: 34px;
  margin-right: 13px;
  object-fit: cover;
}

#message {
  display: flex;
  justify-content: flex-start;
  margin: 15px 0px;
}

#username {
  margin: 0;
  font-size: 1.85em;
  color: #444444;
  font-weight: 600;
}

#message-text {
  margin: 0;
  font-size: 1.5em;
  font-weight: 400;
  color: #a0a0a0;
}

#message-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2px;
}

#time {
  margin: 0px 0px 0px 10px;
  font-size: 1.5em;
  font-weight: 400;
  color: #a0a0a0;
}
</style>
