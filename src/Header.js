import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import './common.css';
import React from 'react';

class Header extends React.Component {

    render() {
        const page = this.props.page;
        const isLoggedIn = this.props.isLoggedIn;
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

        let leftSide;
        if (isLoggedIn) {
            leftSide = (
                <div className="leftside">
                    <span>خروج</span>
                    <img src="../static/SRC/001-log-out.png" className="icon" />
                </div>
            );
        }
        else {
            leftSide = (
                <div className="leftSide">
                        <Link to="/login">ورود</Link>
                </div>
            );
        }

        return (
            <header className="fixed-top">
                <div className="rightside">
                    <img className="logo" src="../static/SRC/logo.png" />
                    {links}
                </div>
                {leftSide}
            </header>
        );   
    }
}

export default Header;