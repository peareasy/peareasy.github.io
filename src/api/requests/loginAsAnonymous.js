import axios from "../api"

export const loginAsAnonymous = () => {
  return axios.post('/users/anon').then(response => {
    let uuid;
    if (response.data) {
      uuid = response.data['uuid']
    }
    return uuid
  })
}