import axios from "axios";
import decode from "jwt-decode";
import authHeader from "./auth-header";
const PORT = require("../services/port.config").PORT;

const API_URL = `${PORT}/api/eventInvited/`;
const USER_API_URL = `${PORT}/api/user/`;
const EVENT_API_URL = `${PORT}/api/event/`;

class ReportService {
  async createInvite(invite) {
    const res = await axios.post(API_URL + "create", invite, {
      headers: authHeader()
    });
    return res.data;
  }

  async acceptedInvited(event_invited_id) {
    const res = await axios.post(
      API_URL + "acceptedInvited",
      {
        event_invited_id: event_invited_id
      },
      {
        headers: authHeader()
      }
    );

    return res.data;
  }

  async declinedInvited(event_invited_id) {
    const res = await axios.post(
      API_URL + "declinedInvited",
      {
        event_invited_id: event_invited_id
      },
      {
        headers: authHeader()
      }
    );

    return res.data;
  }

  async getNotification() {
    let user = decode(localStorage.getItem("user"));
    const res = await axios
      .get(API_URL + "getNotification/" + user.user_id,  { headers: authHeader() })
      .catch(() => {
        return "err";
      });

    await res.data.forEach((item) => {
      if (item.type == "inviteRequest")
        item.pic = USER_API_URL + "displayPic/" + item.user_id;
      else if (item.type == "accept")
        item.pic = EVENT_API_URL + "displayPic/" + item.event_id;
      else if (item.type == "eventRequest")
        item.pic = USER_API_URL + "displayPic/" + item.user_id;
      else if (item.type == "eventApproval")
        item.pic = EVENT_API_URL + "displayPic/" + item.event_id;
    });

    return res.data;
  }
}

export default new ReportService();
