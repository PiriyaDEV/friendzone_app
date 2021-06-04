<template>
  <div id="report-review" class="popup">
    <div class="popup-section section">
      <div id="report-reivew-section" class="popup-form">
        <h1 class="header_title">REVIEW REPORT</h1>
        <h1 class="orange_title">Report Detail</h1>
        <div id="report-review-container">
          <div id="left">
            <div class="info-box">
              <div>
                <h1 class="info-title">Title</h1>
              </div>
              <div>
                <h1 class="info-text">{{ reportList.title }}</h1>
              </div>
            </div>

            <div v-if="reportList.type == `User`" class="info-box">
              <div>
                <h1 class="info-title">Suspect User</h1>
              </div>
              <div>
                <h1 class="info-text">{{ reportList.suspect }}</h1>
              </div>
            </div>

            <div v-if="reportList.type == `Event`" class="info-box">
              <div>
                <h1 class="info-title">Suspect Event</h1>
              </div>
              <div>
                <h1 class="info-text">{{ reportList.suspect }}</h1>
              </div>
            </div>

            <div class="info-box">
              <div>
                <h1 class="info-title">Report Category</h1>
              </div>
              <div>
                <h1 class="info-text">{{ reportList.type_name }}</h1>
              </div>
            </div>

            <div class="info-box">
              <h1>What wrong?</h1>
              <h1 class="info-description">
                {{ reportList.description }}
              </h1>
            </div>
          </div>
          <div id="right">
            <div class="info-box">
              <div>
                <h1 class="info-title">Report ID</h1>
              </div>
              <div>
                <h1 class="info-text">{{ reportList.report_id }}</h1>
              </div>
            </div>

            <div class="info-box">
              <div>
                <h1 class="info-title">Report Type</h1>
              </div>
              <div>
                <h1 class="info-text">{{ reportList.type }}</h1>
              </div>
            </div>

            <div class="info-box">
              <div>
                <h1 class="info-title">Reporter</h1>
              </div>
              <div>
                <h1 class="info-text">{{ reportList.reporter }}</h1>
              </div>
            </div>

            <div class="info-box">
              <div>
                <h1 class="info-title">Report Date</h1>
              </div>
              <div>
                <h1 class="info-text">{{ reportList.createDate }}</h1>
              </div>
            </div>

            <div class="info-box">
              <div>
                <h1 class="info-title">Update Date</h1>
              </div>
              <div>
                <h1 class="info-text">{{ reportList.updateDate }}</h1>
              </div>
            </div>

            <div class="info-box">
              <div>
                <h1 class="info-title">Status</h1>
              </div>
              <div>
                <h1 class="info-text">{{ reportList.status }}</h1>
              </div>
            </div>

            <div class="info-box">
              <div>
                <h1 class="info-title">Admin</h1>
              </div>
              <div>
                <h1 class="info-text">{{ reportList.admin_id }}</h1>
              </div>
            </div>
          </div>
        </div>
        <div v-if="reportList.status == 'Waiting'" class="button-section">
          <button id="drop-btn" @click="approveReport(0)" class="back_button">
            Drop Report
          </button>
          <button id="action-btn" @click="approveReport(1)" class="back_button">
            Take Action
          </button>
        </div>
        <div v-else id="single-button">
          <button class="create_button" @click="exit()">
            Done
          </button>
        </div>
        <img
          @click="exit()"
          style="cursor: pointer"
          class="close"
          src="@/assets/icon/icons8-multiply-96.png"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ReportService from "@/services/report.service";

export default {
  props: ["reportList"],
  methods: {
    exit() {
      this.$emit("reportData", false);
    },
    approveReport(value) {
      ReportService.approveReport({
        report_id: this.reportList.report_id,
        takeAction: value
      }).then((res) => {
        if (res) {
          this.reportList.admin_id = res.admin_id;
          this.reportList.status = res.status;
          this.reportList.updateDate = res.updateDate;
        }
      });
    }
  }
};
</script>

<style scoped>
.info-box {
  grid-template-columns: 50% 50%;
}

.info-box {
  display: grid;
  grid-template-columns: 40% 60%;
}

.info-title,
.info-text {
  font-size: 2em;
  margin: 10px 0px;
}

#single-button {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.info-text,
.info-description {
  font-weight: 400;
  color: #a0a0a0;
}

#drop-btn {
  color: #fd6363;
  border: 2px solid #fd6363;
}

#action-btn {
  color: #1ed32c;
  border: 2px solid #1ed32c;
}

#report-review-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  min-width: 700px;
  position: relative;
}

#left,
#right {
  width: 360px;
}

#left {
  margin-right: 20px;
}

#right {
  margin-left: 20px;
}

@media screen and (max-width: 1024px) {
  #report-review-container {
    display: block;
  }

  .popup-form {
    margin: 50px 20px !important;
  }

  #report-review-container {
    min-width: inherit;
  }

  #drop-btn
    {
    margin-right: 10px;
    }

  #action-btn
    {
    margin-left: 10px;
    }

  .create_button,
  .back_button {
    width: 150px !important;
  }

  #left,
  #right {
    margin: 0px;
    width: 100%;
  }

  .info-box {
    grid-template-columns: 50% 50%;
  }
}

@media screen and (max-width: 690px) {
  .info-text,
  .info-description {
    font-size: 1.6em;
  }

  .create_button,
  .back_button {
    width: 120px !important;
  }
}

@media screen and (max-width: 490px) {
  .popup-form {
    padding: 0px 30px !important;
    margin: 50px 10px !important;
  }
}
</style>
