<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
@import url("https://use.typekit.net/zqk6rjr.css");
body,
html,
input,
textarea,
button {
  padding: 0;
  margin: 0;
  font-family: "Atten-Round-New";
  font-size: 8px;
  overflow-x: hidden;
}

textarea {
  resize: none;
}

input[type="password"]::-ms-reveal,
input[type="password"]::-ms-clear {
  display: none;
}
/* input[type=password]::-webkit-contacts-auto-fill-button,
input[type=password]::-webkit-credentials-auto-fill-button {
   visibility: hidden;
   display: none !important;
   pointer-events: none;
   height: 0;
   width: 0;
   margin: 0;
} */
.popup {
  background-color: rgb(162, 129, 76, 0.25);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  position: fixed;
  z-index: 100000;
}

.popup-section {
  width: 100vw;
  height: 100vh;
}

.event-header {
  color: #444444;
  font-size: 3.75em;
}

.black-color {
  color: #444444;
}

.orange-color {
  color: #ff8864;
}

.gray-color {
  color: #a0a0a0;
}

.button-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back_button {
  color: #ff8864;
  font-size: 2.25em;
  font-family: "Atten-Round-New";
  text-align: center;
  width: 250px;
  padding: 9px 0px;
  background-color: #ffffff;
  border-radius: 35px;
  border: 2px solid #ff8864;
  margin-top: 30px;
  transition: 0.3s;
  margin-bottom: 30px;
  font-weight: 450;
}

.create_button {
  color: #ffffff;
  font-size: 2.25em;
  font-family: "Atten-Round-New";
  text-align: center;
  width: 250px;
  padding: 9px 0px;
  background-color: #ff8864;
  border-radius: 35px;
  border: none;
  margin-top: 30px;
  transition: 0.3s;
  margin-bottom: 30px;
  font-weight: 450;
}

.date-section {
  width: 300px;
  display: flex;
  justify-content: space-between;
}

.time-section {
  width: 220px;
  display: flex;
  justify-content: space-between;
}

input::-webkit-credentials-auto-fill-button {
  background-color: white;
}
::placeholder {
  color: #cccccc;
}

/* Change the white to any color */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px white inset !important;
}

.header_title {
  color: #444444;
  font-size: 2.5em;
  font-weight: 800;
  padding-top: 25px;
  margin: 0;
  padding-bottom: 3px;
  margin-bottom: 10px;
}

.orange_title {
  color: #ff8864;
  font-size: 2.5em;
  font-weight: 600;
  padding-top: 15px;
  margin: 0;
  padding-bottom: 3px;
  margin-bottom: 10px;
}

.input_title {
  font-size: 1.6em;
  margin: 6px 0px;
}

.input_box,
.input_participant,
.input_age {
  font-size: 1.6em;
  font-weight: 450;
  color: #444444;
  padding: 12px 12px 9px 15px;
  border: 2px solid #e3e3e3;
  border-radius: 10px;
  margin-bottom: 2px;
  box-shadow: none;
}
.input_box {
  width: 400px;
}

.button-create-section {
  display: flex;
  justify-content: flex-end;
}

.input_participant {
  width: 90px;
}

.input_age {
  width: 30px;
}

button {
  outline: 0;
  cursor: pointer;
}
.router-link-active {
  text-decoration: none;
}
.section {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}
.page-container,
.event-container {
  width: 1440px;
  max-width: 1440px;
  padding: 0;
}
.navbar-container {
  width: 1440px;
  max-width: 1440px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  padding: 0;
}
.form {
  background-color: #ffffff;
  box-shadow: 0px 3px 30px #00000026;
  border-radius: 10px;
}

.popup-form {
  background-color: #ffffff;
  box-shadow: 0px 3px 30px #00000026;
  border-radius: 10px;
  padding: 0px 60px;
  position: relative;
}

.close {
  width: 35px;
  position: absolute;
  z-index: 3;
  top: 15px;
  right: 15px;
}

.date_box {
  padding: 12px 12px 9px 15px;
}

.date_box,
.date_box_popup {
  border: 2px solid #e3e3e3;
  border-radius: 10px;
  margin-bottom: 11px;
  box-shadow: none;
  font-size: 1.6em;
  font-weight: 450;
  color: #444444;
  width: 100%;
}

.date_box_popup {
  padding: 7px 7px 9px 15px;
}

.safari.keyboard .app-container {
  bottom: 270px;
}

@media screen and (max-width: 1080px) {
  .back_button,.create_button{
    width: 200px;
    margin: 20px 0px;
    font-size: 1.75em;
  }

}

@media screen and (max-width: 1920px) {
  .page-container,
  .navbar-container {
    width: 1280px;
    max-width: 1280px;
  }

  .event-container {
    width: 1284px;
    max-width: 1284px;
  }
}

@media screen and (max-width: 1650px) {
  .event-container {
    width: 1024px;
    max-width: 1024px;
  }
}

@media screen and (max-width: 1440px) {
  .page-container,
  .navbar-container {
    width: 1024px;
    max-width: 1024px;
  }
}
@media screen and (max-width: 1024px) {
  .page-container,
  .event-container,
  .navbar-container {
    width: 960px;
    max-width: 960px;
    padding-left: 20px;
    padding-right: 20px;
  }
}
@media screen and (max-width: 768px) {
  .page-container,
  .event-container,
  .navbar-container {
    width: 720px;
    max-width: 720px;
  }
}
@media screen and (max-width: 767px) {
  .page-container,
  .event-container,
  .navbar-container {
    width: 720px;
    max-width: 720px;
  }
}

@media screen and (max-width: 600px) {
  .input_box {
    width: 268px;
  }

  .back_button,.create_button{
    margin: 15px 0px;
    font-size: 1.6em;
    width: 140px;
  }
}

@media screen and (max-width: 414px) {
  .page-container,
  .event-container,
  .navbar-container {
    width: 374px;
    max-width: 374px;
  }

  .input_box {
    width: 228px;
  }

  .back_button,.create_button{
    margin: 15px 0px;
    font-size: 1.5em;
    width: 120px;
  }

}
@media screen and (max-width: 375px) {
  .page-container,
  .event-container,
  .navbar-container {
    width: 355px;
    max-width: 355px;
  }
}
@media screen and (max-width: 360px) {
  .page-container,
  .event-container,
  .navbar-container {
    width: 335px;
    max-width: 335px;
  }

  .input_box {
    width: 208px;
  }

  .back_button,.create_button{
    width: 115px;
  }
}
</style>
