<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

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

div::-webkit-scrollbar {
  height: 5px;
  width: 5px;
  padding-bottom: 30px;
}

div::-webkit-scrollbar-track {
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.2);
}

div::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.5);
  /* box-shadow: 0 0 1px rgba(255, 255, 255, 1); */
}

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

.multiselect__tag {
  background: #ff8864 !important;
}

.multiselect__tags {
  border: 2px solid #e3e3e3 !important;
  border-radius: 10px !important;
}

.multiselect__tag-icon:after {
  color: #ffffff !important;
}

.multiselect__placeholder {
  color: #cccccc !important;
  font-size: 0.9em !important;
  font-weight: 450 !important;
}

.multiselect__input {
  color: #444444 !important;
  font-size: 0.9em !important;
  font-weight: 450 !important;
}

.multiselect__option {
  font-size: 0.9em !important;
  font-weight: 450 !important;
}

.multiselect__tag-icon:hover {
  background: #ff8864 !important;
}

.multiselect {
  width: 350px !important;
}

/* .input_box,
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
} */

.event-header {
  color: #444444;
  font-size: 3.75em;
}

.black-color {
  color: #444444;
}

.red-color {
  color: #fd6363;
}

.green-color {
  color: #1ed32c;
}

.white-color {
  color: #ffffff;
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
  padding: 5px 0px;
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
  padding: 7px 0px;
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
  font-weight: 500;
  color: #444444;
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
.page-container {
  width: 1440px;
  max-width: 1440px;
  padding: 0;
}

.event-container {
  width: 1750px;
  max-width: 1750px;
  padding: 0;
}

.search-flex-container {
  width: 100%;
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

.text-center {
  text-align: center;
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

.list {
  background: transparent;
  float: left;
}

.event-flex-section {
  display: flex;
  align-items: center;
  overflow-y: auto;
  overflow-x: auto;
  width: 100%;
  /* margin-bottom: 20px; */
}

.event-flex-wrap-section {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  overflow-y: hidden;
  margin-bottom: 20px;
  justify-content: flex-start;
}

#list-container {
  overflow: auto;
  float: left;
  /* position: relative; */
  margin-bottom: 30px;
}

/* Homepage */

.homepage-title {
  width: 328px;
  font-weight: 800;
  color: #444444;
  font-size: 5.5em;
  margin: 0px;
  z-index: 1;
}

.homepage-subtitle {
  font-weight: 800;
  color: #444444;
  font-size: 4em;
  text-transform: uppercase;
  margin: 0px;
  z-index: 1;
}

.homepage-description {
  color: #444444;
  width: 490px;
  font-weight: 500;
  font-size: 3.5em;
  margin-top: 15px;
  margin-bottom: 29px;
  z-index: 1;
}

/* Homepage */

.bm-burger-button {
  position: relative !important;
  width: 25px !important;
  height: 15px !important;
  left: 0px !important;
  top: 0px !important;
}

.bm-burger-bars {
  border: none !important;
  border-radius: 3px !important;
  background-color: #fe8864 !important;
}

.bm-cross {
  background: white !important;
}

.bm-item-list {
  margin-left: 0px !important;
}

.bm-menu {
  background-color: #fe8864 !important;
  box-shadow: 0px 3px 30px #0000000d;
}

#event-flex-box,
#discount-flex-box {
  background-color: white;
  border-radius: 17px;
  position: relative;
  margin-right: 20px;
  margin-bottom: 20px;
  height: 270px;
  width: 230px;
}

#orange-message,
#white-message {
  max-width: 600px;
}

@media screen and (max-width: 2320px) {
  .event-container {
    width: 1540px;
    max-width: 1540px;
    padding: 0;
  }

  #orange-message,
  #white-message {
    max-width: 500px;
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

  #orange-message,
  #white-message {
    max-width: 400px;
  }
}

@media screen and (max-width: 1650px) {
  .event-container {
    width: 1024px;
    max-width: 1024px;
  }

  #orange-message,
  #white-message {
    max-width: 350px;
  }
}

@media screen and (max-width: 1440px) {
  .page-container,
  .navbar-container {
    width: 1024px;
    max-width: 1024px;
  }
}

@media screen and (max-width: 1350px) {
  .event-container {
    width: 750px;
    max-width: 750px;
  }

  #orange-message,
  #white-message {
    max-width: 300px;
  }
}

@media screen and (max-width: 1080px) {
  .back_button,
  .create_button {
    width: 200px;
    margin: 20px 0px;
    font-size: 1.75em;
  }
}

