import axios from "../publicApi"

export const solveSBC = (uuid, sbc) => {

  return axios.post('/sbcs', {
    name: sbc
  }, {headers: { "x-auth-token": uuid }}).then(response => {
    if (response.data) {
      return response.data
    }
    return []
  })
}
