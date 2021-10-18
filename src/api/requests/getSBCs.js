import axios from "../api"

export const getSBCs = () => {
  return axios.get('/sbcs').then(response => {
    let sbcs = [];
    if (response.data) {
      sbcs = response.data
    }
    return sbcs
  })
}