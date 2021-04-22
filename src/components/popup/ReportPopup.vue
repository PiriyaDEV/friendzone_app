<template>
  <div id="rate-popup" class="popup">
    <div class="popup-section section">
      <div class="popup-form">
        <h1 v-if="categoryReport == 1" class="header_title report-title">
          REPORT USER
        </h1>
        <h1 v-if="categoryReport == 2" class="header_title report-title">
          REPORT EVENT
        </h1>
        <h1 v-if="categoryReport == 3" class="header_title report-title">
          REPORT WEB
        </h1>

        <!-- User Input -->
        <div v-if="categoryReport == 1">
          <h2 class="input_title">
            Who do you want to report?<span class="orange-color"> *</span>
          </h2>
          <input
            v-model="username"
            class="input_box"
            type="text"
            maxlength="30"
            size="30"
            placeholder="enter a person username"
          />
        </div>
        <!-- User Input -->

        <!-- Event Input -->
        <div v-if="categoryReport == 2">
          <h2 class="input_title">
            What event do you want to report?<span class="orange-color">
              *</span
            >
          </h2>
          <input
            v-model="username"
            class="input_box"
            type="text"
            maxlength="30"
            size="30"
            placeholder="enter an event id"
          />
          <h1 class="porlor">* you can find event id in event details</h1>
        </div>
        <!-- Event Input -->

        <!-- Input -->
        <div>
          <h2 class="input_title">
            Report Category<span class="orange-color"> *</span>
          </h2>
          <select
            name="gender"
            class="input_select minimal"
            v-model="user_selected"
            required
          >
            <option value="" disabled selected hidden>
              select report category
            </option>
            <option value="1">Harry</option>
            <option value="2">Piriya</option>
            <option value="3">Bm</option>
            <option value="3">Big</option>
            <option value="3">4Most</option>
          </select>
        </div>
        <!-- Input -->

        <!-- Input -->
        <div>
          <h2 class="input_title">Title<span class="orange-color"> *</span></h2>
          <input
            v-model="username"
            class="input_box"
            type="text"
            maxlength="30"
            size="30"
            placeholder="enter report title"
          />
        </div>
        <!-- Input -->

        <!-- Input -->
        <div>
          <h2 class="input_title">
            What went wrong?<span class="orange-color"> *</span>
          </h2>
          <textarea
            class="input_textarea_box bio"
            maxlength="256"
            size="256"
            name="bio"
            placeholder="enter your report description"
          >
          </textarea>
        </div>
        <!-- Input -->

        <div class="button-section">
          <button id="back_button" @click="reportReturn()">Cancel</button>
          <button id="create_button" @click="ClickCreate()">Report</button>
        </div>
        <img
          @click="reportReturn()"
          style="cursor: pointer"
          class="close"
          src="@/assets/icon/icons8-multiply-96.png"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReportPopup",
  props: ["categoryReport"],
  data() {
    return {
      user_selected: "",
    };
  },
  methods: {
    reportReturn() {
      this.$emit("clickReport", false);
    },
  },
};
</script>

<style scoped>
.report-title {
  margin-bottom: 20px;
  text-align: center;
}

.input_select {
  font-size: 1.75em;
  font-weight: 600;
  width: 100%;
  padding: 9px 12px 9px 15px;
  border: 2px solid #e3e3e3;
  border-radius: 10px;
  margin-bottom: 2px;
  box-shadow: none;
  font-family: "Atten-Round-New";
}

.comment {
  font-size: 1.75em;
  font-weight: 600;
  color: #444444;
  width: calc(100% - 15px);
  border: 2px solid #e3e3e3;
  border-radius: 10px;
  margin-bottom: 2px;
  box-shadow: none;
  padding-bottom: 100px;
  padding-top: 12px;
  padding-left: 15px;
}

select {
  /* styling */
  background-color: white;
  border: thin solid #e3e3e3;
  border-radius: 4px;
  display: inline-block;
  font: inherit;
  line-height: 1.5em;
  padding: 0.5em 3.5em 0.5em 1em;

  /* reset */

  margin: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
}

select.minimal {
  background-image: linear-gradient(45deg, transparent 50%, #e3e3e3 50%),
    linear-gradient(135deg, #e3e3e3 50%, transparent 50%);
  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;
}

select.minimal:focus {
  background-image: linear-gradient(45deg, #e3e3e3 50%, transparent 50%),
    linear-gradient(135deg, transparent 50%, #e3e3e3 50%);
  background-position: calc(100% - 15px) 1em, calc(100% - 20px) 1em,
    calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;
  border-color: #e3e3e3;
  outline: 0;
}

select:-moz-focusring {
  color: transparent;
  text-shadow: 0 0 0 #000;
}

select:required:invalid {
  color: #cccccc;
}
select,
option {
  color: #444444;
}

.porlor {
  font-size: 1.5em;
  color: #a0a0a0;
  margin-bottom: 0;
  margin-top: 2px;
}

#back_button {
  color: #ff8864;
  font-size: 2.5em;
  font-family: "Atten-Round-New";
  text-align: center;
  width: 170px;
  padding: 9px 0px;
  background-color: #ffffff;
  border-radius: 35px;
  border: 2px solid #ff8864;
  margin-top: 30px;
  transition: 0.3s;
  margin-bottom: 30px;
  font-weight: 500;
}

#create_button {
  color: #ffffff;
  font-size: 2.5em;
  font-family: "Atten-Round-New";
  text-align: center;
  width: 170px;
  padding: 9px 0px;
  background-color: #ff8864;
  border-radius: 35px;
  border: none;
  margin-top: 30px;
  transition: 0.3s;
  margin-bottom: 30px;
  font-weight: 500;
}

.input_textarea_box {
  font-size: 1.75em;
  font-weight: 600;
  color: #a0a0a0;
  padding: 7px 12px 7px 15px;
  border: 2px solid #e3e3e3;
  border-radius: 10px;
  margin-bottom: 2px;
  box-shadow: none;
  width: 400px;
  line-height: 21px;
}

.bio {
  padding-bottom: 50px;
}
</style>
