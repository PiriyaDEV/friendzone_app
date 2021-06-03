import axios from "axios";
import decode from "jwt-decode";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/discount/";

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

class DiscountService {
  async create(data) {
    return axios
      .post(API_URL + "create", data, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  async editDiscount(discount) {
    const res = await axios.post(API_URL + "editDiscount", discount).catch(() => {
      return "err";
    });

    return res.data;
  }

  async deleteDiscount(discount) {
    const res = await axios.post(API_URL + "deleteDiscount", discount).catch(() => {
      return "err";
    });

    return res.data;
  }

  uploadDiscountPic(formData, discount_id) {
    return axios
      .post(
        API_URL + "uploadDiscountPic?discount_id=" + discount_id,
        formData,
        {
          headers: authHeader()
        }
      )
      .then((response) => {
        console.log("response " + response);
        return response.data;
      })
      .catch(() => {
        // console.log("err" + err)
        return "err";
      });
  }

  async getHotDiscount() {
    let userData = decode(localStorage.getItem("user"));
    const res = await axios.get(API_URL + "getHotDiscount/" + userData.user_id).catch(() => {
      return "err";
    });
    await res.data.forEach((discount) => {
      discount.discount_pic =
        "http://localhost:8080/api/discount/displayPic/" + discount.discount_id;

      let start_at = new Date(discount.period_start);
      let end_at = new Date(discount.period_end);
      let expired = new Date(discount.expired);
      let startDate = start_at.getDate();
      let startMonth = start_at.getMonth();
      let startYear = start_at.getFullYear();
      let startHours = start_at
        .getHours()
        .toString()
        .padStart(2, "0");
      let startMins = start_at
        .getMinutes()
        .toString()
        .padStart(2, "0");
      let endDate = end_at.getDate();
      let endMonth = end_at.getMonth();
      let endYear = end_at.getFullYear();
      let endHours = end_at
        .getHours()
        .toString()
        .padStart(2, "0");
      let endMins = end_at
        .getMinutes()
        .toString()
        .padStart(2, "0");
      let expiredDate = expired.getDate();
      let expiredMonth = expired.getMonth();
      let expiredYear = expired.getFullYear();
      let expiredHours = expired
        .getHours()
        .toString()
        .padStart(2, "0");
      let expiredMins = expired
        .getMinutes()
        .toString()
        .padStart(2, "0");
      discount.period_start = `${startDate} ${months[startMonth]} ${startYear} ${startHours}:${startMins}`;
      discount.period_end = `${endDate} ${months[endMonth]} ${endYear} ${endHours}:${endMins}`;
      discount.expiredText = `${expiredDate} ${months[expiredMonth]} ${expiredYear} ${expiredHours}:${expiredMins}`;
    });
    return res.data;
  }

  async getBrowseDiscount() {
    let userData = decode(localStorage.getItem("user"));
    const res = await axios.get(API_URL + "getBrowseDiscount/" + userData.user_id).catch(() => {
      return "err";
    });
    await res.data.forEach((discount) => {
      discount.discount_pic =
        "http://localhost:8080/api/discount/displayPic/" + discount.discount_id;

      let start_at = new Date(discount.period_start);
      let end_at = new Date(discount.period_end);
      let expired = new Date(discount.expired);
      let startDate = start_at.getDate();
      let startMonth = start_at.getMonth();
      let startYear = start_at.getFullYear();
      let startHours = start_at
        .getHours()
        .toString()
        .padStart(2, "0");
      let startMins = start_at
        .getMinutes()
        .toString()
        .padStart(2, "0");
      let endDate = end_at.getDate();
      let endMonth = end_at.getMonth();
      let endYear = end_at.getFullYear();
      let endHours = end_at
        .getHours()
        .toString()
        .padStart(2, "0");
      let endMins = end_at
        .getMinutes()
        .toString()
        .padStart(2, "0");
      let expiredDate = expired.getDate();
      let expiredMonth = expired.getMonth();
      let expiredYear = expired.getFullYear();
      let expiredHours = expired
        .getHours()
        .toString()
        .padStart(2, "0");
      let expiredMins = expired
        .getMinutes()
        .toString()
        .padStart(2, "0");
      discount.period_start = `${startDate} ${months[startMonth]} ${startYear} ${startHours}:${startMins}`;
      discount.period_end = `${endDate} ${months[endMonth]} ${endYear} ${endHours}:${endMins}`;
      discount.expiredText = `${expiredDate} ${months[expiredMonth]} ${expiredYear} ${expiredHours}:${expiredMins}`;
    });
    return res.data;
  }

  async getMyDiscount() {
    let userData = decode(localStorage.getItem("user"));
    const res = await axios
      .get(API_URL + "getMyDiscount/" + userData.user_id)
      .catch(() => {
        return "err";
      });
    await res.data.forEach((discount) => {
      discount.discount_pic =
        "http://localhost:8080/api/discount/displayPic/" + discount.discount_id;

      let currentTime = new Date().getTime();
      let isExpired = currentTime > discount.expired ? true : false;
      let created_at = new Date(discount.created_at);
      let updated_at = new Date(discount.updated_at);
      let expired = new Date(discount.expired);
      let createDate = created_at.getDate();
      let createMonth = created_at.getMonth();
      let createYear = created_at.getFullYear();
      let createHours = created_at
        .getHours()
        .toString()
        .padStart(2, "0");
      let createMins = created_at
        .getMinutes()
        .toString()
        .padStart(2, "0");
      let updateDate = updated_at.getDate();
      let updateMonth = updated_at.getMonth();
      let updateYear = updated_at.getFullYear();
      let updateHours = updated_at
        .getHours()
        .toString()
        .padStart(2, "0");
      let updateMins = updated_at
        .getMinutes()
        .toString()
        .padStart(2, "0");
      let expiredDate = expired.getDate();
      let expiredMonth = expired.getMonth();
      let expiredYear = expired.getFullYear();
      let expiredHours = expired
        .getHours()
        .toString()
        .padStart(2, "0");
      let expiredMins = expired
        .getMinutes()
        .toString()
        .padStart(2, "0");
      discount.created_at = `${createDate} ${months[createMonth]} ${createYear} ${createHours}:${createMins}`;
      discount.updated_at = `${updateDate} ${months[updateMonth]} ${updateYear} ${updateHours}:${updateMins}`;
      discount.expiredText = `${expiredDate} ${months[expiredMonth]} ${expiredYear} ${expiredHours}:${expiredMins}`;
      discount.isExpired = isExpired;
    });

    return res.data;
  }

  async useDiscount(data) {
    const res = await axios.post(API_URL + "useDiscount", data, {
      headers: authHeader()
    });
    
    let updated_at = new Date(res.data.updated_at);
    let updateDate = updated_at.getDate();
    let updateMonth = updated_at.getMonth();
    let updateYear = updated_at.getFullYear();
    let updateHours = updated_at
      .getHours()
      .toString()
      .padStart(2, "0");
    let updateMins = updated_at
      .getMinutes()
      .toString()
      .padStart(2, "0");
    res.data.updated_at = `${updateDate} ${months[updateMonth]} ${updateYear} ${updateHours}:${updateMins}`;

    return res.data;
  }

  async buyDiscount(data) {
    let userData = decode(localStorage.getItem("user"));
    const res = await axios.post(
      API_URL + "discountTransaction",
      {
        user_id: userData.user_id,
        discount_id: data.discount_id,
        redeem_point: data.redeem_point
      },
      {
        headers: authHeader()
      }
    );
    return res.data;
  }
}
export default new DiscountService();
