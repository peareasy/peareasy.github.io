import axios from "../privateApi";

export const deletePlayersUsedInSBCs = (uuid, players) => {
  axios.delete("/players/user",{
      headers: {"x-auth-token": uuid}, data: {
      players
  }}).then(r => r)
};