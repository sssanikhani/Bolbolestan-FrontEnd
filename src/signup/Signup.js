import React from 'react';
import axios from 'axios';
import validator from 'validator';
import Spinner from '../common/Spinner';
import checkLogin from '../common/checkLogin';

import './signup-style.css';

class SignUp extends React.Component {
    state = {
        loading: true,
        falseCredentials: false,
        err: null,
        name: '',
        secondName: '',
        id: '',
        birthDate: '',
        field: '',
        faculty: '',
        level: '',
        email: '',
        password: '',
        Notife: ''
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
        // const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var e_mail, pass;
        e_mail = document.getElementById("email").value;
        pass = document.getElementById("password").value;
        let Notife = <br/>;
        if(!validator.isEmail(e_mail)){
            Notife = (
                <React.Fragment>
                  <span style={{color: 'red'}}> ایمیل وارد شده نامعتبر است! </span>
                  <br/><br/>
                </React.Fragment>
              );
              this.setState({Notife: Notife})
        }else if(pass.length <6) {
            Notife = (
                <React.Fragment>
                  <span style={{color: 'red'}}> رمز عبور نامعتبر است! </span>
                  <br/><br/>
                </React.Fragment>
              );
              this.setState({Notife: Notife})

        } else {

        this.setState({ loading: true });
        axios({
            method: 'post',
            url: 'http://localhost:8080/auth/signup',
            data: {
                id: this.state.id,
                email: this.state.email,
                password: this.state.password,
                name: this.state.name,
                secondName: this.state.secondName,
                birthDate: this.state.birthDate,
                faculty: this.state.faculty,
                field: this.state.field,
                level: this.state.level,
                status: "مشغول به تحصیل",
                img: "http://138.197.181.131:5100/img/art.jpg"
            }
        })
            .then(res => {
                console.log(res.data)
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
                <div className="signup-form">
                    <fieldset className="signup-fieldset">
                        <legend className="signup-legend">ثبت نام</legend><br />
                        {this.state.Notife}
                        <label for="fname">نام</label><br />
                        <input onChange={this.handleChange.bind(this)} className="signup-input" type="text" id="name" name="name" /><br />
                        <label for="sname">نام خانوادگی</label><br />
                        <input onChange={this.handleChange.bind(this)} className="signup-input" type="text" id="secondName" name="secondName" /><br />
                        <label for="id">شماره دانشجویی</label><br />
                        <input onChange={this.handleChange.bind(this)} className="signup-input" type="text" id="id" name="id" /><br />
                        <label for="bdate">تاریخ تولد</label><br />
                        <input onChange={this.handleChange.bind(this)} className="signup-input" type="text" id="birthDate" name="birthDate" placeholder="13XX/XX/XX"/><br />
                        <label for="field">رشته</label><br />
                        <input onChange={this.handleChange.bind(this)} className="signup-input" type="text" id="field" name="field" /><br />
                        <label for="faculty">دانشکده</label><br />
                        <input onChange={this.handleChange.bind(this)} className="signup-input" type="text" id="faculty" name="faculty" /><br />
                        <label for="level">مقطع</label><br />
                        <input onChange={this.handleChange.bind(this)} className="signup-input" type="text" id="level" name="level" /><br />
                        <label for="email">ایمیل</label><br />
                        <input onChange={this.handleChange.bind(this)} className="signup-input" type="email" id="email" name="email" placeholder="example@mail.com" /><br />
                        <label for="password">گذرواژه</label><br />
                        <input onChange={this.handleChange.bind(this)} className="signup-input" type="text" id="password" name="password" /><br /><br />
                        <button onClick={this.submitForm.bind(this)} className="signup-green-button">ورود</button><br />
                    </fieldset>
                </div>
            </div>
        );
    }
}

export default SignUp;