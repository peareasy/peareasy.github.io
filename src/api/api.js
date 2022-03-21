import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

export default instance;

export { loginAsAnonymous } from "./requests/loginAsAnonymous";
export { getPlayers } from "./requests/getPlayers";
export { getSBCs } from "./requests/getSBCs";
export { solveSBC } from "./requests/solveSBC";
export { signIn } from "./requests/signIn";
export { signUp } from "./requests/signUp";
export { sendMessage } from "./requests/sendMessage"
