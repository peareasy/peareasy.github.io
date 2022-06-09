import axios from "../privateApi";

export const setNotifyTrue = () => axios.patch("users/notify")