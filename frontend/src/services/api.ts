import axios from "../utils/axios";

export interface TRegisterBodyRequest {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export interface TLoginBodyRequest {
    email: string;
    password: string;
}

export const register = (registerBodyRequest: TRegisterBodyRequest) => {
    return axios.post(`auth/register`, registerBodyRequest)
}

export const login = (loginBodyRequest: TLoginBodyRequest) => {
    return axios.post(`auth/login`, loginBodyRequest)
}

export const refreshToken = () => {
    return axios.post(`auth/refresh`)
}
export const me = () => {
    return axios.get(`auth/me`)
}