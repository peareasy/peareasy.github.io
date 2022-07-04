import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  if (!localStorage.getItem("access_token")) {
    return config
  }
  const access_token = JSON.parse(localStorage.getItem("access_token") || '');

  if (config.headers) {
    config.headers["Authorization"] = `Bearer ${access_token}`;
  }

  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = async (error: AxiosError): Promise<AxiosResponse<any>> => {
  if (error.response?.status === 401) {
    const old_refresh_token = JSON.parse(localStorage.getItem("refresh_token") || '');
    const request_to_retry = error.config
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/refresh`, {
    }, {
      headers: {
        "Authorization": `Bearer ${old_refresh_token}`
      }
    }).then(res => {
      const { refresh_token, access_token } = res.data;
      localStorage.setItem("access_token", JSON.stringify(access_token));
      localStorage.setItem("refresh_token", JSON.stringify(refresh_token));
      request_to_retry.headers!['Authorization'] = `Bearer ${access_token}`
      return axios.request(error.config)
      }).catch(async error => {
      console.log("Something went wrong...", error)

      // This means that the refresh token has expired. Should redirect user to login and make sure user is properly logged out
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
      localStorage.removeItem("name")
      localStorage.removeItem("email")
      return Promise.reject(error);
    })
  }
  return Promise.reject(error);
};

export const setupInterceptorsTo = (
  axiosInstance: AxiosInstance
): AxiosInstance => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
};