<template>
  <div id="discount-box">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />

    <img
      class="discount-pic"
      src="https://www-cms.majorcineplex.com/uploads/content/16217/cover_16217.jpg"
    />

    <div id="title-section">
      <h1 class="discount-title">
        FREE popcorn and soft drink FREE popcorn and soft drink
      </h1>
      <h1 class="discount-description">
        1 free big popcorn and 1 big glass of soft drink of your selection
      </h1>
    </div>

    <!-- Double Button -->
    <div id="double-button">
      <button>MORE DETAIL</button>
    </div>
    <!-- Double Button -->
  </div>
</template>

<script>
export default {
  name: "DiscountLongFlex",
};
</script>

<style scoped>
#discount-box {
  background-color: white;
  border-radius: 17px;
  position: relative;
  margin-right: 20px;
  margin-bottom: 20px;
}

.discount-pic {
  width: 315px;
  height: 200px;
  border-top-left-radius: 17px;
  border-top-right-radius: 17px;
}

.discount-title {
  width: 228px;
  margin-left: 20px;
  margin-top: 0px;
  margin-bottom: 0px;
  color: #444444;
  font-size: 1.75em;
  font-weight: 450;
}

.discount-description {
  width: 228px;
  margin-left: 20px;
  margin-top: 6px;
  color: #a0a0a0;
  margin-bottom: 0px;
  font-size: 1.5em;
  font-weight: 450;
}

#title-section {
  margin-top: 10px;
}

.highlight-text {
  color: #ff8864;
}

#button {
  text-align: right;
  margin-right: 20px;
  margin-top: 10px;
  padding-bottom: 15px;
}

#double-button {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;
  margin-left: 20px;
  margin-top: 10px;
  padding-bottom: 15px;
}

#button > button,
#double-button > button {
  color: #ff8864;
  border: 2px solid #ff8864;
  background-color: #ffffff;
  font-family: "Atten-Round-New";
  font-size: 1.25em;
  font-weight: 550;
  padding: 7px 15px;
  margin: 0;
  border-radius: 16px;
}
</style>