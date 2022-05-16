import axios from "../api"

export const testRequest = () => {
  return axios.post('/auth/test', {},{
      withCredentials: true,
  })
}