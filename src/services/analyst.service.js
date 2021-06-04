import axios from "axios";
const PORT = require("../services/port.config").PORT;

const API_URL = `${PORT}/api/analyst/`;
const CAT_URL = `${PORT}/api/category/`;

class AnalystService {
  async getAppSummary() {
    const res = await axios.get(API_URL + "getAppSummary").catch(() => {
      return "err";
    });

    return res.data;
  }

  async getEventSummary() {
    const res = await axios.get(API_URL + "getEventSummary").catch(() => {
      return "err";
    });

    return res.data;
  }

  async getEventCategorySummary() {
    const res = await axios.get(API_URL + "getEventCategorySummary").catch(() => {
      return "err";
    });

    var categoryList = res.data;

    await categoryList.forEach((category) => {
      category.icon_white =
      CAT_URL + "displayIcon?category_id=" + category.category_id + "&type=white";
    });

    return categoryList;
  }

  async getUserSummary() {
    const res = await axios.get(API_URL + "getUserSummary").catch(() => {
      return "err";
    });

    return res.data;
  }

  async getUserHistorySummary() {
    const res = await axios.get(API_URL + "getUserHistorySummary").catch(() => {
      return "err";
    });

    return res.data;
  }

  async getDiscountSummary() {
    const res = await axios.get(API_URL + "getDiscountSummary").catch(() => {
      return "err";
    });

    return res.data;
  }

  async getReportSummary() {
    const res = await axios.get(API_URL + "getReportSummary").catch(() => {
      return "err";
    });

    return res.data;
  }

  async getReportTypeSummary() {
    const res = await axios.get(API_URL + "getReportTypeSummary").catch(() => {
      return "err";
    });

    return res.data;
  }
}

export default new AnalystService();

