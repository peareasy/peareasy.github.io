import axios from "../api";

export const deletePlayersUsedInSBCs = (uuid, players) => {
  axios.delete("/players/sbc",{
      headers: {"x-auth-token": uuid}, data: {
      players: players
  }}).then(r => r)
};