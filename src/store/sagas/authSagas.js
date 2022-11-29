import {all , put , takeLatest} from 'redux-saga/effects';
// import jwt_decode from "jwt-decode";
import XMLParser from 'react-xml-parser';
import * as types from '../actions/types';
import axios from 'axios'

function* registerUser({data}){
    try{
        const user = yield axios.post(`/api/sign-up` , data).then(res => res.data);
        // const user = yield axios.post(`/sign-up` , data).then(res => res.data);
        yield put({type:types.RECIEVED_REGISTER_USER , payload : user})
    }catch(e){
        yield put({type: types.FAILURE_REGISTER_USER, errors: e})
    }
}
function* loginUser({data}){
    try{
        const user = yield axios.post(`/api/login` , data).then(res => res.headers.authorization);
        // const user = yield axios.post(`/login` , data).then(res => res.headers.authorization);
        // var decoded = jwt_decode(user);
        // console.log(decoded);
        const now = new Date()
        axios.defaults.headers.common['Authorization'] = user;
        let sendData = {
            user, 
            expiry: now.getTime()
        }
        localStorage.setItem('token', JSON.stringify(sendData));
        yield put({type:types.RECIEVED_LOGIN_USER , payload : user})
    }catch(e){
        console.log(e);
        yield put({type: types.FAILURE_LOGIN_USER, errors: e})
    }
}

function* payment(){
    try{
        let token = localStorage.getItem("token")
        // let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJraHVkYWliZXJnZW5reXp5Lm5AZ21haWwuY29tIiwiaXAiOiIwOjA6MDowOjA6MDowOjEiLCJleHAiOjE2NjcyODQ1MDV9.LT6nqgVp8lng4UZd51hxTsTJNmSh2rQ3IxSj2gy9REtuV43XrQBDtMSUBJIQiIY5KS22vmT2zPVt6RIX3-alfQ'

        let config = {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            // body: {
            //     "caseType": "TRG"
            // }
        }
        // const url = yield axios.post(`/payment`,null, config).then(res => res.data);
        const url = yield axios.post(`/api/payment`,null, config).then(res => res.data);
        let xml = new XMLParser().parseFromString(url); 
        xml = xml.children[2].value;
        yield put({type:types.RECIEVED_PAYMENT , payload : xml})
    }catch(e){
        yield put({type: types.FAILURE_PAYMENT, errors: e})
    }
}
export function* authSagas(){
    yield all([
        yield takeLatest(types.REGISTER_USER , registerUser),
        yield takeLatest(types.LOGIN_USER , loginUser),
        yield takeLatest(types.PAYMENT , payment),
    ])
}