import axios from "axios";
import decode from "jwt-decode";

const URL = "http://localhost:8080/api/point/";

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

class PointTransactionService {
  async getPoint() {
    let userLocal = decode(localStorage.getItem("user"));
    const res = await axios.get(URL + "getPoint/" + userLocal.user_id);
    return res.data;
  }

  async getPointLog() {
    let userLocal = decode(localStorage.getItem("user"));
    const res = await axios.get(URL + "getPointLog/" + userLocal.user_id);

    await res.data.forEach((point) => {
      let created_at = new Date(point.created_at);
      let startDate = created_at.getDate();
      let startMonth = created_at.getMonth();
      let startYear = created_at.getFullYear();
      point.date = `${startDate} ${months[startMonth]} ${startYear}`;
    });
    return res.data;
  }
}

export default new PointTransactionService();
