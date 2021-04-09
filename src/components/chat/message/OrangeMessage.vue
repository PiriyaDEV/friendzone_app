<template>
  <div id="message-box">
    <h1 id="time">15:39</h1>
    <div id="white-message">
      <div>
        <h1 id="message">Do any of you guys have a camera?</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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
</style>