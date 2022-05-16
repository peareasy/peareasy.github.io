import axios from "../api"

export const signInWithGoogle = (googleData) => {
  // backend automatically sets the token in a http only cookie
  return axios.post('/auth/login', {
    tokenId: googleData.tokenId,
  })
}