import axios from "../publicApi"

export const getSBCs = () => {
  return axios.get('/sbcs').then(response => {
    let sbcs = [];
    if (response.data) {
      sbcs = response.data
    }
    return sbcs
  })
}