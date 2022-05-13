import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

export default instance;

export { createCheckoutSession } from "./requests/createCheckoutSession";
export { loginAsAnonymous } from "./requests/loginAsAnonymous";
export { getPlayers } from "./requests/getPlayers";
export { deletePlayers } from "./requests/deletePlayers"
export { deletePlayersUsedInSBCs } from "./requests/deletePlayersUsedInSBC"
export { getSBCs } from "./requests/getSBCs";
export { makePayment } from "./requests/makePayment";
export { solveSBC } from "./requests/solveSBC";
export { signIn } from "./requests/signIn";
export { signUp } from "./requests/signUp";
export { sendMessage } from "./requests/sendMessage"
export { verifyUser } from "./requests/verifyUser"
