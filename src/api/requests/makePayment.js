import axios from "../api"

export const makePayment = (paymentObj) => {
  const { amount, id } = paymentObj;
  return axios.post('/payments', {
      amount: amount,
      id: id
  }).then(response => {
    return response.data
  })
}