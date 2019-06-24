import {combineReducers} from 'redux';
import nguoiDung from './nguoiDung';
import errors from './errors';
import course from './courses';


const rootReducer = combineReducers({
    nguoiDung,
    errors,
    course
})

export default rootReducer;