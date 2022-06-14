import axios from "../privateApi";

export const patchUser = (data) => axios.patch("users", data)
    .then(res => { return res.data })
    .catch(err => { return err.response.data
})