<template>
  <div>
    <div id="secondsection" class="section">
      <div class="page-container text-container">
        <div id="text-section">
          <div id="title-box">
            <h1 class="homepage-title">FIND & JOIN</h1>
          </div>

          <div id="subtitle-box">
            <h1 class="homepage-subtitle">The event that interest you</h1>
          </div>

          <div id="description-box">
            <h2 class="homepage-description">
              many categories event for you to choose with 100+ events to join
            </h2>
          </div>
        </div>
        <div id="homepage-img-box">
          <img id="event" src="@/assets/homepage/Event@2x.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#secondsection {
  z-index: 2;
  background-color: #ffc661;
  padding: 190px 0px;
  position: relative;
}

.text-container {
  display: flex;
  justify-content: flex-end;
}

.homepage-description {
  width: 480px !important;
}

#event {
  width: 1100px;
  position: absolute;
  left: -90px;
  bottom: 100px;
}

@media screen and (max-width: 1890px) {
  #event {
    width: 850px;
    left: -90px;
    bottom: 135px;
  }
}

@media screen and (max-width: 1440px) {
  #event {
    width: 730px;
    left: -90px;
    bottom: 160px;
  }
}

@media screen and (max-width: 1380px) {
  #event {
    width: 630px;
    left: -90px;
    bottom: 185px;
  }
}

@media screen and (max-width: 1070px) {
  #event {
    width: 630px;
    position: inherit;
  }

  #secondsection {
    padding: 70px 0px;
  }

  .text-container {
    display: block;
  }

  .homepage-description,
  .homepage-title,
  .homepage-subtitle {
    text-align: center;
  }

  .homepage-title {
    width: 100% !important;
  }

  .homepage-description {
    width: 500px !important;
  }

  #homepage-img-box {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #description-box {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

@media screen and (max-width: 640px) {
  #event {
    width: 530px;
  }
}

@media screen and (max-width: 540px) {
  #event {
    width: 460px;
  }

  #title-box,
  #subtitle-box {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .homepage-title,
  .homepage-subtitle,
  .homepage-description {
    width: 400px !important;
  }
}

@media screen and (max-width: 440px) {
  .homepage-description {
    width: 350px !important;
  }
}
</style>
