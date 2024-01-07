import axios from "axios";

const BASE_URL = 'http://localhost/task';

const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type" : 'application/json'
    }
});

axiosClient.interceptors.request.use(config => {
    return config;
}, (err) => {
    return Promise.reject(err);
});

axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    console.error("Response Error:", error);
    return Promise.reject(error);
});

export default axiosClient;

