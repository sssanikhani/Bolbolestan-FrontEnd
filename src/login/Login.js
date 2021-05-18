import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import checkLogin from '../common/checkLogin';
import Spinner from '../common/Spinner';
import './login-style.css';
import Footer from '../common/Footer';

class Login extends Component {
  state = {
    loading: true,
    falseCredentials: false,
    email: '',
    pass: ''
  };

  submitForm(event) {
    event.preventDefault();
    axios({
      method: 'post',
      url: 'http://localhost:8080/auth/login',
      data: {
        email: this.state.email,
        password: this.state.pass
      }
    })
      .then(response => {
        console.log(response);
        localStorage.setItem('token', response.data.access);
        this.props.history.push('/');
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
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
      return <Spinner />;
    let falseUserPass = <br/>;
    if (this.state.falseCredentials) {
      falseUserPass = (
        <React.Fragment>
          <span style={{color: 'red'}}> نام کاربری یا رمز عبور اشتباه است! </span>
          <br/><br/>
        </React.Fragment>
      );
    }
    return (
      <div className="cover-background">
        <div className="login-form">
          <fieldset className="login-fieldset">
            <form onSubmit={this.submitForm.bind(this)} >
              <legend className="login-legend">ورود به سامانه ی بلبلستان</legend><br/>
              {falseUserPass}
              <label htmlFor="email">پست الکترونیکی (ایمیل)</label><br/>
              <input dir="ltr" onChange={this.handleChange.bind(this)} className="login-input" type="text" id="email" name="email" /><br /><br />
              <label htmlFor="pass">گذرواژه</label><br/>
              <input dir="ltr" onChange={this.handleChange.bind(this)} className="login-input" type="password" id="pass" name="pass" /><br /><br />
              <input className="login-button" type="submit" value="ورود" /><br /><br />
            </form>
            <Link to="/signup">ثبت نام</Link>
          </fieldset>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Login;