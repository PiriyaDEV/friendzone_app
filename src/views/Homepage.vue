<template>
  <div>
    <Navbar></Navbar>
    <FirstSection />
    <SecondSection />
    <ThirdSection />
    <FourthSection />
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/homepage/Footer.vue";
import FourthSection from "@/components/homepage/FourthSection.vue";
import ThirdSection from "@/components/homepage/ThirdSection.vue";
import SecondSection from "@/components/homepage/SecondSection.vue";
import FirstSection from "@/components/homepage/FirstSection.vue";
import Navbar from "@/components/Navbar.vue";
export default {
  name: "Homepage",
  components: {
    Navbar,
    FirstSection,
    SecondSection,
    ThirdSection,
    FourthSection,
    Footer
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/mainpage");
    }
  }
};
</script>

<style scoped></style>
