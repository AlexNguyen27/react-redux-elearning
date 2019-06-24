import axios from 'axios';
import { DANG_NHAP, DANG_XUAT, LAY_ERRORS_DANG_NHAP, LAY_ERRORS_DANG_KY, RESET_ERRORS, CAP_NHAT_THONG_TIN, LAY_ERRORS_CAP_NHAT_THONG_TIN, LAY_ERRORS_DA_GHI_DANH, KHOA_HOC_DA_GHI_DANH } from './type';

export const dangNhap = (data, history) => dispatch => {
    axios
        .get('http://svcy.myclass.vn/api/QuanLyTrungTam/DangNhap', {
            params: {
                taiKhoan: data.taiKhoan,
                matKhau: data.matKhau
            }
        })
        .then(res => {
            if (typeof res.data === "string") {
                return Promise.reject(res.data)
            } else {
                dispatch({
                    type: DANG_NHAP,
                    payload: res.data[0]
                })
                //console.log(res.data);
                localStorage.setItem('nguoiDung', JSON.stringify(res.data[0]));
                dispatch(resetErrors());
                history.push("./dskh-user");
               
            }
        })
        .catch(err => {
            dispatch(layErrors(LAY_ERRORS_DANG_NHAP, err))
        })
}

export const dangXuat = () => dispatch => {
    dispatch({
        type: DANG_XUAT,
        payload: {}
    })
    localStorage.removeItem('nguoiDung');
    localStorage.removeItem('course');
    dispatch(resetErrors())
}

export const layErrors = (type, errors) => {
    //console.log("error dang")
    return {
        type,
        errors
    }

}
export const resetErrors = () => {
    return {
        type: RESET_ERRORS,
    }
}

export const dangKy = (data, history) => (dispatch) => {
    // console.log("dangKy thanh cong");
    axios
        .post("http://svcy.myclass.vn/api/QuanLyTrungTam/DangKy", data)
        .then(res => {
            if (res.data) {
                history.push('/dang-nhap');
                dispatch(resetErrors());
            } else {
                return Promise.reject(res.data);
               
            }
        })
        .catch(err => dispatch(layErrors(LAY_ERRORS_DANG_KY, err)))
}

// export const fetchCourses = () => {
//     return (dispatch) => {
//         axios
//         .get('http://svcy.myclass.vn/api/QuanLyTrungTam/DanhSachKhoaHoc')
//         .then(res => {
//             dispatch({
//                 type: FETCH_COURSES,
//                 payload: res.data,          
//             })
//             localStorage.setItem('course', JSON.stringify(res.data))
//         })
//         .catch(err => {
//             console.log(err);
//             console.log("loi khong lay dc danh sach khoa hoc")
//         })
//     }
// }

export const capNhatThongTin = (data, history) => {
    return (dispatch) => {
        axios
        // Không truyền json.stringify
        .put('http://svcy.myclass.vn/api/QuanLyTrungTam/CapNhatThongTinNguoiDung', data)
        .then(res => {
            if(!res.data) return Promise.reject({errors: 'FAIL TO UPDATE'});
            dispatch({
                type: CAP_NHAT_THONG_TIN,
                data: res.data, 
            })
            history.push("./dskh-user");
        })
        .catch(err => {
            dispatch(layErrors(LAY_ERRORS_CAP_NHAT_THONG_TIN, err))
        })
    }
}

export const hienThiKhoaHocDaDangKy = (taikhoan) => {
    return (dispatch) => {
        axios
        .get('http://svcy.myclass.vn/api/QuanLyTrungTam/LayThongtinKhoaHoc', taikhoan)
        .then( res => {
            if(!res.taiKhoan) return Promise.reject({});
            dispatch({
                type: KHOA_HOC_DA_GHI_DANH,
                data: res.data,
            })
        })
        .catch(err => {
            dispatch(layErrors(LAY_ERRORS_DA_GHI_DANH, err))
        })
    }
}

