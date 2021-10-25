import axios from "../api"

export const signUp = (email, password) => {
  return axios.post('/users', {
    email: email,
    password: password
  }).then(response => {
    let uuid;
    if (response.data) {
      uuid = response.data['uuid']
    }
    return uuid
  })
}