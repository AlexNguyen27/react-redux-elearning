import {LAY_ERRORS_DANG_NHAP, LAY_ERRORS_DANG_KY, RESET_ERRORS} from '../actions/type';

const initialState = {
    dangNhap: "",
    dangKy: ""
}

const errorsReducer = (state = initialState, action) => {
    switch(action.type) {
        case LAY_ERRORS_DANG_NHAP:
            return {...state, dangNhap: action.errors }
        case LAY_ERRORS_DANG_KY: 
            return {...state, dangKy: action.errors}  
        case RESET_ERRORS:
            return {...state, dangNhap: "", dangKy: ""}  
        default:
            return {...state}
    }

   // return {...state}
}

export default errorsReducer;