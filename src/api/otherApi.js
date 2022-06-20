import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_OTHER_BACKEND_URL,
});

export default instance;

export { getSBCSets } from "./publicRequests/getSBCSets";
export { getSBCsWithId } from "./publicRequests/getSBCWithId";
