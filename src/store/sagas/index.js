import {all} from 'redux-saga/effects';
import {authSagas} from './authSagas'
import {casesSagas} from './casesSagas'
import { analyzeTypesSagas } from './analyzeTypesSagas';
import { trgPointsSagas } from './trgPointsSagas';
import { pointsSagas } from './pointsSagas';
export default function* rootSaga(){
    yield all([
        authSagas(),
        casesSagas(),
        analyzeTypesSagas(),
        trgPointsSagas(),
        pointsSagas()
    ])
}