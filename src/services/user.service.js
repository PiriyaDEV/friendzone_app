import axios from "axios";
import authHeader from "./auth-header";
import decode from "jwt-decode";
import AuthService from "./auth.service";

const API_URL = "http://localhost:8080/api/user/";

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
          bio: user.bio
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
