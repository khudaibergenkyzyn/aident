import * as types from '../actions/types';

const initialState = {
    isLoading : false,
    allCases : [],
    caseImg: '',
    caseInfo:{},
    deleteRes : ''
}

export default function casesReducers(state = initialState , action){
    switch(action.type){
        case types.RECIEVED_GET_USER_CASES:
            return{...state , allCases: action.payload}
        case types.FAILURE_GET_USER_CASES:
            alert('Введутся технические работы. Попробуйте позже FAILURE_GET_USER_CASES')
            return state
        case types.RECIEVED_GET_CASE:
            return{...state , caseInfo: action.payload}
        case types.FAILURE_GET_CASE:
            alert('Введутся технические работы. Попробуйте позже FAILURE_GET_CASE')
            return state
        case types.RECIEVED_CREATE_CASE:
            return{...state , caseInfo: action.payload}
        case types.FAILURE_CREATE_CASE:
            alert('Введутся технические работы. Попробуйте позже FAILURE_CREATE_CASE')
            return state
        case types.RECIEVED_UPLOAD_CASE_IMAGE:
            return{...state , caseImg: action.payload}
        case types.FAILURE_UPLOAD_CASE_IMAGE:
            alert('Введутся технические работы. Попробуйте позже FAILURE_UPLOAD_CASE_IMAGE')
            return state
        case types.RECIEVED_GET_CASE_IMAGE:
            return{...state , caseImg: action.payload}
        case types.FAILURE_GET_CASE_IMAGE:
            alert('Введутся технические работы. Попробуйте позже FAILURE_GET_CASE_IMAGE')
            return{...state , caseImg: {}}
        case types.RECIEVED_CALIBRATEE:
            return{...state}
        case types.FAILURE_CALIBRATE:
            alert('Введутся технические работы. Попробуйте позже FAILURE_CALIBRATE')
            return state
        case types.RECIEVED_UPDATE_CASE:
            return{...state , caseInfo: action.payload}
        case types.FAILURE_UPDATE_CASE:
            alert('Введутся технические работы. Попробуйте позже FAILURE_UPDATE_CASE')
            return state
        case types.RECIEVED_DELETE_CASE:
            return{...state , allCases: action.payload}
        case types.FAILURE_DELETE_CASE:
            alert('Введутся технические работы. Попробуйте позже FAILURE_DELETE_CASE')
            return state
        default:
            return state
    }
}