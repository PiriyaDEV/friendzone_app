import decode from "jwt-decode";

class RoleService {
  getRole() {
    let userData = decode(localStorage.getItem("user"));
    this.role = userData.role_id;
  }
}

export default new RoleService();
