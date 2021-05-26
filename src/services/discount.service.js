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
  create(data) {
    return axios
      .post(API_URL + "create", data, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
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
    const res = await axios
      .get(API_URL + "getHotDiscount")
      .catch(() => {
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
         discount.expired = `${expiredDate} ${months[expiredMonth]} ${expiredYear} ${expiredHours}:${expiredMins}`;

    });
    return res.data;

  }

  async getBrowseDiscount() {
    const res = await axios
      .get(API_URL + "getBrowseDiscount")
      .catch(() => {
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
         discount.expired = `${expiredDate} ${months[expiredMonth]} ${expiredYear} ${expiredHours}:${expiredMins}`;

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
           discount.expired = `${expiredDate} ${months[expiredMonth]} ${expiredYear} ${expiredHours}:${expiredMins}`;
  
      });

    return res.data;

  }
}
export default new DiscountService();
