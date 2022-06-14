import axios from "axios";
import { setupInterceptorsTo } from "./interceptors";

const private_api = setupInterceptorsTo(
  axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
      "Content-Type": "application/json",
    },
  })
);

export default private_api;

export { logout } from "./privateRequests/logout";
export { getUser } from "./privateRequests/getUser";
export { setNotifyTrue } from "./privateRequests/setNotifyTrue";
export { patchUser } from "./privateRequests/patchUser";