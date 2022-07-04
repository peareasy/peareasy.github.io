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
export { getProfile } from "./privateRequests/getProfile";
export { makePayment } from "./privateRequests/makePayment"
export { createCheckoutSession } from "./privateRequests/createCheckoutSession"
export { getUser } from "./privateRequests/getUser";
export { patchUser } from "./privateRequests/patchUser";