@media screen and (max-width: 1024px) {
  .page-container,
  .navbar-container {
    width: 960px;
    max-width: 960px;
    padding-left: 20px;
    padding-right: 20px;
  }

  .popup-section {
    overflow-y: auto;
    align-items: flex-start !important;
  }

  .popup-form {
    margin: 50px 0px;
  }

  /* .popup{
    overflow-y:auto;
  } */
}

@media screen and (max-width: 880px) {
  #event-flex-box,
  #discount-flex-box {
    margin-right: 10px;
    margin-left: 10px;
  }

  #orange-message,
  #white-message {
    max-width: 400px;
  }
}

@media screen and (max-width: 800px) {
  .event-container {
    width: 720px;
    max-width: 720px;
  }

  #event-flex-box,
  #discount-flex-box {
    width: 340px;
  }
}

@media screen and (max-width: 768px) {
  .page-container,
  .navbar-container {
    width: 720px;
    max-width: 720px;
  }

  #event-flex-box,
  #discount-flex-box {
    width: 310px;
  }

  .event-container {
    width: 660px;
    max-width: 660px;
  }

  div::-webkit-scrollbar {
    height: 5px;
    width: 5px;
  }
}
@media screen and (max-width: 767px) {
  .page-container .navbar-container {
    width: 720px;
    max-width: 720px;
  }
}

@media screen and (max-width: 690px) {
  .event-container {
    width: 620px;
    max-width: 620px;
  }

  #event-flex-box,
  #discount-flex-box {
    width: 290px;
  }

  #orange-message,
  #white-message {
    max-width: 300px;
  }
}

@media screen and (max-width: 650px) {
  .event-container {
    width: 580px;
    max-width: 580px;
  }

  #event-flex-box,
  #discount-flex-box {
    width: 270px;
  }
}

@media screen and (max-width: 600px) {
  .event-container {
    width: 540px;
    max-width: 540px;
  }

  #event-flex-box,
  #discount-flex-box {
    width: 250px;
  }

  .input_box {
    width: 268px;
  }

  .homepage-description {
    font-size: 3em;
    width: 416px;
  }

  .back_button,
  .create_button {
    margin: 15px 0px;
    font-size: 1.6em;
    width: 140px;
  }

  .homepage-title {
    font-size: 4.5em;
  }
}

@media screen and (max-width: 570px) {
  .event-container {
    width: 500px;
    max-width: 500px;
  }

  #event-flex-box,
  #discount-flex-box {
    width: 230px;
  }

  #orange-message,
  #white-message {
    max-width: 250px;
  }
}

@media screen and (max-width: 525px) {
  .event-container {
    width: 465px;
    max-width: 465px;
  }

  #event-flex-box,
  #discount-flex-box {
    width: 380px;
  }

  .event-flex-wrap-section {
    justify-content: center;
  }
}

@media screen and (max-width: 490px) {
  .event-container {
    width: 430px;
    max-width: 430px;
  }

  #event-flex-box,
  #discount-flex-box {
    width: 360px;
  }

  .event-header {
    font-size: 3em;
  }

  .popup-form {
    margin: 20px 0px;
  }
}

@media screen and (max-width: 450px) {
  .event-container {
    width: 390px;
    max-width: 390px;
  }

  #event-flex-box,
  #discount-flex-box {
    width: 285px;
  }
}

@media screen and (max-width: 440px) {
  .homepage-title {
    font-size: 4em;
  }
  .homepage-description {
    font-size: 2.25em;
    width: 310px;
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

  .back_button,
  .create_button {
    margin: 15px 0px;
    font-size: 1.5em;
    width: 120px;
  }
}

@media screen and (max-width: 400px) {
  .event-container {
    width: 360px;
    max-width: 360px;
  }
}

@media screen and (max-width: 375px) {
  .page-container,
  .event-container,
  .navbar-container {
    width: 355px;
    max-width: 355px;
  }

  #event-flex-box,
  #discount-flex-box {
    width: 235px;
  }
}

@media screen and (max-width: 370px) {
  .event-container {
    width: 335px;
    max-width: 335px;
  }
}

@media screen and (max-width: 360px) {
  .page-container,
  .navbar-container {
    width: 335px;
    max-width: 335px;
  }

  .event-container {
    width: 325px;
    max-width: 325px;
  }

  .input_box {
    width: 208px;
  }

  .back_button,
  .create_button {
    width: 115px;
  }
}
</style>
