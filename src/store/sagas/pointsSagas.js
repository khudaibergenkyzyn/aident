import {all , put , takeLatest} from 'redux-saga/effects';
import * as types from '../actions/types';
import axios from 'axios'

function* getAllPoints(){
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
        const points = yield axios.get(`/api/trgs/points/all/?limit=-1&page=0&trgAnalysisType=1`, config).then(res => res.data.content);
        // const points = yield axios.get(`/trgs/points/all/?limit=-1`, config).then(res => res.data.content);
        yield put({type:types.RECIEVED_GET_ALL_POINTS , payload : points})
    }catch(e){
        yield put({type: types.FAILURE_GET_ALL_POINTS, errors: e})
    }
}

function* getAllMeasurments(){
    let token = JSON.parse(localStorage.getItem("token"))
    let config = {
        headers: {
            'Authorization': `Bearer ${token.user}`,
        },
        body: {limit : '-1'}
    }
    const now = new Date()
    if((now.getTime() - token.expiry) > 3600000){
        localStorage.removeItem("token")
    }
 
    try{
        const points = yield axios.get(`/api/trgs/measurements/all/?limit=-1`, config).then(res => res.data.content);
        // const points = yield axios.get(`/trgs/measurements/all/?limit=-1`, config).then(res => res.data.content);
        yield put({type:types.RECIEVED_GET_ALL_MEASURMENTS , payload : points})
    }catch(e){
        yield put({type: types.FAILURE_GET_ALL_MEASURMENTSE, errors: e})
    }
}
function* getReport({data}){
    let token = JSON.parse(localStorage.getItem("token"))
    let config = {
        headers: {
            'Authorization': `Bearer ${token.user}`,
            responseType: 'blob'
        },
    }
    const now = new Date()
    if((now.getTime() - token.expiry) > 3600000){
        localStorage.removeItem("token")
    }
    try{
        // function blobToBase64(blob) {
        //     return new Promise((resolve, _) => {
        //       const reader = new FileReader();
        //       reader.onloadend = () => resolve(reader.result);
        //       reader.readAsDataURL(blob);
        //     });
        //   }
        const report = yield axios.get(`/api/cases/trgs/report/1100`, config).then(res => {
            // const filename =  res.headers.get('Content-Disposition').split('filename=')[1];
            const str2blob = new Blob([res.data] , {type:'application/pdf'});
            let url =  window.URL.createObjectURL(str2blob)
            return url;
        });
        // let reader = new FileReader();
        // reader.readAsDataURL(str2blob); 
        // let returnData
        // reader.onloadend = function() {
        //     returnData =  reader.result;    
        // }
        
        // const report = yield axios.get(`/cases/trgs/report/${data}`, config).then(res => res.data);
        // blobToBase64(report)
        // var base64String = `window.btoa(report)`;
        // console.log(base64String)
        
        // let reader = new FileReader();
        // let file = reader.readAsDataURL(report)
        // console.log(file);

        // var myBlob = new Blob();
        // function blobToFile(theBlob, fileName){
        //     //A Blob() is almost a File() - it's just missing the two properties below which we will add
        //     theBlob.lastModifiedDate = new Date();
        //     theBlob.name = fileName;
        //     return theBlob;
        // }
        // var file = blobToFile(myBlob, "my-image.pdf");
        yield put({type:types.RECIEVED_GET_REPORT , payload : report})
    }catch(e){
        yield put({type: types.FAILURE_GET_REPORT, errors: e})
    }
}
function* getPointInfo({data}){
    // let token = localStorage.getItem("token")
    // let config = {
    //     headers: {
    //         'Authorization': `Bearer ${token}`,
    //     },
    //     body: {limit : '-1'}
    // }
 
    // try{
    //     const points = yield axios.get(`/trgs/points/${data}`, config).then(res => res.data.content);
    //     yield put({type:types.RECIEVED_GET_ALL_MEASURMENTS , payload : points})
    // }catch(e){
    //     yield put({type: types.FAILURE_GET_ALL_MEASURMENTSE, errors: e})
    // }
}
export function* pointsSagas(){
    yield all([
        yield takeLatest(types.GET_ALL_POINTS , getAllPoints),
        yield takeLatest(types.GET_ALL_MEASURMENTS , getAllMeasurments),
        yield takeLatest(types.GET_REPORT , getReport),
        yield takeLatest(types.GET_POINT_INFO , getPointInfo),
    ])
}