import React from 'react';
import axios from 'axios';

import './home-style.css';
import COVER from '../static/SRC/cover photo.jpg'
import checkLogin from '../common/checkLogin';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Spinner from '../common/Spinner';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        document.title = 'خانه';
        checkLogin()
            .then(res => {
                if (!res)
                    this.props.history.push('/login');
                this.setState({ loading: false });
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
                                    <AllReportCards />
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <Footer />
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
        this.setState({ loading: true });
        axios.get('http://localhost:8080/student')
            .then(res => {
                this.setState({ data: res.data });
                this.setState({ loading: false });
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

class AllReportCards extends React.Component {
    state = {
        loading: true,
        data: [],
    }

    sortReportCards(data) {
        let tempData = [...data];
        tempData.sort(
            (a, b) => {
                return (a.term > b.term) ? 1 : -1;
            }
        );
        return tempData;
    }

    componentDidMount() {
        this.setState({ loading: true });
        axios.get('http://localhost:8080/student/report-card')
            .then(response => {
                this.setState({ data: this.sortReportCards(response.data) });
                this.setState({ loading: false });
                //TODO check alternations
            })
            .catch(err => {
                if (err.status === 401)
                    window.location.href = '/login';
            });
    }

    render() {
        if (this.state.loading)
            return <Spinner />;
        const items = [];
        var i, j;
        for (i = 0; i < this.state.data.length; i++) {
            let term = this.state.data[i].term;
            items.push(
                <SingleReportCard data={this.state.data[i]} />
            );
        }

        return (
            <React.Fragment >
                {items}
                <br /><br />
            </React.Fragment>
        );
    }
}

class SingleReportCard extends React.Component {

    render() {
        const items = [];
        const grades = this.props.data.grades;
        var k;
        for (k = 0; k < grades.length; k++) {
            if (grades[k].grade >= 10) {
                items.push(<tr>
                    <td>{k + 1}</td>
                    <td>{grades[k].course.code}</td>
                    <td>{grades[k].course.name}</td>
                    <td>{grades[k].course.units} واحد</td>
                    <td>
                        <p className="home-accept-box home-box">قبول</p>
                    </td>
                    <td className="home-accept">{grades[k].grade}</td>
                </tr>);
            } else if (grades[k].grade < 10) {
                items.push(<tr>
                    <td>{k + 1}</td>
                    <td>{grades[k].course.code}</td>
                    <td>{grades[k].course.name}</td>
                    <td>واحد{grades[k].course.units}</td>
                    <td>
                        <p className="home-fail-box home-box">مردود</p>
                    </td>
                    <td className="home-fail">{grades[k].grade}</td>
                </tr>);
            } else {
                items.push(<tr>
                    <td>{k + 1}</td>
                    <td>{grades[k].course.code}</td>
                    <td>{grades[k].course.name}</td>
                    <td>واحد{grades[k].course.units}</td>
                    <td>
                        <p className="home-not-number-box home-box">نامشخص</p>
                    </td>
                    <td className="home-not-number">--</td>
                </tr>);
            }
        }

        let term = this.props.data.term;
        let gpa = this.props.data.gpa;
        return (
            <React.Fragment>
                <fieldset>
                    <legend><div>کارنامه - ترم {term}</div></legend>
                    <table>
                        {items}
                    </table>
                    <br />
                    <div className="home-gpa">معدل : {gpa}</div>
                </fieldset>
                <br /><br />
            </React.Fragment>

        );
    }
}


export default Home;