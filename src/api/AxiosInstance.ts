import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3001/api/",
});

//interceptors
axiosInstance.interceptors.request.use(
    (config) => {
        console.log("Request Interceptor", config);
        return config;
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        console.log("Response Interceptor", response);
        return response;
    }
);

export default axiosInstance;

