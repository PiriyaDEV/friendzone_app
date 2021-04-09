import axios from "axios";
import authHeader from "./auth-header";
import decode from "jwt-decode";

const API_URL = "http://localhost:8080/api/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getModeratorBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }

  getUserData(user) {
    return axios
      .post(
        API_URL + "profile",
        {
          user_id: user.user_id,
        },
        { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      });
  }

  changePassword(id, oldPassword, newPassword) {
    return axios
      .post(
        API_URL + "changePassword",
        {
          id: id,
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      });
  }

  editData(user) {
    return axios
      .post(
        API_URL + "edit",
        {
          username : user.username,
          email : user.email,
          firstname : user.firstname,
          lastname : user.lastname,
          phone : user.phone,
          profile_pic : user.profile_pic,
          bio : user.bio
        },
        { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      });
  }

  uploadProfile(formData) {
    let userData = decode(localStorage.getItem("user"));
    return axios
      .post(API_URL + "uploadPic/img?id=" + userData.id , formData,
      { headers: authHeader() ,'Content-Type': 'multipart/form-data'}
      )
      .then((response) => {
        console.log("response " + response);
        return response.data;
      })
      .catch(() => {
        // console.log("err" + err)
        return "err";
      });
  }

  getPicAndName() {
    let userData = decode(localStorage.getItem("user"));
    return axios
      .get(
        API_URL + "getPicAndName/?user_id=",
        {
          user_id: userData.user_id,
        },
        { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      });
  }
}

export default new UserService();
