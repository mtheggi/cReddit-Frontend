import axios from 'axios';
import { baseUrl } from '../constants';
import { getRequest } from '../services/Requests';

const axiosInterceptor = axios.interceptors.response.use(async (response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refreshTokenResponse = await getRequest(`${baseUrl}/user/refresh-token`);
        if (refreshTokenResponse.status === 200) {
            const res = await axios(originalRequest);
            return res;
        } else {
            return Promise.reject(refreshTokenResponse.data)
        }
    }
    return Promise.reject(error);
});

export default axiosInterceptor;