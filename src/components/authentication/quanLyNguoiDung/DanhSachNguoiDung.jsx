// Nếu chỉ sài một chỗ thì không cần sử dụng redux store
import React, { Component } from 'react';
import axios from 'axios';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';

class DanhSachNguoiDung extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dsnd: [],
            modal: false,
            dskh: [],

            MaKhoaHoc: '',
            TaiKhoan: ''
        };

    }
    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    componentDidMount() {
        axios.get('http://svcy.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung')
            .then(res => {
                this.setState({
                    dsnd: res.data
                })
            })
            .catch(console.log)

        // render dskh
        axios.get('http://svcy.myclass.vn/api/QuanLyTrungTam/DanhSachKhoaHoc')
            .then(res => {
                this.setState({
                    dskh: res.data
                })
            })
            .catch(console.log)
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    layTaiKhoan = (TaiKhoan) => {
        this.setState({ TaiKhoan });
    }

    onSubmit = (e) => {
        e.preventDefault();
        axios.post("http://svcy.myclass.vn/api/QuanLyTrungTam/GhiDanhKhoaHoc", {
            // post need 2 parameters to pass in: TaiKhoan, MaKhoaHoc
            TaiKhoan: this.state.TaiKhoan,
            MaKhoaHoc: this.state.MaKhoaHoc
        }).then(console.log)
            .catch(console.log)
    }
    render() {
        const dsnd = this.state.dsnd.map((nd, index) => {
            return <tr key={index}>
                <td>{index + 1}</td>
                <td>{nd.TaiKhoan}</td>
                <td>{nd.MaLoaiNguoiDung}</td>
                <td>
                    <Button color='info' onClick={() => {
                        this.toggle();
                        this.layTaiKhoan(nd.TaiKhoan);
                    }}
                    >{this.props.buttonLabel}Ghi danh</Button>
                    <Button className='ml-2' color='warning'>Edit</Button>
                    <Button className='ml-2' color='danger'>Delete</Button>
                </td>
            </tr>
        })

        const dskh = this.state.dskh.map((kh, index) => {
            return <option key={index} value={kh.MaKhoaHoc}>{kh.TenKhoaHoc}</option>
        })
        return (
            <div>
                <h1>Danh sách người dùng</h1>
                <table className="table" style={{margin: "0 auto", width: "90%"}}>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tài khoản</th>
                            <th>Mã loại người dùng</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dsnd}
                    </tbody>
                </table>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Ghi danh</ModalHeader>
                    <Form onSubmit={this.onSubmit}>
                        <ModalBody>
                            <FormGroup>
                                <Label>Tên khóa học</Label>
                                <Input
                                    type="select"
                                    onChange={this.onChange}
                                    name="MaKhoaHoc"
                                >
                                    {dskh}
                                </Input>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit">Submit</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default DanhSachNguoiDung;