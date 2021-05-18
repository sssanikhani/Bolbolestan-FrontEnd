import React from 'react';
import axios from 'axios';
import validator from 'validator';
import Spinner from '../common/Spinner';
import checkLogin from '../common/checkLogin';

import './signup-style.css';
import { Link } from 'react-router-dom';

class SignUp extends React.Component {
    state = {
        loading: true,
        reqErr: null,
        name: '',
        secondName: '',
        id: '',
        birthDate: '',
        field: '',
        faculty: '',
        level: '',
        email: '',
        password: '',
        confirm: '',
        err: false,
        emailErr: false,
        idErr: false,
        passErr: false,
        confirmErr: false
    }

    componentDidMount() {
        document.title = 'ثبت نام';
        this.setState({ loading: true });
        checkLogin()
            .then(res => {
                if (res)
                    this.props.history.push('/');
                else
                    this.setState({ loading: false });
            });
    }

    submitForm(event) {
        event.preventDefault();
        if (this.state.emailErr
            || this.state.idErr
            || this.state.passErr
            || this.state.confirmErr
        ) {
            this.setState({ err: true });
            return;
        } else {
            this.setState({ err: false });
        }

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
                localStorage.setItem("token", res.data.access);
                this.props.history.push('/');
            })
            .catch(err => {
                if(err.response)
                    this.setState({
                        reqErr: err.response,
                        loading: false
                    });
            });
    }

    handleEmailChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
        let email = target.value;
        if (email.length > 0 && !validator.isEmail(email))
            this.setState({ emailErr: true });
        else
            this.setState({ emailErr: false });
    }

    handleIdChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
        let id = target.value;
        if (id.length > 0 && isNaN(id))
            this.setState({ idErr: true });
        else
            this.setState({ idErr: false });
    }

    handlePasswordChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
        let password = target.value;
        if (password.length > 0 && password.length < 6)
            this.setState({ passErr: true });
        else
            this.setState({ passErr: false });
    }

    handleConfirmChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
        let password = this.state.password;
        let confirm = target.value;
        if (confirm.length > 0 && password !== confirm)
            this.setState({ confirmErr: true });
        else
            this.setState({ confirmErr: false });
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }

    render() {
        if (this.state.loading)
            return <Spinner />;

        let errSec = null;
        if(this.state.reqErr)
            errSec = (
                <div className="signup-form-error">
                    <b>ایمیل یا شماره دانشجویی موجود می باشد!</b>
                </div>
            );
        if(this.state.err)
            errSec = (
                <div className="signup-form-error">* اطلاعات وارد شده صحیح نیست!</div>
            );

        let idErr = null;
        let emailErr = null;
        let passErr = null;
        let confirmErr = null;
        if (this.state.idErr)
            idErr = (
                <div className="input-error">* شماره دانشجویی باید به صورت عدد باشد!</div>
            );
        if (this.state.emailErr)
            emailErr = (
                <div className="input-error">* ایمیل نامعتبر است!</div>
            );
        if (this.state.passErr)
            passErr = (
                <div className="input-error">* رمز عبور خیلی کوتاه است!</div>
            );
        if (this.state.confirmErr)
            confirmErr = (
                <div className="input-error">* تکرار رمز عبور با رمز عبور مطابقت ندارد!</div>
            );
        return (
            <div className="cover-background">
                <form onSubmit={this.submitForm.bind(this)} className="signup-form">
                    <fieldset className="signup-fieldset">
                        <legend className="signup-legend">ثبت نام</legend>
                        {errSec}
                        <div className="input-container">
                            <label className="signup-lable" for="fname">نام</label>
                            <input onChange={this.handleChange.bind(this)} className="signup-input" type="text" id="name" name="name" />
                        </div>
                        <div className="input-container">
                            <label className="signup-lable" for="sname">نام خانوادگی</label>
                            <input onChange={this.handleChange.bind(this)} className="signup-input" type="text" id="secondName" name="secondName" />
                        </div>
                        {idErr}
                        <div className="input-container">
                            <label className="signup-lable" for="id">شماره دانشجویی</label>
                            <input dir='ltr' onChange={this.handleIdChange.bind(this)} className="signup-input" type="text" id="id" name="id" />
                        </div>
                        <div className="input-container">
                            <label className="signup-lable" for="bdate">تاریخ تولد</label>
                            <input dir='ltr' onChange={this.handleChange.bind(this)} className="signup-input" type="text" id="birthDate" name="birthDate" placeholder="13XX/XX/XX" />
                        </div>
                        <div className="input-container">
                            <label className="signup-lable" for="field">رشته</label>
                            <input onChange={this.handleChange.bind(this)} className="signup-input" type="text" id="field" name="field" />
                        </div>
                        <div className="input-container">
                            <label className="signup-lable" for="faculty">دانشکده</label>
                            <input onChange={this.handleChange.bind(this)} className="signup-input" type="text" id="faculty" name="faculty" />
                        </div>
                        <div className="input-container">
                            <label className="signup-lable" for="level">مقطع</label>
                            <input onChange={this.handleChange.bind(this)} className="signup-input" type="text" id="level" name="level" />
                        </div>
                        {emailErr}
                        <div className="input-container">
                            <label className="signup-lable" for="email">ایمیل</label>
                            <input dir='ltr' onChange={this.handleEmailChange.bind(this)} className="signup-input" type="email" id="email" name="email" placeholder="example@mail.com" />
                        </div>
                        {passErr}
                        <div className="input-container">
                            <label className="signup-lable" for="password">گذرواژه</label>
                            <input dir='ltr' onChange={this.handlePasswordChange.bind(this)} className="signup-input" type="password" id="password" name="password" />
                        </div>
                        {confirmErr}
                        <div className="input-container">
                            <label className="signup-lable" for="confirm">تکرار گذرواژه</label>
                            <input dir='ltr' onChange={this.handleConfirmChange.bind(this)} className="signup-input" type="password" id="confirm" name="confirm" />
                        </div>
                        <input className="signup-green-button" type="submit" value="ثبت نام" /><br /><br />
                        <Link to="/login">ورود</Link>
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default SignUp;