<template>
  <div>
    <div id="fourthsection" class="section">
      <div class="page-container">
        <div class="section">
          <div id="text-section">
            <div id="title-box">
              <h1 class="homepage-title">LOVED BY COMMUNITY</h1>
            </div>
            <div id="subtitle-box">
               <h2 class="homepage-description">
              here the comment from our lovely users
            </h2>
            </div>
          </div>
        </div>
        <div id="review-box">
          <div id="review-section">
          <div v-for="(item, i) in 3" :key="i">
            <ReviewFlex
              :comment="data[i].comment"
              :username="data[i].username"
              :userRole="data[i].userRole"
            />
          </div>
        </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import ReviewFlex from "@/components/homepage/ReviewFlex.vue";
export default {
  data() {
    return {
      data: [
        {
          comment:
            "I used to be lonely play online games all alone, but now I have more than 100 friends from this app, Love it <3",
          username: "bm.worachot",
          userRole: "who was once a solo gamer",
        },
        {
          comment:
            "Thanks to this app, I survive !! Almost starving to death, there was no one come to my temple since COVID-19 outbreak. After created an event ‘This meal for monks,’ a lot came to offer food, Thank you so much ",
          username: "luangpor.harry",
          userRole: "monk from Pad temple",
        },
        {
          comment:
            "This is more than just a friend finding application, you can use it for organize and promote event such as meeting, concert, or even make and off-season offering of robes and other needs to monks",
          username: "pd.piriya",
          userRole: "organizer",
        },
      ],
    };
  },
  components: {
    ReviewFlex,
  },
};
</script>

<style scoped>
#fourthsection {
  z-index: 2;
  background-color: #fe8864;
  padding: 80px 0px 120px 0px;
  position: relative;
}

.homepage-title {
  color: #ffffff !important;
  width: 100% !important;
}

.homepage-description {
  color: #ffffff !important;
  width: 100% !important;
}

#review-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

@media screen and (max-width: 1080px) {
  #review-section {
  justify-content: space-evenly
}
}

@media screen and (max-width: 1070px) {
  #fourthsection {
    padding: 60px 0px;
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

  #description-box {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

@media screen and (max-width: 870px) {
#review-section{
  display:block;
}

#review-box{
  display:flex;
  justify-content: center;
  align-items:center;
}
}

@media screen and (max-width: 540px) {
  #title-box,
  #subtitle-box {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .homepage-subtitle {
    width: 400px !important;
  }

  .homepage-title,.homepage-description {
    width: 300px !important;
  }

}

</style>
