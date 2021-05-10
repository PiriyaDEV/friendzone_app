<template>
  <div>
    <div id="stat-section">
      <div id="stat-report" class="white-box">
        <h1 class="subheader">REPORT STATISTICS</h1>
        <div class="gray-box">
          <div>
            <h1 class="stat-header">USERS</h1>
            <h1 class="stat-number">157</h1>
          </div>
          <div>
            <h1 class="stat-header">EVENTS</h1>
            <h1 class="stat-number">97</h1>
          </div>
          <div>
            <h1 class="stat-header">WEB</h1>
            <h1 class="stat-number">141</h1>
          </div>
        </div>

        <div id="report-text">
          <div>
            <h1 class="stat-font-large">spam</h1>
            <h1 class="stat-font-large orange-color">43%</h1>
          </div>
          <div>
            <h1 class="stat-font-normal">web slow response</h1>
            <h1 class="stat-font-normal yellow-color">24%</h1>
          </div>
          <div>
            <h1 class="stat-font-small">hacked account</h1>
            <h1 class="stat-font-small">17%</h1>
          </div>
          <div>
            <h1 class="stat-font-small">hacked account</h1>
            <h1 class="stat-font-small">17%</h1>
          </div>
          <div>
            <h1 class="stat-font-small">hacked account</h1>
            <h1 class="stat-font-small">17%</h1>
          </div>
          <div>
            <h1 class="stat-font-small">others</h1>
            <h1 class="stat-font-small">16%</h1>
          </div>
        </div>
      </div>
      <div id="stat-right">
        <div id="stat-user" class="white-box">
          <h1 class="subheader">USER STATISTICS</h1>
          <div class="gray-user-box">
            <div id="age-group">
              <h1 class="user-font-header">AGE GROUP</h1>
              <h1 class="stat-font-large orange-color">55%</h1>
              <h1 class="user-font-small">18-25 yr.</h1>
            </div>
            <div>
              <h1 class="user-font-header">GENDER</h1>
              <div id="gender-box">
                <div>
                  <h1 class="stat-font-large orange-color">45%</h1>
                  <h1 class="user-font-small">female</h1>
                </div>
                <div>
                  <h1 class="stat-font-normal yellow-color">38%</h1>
                  <h1 class="user-font-small">male</h1>
                </div>
                <div>
                  <h1 class="stat-font-small">17%</h1>
                  <h1 class="user-font-small">lgbtq+</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="stat-discount" class="white-box">
          <h1 class="subheader">DISCOUNT STATISTICS</h1>
          <div class="gray-user-box">
            <div>
              <h1 class="stat-font-small">AVERAGE</h1>
              <h1 class="user-font-header">POINT USED USER</h1>
              <div id="coin">
                <img id="coin-logo" src="@/assets/icon/coin.png" />
                <h1 class="stat-number">1000</h1>
              </div>
            </div>
            <div>
              <h1 class="stat-font-small">EXCHANGED</h1>
              <h1 class="user-font-header">OVERALL</h1>
              <h1 style="margin:0px !important" class="stat-number">
                3001 <span id="times">times</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#stat-section,
.gray-box,
.gray-user-box,
#gender-box,
#report-text > div {
  display: flex;
  justify-content: space-between;
}

.gray-box,
.gray-user-box,
#gender-box,
#report-text > div {
  align-items: center;
}

#gender-box {
  height: 100%;
  align-items: flex-end;
}

#stat-report,
#stat-user,
#stat-discount {
  padding: 13px 17px;
}

#stat-section {
  margin-top: 25px;
}

#stat-right,
#stat-report {
  width: 100%;
}

#stat-report {
  margin-right: 20px;
}

#stat-discount {
  margin-top: 10px;
}

/* Last Section Left */
.gray-box > div,
.gray-user-box > div {
  background: #f8f8f8;
  border-radius: 10px;
  padding: 13px;
  width: 100%;
}

.gray-box > div:nth-child(1),
.gray-box > div:nth-child(2),
.gray-user-box > div:nth-child(1) {
  margin-right: 10px;
}

.stat-header {
  font-size: 1.75em;
  color: #a0a0a0;
  margin: 0;
  font-weight: 500;
}

.stat-number {
  font-size: 2.25em;
  color: #444444;
  margin: 5px 0px 0px 0px;
}

.white-box {
  background-color: #ffffff;
  border-radius: 10px;
}

/* Report */
#report-text {
  margin: 10px 0px 0px 0px;
}

#age-group {
  width: 100px;
}

/* Discount */
#coin {
  display: flex;
  align-items: center;
}

#coin > h1 {
  margin: 0px 0px 0px 5px;
}

#coin-logo {
  width: 15px;
  height: 15px;
}

#times {
  font-size: 0.8em !important;
  font-weight: 500 !important;
}

/* Stat Font*/

/* 16px */
.stat-header {
  font-size: 1.75em;
  color: #a0a0a0;
  margin: 0;
  font-weight: 500;
}

/* 22px */
.stat-number {
  font-size: 2.25em;
  color: #444444;
  margin: 5px 0px 0px 0px;
}

.stat-font-large,
.stat-font-normal,
.stat-font-small {
  color: #444444;
  margin: 2px 0px;
}
/* 24px */
.stat-font-large {
  font-size: 2.25em;
  font-weight: 500;
}
/* 20px */
.stat-font-normal {
  font-size: 2em;
  font-weight: 500;
}
/* 16px */
.stat-font-small {
  font-size: 1.75em;
  font-weight: 400;
}

/* User Font */
.user-font-header,
.user-font-small {
  margin: 0px;
}

/* 10px */
.user-font-header {
  font-size: 1.25em;
  font-weight: 400;
  color: #a0a0a0;
}

/* 14px */
.user-font-small {
  font-size: 1.5em;
  font-weight: 400;
  color: #444444;
}

.orange-color {
  color: #ff8864 !important;
}

.yellow-color {
  color: #ffc661 !important;
}
</style>
