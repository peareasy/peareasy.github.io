import axios from "../publicApi"

export const solveSBC = (sbc, email) => {
  let headers
  if (email) {
    headers = {
      email: email
    }
  }
  return axios.post('/sbcs', {
    name: sbc,
  }, {
    headers
  }).then(response => {
    if (response.data) {
      return response.data
    }
    return []
  })
}
