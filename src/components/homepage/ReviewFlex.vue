<template>
  <div id="review-flex">
    <div id="star-section">
      <div v-for="(item, i) in 5" :key="i">
        <img class="star" src="@/assets/icon/icons8-star-96-orange.png" />
      </div>
    </div>
    <h1 class="comment">"{{ comment }}"</h1>
    <div>
      <hr id="bar" />
      <h1 class="username">{{ username }}</h1>
      <h1 class="userrole">{{ userRole }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  props: ["comment", "username", "userRole"]
};
</script>

<style scoped>
#review-flex {
  padding: 30px;
  background: #ffffff;
  box-shadow: 0px 3px 30px #00000026;
  border-radius: 10px;
  width: 250px;
  margin-top: 30px;
}

#star-section {
  display: flex;
  align-items: flex-start;
}

.star {
  width: 20px;
  height: 20px;
}

.username,
.comment {
  font-size: 2em;
  color: #444444;
  font-weight: 500;
}

.comment {
  margin: 20px 0px 15px 0px;
  height: 140px;
}

.username {
  margin: 20px 0px 5px 0px;
}

.userrole {
  font-size: 1.6em;
  color: #444444;
  font-weight: 400;
  margin: 0px;
}

#bar {
  height: 2px;
  border-width: 0;
  color: #ff8864;
  background-color: #ff8864;
}

@media (min-width: 1920px) {
  #review-flex {
    width: 350px;
  }
}

@media screen and (max-width: 1080px) {
  #review-flex {
    width: 200px;
  }

  .comment {
    height: 170px;
  }
}

@media screen and (max-width: 870px) {
  #review-flex {
    width: 400px;
  }
  .comment {
    height: 100px;
  }
}

@media screen and (max-width: 540px) {
  #review-flex {
    width: 200px;
  }

  .comment {
    height: 170px;
  }
}
</style>
