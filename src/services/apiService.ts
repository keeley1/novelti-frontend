// this api service can be used by books api service
import axios from "axios";

const apiBaseUrl = "http://localhost:8080"

export function apiService() {
    return axios.create({
        baseURL: apiBaseUrl,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};