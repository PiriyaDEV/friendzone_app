export default function authHeader() {
  let token = localStorage.getItem("user");

  if (token) {
    return { "x-access-token": token };
  } else {
    return {};
  }
}
