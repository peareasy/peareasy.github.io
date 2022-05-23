import axios from "../publicApi"

export const sendMessage = (message) => {
  return axios.post('/users/message', message).then(response => {
    let uuid;
    if (response.data) {
      uuid = response.data['uuid']
    }
    return uuid
  })
}