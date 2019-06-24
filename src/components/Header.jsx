import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem
} from 'reactstrap';

import { connect } from 'react-redux';
import { dangXuat } from '../actions/nguoiDung';
import { Link } from 'react-router-dom';

class Header extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {

        const { nguoiDungHienTai } = this.props;
        const { daDangNhap, nguoiDung } = nguoiDungHienTai;
        return (
            <div>
                <Navbar color="dark" dark expand="md">
                    <Link className="navbar-brand" to="/dskh-user">Elearning</Link>
                    <NavbarToggler onClick={this.toggle} />
                    {
                        daDangNhap ? (
                            <React.Fragment>
                                <h6>Hello {nguoiDung.HoTen}</h6>
                                <Collapse isOpen={this.state.isOpen} navbar>
                                    <Nav className="ml-auto" navbar>
                                        {
                                            // should be GV
                                            nguoiDung.MaLoaiNguoiDung === 'GV' ? (
                                                <React.Fragment>
                                                    <NavItem>
                                                        <Link className="nav-link" to="/dskh-user">Danh sách khóa học</Link>
                                                    </NavItem>
                                                    <NavItem>
                                                        <Link className="nav-link" to="/nguoi-dung"
                                                        >Thông tin cá nhân</Link>
                                                    </NavItem>
                                                </React.Fragment>
                                            ) : (
                                                <React.Fragment>
                                                <NavItem>
                                                    <Link className="nav-link" to="/dskh">Danh sách khóa học</Link>
                                                </NavItem>
                                                <NavItem>
                                                    <Link className="nav-link" to="/dsnd">Danh sách người dùng</Link>
                                                </NavItem>
                                                <NavItem>
                                                    <Link className="nav-link" to="/nguoi-dung"
                                                    >Thông tin cá nhân</Link>
                                                </NavItem>
                                            </React.Fragment>
                                                )

                                        }
                                        <NavItem>
                                            <Link className="nav-link" to="/"
                                                onClick={this.props.dangXuat}>Đăng Xuất</Link>
                                        </NavItem>
                                    </Nav>
                                </Collapse>
                            </React.Fragment>

                        ) : (
                                <Collapse isOpen={this.state.isOpen} navbar>
                                    <Nav className="ml-auto" navbar>
                                        <NavItem>
                                            <Link className="nav-link" to="/dang-ky">Đăng ký</Link>
                                        </NavItem>
                                        <NavItem>
                                            <Link className="nav-link" to="/dang-nhap">Đăng nhập</Link>
                                        </NavItem>
                                    </Nav>
                                </Collapse>
                            )
                    }


                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        nguoiDungHienTai: state.nguoiDung
    }
}

// style 


export default connect(mapStateToProps, { dangXuat })(Header);