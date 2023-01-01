import axios from 'axios';

const baseURL = 'http://localhost:8080'

const instance = axios.create({
    baseURL,
});

const getAccessToken = (): string => {
    return localStorage.getItem('accessToken') || ''

}
const getRefreshToken = (): string => {
    return localStorage.getItem('refreshToken') || ''

}


instance.interceptors.request.use(
    function (config) {
        config.headers = config.headers ?? {};
        const token = getAccessToken();
        if (token && config) {
            config.headers["x-auth-token"] = token;
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error.response);
    },
);
instance.interceptors.response.use(
    function (res) {
        // Do something before request is sent
        return res.data;
    },
    async function (error) {
        const originalConfig = error.config;

        if (error.response.status === 401 && !originalConfig._retry) {

            originalConfig._retry = true;
            try {
                const rs = await axios.post(`${baseURL}/auth/refresh`, {}, {
                    headers: { 'x-auth-token': getRefreshToken() }
                });
                const { accessToken, refreshToken } = rs.data;
                window.localStorage.setItem("accessToken", accessToken);
                window.localStorage.setItem("refreshToken", refreshToken);

                return instance(originalConfig);
            } catch (_error: any) {

                localStorage.clear();
                if (_error.response && _error.response.data) {
                    return Promise.reject(_error.response.data);
                }

                return Promise.reject(_error);
            }
        }

        // Do something with request error
        return Promise.reject(error.response);
    },
);

// Alter defaults after instance has been created

export default instance;
