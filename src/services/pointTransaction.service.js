import axios from "axios";
import decode from "jwt-decode";


const URL = "http://localhost:8080/api/point/";

class PointTransactionService {
  async getPoint() {
    let userLocal = decode(localStorage.getItem("user"));
    console.log(userLocal);
    const res = await axios.get(URL + "getPoint/" + userLocal.user_id);
    return res.data;
  }
}

export default new PointTransactionService();
