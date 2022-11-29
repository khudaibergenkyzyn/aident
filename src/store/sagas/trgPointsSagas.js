import {all , put , takeLatest} from 'redux-saga/effects';
import * as types from '../actions/types';
import axios from 'axios'

function* getTrgPontsAI({data}){
    let token = JSON.parse(localStorage.getItem("token"))
        // let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJraHVkYWliZXJnZW5reXp5Lm5AZ21haWwuY29tIiwiaXAiOiIwOjA6MDowOjA6MDowOjEiLCJleHAiOjE2NjcyODQ1MDV9.LT6nqgVp8lng4UZd51hxTsTJNmSh2rQ3IxSj2gy9REtuV43XrQBDtMSUBJIQiIY5KS22vmT2zPVt6RIX3-alfQ'
        let config = {
            headers: {
              'Authorization': `Bearer ${token.user}`,
            },
        }
        const now = new Date()
        if((now.getTime() - token.expiry) > 3600000){
            localStorage.removeItem("token")
        }
    try{
        const cases = yield axios.get(`/api/cases/trgs/points/ai/${data}` , config).then(res => res.data);
        console.log(cases);
        yield put({type:types.RECIEVED_GET_TRG_POINTS_AI , payload : cases.points})
    }catch(e){
        yield put({type: types.FAILURE_GET_TRG_POINTS_AI, errors: e})
    }
}
function* getDelineationImg({data}){
    let token = JSON.parse(localStorage.getItem("token"))
        // let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJraHVkYWliZXJnZW5reXp5Lm5AZ21haWwuY29tIiwiaXAiOiIwOjA6MDowOjA6MDowOjEiLCJleHAiOjE2NjcyODQ1MDV9.LT6nqgVp8lng4UZd51hxTsTJNmSh2rQ3IxSj2gy9REtuV43XrQBDtMSUBJIQiIY5KS22vmT2zPVt6RIX3-alfQ'
        let config = {
            headers: {
              'Authorization': `Bearer ${token.user}`,
            },
        }
        const now = new Date()
        if((now.getTime() - token.expiry) > 3600000){
            localStorage.removeItem("token")
        }
    try{
        const delineation = yield axios.get(`/api/cases/trgs/delineation/ai/${data}` , config).then(res => res.data);
        yield put({type:types.RECIEVED_GET_DELINEATION_IMG , payload : delineation})
    }catch(e){
        yield put({type: types.FAILURE_GET_DELINEATION_IMG, errors: e})
    }
}


export function* trgPointsSagas(){
    yield all([
        yield takeLatest(types.GET_TRG_POINTS_AI , getTrgPontsAI),
        yield takeLatest(types.GET_DELINEATION_IMG , getDelineationImg),
    ])
}