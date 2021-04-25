import React from 'react';
import axios from 'axios';
import './courses-style.css';
import Header from '../common/Header';

import TRUSH from '../static/SRC/012-trash-bin.png';
import REFRESH from '../static/SRC/reset.png';
import ADD from '../static/SRC/add.png';
import ENTEZAR from '../static/SRC/entezar.png';

class Courses extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Header page="courses" />
                <br /><br /><br />
                <SelectedCourses />
                <br /><br /><br />
                <AllCourses />
                <br /><br /><br />
            </React.Fragment>
        );
    }
}

class SelectedCourses extends React.Component {
    state = {
        data: [],
        offerings: [],
        temp: 0
    }
    componentDidMount() {
        axios({
            method: 'get',
            url: 'http://localhost:8080/student/offerings',
        })
            .then(response => {
                this.setState({ data: response.data });
                this.setState({ offerings: response.data.offerings });
            });
    }

    handel(sel) {
        console.log(sel);
        axios({
            method: 'post',
            url: 'http://localhost:8080/student/offerings/' + sel,
        })
        axios({
            method: 'get',
            url: 'http://localhost:8080/student/offerings',
        })
            .then(response => {
                this.setState({ data: response.data });
                this.setState({ offerings: response.data.offerings });
                window.location.reload();
            });
    }

    delete(_code, _classCode) {
        axios({
            method: 'delete',
            url: 'http://localhost:8080/student/offerings',
            data: {
                code: _code,
                classCode: _classCode
            }
        })
        window.location.reload();

    }
    render() {
        const items = [];
        var i;
        for (i = 0; i < this.state.offerings.length; i++) {
            items.push(
                <tr>
                    <td><img onClick={this.delete.bind(this, this.state.offerings[i].offering.course.code, this.state.offerings[i].offering.classCode)} src={TRUSH} className="icon" /></td>
                    <td>
                        <button className={"state " + this.state.offerings[i].status}>
                            {
                                this.state.offerings[i].status == "registered" ? "ثبت شده " :
                                    this.state.offerings[i].status == "waiting" ?
                                        "در انتظار" : "ثبت نهایی نشده"
                            }

                        </button>
                    </td>
                    <td>{this.state.offerings[i].offering.course.code
                        + "-" + this.state.offerings[i].offering.classCode}</td>
                    <td>{this.state.offerings[i].offering.course.name}</td>
                    <td>{this.state.offerings[i].offering.teacher}</td>
                    <td>{this.state.offerings[i].offering.course.units}</td>
                </tr>
            );
        }
        return (
            <div className="chosenCourses">
                <fieldset>
                    <legend >دروس انتخاب شده </legend>
                    <br />
                    <div>
                        <table>
                            <tr>
                                <th width="5%"></th>
                                <th width="30%">وضعیت</th>
                                <th width="15%">کد</th>
                                <th width="30%">نام درس</th>
                                <th width="15%">استاد</th>
                                <th width="5%">واحد</th>
                            </tr>
                            {items}
                        </table>
                    </div>
                    <hr />
                    <div className="chosen.chosenCourses-bottom">
                        <div className="chosenCourse-bottom-right-div">
                            <p>تعداد واحد های ثبت شده: {this.state.data.chosenUnits}</p>
                        </div>
                        <div className="chosenCourse-bottom-left-div">
                            <button onClick={this.handel.bind(this, "submit")} className="green-button submit">ثبت نهایی</button>
                            <img onClick={this.handel.bind(this, "reset")} src={REFRESH} className="reset" />
                        </div>
                    </div>
                </fieldset>
            </div >
        );
    }
}

function AllCoursesHeader() {
    return (
        <tr>
            <th width="5%"></th>
            <th width="10%">کد</th>
            <th width="8%">ظرفیت</th>
            <th width="8%">نوع</th>
            <th width="20%">نام درس</th>
            <th width="15%">استاد</th>
            <th width="5%">واحد</th>
            <th width="19%">توضیحات</th>
        </tr>
    );
}

class AllCourses extends React.Component {
    state = {
        data: [],
        sel: "all",
        searchBox: '',
    }
    componentDidMount() {
        axios({
            method: 'get',
            url: 'http://localhost:8080/offerings',
        })
            .then(response => {
                this.setState({ data: response.data });
                //TODO check alternations
            });
    }

    SelectOffers(sel) {
        this.setState({ sel });
    }

    sreachRequest(event) {
        event.preventDefault();
        axios({
            method: 'get',
            url: 'http://localhost:8080/offerings/search?q=' + this.state.searchBox,
        })
            .then(response => {
                this.setState({ data: response.data });
                //TODO check alternations
            });
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }

    errorCallback(data) {
        this.setState({ err: data });
    }

