import axios from "axios";
const PORT = require("../services/port.config").PORT;

export default axios.create({
  baseURL: `${PORT}/api`,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
});
