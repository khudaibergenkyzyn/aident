import * as types from './types';

export function getTrgPointsAI(data){
    return {type: types.GET_TRG_POINTS_AI , data}
}
export function getDelineationImg(data){
    return {type: types.GET_DELINEATION_IMG , data}
}

// export function loginUser(data){
//     return {type: types.LOGIN_USER , data}
// }

// export function payment(){
//     return {type: types.PAYMENT }
// }


