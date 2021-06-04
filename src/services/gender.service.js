import axios from "axios";
import authHeader from "./auth-header";
const PORT = require("../services/port.config").PORT;

const URL = `${PORT}/api/gender/`;

class GenderService {
  async getGenderList() {
    const res = await axios.get(URL + "getGenderList",  { headers: authHeader() });
    return res.data;
  }
}

export default new GenderService();
