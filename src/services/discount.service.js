import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/discount/";


class DiscountService {
  create(data) {
    return axios
      .post(
        API_URL + "create",
        data,
        { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      });
  }

  uploadDiscountPic(formData, discount_id) {
    return axios
      .post(API_URL + "uploadDiscountPic?discount_id=" + discount_id, formData, {
        headers: authHeader()
      })
      .then((response) => {
        console.log("response " + response);
        return response.data;
      })
      .catch(() => {
        // console.log("err" + err)
        return "err";
      });
  }
}export default new DiscountService();
