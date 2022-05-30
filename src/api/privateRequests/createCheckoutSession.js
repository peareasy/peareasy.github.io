import axios from "../privateApi"

export const createCheckoutSession = (priceId, uuid) => {
  return axios.post('/payments/create-checkout-session', {
      priceId: priceId
  }, {headers: {"x-auth-token": uuid}}).then(response => {
    if(response.data.status === 303){
        window.location.href = response.data.url;
    }
  })
}