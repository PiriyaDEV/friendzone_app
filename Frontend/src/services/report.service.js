import axios from "axios";
import decode from "jwt-decode";
import authHeader from "./auth-header";
const PORT = require("../services/port.config").PORT;

const API_URL = `${PORT}/api/report/`;

class ReportService {
  async createReport(report) {
    let userData = decode(localStorage.getItem("user"));
    report.reporter_id = userData.user_id;

    const res = await axios.post(API_URL + "create", report, {
      headers: authHeader()
    });
    return res.data;
  }

  async createType(reportType) {
    const res = await axios.post(API_URL + "createType", reportType, {
      headers: authHeader()
    });

    return res.data;
  }

  async updateType(reportType) {
    const res = await axios.post(API_URL + "updateType", reportType, {
      headers: authHeader()
    });

    return res.data;
  }

  async getReportTypeUserList() {
    const res = await axios
      .get(API_URL + "getReportTypeUserList", { headers: authHeader() })
      .catch(() => {
        return "err";
      });

    return res.data;
  }

  async getReportTypeEventList() {
    const res = await axios
      .get(API_URL + "getReportTypeEventList", { headers: authHeader() })
      .catch(() => {
        return "err";
      });

    return res.data;
  }

  async getReportTypeWebList() {
    const res = await axios
      .get(API_URL + "getReportTypeWebList", { headers: authHeader() })
      .catch(() => {
        return "err";
      });

    return res.data;
  }

  async approveReport(data) {
    let userData = decode(localStorage.getItem("user"));
    const res = await axios.post(
      API_URL + "approveReport",
      {
        admin_id: userData.user_id,
        report_id: data.report_id,
        takeAction: data.takeAction
      },
      {
        headers: authHeader()
      }
    );

    return res.data[0];
  }
}

export default new ReportService();
