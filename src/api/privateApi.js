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
export { createCheckoutSession } from "./privateRequests/createCheckoutSession"
export { getUser } from "./privateRequests/getUser";
export { patchUser } from "./privateRequests/patchUser";
export { getPlayers } from "./privateRequests/getPlayers";
export { deletePlayers } from "./privateRequests/deletePlayers"
export { deletePlayersUsedInSBCs } from "./privateRequests/deletePlayersUsedInSBC"
export { unsubscribe } from "./privateRequests/unsubscribe"
