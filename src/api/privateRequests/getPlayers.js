import axios from "../publicApi";

export const getPlayers = (uuid) => {
  return axios
    .get("/players", { headers: { "x-auth-token": uuid } })
    .then((response) => {
      console.log("response.data: ", response.data)
      return response.data;
    });
};
