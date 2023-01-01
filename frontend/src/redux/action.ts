
import {
  CREATE_USER,
  CREATE_USER_FAILED,
  CREATE_USER_SUCCESS,
  GET_CURRENT_USER,
  GET_CURRENT_USER_FAILED,
  GET_CURRENT_USER_SUCCESS,
  LOGIN_USER,
  LOGIN_USER_FAILED,
  LOGIN_USER_SUCCESS,
} from './type';


import { register, TRegisterBodyRequest, login, me, refreshToken, TLoginBodyRequest } from '../services/api'


export const createUser = (registerBodyRequest: TRegisterBodyRequest, callbackSuccess: any, callbackFailed: any) => {
  return (dispatch: any) => {
    dispatch({ type: CREATE_USER });
    register(registerBodyRequest)
      .then(res => {
        dispatch({ type: CREATE_USER_SUCCESS, payload: res });
        callbackSuccess(res);
      })
      .catch(err => {
        dispatch({ type: CREATE_USER_FAILED, payload: err });
        callbackFailed(err);
      });
  };
};

export const loginUser = (loginBodyRequest: TLoginBodyRequest, callbackSuccess: any, callbackFailed: any) => {
  return (dispatch: any) => {
    dispatch({ type: LOGIN_USER });
    login(loginBodyRequest)
      .then((res:any) => {
        localStorage.setItem('accessToken', res?.accessToken)
        localStorage.setItem('refreshToken', res?.refreshToken)
        dispatch({ type: LOGIN_USER_SUCCESS, payload: res });
        callbackSuccess(res);
      })
      .catch(err => {
        dispatch({ type: LOGIN_USER_FAILED, payload: err });
        callbackFailed(err);
      });
  };
};
export const getCurrentUser = (callbackSuccess: any, callbackFailed: any) => {
  return (dispatch: any) => {
    dispatch({ type: GET_CURRENT_USER });
    me()
      .then(res => {
        dispatch({ type: GET_CURRENT_USER_SUCCESS, payload: res });
        callbackSuccess(res);
      })
      .catch(err => {
        dispatch({ type: GET_CURRENT_USER_FAILED, payload: err });
        callbackFailed(err);
      });
  };
};