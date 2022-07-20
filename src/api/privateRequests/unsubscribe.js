import axios from "../privateApi";

export const unsubscribe = () => {
  return axios.delete("/payments").then(res => res.data);
};

