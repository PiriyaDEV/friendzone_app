<template>
  <div id="eventinfo">
    <div class="info-box">
      <div class="left">
        <h1 class="info-title">Host</h1>
        <h1 class="info-title">Title</h1>
        <h1 class="info-title">Event ID</h1>
      </div>
      <div class="left">
        <h1 class="info-text">Harryfer</h1>
        <h1 class="info-text">Chai Miang Chiang Mai</h1>
        <h1 class="info-eventid">EV000112</h1>
      </div>
    </div>

    <div class="info-box">
      <h1>Description</h1>
      <h1 class="info-description">
        I am sick of Samutsakorn. Let go to the place far from here. Let go
        Chaing Mai~! I am sick of Samutsakorn. Let go to the place far from
        here. Let go Chaing Mai~!I am sick of Samutsakorn. Let go to the place
        far from here. Let go Chaing Mai~!I am sick sdfdf
      </h1>
    </div>

    <div class="info-box">
      <div class="left">
        <h1 class="info-title">Location</h1>
        <h1 class="info-title">Start On</h1>
        <h1 class="info-title">End On</h1>
        <h1 class="info-title">Participant Gender</h1>
        <h1 class="info-title">Max Participants</h1>
        <h1 class="info-title">Age Limits</h1>
      </div>
      <div class="left">
        <h1 class="info-text">Localhost Resort Chiang Mai, Thailand</h1>
        <h1 class="info-text">21 Feb 2021 09:00</h1>
        <h1 class="info-text">24 Feb 2021 12:00</h1>
        <h1 class="info-text">ALL GENDERS</h1>
        <h1 class="info-text">20 PARTICIPANTS</h1>
        <h1 class="info-text">18 - 25 YEARS OLD</h1>
      </div>
    </div>

    <div class="button-section">
      <button class="back_button" @click="rateReturn()">Delete Event</button>
      <button class="create_button" @click="test()">
        Done
      </button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>

h1{
  color:#444444;
}

#eventinfo{
    margin-top:5px;
}

.info-title,
.info-text {
  font-size: 2em;
  margin: 10px 0px;
}

.info-text,
.info-description {
  font-weight: 400;
  color: #a0a0a0;
}

.info-eventid {
  color: #ff8864;
}

.info-description {
  max-width: 500px;
}

.info-box {
  display: grid;
  grid-template-columns: 40% 60%;
}
</style>
