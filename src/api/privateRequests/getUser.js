import axios from "../privateApi";

export const getUser = () => axios.get("users/profile").then(res => {
  return (
    {name: res.data.given_name, 
      email: res.data.email, 
      platform: res.data.platform, 
      subscription: res.data.subscription,
      uuid: res.data.uuid
    })
})