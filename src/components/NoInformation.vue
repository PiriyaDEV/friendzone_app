<template>
  <div id="box-container" class="section">
    <div id="info-box">
      <h1>No Information.</h1>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#box-container {
  width: 100%;
  transition-delay: 300ms;
}

#info-box {
  padding: 80px 10px;
  width: 100%;
  text-align: center;
}

#info-box > h1 {
  font-size: 2em;
  color: #a0a0a0;
  font-weight: 500;
  margin: 0px;
}
</style>
