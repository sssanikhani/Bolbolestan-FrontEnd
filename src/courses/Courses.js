import React from 'react';
import axios from 'axios';
import '../common/common.css';
import './courses-style.css';
import Header from '../common/Header';
import getTypeText from '../common/getTypeText';
import checkLogin from '../common/checkLogin';
import Spinner from '../common/Spinner';

import TRUSH from '../static/SRC/012-trash-bin.png';
import REFRESH from '../static/SRC/reset.png';
import ADD from '../static/SRC/add.png';
import ENTEZAR from '../static/SRC/entezar.png';
import Footer from '../common/Footer';
import authHeader from '../common/authHeader';

class Courses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            err: null,
            loading: true
        };
    }

    componentDidMount() {
        document.title = 'انتخاب واحد';
        this.setState({ loading: true });
        checkLogin()
            .then(res => {
                if (!res)
                    this.props.history.push('/login');
                else
                    this.setState({ loading: false });
            });
    }

    render() {
        window.scrollTo(0, 0);
        if (this.state.loading)
            return (
                <React.Fragment>
                    <Header page="courses" />
                    <Spinner />
                </React.Fragment>
            );
        let error = null;
        if (this.state.err)
            error = (
                <React.Fragment>
                    <div className="err-container">
                        <div className="err">
                            <div className="err-short"><b>Error: </b>{this.state.err.short}</div>
                            <div className="err-message">{this.state.err.message}</div>
                        </div>
                    </div>
                </React.Fragment>
            );
        return (
            <React.Fragment>
                <Header page="courses" />
                <br /><br /><br />
                {error}
                <br />
                <SelectedCourses base={this} />
                <br /><br /><br />
                <AllCourses base={this} />
                <br /><br /><br />
                <Footer />
            </React.Fragment>
        );
    }
}

class SelectedCourses extends React.Component {
    state = {
        data: [],
        offerings: [],
        temp: 0,
        loading: true
    }

    componentDidMount() {
        this.setState({ loading: true });
        axios.get('http://87.247.185.122:32138/student/offerings', {
            headers: {
                'Authorization': authHeader()
            }
        })
            .then(response => {
                this.setState({
                    data: response.data,
                    offerings: response.data.offerings,
                    loading: false
                });
            })
            .catch(err => {
                if (err.status === 401)
                    window.location.href = '/login';
                else {
                    this.props.base.setState({ err });
                    this.setState({ loading: false });
                }
            });
    }

    handle(sel) {
        this.setState({ loading: true });
        axios({
            method: 'post',
            url: 'http://87.247.185.122:32138/student/offerings/' + sel,
            headers: {
                'Authorization': authHeader()
            }
        })
            .then(response => {
                window.location.reload();
            })
            .catch(err => {
                if (err.response && err.response.status === 401)
                    window.location.href = '/login';
                else {
                    this.props.base.setState({ err: err.response.data });
                    this.setState({ loading: false });
                }
            });
    }

