import axios from "axios";

const URL = "http://localhost:8080/api/auth/";

class AuthService {
  async login(user) {
    const res = await axios.post(URL + "signin", user);
    if (res.data.token) {
      localStorage.setItem("user", res.data.token, { expires: 1 });
    }
    if (res.data) {
      return res;
    }
  }

  logout() {
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  async register(user) {
    const res = await axios.post(URL + "signup", user);
    if (res.data.token) {
      localStorage.setItem("user", res.data.token, { expires: 1 });
    }
    if (res.data) {
      return res;
    }
  }

  async checkUniqueExists(user) {
    const res = await axios.post(URL + "checkUniqueExists", {
      username: user.username,
      email: user.email,
      phone: user.phone
    });
    if (res) {
      return res.data;
    }
  }
}

export default new AuthService();
