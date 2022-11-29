import * as types from '../actions/types';

const initialState = {
    isLoading : false,
    user : [],
    url: []
}

export default function authReducers(state = initialState , action){
    switch(action.type){
        case types.RECIEVED_REGISTER_USER:
            return{...state , user: action.payload}
        case types.FAILURE_REGISTER_USER:
            alert('Введутся технические работы. Попробуйте позже FAILURE_REGISTER_USER')
            return state
        case types.RECIEVED_LOGIN_USER:
            return{...state , user: action.payload}
        case types.FAILURE_LOGIN_USER:
            alert('Введутся технические работы. Попробуйте позже FAILURE_LOGIN_USER')
            return state
        case types.RECIEVED_PAYMENT:
            return{...state , url: action.payload}
        case types.FAILURE_PAYMENT:
            alert('Введутся технические работы. Попробуйте позже FAILURE_PAYMENT')
            return state
        default:
            return state
    }
}