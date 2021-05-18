import React from 'react';
import axios from 'axios';

import Spinner from '../common/Spinner';
import checkLogin from '../common/checkLogin';

import './changePassword-style.css';

class ChangePassword extends React.Component {
    state = {
        loading: true,
        err: null,
        password: '',
        re_password: '',
        Notife: ''

    }

    componentDidMount() {
        document.title = 'تغییرگذرواژه';
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

        var pass, re_pass;
        pass = document.getElementById("password").value;
        re_pass = document.getElementById("re_password").value;
        let Notife = <br/>;

        if(length(pass) < 6) {
            Notife = (
                <React.Fragment>
                  <span style={{color: 'red'}}> رمز عبور نامعتبر است! </span>
                  <br/><br/>
                </React.Fragment>
              );
              this.setState({Notife: Notife})

        } else if(pass != re_pass){
            Notife = (
                <React.Fragment>
                  <span style={{color: 'red'}}> رمز عبور و تکرار آن همخوانی ندارد! </span>
                  <br/><br/>
                </React.Fragment>
              );
              this.setState({Notife: Notife})

        } else {
        this.setState({ loading: true });
        axios({
            // TODO
            method: 'post',
            url: 'http://localhost:8080/auth/change-password',
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
                <div className="changePassword-form">
                    <fieldset className="changePassword-fieldset">
                        <legend className="changePassword-legend">تغییرگذرواژه</legend><br />
                        {this.state.Notife}
                        <label for="password">گذرواژه</label><br /><br />
                        <input onChange={this.handleChange.bind(this)} className="changePassword-input" type="text" id="password" name="password" /><br /><br />
                        <label for="password">تکرار گذرواژه</label><br /><br />
                        <input onChange={this.handleChange.bind(this)} className="changePassword-input" type="text" id="re_password" name="re_password" /><br /><br />
                        <button onClick={this.submitForm.bind(this)} className="changePassword-green-button">تایید</button><br /><br />
                    </fieldset>
                </div>
            </div>
        );
    }
}

export default ChangePassword;