import axios from "axios";
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

  async update(data) {
    return axios
      .post(URL + "update", data, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  async uploadCategoryIcon(formData, category_id, color) {
    return await axios
      .post(
        URL +
          "uploadCategoryIcon?category_id=" +
          category_id +
          "&type=" +
          color,
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

  async getCategoryList() {
    const res = await axios.get(URL + "getCategoryList", {
      headers: authHeader()
    });

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

  async getCategoryFromUserID(user_id) {
    const res = await axios.get(URL + "getCategoryFromUserID/" + user_id, {
      headers: authHeader()
    });

    return res.data;
  }
}

export default new CategoryService();
