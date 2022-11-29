import * as types from '../actions/types';

const initialState = {
    isLoading : false,
    types : [],
}

export default function analyzeTypesReducers(state = initialState , action){
    switch(action.type){
        case types.RECIEVED_GET_ALL_ANALYZE_TYPES:
            return{...state , types: action.payload}
        case types.FAILURE_GET_ALL_ANALYZE_TYPESE:
            alert('Введутся технические работы. Попробуйте позже FAILURE_GET_ALL_ANALYZE_TYPESE')
            return state
        default:
            return state
    }
}