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

  async updateInterestEvent(data) {
    let user = decode(localStorage.getItem("user"));
    const res = await axios.post(API_URL + "updateInterestEvent",
      {
      user_id: user.user_id,
      event_id: data.event_id,
      interest: data.interest
      }, 
      {
        headers: authHeader(),
      }
    );
    return res.data;
  }

  async getHostedEvent() {
    let user = decode(localStorage.getItem("user"));
    const res = await axios.get(API_URL + "getHostedEvent/" + user.user_id, {
      headers: authHeader(),
    });
    res.data.forEach(event => {
      event.event_pic = API_URL + "displayPic/" + event.event_id;
      event.host_pic = "http://localhost:8080/api/user/displayPic/" + user.user_id;
    });
    return res.data;
  }

  async getJoinedEvent() {
    let user = decode(localStorage.getItem("user"));
    const res = await axios.get(API_URL + "getJoinedEvent/" + user.user_id, {
      headers: authHeader(),
    });
    res.data.forEach(event => {
      event.event_pic = API_URL + "displayPic/" + event.event_id;
      event.host_pic = "http://localhost:8080/api/user/displayPic/" + event.user_id;
    });
    return res.data;
  }

  async getRequestedEvent() {
    let user = decode(localStorage.getItem("user"));
    const res = await axios.get(API_URL + "getRequestedEvent/" + user.user_id, {
      headers: authHeader(),
    });
    res.data.forEach(event => {
      event.event_pic = API_URL + "displayPic/" + event.event_id;
      event.host_pic = "http://localhost:8080/api/user/displayPic/" + event.user_id;
    });
    return res.data;
  }

  async getInterestedEvent() {
    let user = decode(localStorage.getItem("user"));
    const res = await axios.get(API_URL + "getInterestedEvent/" + user.user_id, {
      headers: authHeader(),
    });
    res.data.forEach(event => {
      event.event_pic = API_URL + "displayPic/" + event.event_id;
      event.host_pic = "http://localhost:8080/api/user/displayPic/" + event.user_id;
    });
    return res.data;
  }
}
export default new EventService();
