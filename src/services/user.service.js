import axios from "axios";
import authHeader from "./auth-header";
import decode from "jwt-decode";
import AuthService from "./auth.service";

const API_URL = "http://localhost:8080/api/user/";

class UserService {
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

  editUser(user) {
    let userLocal = decode(localStorage.getItem("user"));
    console.log(userLocal);
    return axios
      .post(
        API_URL + "editUser",
        {
          user_id: userLocal.user_id,
          username: user.username,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          phone: user.phone,
          bio: user.bio,
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
      .post(API_URL + "uploadPic/img?user_id=" + userData.user_id, formData, {
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

  updateUserCategory(userCategory) {
    let userData = decode(localStorage.getItem("user"));
    return axios
      .post(
        API_URL + "updateUserCategory",
        {
          user_id: userData.user_id,
          category_id: userCategory,
        },
        {
          headers: authHeader(),
        }
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

  async getTopBarInfo() {
    let user = decode(localStorage.getItem("user"));
    let profile_pic = "http://localhost:8080/api/user/displayPic/";
    let res;
    try {
      res = await axios.get(API_URL + "getUsername/" + user.user_id, {
        headers: authHeader(),
      });
    } catch {
      AuthService.logout();
    }
    res.data.profile_pic = profile_pic + user.user_id;
    return res.data;
  }

  async getUserDetail() {
    let user = decode(localStorage.getItem("user"));
    let profile_pic = "http://localhost:8080/api/user/displayPic/";
    const res = await axios.get(API_URL + "getUserDetail/" + user.user_id, {
      headers: authHeader(),
    });
    res.data.profile_pic = profile_pic + user.user_id;
    return res.data;
  }
}

export default new UserService();
