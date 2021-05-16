import React from 'react';
import axios from 'axios';

import Spinner from '../common/Spinner';
import checkLogin from '../common/checkLogin';

import './forgetPassword-style.css';

class ForgetPassword extends React.Component {
    state = {
        loading: true,
        err: null,
        password: ''
    }

    componentDidMount() {
        document.title = 'ثبت نام';
        this.setState({ loading: true });
        checkLogin()
            .then(res => {
                if (res)
                    window.location.href = '/';
                else
                    this.setState({ loading: false });
            });
    }

    submitForm() {
        this.setState({ loading: true });
        axios({
            // TODO
            method: 'post',
            url: 'http://localhost:8080/student',
            data: {
                password: this.state.password
            }
        })
            .then(res => {
                window.location.href = '/';
            })
            .catch(err => {
                this.setState({
                    err: err,
                    loading: false
                });
            });
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }

    render() {
        if (this.state.loading)
            return <Spinner />;
        return (
            <div className="cover-background">
                <div className="forgetPassword-form">
                    <fieldset className="forgetPassword-fieldset">
                        <legend className="forgetPassword-legend">ثبت نام</legend><br />
                        <label for="password">گذرواژه</label><br /><br />
                        <input onChange={this.handleChange.bind(this)} className="forgetPassword-input" type="text" id="password" name="password" /><br /><br />
                        <label for="password">تکرار گذرواژه</label><br /><br />
                        <input onChange={this.handleChange.bind(this)} className="forgetPassword-input" type="text" id="re-password" name="re-password" /><br /><br />
                        <button onClick={this.submitForm.bind(this)} className="forgetPassword-green-button">تایید</button><br /><br />
                    </fieldset>
                </div>
            </div>
        );
    }
}

export default ForgetPassword;