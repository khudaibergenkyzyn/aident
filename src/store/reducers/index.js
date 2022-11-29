import {combineReducers} from 'redux';
import authReducers from './authReducers'
import casesReducers from './casesReducers';
import analyzeTypesReducers from './analyzeTypesReducers';
import trgPointsReducers from './trgPointsReducers';
import pointsReducers from './poitsReducers';
export default combineReducers({
    pointsReducers,
    authReducers,
    casesReducers,
    analyzeTypesReducers,
    trgPointsReducers
})