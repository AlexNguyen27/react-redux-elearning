import {DANG_NHAP, DANG_XUAT, CAP_NHAT_THONG_TIN} from '../actions/type';

const nguoiDung = JSON.parse(localStorage.getItem('nguoiDung'));
//const courses = JSON.parse(localStorage.getItem('course'));
// lay course tu localstorage
const initialState = {
    nguoiDung: nguoiDung ? nguoiDung : {},
    daDangNhap: nguoiDung ? true : false,
    // chú ý khởi tạo ban đầu cho nhiều course là array
    //courses: courses ? courses : [],
}

const nguoidungReducer = (state = initialState, action) =>{
    switch (action.type) {
        case DANG_NHAP: 
            return {
                ...state,
                nguoiDung: action.payload,
                daDangNhap: true
            }
        case DANG_XUAT: 
            return {
                ...state,
                nguoiDung: action.payload,
                daDangNhap: false
            }
        // case FETCH_COURSES:
        //     return {
        //         ...state,
        //         // payload is courses
        //         courses: action.payload,
        //     }
        case CAP_NHAT_THONG_TIN:
            return {
                ...state,
                nguoiDung: action.data,
            }
        default:
            break;
    }
    return {...state};
}

export default nguoidungReducer;