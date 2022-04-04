import axios from "../api";

export const getPlayers = (uuid) => {
  return axios
    .get("/players", { headers: { "x-auth-token": uuid } })
    .then((response) => {
      return response.data;
    });
};
