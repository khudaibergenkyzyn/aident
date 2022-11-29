import * as types from './types';

export function registerUser(data){
    return {type: types.REGISTER_USER , data}
}
export function loginUser(data){
    return {type: types.LOGIN_USER , data}
}

export function payment(){
    return {type: types.PAYMENT }
}


