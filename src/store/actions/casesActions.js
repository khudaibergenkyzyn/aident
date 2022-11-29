import * as types from './types';

export function getUserCases(data){
    return {type: types.GET_USER_CASES , data}
}

export function getCase(data){
    return {type: types.GET_CASE , data}
}

export function createCase(data){
    return {type: types.CREATE_CASE , data}
}

export function uploadCaseImg(data){
    return {type: types.UPLOAD_CASE_IMAGE , data}
}
export function getCaseImg(data){
    return {type: types.GET_CASE_IMAGE , data}
}
export function calibrate(data){
    return {type: types.CALIBRATE , data}
}
export function updateCase(data){
    return {type: types.UPDATE_CASE , data}
}
export function deleteCase(data){
    return {type: types.DELETE_CASE , data}
}