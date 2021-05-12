import axios from "axios";
import decode from "jwt-decode";

const API_URL = "http://localhost:8080/api/search";

class SearchService {
  getSearchCount(search) {
    let userData = decode(localStorage.getItem("user"));
    return axios.get(`${API_URL}/${search}/${userData.user_id}`).then((response) => {
      return response.data;
    });
  }
  getSearchUser(search) {
    let userData = decode(localStorage.getItem("user"));
    return axios
      .get(`${API_URL}/user/${search}/${userData.user_id}`)
      .then((response) => {
        return response.data;
      });
  }

  getSearchEvent(search) {
    return axios.get(`${API_URL}/event/${search}`).then((response) => {
      return response.data;
    });
  }
}

export default new SearchService();

