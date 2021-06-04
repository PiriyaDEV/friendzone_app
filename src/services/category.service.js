import axios from "axios";
import decode from "jwt-decode";
import authHeader from "./auth-header";

const PORT = require("../services/port.config").PORT;
const URL = `${PORT}/api/category/`;

class CategoryService {
  async create(data) {
    return axios
      .post(URL + "create", data, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
  
  async getCategoryList() {
    const res = await axios.get(URL + "getCategoryList");

    var categoryList = res.data;

    await categoryList.forEach((category) => {
      category.icon_white =
        URL + "displayIcon?category_id=" + category.category_id + "&type=white";
      category.icon_black =
        URL + "displayIcon?category_id=" + category.category_id + "&type=black";
      category.status = false;
    });
    return categoryList;
  }

  async getCategoryFromUserID() {
    let userData = decode(localStorage.getItem("user"));
    const res = await axios.get(URL + "getCategoryFromUserID/" + userData.user_id);
    var categoryList = res.data;
    return categoryList;
  }
}

export default new CategoryService();
