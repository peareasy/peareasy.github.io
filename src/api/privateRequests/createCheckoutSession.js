import axios from "../privateApi"

export const createCheckoutSession = (priceId) => {
  return axios.post('/payments/create-checkout-session', {
      priceId: priceId
  }).then(response => {
    if(response.data.status === 303){
        window.location.href = response.data.url;
    }
  })
}