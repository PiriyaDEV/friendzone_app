import axios from "axios"

const API_URL = "http://localhost:8080/api/admin/";
const DIS_URL = "http://localhost:8080/api/discount/";
const USER_URL = "http://localhost:8080/api/user/";

class AdminService {
  async getReportList() {
    const res = await axios.get(API_URL + "getReportList").catch(() => {
      return "err";
    });

    return res.data;
  }

  async getUserList() {
    const res = await axios.get(API_URL + "getUserList").catch(() => {
      return "err";
    });

    var userList = res.data;

    await userList.forEach((user) => {
      user.profile_pic =
      USER_URL + "displayPic/" + user.user_id;
    });

    return userList;
  }

  async getDiscountList() {
    const res = await axios.get(API_URL + "getDiscountList").catch(() => {
      return "err";
    });

    var discountList = res.data;

    await discountList.forEach((discount) => {
      discount.discount_pic =
      DIS_URL + "displayPic/" + discount.discount_id;
    });

    return discountList;
  }

  async searchReport(search) {
    const res = await axios.get(`${API_URL}/searchReport?keyword=${search}`).catch(() => {
      return "err";
    });

    return res.data;
  }

  
  async searchUser(search) {
    const res = await axios.get(`${API_URL}/searchUser?keyword=${search}`).catch(() => {
      return "err";
    });

    var userList = res.data;

    await userList.forEach((user) => {
      user.profile_pic =
      USER_URL + "displayPic/" + user.user_id;
    });

    return userList;
  }

  async searchDiscount(search) {
    const res = await axios.get(`${API_URL}/searchDiscount?keyword=${search}`).catch(() => {
      return "err";
    });

    var userList = res.data;

    await userList.forEach((user) => {
      user.profile_pic =
      USER_URL + "displayPic/" + user.user_id;
    });

    return userList;
  }
  

}

export default new AdminService();