import axios from "../api";

export const getPlayers = (uuid) => {
  console.log(uuid);
  return axios
    .get("/players", { headers: { "x-auth-token": uuid } })
    .then((response) => {
      let players = [];
      if (response.data) {
        players = response.data;
      }
      return players;
    });
};
