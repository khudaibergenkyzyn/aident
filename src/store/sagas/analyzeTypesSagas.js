import {all , put , takeLatest} from 'redux-saga/effects';
// import jwt_decode from "jwt-decode";
import * as types from '../actions/types';
import axios from 'axios'

function* getAllAnalyzeTypes(){
    let token = JSON.parse(localStorage.getItem("token"))
    let config = {
        headers: {
            'Authorization': `Bearer ${token.user}`,
        },
    }
    try{
        const analyzeTypes = yield axios.get(`/api/trgs/analysis-types/all` , config).then(res => res.data.content);
        yield put({type:types.RECIEVED_GET_ALL_ANALYZE_TYPES , payload : analyzeTypes})
    }catch(e){
        yield put({type: types.FAILURE_GET_ALL_ANALYZE_TYPESE, errors: e})
    }
}

export function* analyzeTypesSagas(){
    yield all([
        yield takeLatest(types.GET_ALL_ANALYZE_TYPES , getAllAnalyzeTypes),
    ])
}