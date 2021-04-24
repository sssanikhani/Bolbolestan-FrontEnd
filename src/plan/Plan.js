import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../common.css';
import './plan.css';
import axios from 'axios';
import Header from '../Header';
import checkLogin from '../checkLogin';
import Spinner from '../Spinner';
import PlanRow from './PlanRow';
import TableTemplate from './TableTemplate';

class Plan extends React.Component {

    constructor(props) {
        super(props);
        this.days = [
            "Saturday",
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday"
        ];
        this.startHour = 7;
        this.endHour = 18;
        this.state = {
            loading: true,
            plan: []
        }
    }

    parseTime(time) {
        let timeParts = time.split(":");
        let hour = parseInt(timeParts[0]);
        let minute = parseInt(timeParts[1]);
        return {
            hour: hour,
            minute: minute
        }
    }

    sortPlan(data) {
        let planList = [];
        this.days.forEach(
            day => {
                let planDay = [...data[day]];
                planDay.sort((a, b) => {
                    let aTime = this.parseTime(a.time);
                    let bTime = this.parseTime(b.time);
                    return (aTime.hour > bTime.hour) ? 1 : -1;
                });
                planList.push(planDay);
            }
        );
        return planList;
    }

    getPlan() {
        axios.get('http://localhost:8080/student/plan')
            .then(
                res => {
                    if (res.status === 200) {
                        // let sortedPlan = this.sortPlan(res.data);
                        this.setState({ plan: res.data });
                        this.setState({ loading: false });
                    }
                }
            )
            .catch(
                err => {
                    if (err.status === 401)
                        window.location.href = '/login';
                }
            )

    }

    componentDidMount() {
        document.title = "برنامه هفتگی";
        this.setState({ loading: true });
        checkLogin()
            .then(
                res => {
                    if (!res)
                        this.props.history.push('/login');
                    else
                        this.getPlan();
                }
            );
    }

    render() {
        if (this.state.loading)
            return (
                <React.Fragment>
                    <Header page="plan" />
                    <Spinner />
                </React.Fragment>
            );
        let purePlanRows = [];
        for (let i = this.startHour; i < this.endHour; i++) {
            purePlanRows.push(<PlanRow time={i} plan={this.state.plan} key={i} />);
        }
        return (
            <React.Fragment>
                <Header page="plan" />
                <main>
                    <div className="plan-container">
                        <TableTemplate />
                        <table className="pure-plan-table">
                            <tbody>
                                <tr><td colspan="7" className="dummy">الکی</td></tr>
                                <tr><td colspan="7" className="dummy">الکی</td></tr>
                                {purePlanRows}
                            </tbody>
                        </table>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

export default Plan;