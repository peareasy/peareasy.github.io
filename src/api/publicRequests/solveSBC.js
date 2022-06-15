import axios from "../publicApi"

export const solveSBC = (sbc, email) => {
  return axios.post('/sbcs', {
    name: sbc,
  }, {
    headers: {
      email: email
    }
  }).then(response => {
    if (response.data) {
      return response.data
    }
    return []
  })
}
