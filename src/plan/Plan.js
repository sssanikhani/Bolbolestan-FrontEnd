import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../common/common.css';
import './plan.css';
import axios from 'axios';
import Header from '../common/Header';
import Footer from '../common/Footer';
import checkLogin from '../common/checkLogin';
import Spinner from '../common/Spinner';
import PlanRow from './PlanRow';
import TableTemplate from './TableTemplate';

class Plan extends React.Component {

    constructor(props) {
        super(props);
        this.startHour = 7;
        this.endHour = 18;
        this.state = {
            loading: true,
            plan: []
        }
    }

    getPlan() {
        axios.get('http://localhost:8080/student/plan')
            .then(
                res => {
                    if (res.status === 200) {
                        this.setState({ plan: res.data });
                        this.setState({ loading: false });
                    }
                }
            )
            .catch(
                err => {
                    if (err.status === 401)
                        this.props.history.push("/login");
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
                <Footer />
            </React.Fragment>
        );
    }
}

export default Plan;