import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import checkLogin from '../common/checkLogin';
import Spinner from '../common/Spinner';
import './login-style.css';
import Footer from '../common/Footer';
import validator from 'validator';

class Login extends Component {
    state = {
        loading: true,
        falseCredentials: false,
        email: '',
        pass: '',
        err: false,
        emailErr: false
    };

    submitForm(event) {
        event.preventDefault();
        if (this.state.emailErr
            || this.state.email.length === 0
            || this.state.pass.length === 0
        ) {
            this.setState({ err: true });
            return;
        } else {
            this.setState({ err: false });
        }

        axios({
            method: 'post',
            url: 'http://87.247.185.122:32138/auth/login',
            data: {
                email: this.state.email,
                password: this.state.pass
            }
        })
            .then(response => {
                localStorage.setItem('token', response.data.access);
                this.props.history.push('/');
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    this.setState({ falseCredentials: true });
                }
            });
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }

    handleEmailChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
        let email = target.value;
        if (!validator.isEmail(email))
            this.setState({ emailErr: true });
        else
            this.setState({ emailErr: false });
    }

    componentDidMount() {
        document.title = "ورود";
        checkLogin()
            .then(
                res => {
                    if (!res)
                        this.setState({ loading: false })
                    else
                        this.props.history.push("/");
                }
            )
    }

    render() {
        if (this.state.loading)
            return <Spinner />;
        let errSec = <br />;
        if (this.state.falseCredentials) {
            errSec = (
                <React.Fragment>
                    <span className="form-error"> نام کاربری یا رمز عبور اشتباه است! </span>
                    <br /><br />
                </React.Fragment>
            );
        }
        if (this.state.err) {
            errSec = (
                <React.Fragment>
                    <span class="form-error"> اطلاعات وارد شده معتبر نیست! </span>
                    <br /><br />
                </React.Fragment>
            );
        }

        let emailErr = null;
        if (this.state.emailErr)
            emailErr = (
                <div className="input-error">* ایمیل نامعتبر است!</div>
            );

        return (
            <div className="cover-background">
                <div className="login-form">
                    <fieldset className="login-fieldset">
                        <form onSubmit={this.submitForm.bind(this)} >
                            <legend className="login-legend">ورود به سامانه ی بلبلستان</legend><br />
                            {errSec}
                            <label htmlFor="email">پست الکترونیکی (ایمیل)</label><br />
                            {emailErr}
                            <input dir="ltr" onChange={this.handleEmailChange.bind(this)} className="login-input" type="text" id="email" name="email" /><br /><br />
                            <label htmlFor="pass">گذرواژه</label><br />
                            <input dir="ltr" onChange={this.handleChange.bind(this)} className="login-input" type="password" id="pass" name="pass" /><br /><br />
                            <input className="login-button" type="submit" value="ورود" /><br /><br />
                        </form>
                        <Link to="/signup">ثبت نام</Link> <br />
                        <Link style={{ color: "red" }} to="/forget-password">فراموشی رمز عبور</Link>
                    </fieldset>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Login;