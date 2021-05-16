import React from 'react';
import axios from 'axios';

import Spinner from '../common/Spinner';
import checkLogin from '../common/checkLogin';

import './signup-style.css';

class SignUp extends React.Component {
    state = {
        loading: true,
        err: null,
        firstName: '',
        secondName: '',
        birthDate: '',
        field: '',
        faculty: '',
        level: '',
        email: '',
        pass: ''
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
            method: 'post',
            url: 'http://localhost:8080/student',
            data: {
                firstName: this.state.firstName,
                secondName: this.state.secondName,
                birthDate: this.state.birthDate,
                field: this.state.field,
                faculty: this.state.faculty,
                level: this.state.level,
                email: this.state.email,
                pass: this.state.pass
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
                <div className="signup-form">
                    <fieldset className="signup-fieldset">
                        <legend className="signup-legend">ثبت نام</legend><br />
                        <label for="fname">نام</label><br /><br />
                        <input onChange={this.handleChange.bind(this)} className="signup-input" type="text" id="fname" name="firstName" /><br /><br />
                        <label for="sname">نام خانوادگی</label><br /><br />
                        <input onChange={this.handleChange.bind(this)} className="signup-input" type="text" id="sname" name="secondName" /><br /><br />
                        <label for="bdate">تاریخ تولد</label><br /><br />
                        <input onChange={this.handleChange.bind(this)} className="signup-input" type="text" id="bdate" name="birthDate" placeholder="13XX/XX/XX"/><br /><br />
                        <label for="field">رشته</label><br /><br />
                        <input onChange={this.handleChange.bind(this)} className="signup-input" type="text" id="field" name="field" /><br /><br />
                        <label for="faculty">دانشکده</label><br /><br />
                        <input onChange={this.handleChange.bind(this)} className="signup-input" type="text" id="faculty" name="faculty" /><br /><br />
                        <label for="level">مقطع</label><br /><br />
                        <input onChange={this.handleChange.bind(this)} className="signup-input" type="text" id="level" name="level" /><br /><br />
                        <label for="email">ایمیل</label><br /><br />
                        <input onChange={this.handleChange.bind(this)} className="signup-input" type="email" id="email" name="email" placeholder="example@mail.com" /><br /><br />
                        <label for="password">گذرواژه</label><br /><br />
                        <input onChange={this.handleChange.bind(this)} className="signup-input" type="text" id="password" name="password" /><br /><br />
                        <button onClick={this.submitForm.bind(this)} className="signup-green-button">ورود</button><br /><br />
                    </fieldset>
                </div>
            </div>
        );
    }
}

export default SignUp;