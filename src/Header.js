import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import './common.css';
import React from 'react';
import logo from './static/SRC/logo.png';
import logoutLogo from './static/SRC/001-log-out.png'

class Header extends React.Component {

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
        <div className="leftside">
          <span>خروج</span>
          <img src={logoutLogo} className="icon" />
        </div>
      </header>
    );
  }
}

export default Header;