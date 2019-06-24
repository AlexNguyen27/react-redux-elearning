import React, { Component } from 'react'
import { Container, Row } from 'reactstrap'
import { Media } from 'reactstrap';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class CourseDetail extends Component {
   
    render() {
        // const {courses} = this.props.courses;
        // console.log(courses);
        const id = this.props.match.params.id;
        // console.log(id);
        // console.log(this.props.courses);
        const course = this.props.courses.courses.find(course => course.MaKhoaHoc === id);
        // console.log(course)
        // console.log(course.MaKhoaHoc); // error?
        return (
            <Container>
                <Row>
                    <Media>
                        <img src={course.HinhAnh} width="50%"></img>

                        <Media body>
                            <Media heading>
                                {course.TenKhoaHoc}
                            </Media>
                            <div>Mô tả: {course.MoTa}</div>
                            <div>Lượt xem: {course.LuotXem}</div>
                            <div>Tác giả: {course.NguoiTao}</div>
                         </Media>
                    </Media>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        courses: state.course
    }
}
export default withRouter(connect(mapStateToProps)(CourseDetail));
