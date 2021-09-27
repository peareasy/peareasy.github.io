import axios from "../api"

export const postUUID = () => {
  return axios.post('/users').then(response => {
    let uuid;
    if (response.data) {
        uuid = response.data['uuid']
      }
    return uuid
  })
}