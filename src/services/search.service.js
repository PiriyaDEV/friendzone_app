import axios from "axios";
import decode from "jwt-decode";

const API_URL = "http://localhost:8080/api/search";

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

class SearchService {
  getSearchUser(search) {
    let userData = decode(localStorage.getItem("user"));
    return axios
      .get(`${API_URL}/user?keyword=${search}&user_id=${userData.user_id}`)
      .then((response) => {
        return response.data;
      });
  }

  getSearchEvent(search) {
    let userData = decode(localStorage.getItem("user"));
    return axios.get(`${API_URL}/event?keyword=${search}&user_id=${userData.user_id}`).then((response) => {
      response.data.forEach((event) => {
        event.event_pic = "http://localhost:8080/api/event/displayPic/" + event.event_id;
        event.host_pic =
          "http://localhost:8080/api/user/displayPic/" + event.user_id;
  
        let start_at = new Date(event.start_at);
        let end_at = new Date(event.end_at);
        let startDate = start_at.getDate();
        let startMonth = start_at.getMonth();
        let startYear = start_at.getFullYear();
        let endDate = end_at.getDate();
        let endMonth = end_at.getMonth();
        let endYear = end_at.getFullYear();
        if (
          startDate == endDate &&
          startMonth == endMonth &&
          startYear == endYear
        )
          event.date = `${startDate} ${months[startMonth]} ${startYear}`;
        else
          event.date = `${startDate} ${months[startMonth]} ${startYear} - ${endDate} ${months[endMonth]} ${endYear}`;
      });
      return response.data;
    });
  }
}

export default new SearchService();
