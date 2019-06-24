import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import DanhSachKhoaHoc from './components/authentication/quanLyKhoaHoc/DanhSachKhoaHoc';
import ChiTietKhoaHoc from './components/authentication/quanLyKhoaHoc/ChiTietKhoaHoc';
import DangNhap from './components/users/dangNhap/DanhNhap';
import DangKy from './components/users/dangKy/DangKy';
import NotFound from './components/NotFound';
import ThongTinNguoiDung from './components/users/capNhatThongTinUser/ThongTinNguoiDung';
import DanhSachNguoiDung from './components/authentication/quanLyNguoiDung/DanhSachNguoiDung';

import {connect} from 'react-redux';
import KhoaHocDaGhiDanh from './components/users/hienThiKhoaHocDaGhiDanh/KhoaHocDaGhiDanh';
import ThemSuaKhoaHoc from './components/authentication/quanLyKhoaHoc/ThemSuaKhoaHoc';

class App extends Component {
  render() {

    const {nguoiDung, daDangNhap} = this.props.nguoiDung;

    return (
      <div className="App">
        <Router>
          <Header />
          <Switch>
            {/* Public */}
            {/* DangNhap khong dung history vi co withrouter roi */}
            <Route path="/" exact component={DangNhap}></Route>
            <Route path="/dang-nhap" exact component={DangNhap} />
            <Route path="/dang-ky" exact component={DangKy} />
            
            {/* Private */}
            <Route path="/nguoi-dung" exact component={daDangNhap ? ThongTinNguoiDung : DangNhap} />
            <Route path="/course-detail/:id" exact component={daDangNhap ? ChiTietKhoaHoc : DangNhap} />
            <Route path="/dskh-user" exact component={daDangNhap ? KhoaHocDaGhiDanh : DangNhap} />
            {/* chưa đc vì phải là giảng viên mới coi đc nó */}
            <Route path="/dskh" exact component={daDangNhap ? DanhSachKhoaHoc : DangNhap} />
            {/* <Route path="/dsnd" exact component={daDangNhap && nguoiDung.MaLoaiNguoiDung === 'GV'? DanhSachNguoiDung : NotFound} /> */}
            <Route path="/dsnd" exact component={daDangNhap? DanhSachNguoiDung : NotFound} />
            <Route path="/them-khoa-hoc" exact  component={daDangNhap ? ThemSuaKhoaHoc : DangNhap} />
            <Route path="/sua-khoa-hoc/:id" exact component={daDangNhap ? ThemSuaKhoaHoc : DangNhap} />

            <Route path="/" component={NotFound}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nguoiDung: state.nguoiDung
  }
}
export default connect(mapStateToProps)(App);
