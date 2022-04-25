import axios from "../api"

export const verifyUser = async (uuid) => {
    const response = await axios.get('/users/verify', { headers: { "x-auth-token": uuid } });
    if (response.data) {
        return response.data
    }
    return []
}