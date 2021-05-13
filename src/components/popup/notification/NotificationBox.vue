<template>
  <div id="notification-box">
    <div id="profile-pic">
      <img src="@/assets/profile/pfpic.jpg" alt="" />
    </div>
    <div id="text-box">
      <h1 class="noti-text">
        b.big accept your joining request in the event Chai Miang that have a a
        a a Chiang Mai with….
      </h1>
      <h1 class="date">
        14:05
      </h1>
    </div>
    <div id="button">
      <button class="decline ">
        <i class="icon fa fa-ban"></i
        ><span class="btn-text">Decline</span>
      </button>
      <button class="done">
        <i class="icon fa fa-check"></i
        ><span class="btn-text">Join</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#notification-box {
  display: flex;
  align-items: center;
  margin: 0px 0px 10px 0px;
  width: 455px;
}

#profile-pic > img {
  height: 40px;
  width: 40px;
  border: none;
  border-radius: 50%;
}

#text-box {
  margin-left: 10px;
}

.noti-text {
  font-size: 1.6em;
  color: #444444;
  margin: 0px;
  font-weight: 500;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 240px;
  line-height: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.date {
  font-size: 1.4em;
  color: #ff8864;
  margin: 2px 0px 0px 0px;
  font-weight: 500;
}

.icon {
  display: none;
}

#button {
  margin-left: 10px;
}

#button > button {
  border-radius: 24px;
  font-size: 1.5em;
  font-weight: 600;
  margin: 2px;
  background-color: transparent;
}

.decline {
  border: 1.5px solid #fd6363;
  color: #fd6363;
  padding: 4px 13px;
}

.done {
  border: 1.5px solid #1ed32c;
  color: #1ed32c;
  padding: 4px 23px;
}
@media screen and (max-width: 690px) {
  .noti-text {
    width: 165px;
    font-size: 1.4em;
    -webkit-line-clamp: 3;
  }

  #notification-box {
    width: 347px;
  }

  #button > button {
    font-size: 1.2em;
  }

  .decline {
    padding: 4px 8px;
  }

  .done {
    padding: 4px 18px;
  }
}

@media screen and (max-width: 490px) {
  #profile-pic > img {
    height: 35px;
    width: 35px;
  }

  .icon {
    display: block;
    color: #ffffff;
  }

  #notification-box {
    width: 265px;
  }

  .decline {
    border: 1.5px solid #fd6363;
    color: #fd6363;
    background-color: #fd6363 !important;
    padding: 4px 12px;
  }

  .done {
    border: 1.5px solid #1ed32c;
    background-color: #1ed32c !important;
    color: #1ed32c;
    padding: 4px 12px;
  }

  .btn-text {
    display: none;
  }

  .noti-text {
    width: 120px;
    line-height: 17px;
    font-size: 1.4em;
    -webkit-line-clamp: 3;
  }
}
</style>
