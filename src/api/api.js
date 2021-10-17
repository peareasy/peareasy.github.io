import axios from 'axios'

const instance = axios.create({
  baseURL: "http://localhost:3000"
})

export default instance

export { postUUID } from "./requests/postUUID"
export { getPlayers } from "./requests/getPlayers"
export { getSBCs } from "./requests/getSBCs"