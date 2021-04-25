import React from 'react';
import calendarLogo from '../static/SRC/calendar.png';
import 'bootstrap/dist/css/bootstrap.css';
import '../common/common.css';
import './plan.css';

class TableTemplate extends React.Component {

    render() {
        return (
            <table className="plan-table">
                <tr className="table-title-row">
                    <td colspan="7" id="table-title-cell">
                        <div>
                            <div className="rightside">
                                <img src={calendarLogo} className="icon" />
                                برنامه هفتگی
                            </div>
                            <div className="leftside">ترم 6</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th></th>
                    <th>شنبه</th>
                    <th>یکشنبه</th>
                    <th>دوشنبه</th>
                    <th>سه شنبه</th>
                    <th>چهارشنبه</th>
                    <th>پنج شنبه</th>
                </tr>
                <tr>
                    <td dir="ltr">07:00 - 08:00</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td dir="ltr">08:00 - 09:00</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td dir="ltr">09:00 - 10:00</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td dir="ltr">10:00 - 11:00</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td dir="ltr">11:00 - 12:00</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td dir="ltr">12:00 - 13:00</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td dir="ltr">13:00 - 14:00</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td dir="ltr">14:00 - 15:00</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td dir="ltr">15:00 - 16:00</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td dir="ltr">16:00 - 17:00</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td dir="ltr">17:00 - 18:00</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
        );
    }

}

export default TableTemplate;