import axios from "../privateApi";

export const logout = () => {
  // TODO: think about whether client should be logged out on client only if
  // logging out on server is possible or not?

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

