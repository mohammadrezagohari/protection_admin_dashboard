import axios from "axios";

const apiClient = axios.create({
    // baseURL: 'http://localhost/backend-pationt/api/',
    // baseURL: 'http://127.0.0.1:8000/api/',
    baseURL: 'https://backend-pationt.test/api/',
    // baseURL: "https://product.gandom.link/api/",
    //   baseURL: baseUrl,
});

export default apiClient;
