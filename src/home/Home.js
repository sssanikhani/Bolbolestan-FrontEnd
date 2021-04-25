import React from 'react';
import axios from 'axios';

import './home-style.css';
import '../css/total.css';

import COVER from '../static/SRC/cover photo.jpg'
import checkLogin from '../common/checkLogin';
import Header from '../common/Header';
import Spinner from '../common/Spinner';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        checkLogin()
            .then(res => {
                if (!res)
                    this.props.history.push('/login');
                this.setState({loading: false});
            });
    }

    render() {
        if (this.state.loading)
            return (
                <React.Fragment>
                    <Header page="home" />
                    <Spinner />
                </React.Fragment>
            );
        return (
            <React.Fragment>
                <Header page="home" />
                <div className="home-slider">
                    <img src={COVER} className="home-cover" />
                </div>
                <br /><br />
                <div className="home-information">
                    <table>
                        <tr>
                            <td className="home-seperator-right">
                                <Information />
                            </td>
                            <td className="home-seperator-left">
                                <div className="home-karname">
                                    <Karnames />
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </React.Fragment>
        );
    }
}


class Information extends React.Component {

    state = {
        loading: true,
        data: [],
    };

    componentDidMount() {
        this.setState({loading: true});
        axios.get('http://localhost:8080/student')
            .then(res => {
                this.setState({ data: res.data });
                this.setState({loading: false});
            })
            .catch(err => {
                if (err.status === 401)
                    window.location.href = '/login';
            });
    }

    render() {
        if (this.state.loading)
            return (
                <Spinner />
            )
        return (
            <div className="home-information-detail">
                <table className="home-info-detail">
                    <tr>
                        <td>
                            <img src={this.state.data.img} className="home-profile-pic" />
                        </td>
                    </tr>
                    <br /><br />
                    <tr>
                        <td><p><span>نام:</span>{this.state.data.name}</p></td>
                    </tr>
                    <tr>
                        <td><p><span>نام خانوادگی:</span>{this.state.data.secondName}</p></td>
                    </tr>
                    <tr>
                        <td><p><span>شماره دانشجویی:</span> {this.state.data.id}</p></td>
                    </tr>
                    <tr>
                        <td><p><span>تاریخ تولد:</span> {this.state.data.birthDate}</p></td>
                    </tr>
                    <tr>
                        <td><p><span>معدل کل:</span> {this.state.data.gpa}</p></td>
                    </tr>
                    <tr>
                        <td><p><span>واحد گذرانده:</span> {this.state.data.totalPassedUnits}</p></td>
                    </tr>
                    <tr>
                        <td><p><span>دانشکده:</span>{this.state.data.faculty}</p></td>
                    </tr>
                    <tr>
                        <td><p><span>رشته:</span>{this.state.data.field}</p></td>
                    </tr>
                    <tr>
                        <td><p><span>مقطع:</span>{this.state.data.level}</p></td>
                    </tr>
                    <tr>
                        <td><p className="home-type">{this.state.data.status}</p></td>
                    </tr>
                </table>
            </div>
        );
    }
}

class Karnames extends React.Component {
    state = {
        loading: true,
        data: [],
    }

    componentDidMount() {
        this.setState({loading: true});
        axios.get('http://localhost:8080/student/report-card')
            .then(response => {
                this.setState({ data: response.data });
                this.setState({loading: false});
                //TODO check alternations
            })
            .catch(err => {
                if(err.status === 401)
                    window.location.href = '/login';
            });
    }

    render() {
        if(this.state.loading)
            return <Spinner />;
        const items = [];
        var i, j;
        for (i = this.state.data.length - 1; i >= 0; i--) {

            items.push(
                <React.Fragment>
                    <fieldset>
                        <legend><div>کارنامه - ترم {i + 1}</div></legend>
                        <table>
                            <AnKarname data={this.state.data[i].grades} />
                        </table>
                        <br />
                        <div className="home-gpa">معدل : {this.state.data[i].gpa}</div>
                    </fieldset>
                    <br /><br />
                </React.Fragment>);
        }

        return (
            <React.Fragment >
                {items}
                <br /><br />
            </React.Fragment>
        );
    }
}

class AnKarname extends React.Component {

    render() {
        const items = [];
        var k;
        for (k = 0; k < this.props.data.length; k++) {
            if (this.props.data[k].grade >= 10) {
                items.push(<tr>
                    <td>{k + 1}</td>
                    <td>{this.props.data[k].course.code}</td>
                    <td>{this.props.data[k].course.name}</td>
                    <td>{this.props.data[k].course.units} واحد</td>
                    <td>
                        <p className="home-accept-box home-box">قبول</p>
                    </td>
                    <td className="home-accept">{this.props.data[k].grade}</td>
                </tr>);
            } else if (this.props.data[k].grade < 10) {
                items.push(<tr>
                    <td>{k + 1}</td>
                    <td>{this.props.data[k].course.code}</td>
                    <td>{this.props.data[k].course.name}</td>
                    <td>واحد{this.props.data[k].course.units}</td>
                    <td>
                        <p className="home-fail-box home-box">مردود</p>
                    </td>
                    <td className="home-fail">{this.props.data[k].grade}</td>
                </tr>);
            } else {
                items.push(<tr>
                    <td>{k + 1}</td>
                    <td>{this.props.data[k].course.code}</td>
                    <td>{this.props.data[k].course.name}</td>
                    <td>واحد{this.props.data[k].course.units}</td>
                    <td>
                        <p className="home-not-number-box home-box">نامشخص</p>
                    </td>
                    <td className="home-not-number">--</td>
                </tr>);
            }
        }

        return (
            items
        );
    }
}


export default Home;