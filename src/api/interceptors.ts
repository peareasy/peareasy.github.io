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

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  if (error.response?.status === 401) {
    const old_refresh_token = JSON.parse(localStorage.getItem("refresh_token") || '');
    try {
      const rs = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/refresh`, {
      }, {
        headers: {
          "Authorization": `Bearer ${old_refresh_token}`
        }
      });

      const { refresh_token, access_token } = rs.data;

      localStorage.setItem("refresh_token", JSON.stringify(refresh_token));
      localStorage.setItem("access_token", JSON.stringify(access_token));

    } catch (_error) {
      return Promise.reject(_error);
    }
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