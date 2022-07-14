import axios from "../privateApi";

export const getUser = () => axios.get("users/profile").then(res => {
  return (
    {name: res.data.user.given_name, 
      email: res.data.user.email, 
      platform: res.data.user.platform, 
      subscription: res.data.user.subscription,
      uuid: res.data.user.uuid,
      beta: res.data.user.beta,
      playerCount: res.data.players.playerCount,
      lastImportedAt: res.data.players.lastImportedAt
    })
})