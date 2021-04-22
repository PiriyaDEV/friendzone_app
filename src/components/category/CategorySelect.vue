<template>
  <div>
    <h1 id="event-title" class="event-header">CATEGORIES</h1>
    <div id="select-section">
      <TypeBox @clickReturn="clickReturn"></TypeBox>
      <TypeBox @clickReturn="clickReturn"></TypeBox>
      <TypeBox @clickReturn="clickReturn"></TypeBox>
      <TypeBox @clickReturn="clickReturn"></TypeBox>
      <TypeBox @clickReturn="clickReturn"></TypeBox>
      <TypeBox @clickReturn="clickReturn"></TypeBox>
      <TypeBox @clickReturn="clickReturn"></TypeBox>
      <TypeBox @clickReturn="clickReturn"></TypeBox>
      <TypeBox @clickReturn="clickReturn"></TypeBox>
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
  methods: {
    clickReturn(value) {
      this.$emit("categoryClick", value);
    },
  },
};
</script>

<style scoped>
#select-section {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
</style>
