import React, {Component} from 'react';
import { Container, Row } from 'reactstrap';
import KhoaHoc from './KhoaHoc';
import {connect} from 'react-redux';
// import {fetchCourses} from '../../../actions/course';
import axios from 'axios';
import {Link} from 'react-router-dom';

class DanhSachKhoaHoc extends Component {
    constructor(props){
        super(props);
        this.state = {
            dskh: []
        }
    }
    componentDidMount() {
    //  this.props.fetchCourses();
    axios.get('http://svcy.myclass.vn/api/QuanLyTrungTam/DanhSachKhoaHoc')
    .then(res => {
        this.setState({
            dskh: res.data
        })
        localStorage.setItem('course', JSON.stringify(res.data))
    })
    .catch(console.log)
    }

    render() {
        // const courses = this.props.courses;
        // console.log(typeof courses)
        // console.log(this.state.dskh);

        const khoaHoc = this.state.dskh.map((khoa, index) => {
            return <KhoaHoc
                key={index}
                khoa={khoa}
            />
        })
        const {nguoiDung} = this.props.nguoiDung;
        return (
            
            <div>
                <h1>Danh Sách Khóa Học</h1>
                <React.Fragment>
                {
                    // should be GV
                    nguoiDung.MaLoaiNguoiDung === 'HV' ?
                        (
                            <Link to="/them-khoa-hoc" className="btn btn-success ml-3 ">Thêm khoá học</Link>
                        ) : null
                }
              </React.Fragment>
                <Container>
                    <Row>
                        {khoaHoc}
                    </Row>
                </Container>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        courses: state.course,
        nguoiDung: state.nguoiDung
    }
}

export default connect(mapStateToProps)(DanhSachKhoaHoc);