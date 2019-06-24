import React, { Component } from 'react';
import { FormGroup, Form, Label, Button, Input, Container, Alert } from 'reactstrap';

import { dangKy } from '../../../actions/nguoiDung'; // action
import { connect } from 'react-redux'; // connect with state
import { withRouter } from 'react-router'; // histtory 

class DangKy extends Component {

    constructor(props) {
        super(props);
        this.state = {
            TaiKhoan: "",
            MatKhau: "",
            HoTen: "",
            Email: "",
            SoDT: "",
            MaLoaiNguoiDung: ""
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.dangKy(this.state, this.props.history);
    }
    render() {

        const { errors } = this.props;
        const formInput = [
            { name: "TaiKhoan", type: "text", label: "Tài khoản" },
            { name: "MatKhau", type: "password", label: "Mật khẩu" },
            { name: "HoTen", type: "text", label: "Họ tên" },
            { name: "Email", type: "email", label: "Email" },
            { name: "SoDT", type: "text", label: "Số điện thoại" },
            { name: "MaLoaiNguoiDung", type: "text", label: "Mã loại người dùng" }
        ]

        const inputElm = formInput.map((input, index) => {
            return <FormGroup key={index}>
                <Label for={input.name}>{input.label}</Label>
                <Input
                    id={input.name}
                    type={input.type}
                    placeholder={`Nhập ${input.label}`}
                    name={input.name}
                    onChange={this.onChange}
                ></Input>
            </FormGroup>
        })

        return (
            <div>
                <h1>Đăng ký</h1>
                {
                    errors.dangKy === false 
                    ? <Alert color="danger">Đăng ký thất bại</Alert>
                    : null
                }

                <Container className="text-left">
                    <Form onSubmit={this.onSubmit}>
                        {inputElm}
                        <Button>Đăng ký</Button>
                    </Form>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        errors: state.errors
    }
}

export default withRouter(connect(mapStateToProps, { dangKy })(DangKy));