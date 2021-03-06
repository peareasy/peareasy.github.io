import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

export default instance;

export { loginAsAnonymous } from "./publicRequests/loginAsAnonymous";
export { getSBCs } from "./publicRequests/getSBCs";
export { solveSBC } from "./publicRequests/solveSBC";
export { login } from "./publicRequests/login";
export { sendMessage } from "./publicRequests/sendMessage"
export { verifyUser } from "./publicRequests/verifyUser"
