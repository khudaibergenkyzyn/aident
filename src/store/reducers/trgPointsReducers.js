import * as types from '../actions/types';

const initialState = {
    isLoading : false,
    aiPoints : [],
    delineation:{}
}

export default function trgPointsReducers(state = initialState , action){
    switch(action.type){
        case types.RECIEVED_GET_TRG_POINTS_AI:
            console.log(action.payload);
            return{...state , aiPoints: action.payload}
        case types.FAILURE_GET_TRG_POINTS_AI:
            alert('Введутся технические работы. Попробуйте позже')
            return state
        case types.RECIEVED_GET_DELINEATION_IMG:
            return{...state , delineation: action.payload}
        case types.FAILURE_GET_DELINEATION_IMG:
            alert('Введутся технические работы. Попробуйте позже')
            return state
        default:
            return state
    }
}