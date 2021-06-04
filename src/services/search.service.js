import axios from "axios";
import decode from "jwt-decode";
import authHeader from "./auth-header";
const PORT = require("../services/port.config").PORT;
const API_URL = `${PORT}/api/search`;

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

class SearchService {
  getSearchUserToInvite(search, event_id) {
    let userData = decode(localStorage.getItem("user"));
    return axios
      .get(
        `${API_URL}/userToInvite?keyword=${search}&user_id=${userData.user_id}&event_id=${event_id}`
        ,  { headers: authHeader() })
      .then((response) => {
        response.data.forEach((user) => {
          user.profile_pic = `${PORT}/api/user/displayPic/` + user.user_id;
        });
        return response.data;
      });
  }

  getSearchUser(search) {
    let userData = decode(localStorage.getItem("user"));
    return axios
      .get(`${API_URL}/user?keyword=${search}&user_id=${userData.user_id}`,  { headers: authHeader() })
      .then((response) => {
        response.data.forEach((user) => {
          user.profile_pic = `${PORT}/api/user/displayPic/` + user.user_id;
        });
        return response.data;
      });
  }

  getSearchEvent(search) {
    let userData = decode(localStorage.getItem("user"));
    return axios
      .get(`${API_URL}/event?keyword=${search}&user_id=${userData.user_id}`,  { headers: authHeader() })
      .then((response) => {
        response.data.forEach((event) => {
          event.event_pic = `${PORT}/api/event/displayPic/` + event.event_id;
          event.host_pic = `${PORT}/api/user/displayPic/` + event.user_id;

          let start_at = new Date(event.start_at);
          let end_at = new Date(event.end_at);
          let startDate = start_at.getDate();
          let startMonth = start_at.getMonth();
          let startYear = start_at.getFullYear();
          let endDate = end_at.getDate();
          let endMonth = end_at.getMonth();
          let endYear = end_at.getFullYear();
          if (
            startDate == endDate &&
            startMonth == endMonth &&
            startYear == endYear
          )
            event.date = `${startDate} ${months[startMonth]} ${startYear}`;
          else
            event.date = `${startDate} ${months[startMonth]} ${startYear} - ${endDate} ${months[endMonth]} ${endYear}`;
        });
        return response.data;
      });
  }

  async getSearchDiscount(search) {
    const res = await axios
      .get(`${API_URL}/discount?keyword=${search}`,  { headers: authHeader() })
      .catch(() => {
        return "err";
      });
    await res.data.forEach((discount) => {
      discount.discount_pic =
        `${PORT}/api/discount/displayPic/` + discount.discount_id;

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
}

export default new SearchService();
