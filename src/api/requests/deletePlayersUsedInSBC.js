import axios from "../api";

export const deletePlayersUsedInSBCs = (uuid, players) => {
  const playerIds = players.map(player => player.id)
  axios.delete("/players/user",{
      headers: {"x-auth-token": uuid}, data: {
      players: playerIds
  }}).then(r => r)
};