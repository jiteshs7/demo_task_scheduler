import axios from "axios";
import { BASE_URL } from "../shared/Constants";
import { fetchUserData, removeUserData } from "../utility/storage";

const port = "8080";
const domain = "http://localhost";
let baseURL = null;

baseURL = `${domain}:${port}`;

const apiClient = axios.create({
  baseURL,
});

apiClient.interceptors.request.use((config) => {
  const data = fetchUserData();

  const jwt = data ? data.token : "";

  config.headers["content-type"] = "application/json";
  if (jwt) {
    config.headers["access-token"] = `Bearer: ${jwt}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  function (response) {
    //console.log('RESPONSE: ', response.config.url, response.data);
    return response;
  },
  function (error) {
    console.log("ERROR", error);
    if (
      error?.response?.data?.statusCode === 401 ||
      error?.response?.status === 401
    ) {
      // handleLogout();
    } else {
      if (error?.response?.data?.message || error?.data?.message) {
        console.log(
          "Api error",
          error?.response?.data?.message || error?.data?.message
        );
      } else {
      }
    }

    return Promise.reject(error.response);
  }
);

const handleLogout = () => {
  removeUserData();
  window.location.reload();
};

export { apiClient as default };
