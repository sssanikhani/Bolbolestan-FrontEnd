import React from 'react';
import axios from 'axios';

import Spinner from '../common/Spinner';
import checkLogin from '../common/checkLogin';

import './changePassword-style.css';
import { Link } from 'react-router-dom';

class ChangePassword extends React.Component {
    state = {
        loading: true,
        reqErr: null,
        err: false,
        password: '',
        confirm: '',
        passwordErr: false,
        confirmErr: false,
        token: null
    }

    componentDidMount() {
        document.title = 'تغییرگذرواژه';
        let url = new URL(window.location.href);
        let token = url.searchParams.get("token");
        this.setState({ token: token });
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
        if (this.state.passwordErr
            || this.state.password.length === 0
            || this.state.confirmErr
            || this.state.confirm.length === 0
        ) {
            this.setState({ err: true });
            return;
        } else {
            this.setState({ err: false });
        }

        this.setState({ loading: true });
        axios({
            method: 'post',
            url: 'http://localhost:8080/auth/change-password',
            headers: {
                'Authorization': 'Bearer ' + this.state.token
            },
            data: {
                password: this.state.password
            }
        })
            .then(res => {
                window.location.href = '/login';
            })
            .catch(err => {
                if (err.response)
                    this.setState({
                        reqErr: err.response,
                        loading: false
                    });
            });
    }

    handlePasswordChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
        let password = target.value;
        if (password.length > 0 && password.length < 6)
            this.setState({ passwordErr: true });
        else
            this.setState({ passwordErr: false });
    }

    handleConfirmChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
        let confirm = target.value;
        let password = this.state.password;
        if (confirm.length > 0 && confirm !== password)
            this.setState({ confirmErr: true });
        else
            this.setState({ confirmErr: false });
    }

    render() {
        if (this.state.loading)
            return <Spinner />;
        let errSec = null;
        if (this.state.reqErr) {
            errSec = (
                <div className="form-error"><b>شما اجازه این کار را ندارید!</b></div>
            );
        }
        if (this.state.err) {
            errSec = (
                <div className="form-error">اطلاعات وارد شده صحیح نیست!</div>
            );
        }
        let passErr = null;
        let confirmErr = null;
        if (this.state.passwordErr)
            passErr = (
                <div className="input-error">* رمز عبور خیلی کوتاه است!</div>
            );
        if (this.state.confirmErr)
            confirmErr = (
                <div className="input-error">* تکرار رمز عبور با رمز عبور مطابقت ندارد!</div>
            );
        return (
            <div className="cover-background">
                <form onSubmit={this.submitForm.bind(this)} className="changePassword-form">
                    <fieldset className="changePassword-fieldset">
                        <legend className="changePassword-legend">تغییرگذرواژه</legend><br />
                        {errSec}
                        <label for="password">گذرواژه</label><br /><br />
                        {passErr}
                        <input onChange={this.handlePasswordChange.bind(this)} className="changePassword-input" type="password" id="password" name="password" /><br /><br />
                        <label for="password">تکرار گذرواژه</label><br /><br />
                        {confirmErr}
                        <input onChange={this.handleConfirmChange.bind(this)} className="changePassword-input" type="password" id="confirm" name="confirm" /><br /><br />
                        <input className="changePassword-green-button" type="submit" value="تغییر رمز" /><br /><br />
                        <Link to="/login">انصراف</Link><br />
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default ChangePassword;