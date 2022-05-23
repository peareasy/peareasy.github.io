import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

export default instance;

export { loginAsAnonymous } from "./publicRequests/loginAsAnonymous";
export { getPlayers } from "./publicRequests/getPlayers";
export { deletePlayers } from "./publicRequests/deletePlayers"
export { deletePlayersUsedInSBCs } from "./publicRequests/deletePlayersUsedInSBC"
export { getSBCs } from "./publicRequests/getSBCs";
export { solveSBC } from "./publicRequests/solveSBC";
export { login } from "./publicRequests/login";
export { signUp } from "./publicRequests/signUp";
export { sendMessage } from "./publicRequests/sendMessage"
export { verifyUser } from "./publicRequests/verifyUser"
