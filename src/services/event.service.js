import axios from "axios";
import authHeader from "./auth-header";
import decode from "jwt-decode";

const API_URL = "http://localhost:8080/api/event/";

class EventService {
  create(data) {
    let userData = decode(localStorage.getItem("user"));
    data.event.host_id = userData.user_id;
    return axios
      .post(
        API_URL + "create",
        {
          user_id: userData.user_id,
          role_id: userData.role_id,
          event: data.event,
          gender_id: data.gender_id,
          category_id: data.category_id,
        },
        { headers: authHeader() }
      )
      .then((response) => {

        return response.data;
      });
  }

  uploadEventPic(formData, event_id) {
    return axios
      .post(API_URL + "uploadEventPic?event_id=" + event_id, formData, {
        headers: authHeader(),
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
}
export default new EventService();
