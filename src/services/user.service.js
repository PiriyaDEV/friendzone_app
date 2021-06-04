import axios from "axios";
import authHeader from "./auth-header";
import decode from "jwt-decode";
import AuthService from "./auth.service";
const PORT = require("../services/port.config").PORT;

const API_URL = `${PORT}/api/user/`;

class UserService {
  async changePassword(data) {
    let userData = decode(localStorage.getItem("user"));
    let res = await axios.post(
      API_URL + "changePassword",
      {
        user_id: userData.user_id,
        oldPassword: data.oldPassword,
        newPassword: data.newPassword
      },
      {
        headers: authHeader()
      }
    );

    return await res.data;
  }

  async editUser(user, isAdmin) {
    let userLocal = decode(localStorage.getItem("user"));
    let user_id = "";
    if (isAdmin) {
      user_id = user.user_id;
    } else {
      user_id = userLocal.user_id;
    }
    return await axios
      .post(
        API_URL + "editUser",
        {
          user_id: user_id,
          username: user.username,
          email: user.email,
          birthdate: user.birthdate,
          firstname: user.firstname,
          lastname: user.lastname,
          phone: user.phone,
          bio: user.bio,
          gender_id: user.gender_id,
          role_id: user.role_id,
          status_id: user.status_id
        },
        { headers: authHeader() }
      )
      .then((res) => {
        if (res.data.token && user_id == userLocal.user_id) {
          localStorage.setItem("user", res.data.token, { expires: 1 });
        }

        return res.data;
      });
  }

  uploadProfile(formData, user_id) {
    return axios
      .post(API_URL + "uploadPic/img?user_id=" + user_id, formData, {
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

  updateUserCategory(categoryInterest) {
    let userData = decode(localStorage.getItem("user"));
    return axios
      .post(
        API_URL + "updateUserCategory",
        {
          user_id: userData.user_id,
          categoryInterest: categoryInterest
        },
        {
          headers: authHeader()
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
    let res;
    try {
      res = await axios.get(API_URL + "getUsername/" + user.user_id, {
        headers: authHeader()
      });
    } catch {
      AuthService.logout();
    }
    res.data.profile_pic = API_URL + "displayPic/" + user.user_id;
    return res.data;
  }

  async getUserDetail() {
    let user = decode(localStorage.getItem("user"));
    const res = await axios.get(API_URL + "getUserDetail/" + user.user_id, {
      headers: authHeader()
    });
    res.data.profile_pic = API_URL + "displayPic/" + user.user_id;
    return res.data;
  }

  async findByUsername(username) {
    const res = await axios.post(
      API_URL + "findByUsername",
      { username: username },
      {
        headers: authHeader()
      }
    );

    return res.data;
  }

  async following(following_id) {
    let user = decode(localStorage.getItem("user"));
    const res = await axios.post(API_URL + "following/", {
      follower_id: user.user_id,
      following_id: following_id
    });

    return await res.data;
  }

  async unFollowing(following_id) {
    let user = decode(localStorage.getItem("user"));
    const res = await axios.post(API_URL + "unfollowing/", {
      follower_id: user.user_id,
      following_id: following_id
    });

    return await res.data;
  }
}

export default new UserService();
