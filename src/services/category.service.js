import axios from "axios";

const URL = "http://localhost:8080/api/category/";

class CategoryService {
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
}

export default new CategoryService();
