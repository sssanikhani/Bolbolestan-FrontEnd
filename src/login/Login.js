import React, { Component } from 'react';
import axios from 'axios';

import './login-style.css';
import checkLogin from '../checkLogin';
import Spinner from '../Spinner';

class Login extends Component {
  state = {
    loading: true,
    falseCredentials: false,
    stdid: '',
    pass: ''
  };

  submitForm(event) {
    event.preventDefault();
    axios({
      method: 'post',
      url: 'http://localhost:8080/auth/login',
      data: {
        id: this.state.stdid,
        password: this.state.pass
      }
    })
      .then(response => {
        this.props.history.push('/');
      })
      .catch(error => {
        if (error.response.status === 401) {
          this.setState({falseCredentials: true});
        }
      });
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
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
      return (
        <React.Fragment>
          <Spinner />
        </React.Fragment>
      );
    let falseUserPass = (
      <React.Fragment>
        <br/>
      </React.Fragment>
    );
    if (this.state.falseCredentials) {
      falseUserPass = (
        <React.Fragment>
          <span style={{color: 'red'}}> نام کاربری یا رمز عبور اشتباه است! </span>
          <br/><br/>
        </React.Fragment>
      );
    }
    return (
      <div id="login-page">
        <div className="login-form">
          <fieldset className="login-fieldset">
            <form onSubmit={this.submitForm.bind(this)} >
              <legend className="login-legend">ورود به سامانه ی بلبلستان</legend><br/>
              {falseUserPass}
              <label for="std-id">نام کاربری(شماره دانشجویی)</label><br/>
              <input dir="ltr" onChange={this.handleChange.bind(this)} className="login-input" type="text" id="std-id" name="stdid" /><br /><br />
              <label for="pass">گذرواژه</label><br/>
              <input dir="ltr" onChange={this.handleChange.bind(this)} className="login-input" type="password" id="pass" name="pass" /><br /><br />
              <input className="login-button" type="submit" value="ورود" /><br /><br />
            </form>
          </fieldset>
        </div>
      </div>
    );
  }
}

export default Login;