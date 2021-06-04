import axios from "axios";
const PORT = require("../services/port.config").PORT;

const URL = `${PORT}/api/gender/`;

class GenderService {
  async getGenderList() {
    const res = await axios.get(URL + "getGenderList");
    return res.data;
  }
}

export default new GenderService();
