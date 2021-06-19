import React from 'react';
import axios from 'axios';
import validator from 'validator';

import Spinner from '../common/Spinner';
import checkLogin from '../common/checkLogin';

import './forgetPassword-style.css';
import { Link } from 'react-router-dom';

class ForgetPassword extends React.Component {
    state = {
        loading: true,
        reqErr: null,
        email: '',
        err: false,
        emailErr: false,
        done: false
    }

    componentDidMount() {
        document.title = 'فراموشی رمز عبور';
        this.setState({ loading: true });
        checkLogin()
            .then(res => {
                if (res)
                    window.location.href = '/';
                else
                    this.setState({ loading: false });
            });
    }

    submitForm(event) {
        event.preventDefault();
        if(this.state.emailErr || this.state.email.length === 0) {
            this.setState({ err: true });
            return;
        } else {
            this.setState({ err: false });
        }

        this.setState({ loading: true });
        axios({
            method: 'post',
            url: 'http://87.247.185.122:32138/auth/forget-password',
            data: {
                email: this.state.email
            }
        })
            .then(res => {
                this.setState({ done: true, loading: false });
            })
            .catch(err => {
                if(err.response)
                    this.setState({
                        reqErr: err.response,
                        loading: false
                    });
            });

    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
        let email = target.value;
        if(email.length > 0 && !validator.isEmail(email))
            this.setState({ emailErr: true });
        else
            this.setState({ emailErr: false });
    }

    render() {
        if (this.state.loading)
            return <Spinner />;
        if (this.state.done)
            return (
                <div className="cover-background">
                    <div onSubmit={this.submitForm.bind(this)} className="forgetPassword-form">
                        <fieldset className="forgetPassword-fieldset">
                            <legend className="forgetPassword-legend">فراموشی رمزعبور</legend><br />
                            <div className="done-message"><h3>*ایمیل حاوی لینک فراموشی رمز ارسال شد*</h3></div>
                            <Link to="/login">بازگشت به صفحه ورود</Link>
                        </fieldset>
                    </div>
                </div>
            );
        let errSec = null;
        if (this.state.reqErr)
                errSec = (
                    <div className="form-error">کاربری با این ایمیل یافت نشد!</div>
                );
        if (this.state.err)
                errSec = (
                    <div className="form-error">اطلاعات وارد شده صحیح نیست!</div>
                );
        let emailErr = null;
        if (this.state.emailErr)
                emailErr = (
                    <div className="input-error">* ایمیل نامعتبر است!</div>
                );
        return (
            <div className="cover-background">
                <form onSubmit={this.submitForm.bind(this)} className="forgetPassword-form">
                    <fieldset className="forgetPassword-fieldset">
                        <legend className="forgetPassword-legend">فراموشی رمزعبور</legend><br />
                        {errSec}
                        <label for="email">ایمیل خود را وارد کنید</label><br /><br />
                        {emailErr}
                        <input dir="ltr" onChange={this.handleChange.bind(this)} className="forgetPassword-input" type="email" id="email" name="email" /><br /><br />
                        <input className="forgetPassword-green-button" type="submit" value="ارسال ایمیل" /><br /><br />
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default ForgetPassword;