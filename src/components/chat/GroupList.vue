<template>
  <div id="grouplist">
    <div id="list-box">
      <EventList></EventList>
      <EventList></EventList>
      <EventList></EventList>
      <EventList></EventList>
      <EventList></EventList>
    </div>
  </div>
</template>

<script>
import EventList from "@/components/chat/message/EventList.vue";
export default {
  name: "grouplist",
  components: {
    EventList,
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
