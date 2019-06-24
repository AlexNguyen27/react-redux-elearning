import React, { Component } from 'react'
import { FormGroup, Form, Label, Input, Button, Container, Alert } from 'reactstrap';
import {connect } from 'react-redux';
import {dangNhap} from '../../../actions/nguoiDung';
import {withRouter} from 'react-router-dom'; // history 

export class DangNhap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            taiKhoan: "",
            matKhau: ""
        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        // call actions
        this.props.dangNhap(this.state, this.props.history);
    }

    componentDidMount() {
        const {daDangNhap} = this.props.nguoiDung;
        // neu dang nhap la true, khi load trang tự đông trả về /dskh
        // sử dụng nó tại đây vì tiện lọi cho người dùng
        if(daDangNhap) {
            this.props.history.push('/dskh'); 
        }
    }

    render() {
        const {errors} = this.props;
        return (
            <div>
                <h1>Đăng Nhập</h1>
                {
                    errors.dangNhap
                    ? <Alert color="danger">Đăng nhập thất bại </Alert>
                    : null
                }
                
                <Container className="text-left">
                    <Form onSubmit={this.onSubmit} >
                        <FormGroup>
                            <Label for="taiKhoan">Tài khoản</Label>
                            <Input
                                type="text"
                                name="taiKhoan"
                                id="taiKhoan"
                                placeholder="Nhập tài khoản"
                                onChange={this.onChange}
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="matKhau">Mật Khẩu</Label>
                            <Input
                                type="password"
                                name="matKhau"
                                id="matKhau"
                                placeholder="Nhập mật khẩu"
                                onChange={this.onChange}
                            ></Input>
                        </FormGroup>
                        <Button>Đăng Nhập</Button>
                    </Form>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        errors: state.errors,
        nguoiDung: state.nguoiDung
    }
}

// higher order component: HOC, Lý do: nó có thể sử dụng lại nhiều lần, tổng quát hóa là Decorator: tạo một component lớn mạnh
// component xanhduong
// component hinhvuong
// sử dung: xanhduong(hinhvuong)
export default withRouter(connect(mapStateToProps, { dangNhap })(DangNhap));

// design pattern: input, output, mvc