    getSelectButtons() {
        let allClassName = "filterbox";
        let takhasosiClassName = "filterbox";
        let asliClassName = "filterbox";
        let paayeClassName = "filterbox";
        let umumiClassName = "filterbox";
        if (this.state.sel === "all")
            allClassName += " chosen";
        if (this.state.sel === "Takhasosi")
            takhasosiClassName += " chosen";
        if (this.state.sel === "Asli")
            asliClassName += " chosen";
        if (this.state.sel === "Paaye")
            paayeClassName += " chosen";
        if (this.state.sel === "Umumi")
            umumiClassName += " chosen";
        return (
            <tr className="choosefilter" >
                <td><button onClick={this.SelectOffers.bind(this, "all")} className={allClassName}>همه</button></td>
                <td><button onClick={this.SelectOffers.bind(this, "Takhasosi")} className={takhasosiClassName}>تخصصی</button></td>
                <td><button onClick={this.SelectOffers.bind(this, "Asli")} className={asliClassName}>اصلی</button></td>
                <td><button onClick={this.SelectOffers.bind(this, "Paaye")} className={paayeClassName}>پایه</button></td>
                <td><button onClick={this.SelectOffers.bind(this, "Umumi")} className={umumiClassName}>عمومی</button></td>
            </tr>
        );
    }

    render() {

        let error = null;
        if (this.state.err)
            error = (
                <React.Fragment>
                    <div className="err">
                        <div className="err-short">{this.state.err.short}</div>
                        <div className="err-message">{this.state.err.message}</div>
                    </div>
                </React.Fragment>
            );

        let selectButtons = this.getSelectButtons();
        return (
            <React.Fragment>
                <div className="search">
                    <fieldset>
                        <form onSubmit={this.sreachRequest.bind(this)} className="search-form">
                            <input name="searchBox" className="search-input" onChange={this.handleChange.bind(this)} autoComplete="off" placeholder="نام درس" />
                            <input className="green-button" type="submit" value="جستجو" />
                        </form>
                    </fieldset>
                </div>
                <br /><br />
                <div className="courses">
                    <fieldset>
                        <legend >دروس ارائه شده </legend>
                        {error}
                        <div>
                            <table>
                                {selectButtons}
                            </table>
                            <br /><hr />
                            <div>
                                <table>
                                    <AllCoursesHeader />
                                    <tbody>
                                    <CourseRows data={this.state.data} sel={this.state.sel} parent={this} />
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </React.Fragment>
        );
    }
}

class CourseRows extends React.Component {

    handelReq(_code, _classCode) {
        axios({
            method: 'post',
            url: 'http://localhost:8080/student/offerings',
            data: {
                code: _code,
                classCode: _classCode
            }
        })
            .then(response => {
                console.log(response.data);
                window.location.reload();
            })
            .catch(err => {
                if (err.response.status === 401)
                    window.location.href = '/login';
                else
                    this.props.parent.setState({ err: err.response.data });
            })
    }

    render() {

        const items = [];
        var i;
        if (this.props.sel == "all") {
            for (i = 0; i < this.props.data.length; i++) {
                items.push(
                    <tr>
                        <td><img onClick={this.handelReq.bind(this, this.props.data[i].course.code, this.props.data[i].classCode)}
                            src={this.props.data[i].isFull == true ? ENTEZAR : ADD}
                            className="icon" />
                        </td>
                        <td>{this.props.data[i].classCode + "_" + this.props.data[i].course.code}</td>
                        <td>{this.props.data[i].capacity + " / " + this.props.data[i].registered}</td>
                        <td>
                            <button className={this.props.data[i].course.type} >
                                {
                                    this.props.data[i].course.type == "Asli" ?
                                        "اصلی" : this.props.data[i].course.type == "Takhasosi" ?
                                            "تخصصی" : this.props.data[i].course.type == "Umumi" ?
                                                "عمومی" : "پایه"
                                }
                            </button>
                        </td>
                        <td>{this.props.data[i].course.name}</td>
                        <td>{this.props.data[i].teacher}</td>
                        <td>{this.props.data[i].course.units}</td>
                        <td>زمان کلاس {this.props.data[i].time}</td>
                    </tr>
                );
            }
        } else {
            for (i = 0; i < this.props.data.length; i++) {
                if (this.props.data[i].course.type == this.props.sel) {
                    items.push(
                        <tr>
                            <td><img onClick={this.handelReq.bind(this, this.props.data[i].course.code, this.props.data[i].classCode)}
                                src={this.props.data[i].isFull == true ? ENTEZAR : ADD}
                                className="icon" />
                            </td>
                            <td>{this.props.data[i].course.code + "-" + this.props.data[i].classCode}</td>
                            <td>{this.props.data[i].registered + "/" + this.props.data[i].capacity}</td>
                            <td>
                                <button className={this.props.data[i].course.type} >
                                    {
                                        this.props.data[i].course.type == "Asli" ?
                                            "اصلی" : this.props.data[i].course.type == "Takhasosi" ?
                                                "تخصصی" : this.props.data[i].course.type == "Umumi" ?
                                                    "عمومی" : "پایه"
                                    }
                                </button>
                            </td>
                            <td>{this.props.data[i].course.name}</td>
                            <td>{this.props.data[i].teacher}</td>
                            <td>{this.props.data[i].course.units}</td>
                            <td>زمان کلاس {this.props.data[i].time}</td>
                        </tr>
                    );
                }
            }
        }
        return (
            <React.Fragment>
                {items}
            </React.Fragment>
        );
    }
}


export default Courses;
