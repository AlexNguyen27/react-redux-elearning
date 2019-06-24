import axios from 'axios';
import {CREATE_COURSES} from './type'

export const createCourses = () => {
    return (dispatch) => {
        axios
        .get('http://svcy.myclass.vn/api/QuanLyTrungTam/DanhSachKhoaHoc')
        .then(res => {
            dispatch({
                type: CREATE_COURSES,
                payload: res.data,          
            })
            console.log(typeof res.data) 
            localStorage.setItem('course', JSON.stringify(res.data))
        })
        .catch(err => {
            console.log(err);
            console.log("loi khong lay dc danh sach khoa hoc")
        })
    }
}
