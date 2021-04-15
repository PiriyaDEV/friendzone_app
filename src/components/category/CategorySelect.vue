<template>
  <div>
    <h1 id="event-title" class="event-header">CATEGORIES</h1>
    <div id="select-section">
      <TypeBox></TypeBox>
      <TypeBox></TypeBox>
      <TypeBox></TypeBox>
      <TypeBox></TypeBox>
      <TypeBox></TypeBox>
      <TypeBox></TypeBox>
      <TypeBox></TypeBox>
      <TypeBox></TypeBox>
      <TypeBox></TypeBox>
    </div>
  </div>
</template>

<script>
import TypeBox from "./TypeBox";
export default {
  name: "category-select",
  components: {
    TypeBox,
  },
};
</script>

<style scoped>
#select-section{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>