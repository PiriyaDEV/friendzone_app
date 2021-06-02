import axios from "axios";
import decode from "jwt-decode";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/report/";

class ReportService {
  async createReport(report) {
    let userData = decode(localStorage.getItem("user"));
    report.reporter_id = userData.user_id;

    const res = await axios.post(API_URL + "create", report, {
      headers: authHeader()
    });
    return res.data;
  }

  async getReportTypeUserList() {
    const res = await axios.get(API_URL + "getReportTypeUserList").catch(() => {
      return "err";
    });

    return res.data;
  }

  async getReportTypeEventList() {
    const res = await axios
      .get(API_URL + "getReportTypeEventList")
      .catch(() => {
        return "err";
      });

    return res.data;
  }

  async getReportTypeWebList() {
    const res = await axios.get(API_URL + "getReportTypeWebList").catch(() => {
      return "err";
    });

    return res.data;
  }
}

export default new ReportService();
