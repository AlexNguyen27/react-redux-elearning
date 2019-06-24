import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hienThiKhoaHocDaDangKy } from '../../../actions/nguoiDung';
import axios from 'axios';
import KhoaHoc from '../../authentication/quanLyKhoaHoc/KhoaHoc'
import { Container, Row } from 'reactstrap';

class KhoaHocDaGhiDanh extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dskh: []
        }
    }

    componentWillMount() {
        const { nguoiDung } = this.props.nguoiDung;

        console.log(nguoiDung.TaiKhoan);

        axios.get("http://svcy.myclass.vn/api/QuanLyTrungTam/LayThongtinKhoaHoc?taikhoan=" + nguoiDung.TaiKhoan)
            .then(res => {
                console.log(res.data);
                if(typeof res.data !== "string"){
                    this.setState({
                        dskh: res.data
                    })
                }
            })
            .catch(console.log)
    }
    render() {
        const khoaHoc = this.state.dskh.map((khoa, index) => {
            return <KhoaHoc
                key={index}
                khoa={khoa}
            />
        })

        return (
            <div>
                <h1>Danh sách khóa học đã đăng ký</h1>
                <Container>
                    <Row>
                        {khoaHoc.length ? khoaHoc : <p>Danh sách rỗng</p>}
                    </Row>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        nguoiDung: state.nguoiDung
    }
}
export default connect(mapStateToProps, { hienThiKhoaHocDaDangKy })(KhoaHocDaGhiDanh);