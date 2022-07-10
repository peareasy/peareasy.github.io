import axios from "../publicApi"

export const solveSBC = (sbc, uuid) => {
  let headers
  if (uuid) {
    headers = {
      "x-auth-token": uuid
    }
  }
  return axios.post('/sbcs', {
    id: sbc,
    useImportedPlayers: true
  }, {
    headers
  }).then(response => {
    if (response.data) {
      return response.data
    }
    return []
  })
}
