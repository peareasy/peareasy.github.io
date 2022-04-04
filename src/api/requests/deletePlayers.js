import axios from "../api";

export const deletePlayers = (uuid) => {
  axios.delete("/players", {headers: {"x-auth-token": uuid}}).then(r => r)
};