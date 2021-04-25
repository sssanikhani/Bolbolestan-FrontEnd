import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import './common.css';
import React from 'react';
import logo from '../static/SRC/logo.png';
import logoutLogo from '../static/SRC/001-log-out.png'
import axios from 'axios';

class Header extends React.Component {

  logout() {
    axios({
      method: 'POST',
      url: 'http://localhost:8080/auth/logout',
      data:{}
    })
      .then(res => {
        window.location.href = '/login';
      })
      .catch(err => {
        window.location.href = '/login';
      })
  }

  render() {
    const page = this.props.page;
    let links;
    if (page === 'plan') {
      links = (
        <React.Fragment>
          <Link to="/home">خانه</Link>
          <Link to="/courses">انتخاب واحد</Link>
        </React.Fragment>
      );
    }
    else if (page === 'courses') {
      links = (
        <React.Fragment>
          <Link to="/home">خانه</Link>
          <Link to="/plan">برنامه هفتگی</Link>
        </React.Fragment>
      );
    }
    else {
      links = (
        <React.Fragment>
          <Link to="/courses">انتخاب واحد</Link>
          <Link to="/plan">برنامه هفتگی</Link>
        </React.Fragment>
      );
    }

    return (
      <header className="fixed-top">
        <div className="rightside">
          <img className="logo" src={logo} />
          {links}
        </div>
        <button className="leftside logout-button" onClick={this.logout.bind(this)}>
          <span>خروج</span>
          <img src={logoutLogo} className="icon" />
        </button>
      </header>
    );
  }
}

export default Header;