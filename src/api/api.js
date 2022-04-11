import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

export default instance;

export { loginAsAnonymous } from "./requests/loginAsAnonymous";
export { getPlayers } from "./requests/getPlayers";
export { deletePlayers } from "./requests/deletePlayers"
export { deletePlayersUsedInSBCs } from "./requests/deletePlayersUsedInSBC"
export { getSBCs } from "./requests/getSBCs";
export { solveSBC } from "./requests/solveSBC";
export { signIn } from "./requests/signIn";
export { signUp } from "./requests/signUp";
export { sendMessage } from "./requests/sendMessage"
