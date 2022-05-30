import axios from "../privateApi";

export const getProfile = () => {
  return axios.get("users/profile").then(res => res.data)
};