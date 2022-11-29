import {all , put , takeLatest} from 'redux-saga/effects';
import * as types from '../actions/types';
import axios from 'axios'
let Buffer = require('buffer/').Buffer

function* getUserCases(){
    let token = JSON.parse(localStorage.getItem("token"))
    console.log(token);
        // let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJraHVkYWliZXJnZW5reXp5Lm5AZ21haWwuY29tIiwiaXAiOiIwOjA6MDowOjA6MDowOjEiLCJleHAiOjE2NjcyODQ1MDV9.LT6nqgVp8lng4UZd51hxTsTJNmSh2rQ3IxSj2gy9REtuV43XrQBDtMSUBJIQiIY5KS22vmT2zPVt6RIX3-alfQ'
        let config = {
            headers: {
              'Authorization': `Bearer ${token.user}`,
            },
        }
        const now = new Date()
        // console.log(now.getTime() , JSON.parse(token).expiry);
        if((now.getTime() - token.expiry) > 3600000){
            localStorage.removeItem("token")
        }
    try{
        const cases = yield axios.get(`/api/cases/all` , config).then(res => res.data.content);
        // const cases = yield axios.get(`/cases/all` , config).then(res => res.data.content);
        yield put({type:types.RECIEVED_GET_USER_CASES , payload : cases})
    }catch(e){
        yield put({type: types.FAILURE_GET_USER_CASES, errors: e})
    }
}


function* getCase({data}){
    // form.append('name' , 'image.png')
    let token = JSON.parse(localStorage.getItem("token"))
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
        const cases = yield axios.get(`/api/cases/${data}` , config).then(res => res.data);
        // const cases = yield axios.get(`/cases/${data}` , config).then(res => res.data);
        yield put({type:types.RECIEVED_GET_CASE , payload : cases})
    }catch(e){
        yield put({type: types.FAILURE_GET_CASE, errors: e})
    }
}

function* createCase({data}){
    let token = JSON.parse(localStorage.getItem("token"))
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
        const cases = yield axios.post(`/api/cases` , {caseType: data} , config).then(res => res.data);
        // const cases = yield axios.post(`/cases` , {caseType: data} , config).then(res => res.data);
        yield put({type:types.RECIEVED_CREATE_CASE , payload : cases})
    }catch(e){
        yield put({type: types.FAILURE_CREATE_CASE, errors: e})
    }
}

function* uploadCaseImg({data}){
        let token = JSON.parse(localStorage.getItem("token"))
        let config = {
            headers: {
              'Authorization': `Bearer ${token.user}`,
              'Content-Type': 'multipart/form-data'
            },
        }
        const now = new Date()
        if((now.getTime() - token.expiry) > 3600000){
            localStorage.removeItem("token")
        }
        try{
            const cases = yield axios.post(`/api/cases/trgs/image/${data.id}` , {file:data.file} , config).then(res => res.data);
            // const cases = yield axios.post(`/cases/trgs/image/${data.id}` , {file:data.file} , config).then(res => res.data);
            yield put({type:types.RECIEVED_UPLOAD_CASE_IMAGE , payload : cases})
        }catch(e){
            yield put({type: types.FAILURE_UPLOAD_CASE_IMAGE, errors: e})
        }
}

function* getCaseImg({data}){
    let token = JSON.parse(localStorage.getItem("token"))
        let config = {
            headers: {
              'Authorization': `Bearer ${token.user}`,
            //   responseType: 'arraybuffer'
            //   "responseType": "blob"
            //   'Content-Type': 'multipart/form-data'
            },
        }
        const now = new Date()
        if((now.getTime() - token.expiry) > 3600000){
            localStorage.removeItem("token")
        }
    try{
        let cases = yield axios.get(`/api/cases/trgs/image/${data}` , config).then(res => res.data)
        // let cases = yield axios.get(`/cases/trgs/image/${data}` , config).then(res => res.data)
        yield put({type:types.RECIEVED_GET_CASE_IMAGE , payload : cases})
        
    }catch(e){
        yield put({type: types.FAILURE_GET_CASE_IMAGE, errors: e})
    }
}
function* calibrate({data}){
    let token = JSON.parse(localStorage.getItem("token"))
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
        const cases = yield axios.put(`/api/cases/trgs/calibrate/${data.id}` , data.data , config).then(res => res.data);
        // const cases = yield axios.put(`/cases/trgs/calibrate/${data.id}` , data.data , config).then(res => res.data);
        yield put({type:types.RECIEVED_CALIBRATEE , payload : cases})
    }catch(e){
        yield put({type: types.FAILURE_CALIBRATE, errors: e})
    }
}
function* updateCase({data}){
    let token = JSON.parse(localStorage.getItem("token"))
    let config = {
        headers: {
            'Authorization': `Bearer ${token.user}`,
        },
    }
    const now = new Date()
        if((now.getTime() - token.expiry) > 3600000){
            localStorage.removeItem("token")
        }
    const sendData = {
        patientLastName: data.patientLastName ,
        patientFirstName: data.patientFirstName , 
        patientGender: data.patientGender ,
        patientAge: data.patientAge , 
        doctorFullName: data.doctorFullName
    }
    try{
        const cases = yield axios.put(`/api/cases/${data.id}` , sendData , config).then(res => res.data);
        // const cases = yield axios.put(`/cases/${data.id}` , sendData , config).then(res => res.data);
        yield put({type:types.RECIEVED_CALIBRATEE , payload : cases})
    }catch(e){
        yield put({type: types.FAILURE_CALIBRATE, errors: e})
    }
}
function* deleteCase({data}){
    let token = JSON.parse(localStorage.getItem("token"))
        let config = {
            headers: {
              'Authorization': `Bearer ${token.user}`,
            //   responseType: 'arraybuffer'
            //   "responseType": "blob"
            //   'Content-Type': 'multipart/form-data'
            },
        }
        const now = new Date()
        if((now.getTime() - token.expiry) > 3600000){
            localStorage.removeItem("token")
        }
    try{
        yield axios.delete(`/api/cases/${data}` , config).then(res => res.data)
        let cases = yield axios.get(`/api/cases/all` , config).then(res => res.data.content)
        yield put({type:types.RECIEVED_DELETE_CASE , payload : cases})
        
    }catch(e){
        yield put({type: types.FAILURE_DELETE_CASE, errors: e})
    }
}

export function* casesSagas(){
    yield all([
        yield takeLatest(types.GET_USER_CASES , getUserCases),
        yield takeLatest(types.GET_CASE , getCase),
        yield takeLatest(types.CREATE_CASE , createCase),
        yield takeLatest(types.UPLOAD_CASE_IMAGE , uploadCaseImg),
        yield takeLatest(types.GET_CASE_IMAGE , getCaseImg),
        yield takeLatest(types.CALIBRATE , calibrate),
        yield takeLatest(types.UPDATE_CASE , updateCase),
        yield takeLatest(types.DELETE_CASE , deleteCase),
    ])
}