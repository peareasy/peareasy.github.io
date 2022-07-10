import axios from "../privateApi";

export const getUser = () => axios.get("users/profile").then(res => {
  return (
    {name: res.data.given_name, 
      email: res.data.email, 
      platform: res.data.platform, 
      paid: res.data.paid,
      uuid: res.data.uuid
    })
})