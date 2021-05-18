import React from 'react';
import axios from 'axios';
import validator from 'validator';

import Spinner from '../common/Spinner';
import checkLogin from '../common/checkLogin';

import './forgetPassword-style.css';

class ForgetPassword extends React.Component {
    state = {
        loading: true,
        err: null,
        email: '',
        Notife: ''
    }

    componentDidMount() {
        document.title = 'ُفراموشی رمز عبور';
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

        // const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var e_mail;
        e_mail = document.getElementById("email").value;
        let Notife = <br/>;

        if(!validator.isEmail(e_mail)){
            Notife = (
                <React.Fragment>
                  <span style={{color: 'red'}}> ایمیل وارد شده نامعتبر است! </span>
                  <br/><br/>
                </React.Fragment>
              );
              this.setState({Notife: Notife})
        } else {
            this.setState({ loading: true });
            axios({
                // TODO
                method: 'post',
                url: 'http://localhost:8080/auth/forget-password',
                data: {
                    email: this.state.email
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
    }

    handleforget({ target }) {
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
                        <legend className="forgetPassword-legend">فراموشی رمزعبور</legend><br />
                        {this.state.Notife}
                        <p >ایمیل خود را وارد کنید</p>
                        <label for="email">ایمیل</label><br /><br />
                        <input onforget={this.handleforget.bind(this)} className="forgetPassword-input" type="email" id="email" name="email" /><br /><br />
                        <button onClick={this.submitForm.bind(this)} className="forgetPassword-green-button">تایید</button><br /><br />
                    </fieldset>
                </div>
            </div>
        );
    }
}

export default ForgetPassword;