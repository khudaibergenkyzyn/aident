import * as types from './types';

export function getAllPoints(){
    return {type: types.GET_ALL_POINTS}
}

export function getAllMeasurments(){
    return {type: types.GET_ALL_MEASURMENTS}
}

export function GetReport(data){
    return {type: types.GET_REPORT , data}
}
export function GetPointInfo(data){
    return {type: types.GET_POINT_INFO , data}
}