import * as types from '../actions/types';

const initialState = {
    isLoading : false,
    pointsList : [],
    measurments : [],
    report:'',
    pointInfo : {}
}

export default function pointsReducers(state = initialState , action){
    switch(action.type){
        case types.RECIEVED_GET_ALL_POINTS:
            return{...state , pointsList: action.payload}
        case types.FAILURE_GET_ALL_POINTS:
            alert('Введутся технические работы. Попробуйте позже FAILURE_GET_ALL_POINTS')
            return state
        case types.RECIEVED_GET_ALL_MEASURMENTS:
            return{...state , measurments: action.payload}
        case types.FAILURE_GET_ALL_MEASURMENTSE:
            alert('Введутся технические работы. Попробуйте позже FAILURE_GET_ALL_MEASURMENTSE')
            return state
        case types.RECIEVED_GET_REPORT:
            return{...state , report: action.payload}
        case types.FAILURE_GET_REPORT:
            alert('Введутся технические работы. Попробуйте позже FAILURE_GET_REPORT')
            return state
        case types.RECIEVED_GET_POINT_INFO:
            return{...state , pointInfo: action.payload}
        case types.FAILURE_GET_POINT_INFO:
            alert('Введутся технические работы. Попробуйте позже FAILURE_GET_POINT_INFO')
            return state
        default:
            return state
    }
}