import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://ophim1.com/v1/api/",
    headers: {
        "Accept": "application/json"
    },
    timeout: 10000,
})

export default apiClient;