    delete(code, classCode) {
        this.setState({ loading: true });
        axios({
            method: 'delete',
            url: 'http://87.247.185.122:32138/student/offerings',
            headers: {
                'Authorization': authHeader()
            },
            data: {
                code: code,
                classCode: classCode
            }
        })
            .then(res => {
                window.location.reload();
            })
            .catch(err => {
                if (err.response.status === 401)
                    window.location.href = '/login';
                else {
                    this.props.base.setState({ err: err.response.data });
                    this.setState({ loading: false });
                }
            });

    }
    render() {

        if (this.state.loading)
            return <Spinner />;

        const items = [];
        var i;
        for (i = 0; i < this.state.offerings.length; i++) {
            items.push(
                <tr>
                    <td>
                        <button onClick={this.delete.bind(this, this.state.offerings[i].offering.course.code, this.state.offerings[i].offering.classCode)}>
                            <img src={TRUSH} alt="delete" className="icon" />
                        </button>
                    </td>
                    <td>
                        <div className={"state " + this.state.offerings[i].status}>
                            {
                                this.state.offerings[i].status === "registered" ? "ثبت شده " :
                                    this.state.offerings[i].status === "waiting" ?
                                        "در انتظار" : "ثبت نهایی نشده"
                            }

                        </div>
                    </td>
                    <td>{this.state.offerings[i].offering.classCode
                        + "_" + this.state.offerings[i].offering.course.code}</td>
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
                    <div className="chosenCourses-bottom">
                        <div className="chosenCourse-bottom-right-div">
                            <p>تعداد واحد های ثبت شده: {this.state.data.chosenUnits}</p>
                        </div>
                        <div className="chosenCourse-bottom-left-div">
                            <button onClick={this.handle.bind(this, "submit")} className="green-button submit">ثبت نهایی</button>
                            <button onClick={this.handle.bind(this, "reset")} className="reset-button"><img src={REFRESH} alt="reset" className="reset" /></button>
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
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            sel: "all",
            searchBox: '',
            loading: true
        }
    }

    componentDidMount() {
        this.setState({ loading: true })
        axios.get('http://87.247.185.122:32138/offerings', {
            headers: {
                'Authorization': authHeader()
            }
        })
            .then(response => {
                this.setState({
                    data: response.data,
                    loading: false
                });
            })
            .catch(err => {
                if (err.status === 401)
                    window.location.href = '/login';
                else {
                    this.props.base.setState({ err });
                    this.setState({ loading: false });
                }
            });
    }

    SelectOffers(sel) {
        this.setState({ sel });
    }

    searchRequest(event) {
        event.preventDefault();
        this.setState({ loading: true });
        axios.get('http://87.247.185.122:32138/offerings/search?q=' + this.state.searchBox, {
            headers: {
                'Authorization': authHeader()
            }
        })
            .then(response => {
                this.setState({
                    data: response.data,
                    loading: false
                });
            })
            .catch(err => {
                if (err.status === 401)
                    window.location.href = '/login';
                else {
                    this.props.base.setState({ err });
                    this.setState({ loading: false });
                }
            });
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
        // axios.get('http://87.247.185.122:32138/offerings/search?q=' + this.state.searchBox)
        //     .then(res => {
        //         this.setState({ data: res.data });
        //     })
        //     .catch(err => {
        //         if (err.status === 401)
        //             window.location.href = '/login';
        //         else
        //             this.props.base.setState({ err });
        //     });
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
        if (this.state.loading)
            return <Spinner />;
        let selectButtons = this.getSelectButtons();
        return (
            <React.Fragment>
                <div className="search">
                    <form onSubmit={this.searchRequest.bind(this)} className="search-form">
                        <input name="searchBox" className="search-input" onChange={this.handleChange.bind(this)} autoComplete="off" placeholder="نام درس" />
                        <input className="green-button" type="submit" value="جستجو" />
                    </form>
                </div>
                <br /><br />
                <div className="courses">
                    <fieldset>
                        <legend >دروس ارائه شده </legend>
                        <div>
                            <table>
                                {selectButtons}
                            </table>
                            <br /><hr />
                            <div>
                                <table>
                                    <AllCoursesHeader />
                                    <tbody>
                                        <CourseRows data={this.state.data} sel={this.state.sel} base={this.props.base} />
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
    render() {
        const items = [];
        var i;
        for (i = 0; i < this.props.data.length; i++) {
            if (this.props.sel === "all" || this.props.data[i].course.type === this.props.sel) {
                items.push(
                    <CourseRow offering={this.props.data[i]} base={this.props.base} />
                );
            }
        }
        return items;
    }
}


class CourseRow extends React.Component {

    addCourse(code, classCode) {
        axios({
            method: 'post',
            url: 'http://87.247.185.122:32138/student/offerings',
            headers: {
                'Authorization': authHeader()
            },
            data: {
                code: code,
                classCode: classCode
            }
        })
            .then(response => {
                window.location.reload();
            })
            .catch(err => {
                if (err.response.status === 401)
                    window.location.href = '/login';
                else {
                    this.props.base.setState({ err: err.response.data });
                }
            });
    }

    render() {
        return (
            <tr>
                <td>
                    <button onClick={this.addCourse.bind(this, this.props.offering.course.code, this.props.offering.classCode)}>
                        <img src={this.props.offering.isFull === true ? ENTEZAR : ADD}
                            alt="add" className="icon" />
                    </button>
                </td>
                <td>{this.props.offering.classCode + "_" + this.props.offering.course.code}</td>
                <td>{this.props.offering.capacity + " / " + this.props.offering.registered}</td>
                <td>
                    <div className={this.props.offering.course.type + " course-type"} >
                        {getTypeText(this.props.offering)}
                    </div>
                </td>
                <td>{this.props.offering.course.name}</td>
                <td>{this.props.offering.teacher}</td>
                <td>{this.props.offering.course.units}</td>
                <td>زمان کلاس {this.props.offering.time}</td>
            </tr>
        );
    }

}


export default Courses;
