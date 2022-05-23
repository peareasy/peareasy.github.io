import axios from "../privateApi";

export const logout = () => {
  return axios.post("/auth/logout").then(res => {
    if (res.status === 200) {
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
      localStorage.removeItem("name")
      localStorage.removeItem("email")
    }
  }).catch(err => err)
};