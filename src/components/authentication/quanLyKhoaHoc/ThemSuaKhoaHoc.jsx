import React, { Component } from 'react';
import { Container, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
// import Swal from 'sweetalert2';
// import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
// import {createCourse, editCourse} from '../actions/courses'

class CourseAction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: {
                MaKhoaHoc: "",
                TenKhoaHoc: "",
                LuotXem: "",
                MoTa: "",
                HinhAnh: "",
                NguoiTao: ""
            },
            isEdit: false,
            index: -1,
        }
    }

    onChange = (e) => {
        // console.log(e.target.name, e.target.value)
        this.setState({
            course: { ...this.state.course, [e.target.name]: e.target.value },
        })
    }

    handleOnSubmit = (e) => {
        // chặn load lại và chặn các phương thức của form như get, post ...
        e.preventDefault();
        if (this.state.isEdit) {
          //     type: 'warning',
               // Swal.fire({
            //     title: 'Are you sure?',
           //     showCancelButton: true,
            //     confirmButtonColor: '#3085d6',
            //     cancelButtonColor: '#d33',
            //     confirmButtonText: 'Yes, edit it!'
            // }).then((result) => {
            //     if (result.value) {
            //         Swal.fire(
            //             'Edited!',
            //             'Your course has been edited.',
            //             'success'
            //         )
            //     }
            // })
            //this.props.editCourse(this.state.course);
            //this.props.history.push('/');
        }
        else {
            this.setState({
                course: { ...this.state.course, id: new Date().getTime().toString() }
            }, () => {
                //this.props.createCourse(this.state.course);
                //this.props.history.push('/');
            })
        }
    }
    componentDidMount() {
        // console.log(this.props.match.params.id)
        // console.log(this.props.match.path)
        if (this.props.match.path === "/sua-khoa-hoc/:id") {
            // console.log(this.props.match.path)
            // console.log("edit")
            const id = this.props.match.params.id;
            const index = this.props.courses.courses.findIndex(course => course.MaKhoaHoc === id);
            const course = this.props.courses.courses[index];
            // console.log(course);
            this.setState({ isEdit: true, course: {...course}, index })
        }
        else{
            this.setState({
                isEdit: false
            })
        }
        // console.log(this.state.isEdit);
    }

    render() {
        // this.state.isEdit === false;
        // console.log(edit)
        return (
            <div>
                {/* <h1>{this.state.isEdit}</h1> */}
                <h1>{this.state.isEdit ? "SỬA" : "THÊM"} KHÓA HỌC</h1>
                <Container className="text-left">
                    <Form onSubmit={this.handleOnSubmit}>
                        <FormGroup>
                            <Label for="MaKhoaHoc">Mã khóa học</Label>
                            <Input
                                type="text"
                                name="MaKhoaHoc"
                                id="MaKhoaHoc"
                                placeholder="Enter mã khóa học"
                                onChange={this.onChange}
                                value={this.state.course.MaKhoaHoc}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="TenKhoaHoc">Tên khóa học</Label>
                            <Input
                                type="text"
                                name="TenKhoaHoc"
                                id="TenKhoaHoc"
                                placeholder="Enter tên khóa học"
                                onChange={this.onChange}
                                value={this.state.course.TenKhoaHoc}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="MoTa">Mô tả</Label>
                            <Input
                                type="textarea"
                                name="MoTa"
                                id="MoTa"
                                placeholder="Enter mô tả"
                                onChange={this.onChange}
                                value={this.state.course.MoTa}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="LuotXem">Lượt xem</Label>
                            <Input
                                type="number"
                                name="LuotXem"
                                id="LuotXem"
                                placeholder="Enter lượt xem"
                                onChange={this.onChange}
                                value={this.state.course.LuotXem}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="HinhAnh">Hình ảnh</Label>
                            <Input
                                type="text"
                                name="HinhAnh"
                                id="HinhAnh"
                                placeholder="Enter hình ảnh"
                                onChange={this.onChange}
                                value={this.state.course.HinhAnh}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="NguoiTao">Người tạo</Label>
                            <Input
                                type="text"
                                name="NguoiTao"
                                id="NguoiTao"
                                placeholder="Enter người tạo"
                                onChange={this.onChange}
                                value={this.state.course.NguoiTao}
                            />
                        </FormGroup>
                        {/* vì nó là submit rồi nên không nên để link ở đây */}
                        <Button>Submit</Button>
                    </Form>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        courses: state.course
    }
}

// const mapDispathchToProps = (dispatch) => {
//     return {
//         // key: createcourse  có cái hàm
//         createCourse: (course) => {
//             // cái create ở đây mới cần giống cái hàm
//             dispatch(createCourse(course))
//         },
//         editCourse: (course) => {
//             dispatch(editCourse(course))
//         }
//     }
// } 

export default connect(mapStateToProps)(CourseAction);