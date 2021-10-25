import axios from "../api"

export const signIn = (email, password) => {
  return axios.post('/users/login', {
    email: email,
    password: password
  }).then(response => {
    let uuid;
    if (response.data) {
      uuid = response.data
    }
    return uuid
  })
}