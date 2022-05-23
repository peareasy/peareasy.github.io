import axios from "../publicApi"

export const login = (googleData) => {
  // backend automatically sets the token in a http only cookie
  return axios.post('/auth/login', {
    token: googleData.tokenId,
  }).then(res => {
    localStorage.setItem("access_token", JSON.stringify(res.data['access_token']));
    localStorage.setItem("refresh_token", JSON.stringify(res.data['refresh_token']));
    localStorage.setItem("name", res.data['given_name']);
    localStorage.setItem("email", res.data['email']);
    }
  )
}