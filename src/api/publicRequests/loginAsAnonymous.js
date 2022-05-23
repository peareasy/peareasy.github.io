import axios from "../publicApi"

export const loginAsAnonymous = () => {
  return axios.post('/users/anon').then(response => {
    let uuid;
    if (response.data) {
      uuid = response.data['uuid']
    }
    return uuid
  })
}