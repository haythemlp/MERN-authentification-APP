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

export interface IAction {
    payload: any;
    type: string;
}

export interface IData {
    data?: any;
    error?: any;

}

export interface IState {
    createUserApi?: IData;
    loginApi?: IData;
    getCurrentUserApi?: IData;
    loading: boolean

}

const INITIAL_STATE: IState = {
    createUserApi: {},
    loginApi: {},
    getCurrentUserApi: {},
    loading: false,


};

export default (state = INITIAL_STATE, action: IAction): IState => {
    switch (action.type) {

        //create user
        case CREATE_USER:
            return {
                ...state, loading: true
            };
        case CREATE_USER_FAILED:
            return {
                ...state, loading: false, createUserApi: { error: action.payload }
            };
        case CREATE_USER_SUCCESS:
            return {
                ...state, loading: false, createUserApi: { data: action.payload }
            };


        //Login user
        case LOGIN_USER:
            return {
                ...state, loading: true
            };

        case LOGIN_USER_FAILED:
            return {
                ...state, loading: false, loginApi: { error: action.payload }
            };
        case LOGIN_USER_SUCCESS:
            return {
                ...state, loading: false, loginApi: { data: action.payload }
            };

        //Get current user
        case GET_CURRENT_USER:
            return {
                ...state, loading: true
            };
        case GET_CURRENT_USER_FAILED:
            return {
                ...state, loading: false, getCurrentUserApi: { error: action.payload }
            };
        case GET_CURRENT_USER_SUCCESS:
            return {
                ...state, loading: false, getCurrentUserApi: { data: action.payload }
            };



        default:
            return state;
    }
};