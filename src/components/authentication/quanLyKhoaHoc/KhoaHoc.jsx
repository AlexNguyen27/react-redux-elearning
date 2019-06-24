import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Col
} from 'reactstrap';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class KhoaHoc extends Component {
    render() {
        const { khoa } = this.props;
        const id = khoa.MaKhoaHoc;
        const { nguoiDung } = this.props.nguoiDung;
        return (
          
            <Col md={4} className="my-3">
                <Card>
                    <CardImg top width="100%" src={khoa.HinhAnh} alt={khoa.TenKhoaHoc} />
                    <CardBody className="text-left">
                        <CardTitle>{khoa.TenKhoaHoc}</CardTitle>
                        <CardSubtitle>Người Tạo: {khoa.NguoiTao}</CardSubtitle>
                        <CardText>Lượt xem: {khoa.LuotXem}</CardText>
                        {
                            // should be GV
                            nguoiDung.MaLoaiNguoiDung === 'HV' ? (
                                <React.Fragment>
                                    <Link to={`/xoa-khoa-hoc/${id}`} className="btn btn-danger ml-3">Xóa</Link>
                                    <Link to={`/sua-khoa-hoc/${id}`} className="btn btn-warning ml-3 ">Sửa</Link>
                                </React.Fragment>
                            ) : (
                                    <Link to={`/course-detail/${id}`} className="btn btn-primary ml-3">Chi tiết</Link>
                                )

                        }
                    </CardBody>
                </Card>
            </Col>
         

        )
    }
}

const mapStateToProps = (state) => {
    return {
        nguoiDung: state.nguoiDung
    }
}
export default connect(mapStateToProps)(KhoaHoc);