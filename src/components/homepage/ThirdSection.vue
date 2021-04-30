<template>
  <div>
    <div id="thirdsection" class="section">
      <div class="page-container text-container">
        <div id="text-section">
          <div id="title-box">
            <h1 class="homepage-title">POINT SYSTEM</h1>
          </div>
          <div id="subtitle-box">
            <h1 class="homepage-subtitle">EXCHANGE FOR DISCOUNT</h1>
          </div>
          <div id="description-box">
            <h2 class="homepage-description">
              Join the event to get the point and exchange it for great deal of
              discount
            </h2>
          </div>
        </div>
        <div id="homepage-img-box">
          <img id="coin" src="@/assets/homepage/Coin@2x.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#thirdsection {
  z-index: 2;
  background-color: #f8f3ec;
  padding: 60px 0px;
  position: relative;
}

.text-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.homepage-description {
  width: 480px !important;
}

#coin {
  width: 340px;
}

@media screen and (max-width: 1070px) {
  #coin {
    width: 200px;
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

@media screen and (max-width: 540px) {
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

  #coin {
    width: 150px;
  }
}

@media screen and (max-width: 440px) {
.homepage-description {
    width: 350px !important;
  }

  #coin {
    width: 120px;
  }
}
</style>
