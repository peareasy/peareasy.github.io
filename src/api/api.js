import axios from 'axios'

const instance = axios.create({
  baseURL: "https://5fmhq2i8rp.eu-west-1.awsapprunner.com"
})

export default instance

export { postUUID } from "./requests/postUUID"
export { getPlayers } from "./requests/getPlayers"
export { getSBCs } from "./requests/getSBCs"
export { solveSBC } from "./requests/solveSBC"