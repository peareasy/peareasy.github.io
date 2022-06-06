import axios from "../publicApi"

export const solveSBC = (sbc) => {
  return axios.post('/sbcs', {
    name: sbc
  }).then(response => {
    if (response.data) {
      return response.data
    }
    return []
  })
}
