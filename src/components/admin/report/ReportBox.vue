<template>
  <div id="reportbox">
    <div id="report-menu">
      <div id="report-middle-menu">
        <h1 id="menu-text-id" class="menu-text">506</h1>
        <h1 class="menu-text">Suspect fake user</h1>
        <h1 class="menu-text">User</h1>
        <h1 class="menu-text">Fake User</h1>
        <h1 class="menu-text">Pending</h1>
      </div>
      <div id="button-section">
        <button class="button delete">View</button>
        <!-- <button v-if="select == 3" class="button delete" >Invite</button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#reportbox {
  background-color: #4d4d4d;
  border-radius: 23px;
  margin: 10px 0px;
}
#report-menu {
  align-items: center;
  display: flex;
  width: 100%;
  padding: 3px;
}

#report {
  width: 100%;
}

.menu-text {
  font-size: 1.5em;
  font-weight: 400;
  color: #b2b2b2;
}

#menu-text-id {
  padding: 0px 30px;
}

#report-middle-menu {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  align-items: center;
  width: 100%;
}

.button {
  font-family: "Atten-Round-New";
  font-size: 1.5em;
  font-weight: 550;
  padding: 4px 13px;
  margin: 2px 7px 2px 0px;
  border-radius: 24px;
}

.delete {
  color: #FFFFFF;
  border: 1.5px solid #FFFFFF;
  background-color: inherit;
}
</style>
