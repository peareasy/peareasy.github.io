import axios from "../publicApi"

export const solveSBC = (sbc, uuid, useImportedPlayers) => {
  let headers
  if (uuid) {
    headers = {
      "x-auth-token": uuid
    }
  }
  return axios.post('/sbcs', {
    id: sbc,
    useImportedPlayers
  }, {
    headers
  }).then(response => {
    if (response.data) {
      return response.data
    }
    return []
  })
}
