<template>
  <div @click="Onclick()" id="typebox">
    <div>
      <img
        class="category-icon"
        src="../../assets/category/white/icons8-airport-64@2x.png"
      />
    </div>
    <div id="text-box">
      <h1>FOOD</h1>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    Onclick() {
      this.$emit("clickReturn", true);
      console.log("test")
    }
  },
};
</script>

<style scoped>
#typebox {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #fe6464;
  background-color: #fe6464;
  border-radius: 10px;
  margin-bottom: 20px;
  cursor: pointer;
  margin-right: 15px;
}

.category-icon {
  width: 30px;
  padding: 5px 10px;
}

#text-box {
  background-color: #ffffff;
  width: 250px;
  height: 100%;
  padding-left: 20px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  align-items: center;
}

#text-box > h1 {
  font-size: 2em;
  font-weight: 450;
  color: #fe6464;
}
</style>