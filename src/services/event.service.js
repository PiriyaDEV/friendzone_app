import axios from "axios";
import authHeader from "./auth-header";
import decode from "jwt-decode";
const PORT = require("../services/port.config").PORT;

const API_URL = `${PORT}/api/event/`;

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
          category_id: data.category_id
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
        headers: authHeader()
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

  async findEventByID(event_id) {
    const res = await axios.post(API_URL + "findEventByID", {
      event_id: event_id
    });
    if (res) {
      return res.data;
    }
  }

  async updateInterestEvent(data) {
    let user = decode(localStorage.getItem("user"));
    const res = await axios.post(
      API_URL + "updateInterestEvent",
      {
        user_id: user.user_id,
        event_id: data.event_id,
        interest: data.interest
      },
      {
        headers: authHeader()
      }
    );
    return res.data;
  }

  async joinEvent(event_id) {
    let user = decode(localStorage.getItem("user"));
    const res = await axios.post(
      API_URL + "joinEvent",
      {
        user_id: user.user_id,
        event_id: event_id
      },
      {
        headers: authHeader()
      }
    );
    return res.data;
  }

  async cancelRequest(event_id) {
    let user = decode(localStorage.getItem("user"));
    const res = await axios.post(
      API_URL + "cancelRequest",
      {
        user_id: user.user_id,
        event_id: event_id
      },
      {
        headers: authHeader()
      }
    );
    return res.data;
  }

  async approveRequest(data) {
    const res = await axios.post(API_URL + "approveRequest", data, {
      headers: authHeader()
    });
    return res.data;
  }

  async declineRequest(data) {
    const res = await axios.post(API_URL + "declineRequest", data, {
      headers: authHeader()
    });
    return res.data;
  }

  async addModerator(data) {
    const res = await axios.post(API_URL + "addModerator", data, {
      headers: authHeader()
    });
    return res.data;
  }

  async removeModerator(data) {
    const res = await axios.post(API_URL + "removeModerator", data, {
      headers: authHeader()
    });
    return res.data;
  }

  async getEventGenderList(event_id) {
    const res = await axios.get(API_URL + "getEventGenderList/" + event_id, {
      headers: authHeader()
    });
    return res.data;
  }

  async getEventCategoryList(event_id) {
    const res = await axios.get(API_URL + "getEventCategoryList/" + event_id, {
      headers: authHeader()
    });
    return res.data;
  }

  async getEventParticipantList(event_id) {
    const res = await axios.get(
      API_URL + "getEventParticipantList/" + event_id,
      {
        headers: authHeader()
      }
    );

    await res.data.forEach((participant) => {
      participant.profile_pic =
        `${PORT}/api/user/displayPic/` + participant.user_id;
    });

    return res.data;
  }

  async getParticipantToReview(event_id) {
    let user = decode(localStorage.getItem("user"));
    const res = await axios.get(
      API_URL +
        "getParticipantToReview/?event_id=" +
        event_id +
        "&user_id=" +
        user.user_id,
      {
        headers: authHeader()
      }
    );

    return res.data;
  }

  async submitReviewParticipant(data) {
    let user = decode(localStorage.getItem("user"));
    const res = await axios.post(
      API_URL + "createParticipantReview",
      {
        event_id: data.event_id,
        user_id: user.user_id,
        participant_id: data.participant_id,
        rating: data.rating,
        comment: data.comment
      },
      {
        headers: authHeader()
      }
    );

    return res.data;
  }

  async submitReviewEvent(data) {
    let user = decode(localStorage.getItem("user"));
    const res = await axios.post(
      API_URL + "createEventReview",
      {
        event_id: data.event_id,
        user_id: user.user_id,
        rating: data.rating,
        comment: data.comment
      },
      {
        headers: authHeader()
      }
    );

    return res.data;
  }

  async getHostedEvent() {
    let user = decode(localStorage.getItem("user"));
    const res = await axios.get(API_URL + "getHostedEvent/" + user.user_id, {
      headers: authHeader()
    });

    await res.data.forEach((event) => {
      event.event_pic = API_URL + "displayPic/" + event.event_id;
      event.host_pic =
        `${PORT}/api/user/displayPic/` + user.user_id;

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

    return res.data;
  }

  async getJoinedEvent() {
    let user = decode(localStorage.getItem("user"));
    const res = await axios.get(API_URL + "getJoinedEvent/" + user.user_id, {
      headers: authHeader()
    });

    await res.data.forEach((event) => {
      event.event_pic = API_URL + "displayPic/" + event.event_id;
      event.host_pic =
        `${PORT}/api/user/displayPic/` + event.user_id;

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

    return res.data;
  }

  async getRequestedEvent() {
    let user = decode(localStorage.getItem("user"));
    const res = await axios.get(API_URL + "getRequestedEvent/" + user.user_id, {
      headers: authHeader()
    });

    await res.data.forEach((event) => {
      event.event_pic = API_URL + "displayPic/" + event.event_id;
      event.host_pic =
        `${PORT}/api/user/displayPic/` + event.user_id;

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

    return res.data;
  }

  async getInterestedEvent() {
    let user = decode(localStorage.getItem("user"));
    const res = await axios.get(
      API_URL + "getInterestedEvent/" + user.user_id,
      {
        headers: authHeader()
      }
    );

    await res.data.forEach((event) => {
      event.event_pic = API_URL + "displayPic/" + event.event_id;
      event.host_pic =
        `${PORT}/api/user/displayPic/` + event.user_id;

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

    return res.data;
  }

  async getUserCateogryInterestEvent() {
    let user = decode(localStorage.getItem("user"));
    const res = await axios.get(
      API_URL + "getUserCateogryInterestEvent/" + user.user_id,
      {
        headers: authHeader()
      }
    );

    await res.data.forEach((event) => {
      event.event_pic = API_URL + "displayPic/" + event.event_id;
      event.host_pic =
        `${PORT}/api/user/displayPic/` + event.user_id;

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

    return res.data;
  }

  async getEventByCategory(category_id) {
    let user = decode(localStorage.getItem("user"));
    const res = await axios.get(
      API_URL + "getEventByCategory/" + user.user_id + "/" + category_id,
      {
        headers: authHeader()
      }
    );

    await res.data.forEach((event) => {
      event.event_pic = API_URL + "displayPic/" + event.event_id;
      event.host_pic =
        `${PORT}/api/user/displayPic/` + event.user_id;

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

    return res.data;
  }

  async getApproverList() {
    const res = await axios.get(API_URL + "getApproverList", {
      headers: authHeader()
    });

    await res.data.forEach((event) => {
      event.event_pic = API_URL + "displayPic/" + event.event_id;
      let start_at = new Date(event.start_at);
      let startDate = start_at.getDate();
      let startMonth = start_at.getMonth();
      let startYear = start_at.getFullYear();
      event.date = `${startDate} ${months[startMonth]} ${startYear}`;
    });

    return res.data;
  }

  async getEventCount() {
    const res = await axios.get(API_URL + "getEventCount");
    return res.data;
  }

  async approving(event_id, host_id, approve) {
    let userData = decode(localStorage.getItem("user"));
    let user_id = userData.user_id;
    await axios
      .post(
        API_URL + "approving",
        { event_id, host_id, approve, user_id: user_id },
        {
          headers: authHeader()
        }
      )
      .then((res) => {
        return res.data;
      });
  }

  async deleteEvent(event_id) {
    await axios
      .post(
        API_URL + "deleteEvent",
        { event_id: event_id },
        {
          headers: authHeader()
        }
      )
      .then((res) => {
        return res.data;
      });
  }

  async endEvent(event_id) {
    await axios
      .post(
        API_URL + "endEvent",
        { event_id: event_id, end_at: new Date().getTime() },
        {
          headers: authHeader()
        }
      )
      .then((res) => {
        return res.data;
      });
  }
}

export default new EventService();
