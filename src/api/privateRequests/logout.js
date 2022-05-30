import axios from "../privateApi";

export const logout = () => {
  return axios.post("/auth/logout").then(_ => {
    removeUserFromLocalStorage()
    }
  ).catch(_ => {
    removeUserFromLocalStorage()
    }
  )
};

const removeUserFromLocalStorage = () => {
  localStorage.removeItem("access_token")
  localStorage.removeItem("refresh_token")
  localStorage.removeItem("name")
  localStorage.removeItem("email")
}

