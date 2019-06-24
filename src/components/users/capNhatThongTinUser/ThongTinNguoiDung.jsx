import React, { Component } from 'react'
import { connect } from 'react-redux';
import { FormGroup, Label, Input, Form, Container, Button } from 'reactstrap';
import { capNhatThongTin } from '../../../actions/nguoiDung';
import {withRouter} from 'react-router-dom';
class ThongTinNguoiDung extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TaiKhoan: "",
            MatKhau: "",
            HoTen: "",
            Email: "",
            SoDT: "",
            MaLoaiNguoiDung: "",
        }
    }

    // onchange chỗ nào cũng giống nhau
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // pass data in to state and using it
    componentDidMount() {
        const { nguoiDung } = this.props.nguoiDung;
        // các thuộc tính này là của người dùng
        const { TaiKhoan, HoTen, Email, SoDT, MaLoaiNguoiDung } = nguoiDung;
        this.setState({
            TaiKhoan, HoTen, Email, SoDT, MaLoaiNguoiDung
        })
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        // call action 
        // cap nhat xong tro ve dskh-user
        this.props.capNhatThongTin(this.state, this.props.history);
    }

    render() {
        const formInput = [
            { name: "TaiKhoan", type: "text", label: "Tài khoản", disabled: false },
            // do API đăng nhập không trả về password
            // nên phải sử dụng API nào trả về mật khẩu
            { name: "MatKhau", type: "password", label: "Mật khẩu", disabled: false },
            { name: "HoTen", type: "text", label: "Họ tên", disabled: false },
            { name: "Email", type: "email", label: "Email", disabled: false },
            { name: "SoDT", type: "text", label: "Số điện thoại", disabled: false },
            // Không cho phép sửa
            { name: "MaLoaiNguoiDung", type: "text", label: "Mã loại người dùng", disabled: true }
        ]

        const inputElm = formInput.map((input, index) => {
            return <FormGroup key={index}>
                <Label for={input.name}>{input.label}</Label>
                <Input
                    value={this.state[input.name]}
                    id={input.name}
                    type={input.type}
                    placeholder={`Nhập ${input.label}`}
                    name={input.name}
                    onChange={this.onChange}
                    disabled={input.disabled}
                ></Input>
            </FormGroup>
        })

        return (
            <div>
                <h1>Thông tin cá nhân</h1>
                <Container className="text-left">
                    <Form onSubmit={this.onSubmit}>
                        {inputElm}
                        <Button>Cập nhật</Button>
                    </Form>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        nguoiDung: state.nguoiDung
    }
}

export default withRouter(connect(mapStateToProps, { capNhatThongTin })(ThongTinNguoiDung));
