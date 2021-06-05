import axios from "axios";
import authHeader from "./auth-header";

const PORT = require("../services/port.config").PORT;
const API_URL = `${PORT}/api/admin/`;
const DIS_URL = `${PORT}/api/discount/`;
const USER_URL = `${PORT}/api/user/`;

class AdminService {
  async getReportList() {
    const res = await axios
      .get(API_URL + "getReportList", { headers: authHeader() })
      .catch(() => {
        return "err";
      });

    return res.data;
  }

  async getUserList() {
    const res = await axios
      .get(API_URL + "getUserList", { headers: authHeader() })
      .catch(() => {
        return "err";
      });

    var userList = res.data;

    await userList.forEach((user) => {
      user.profile_pic = USER_URL + "displayPic/" + user.user_id;
    });

    return userList;
  }

  async getDiscountList() {
    const res = await axios
      .get(API_URL + "getDiscountList", { headers: authHeader() })
      .catch(() => {
        return "err";
      });

    var discountList = res.data;

    await discountList.forEach((discount) => {
      discount.discount_pic = DIS_URL + "displayPic/" + discount.discount_id;
    });

    return discountList;
  }

  async searchReport(search) {
    const res = await axios
      .get(`${API_URL}searchReport?keyword=${search}`, {
        headers: authHeader()
      })
      .catch(() => {
        return "err";
      });

    return res.data;
  }

  async searchUser(search) {
    const res = await axios
      .get(`${API_URL}searchUser?keyword=${search}`, { headers: authHeader() })
      .catch(() => {
        return "err";
      });

    var userList = res.data;

    await userList.forEach((user) => {
      user.profile_pic = USER_URL + "displayPic/" + user.user_id;
    });

    return userList;
  }

  async searchDiscount(search) {
    const res = await axios
      .get(`${API_URL}searchDiscount?keyword=${search}`, {
        headers: authHeader()
      })
      .catch(() => {
        return "err";
      });

    var discountList = res.data;

    await discountList.forEach((discount) => {
      discount.discount_pic = DIS_URL + "displayPic/" + discount.discount_id;
    });

    return discountList;
  }
}

export default new AdminService();
