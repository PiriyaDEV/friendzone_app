<template>
  <div id="box-container" class="section">
    <div id="info-box" :class="cssAdmin">
      <h1>No Information.</h1>
    </div>
  </div>
</template>
 :class=""
<script>
export default {
    props:["invite","adminSearch"],
    computed: {
      cssinvite() {
        let invitepage = "info-box-invite"
        let anotherpage = "info-box"
          if(this.invite == true) {
            return invitepage
          }
          return anotherpage
      },
      cssAdmin() {
        let searchpage = "noinfo-admin-search";
        let anotherpage = "";
         if(this.adminSearch == true) {
           return searchpage
         }
         return anotherpage
      },
    }
};
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

.noinfo-admin-search{
  padding: 25px 10px !important;
}

#info-box > h1 {
  font-size: 2em;
  color: #a0a0a0;
  font-weight: 500;
  margin: 0px;
}
</style>
