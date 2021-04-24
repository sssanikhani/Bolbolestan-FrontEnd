import React from "react";
import PlanCell from './PlanCell';
import './plan.css';


class PlanRow extends React.Component {
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
    }

    parseTime(time) {
        let timeParts = time.split("-");
        
        let startTime = timeParts[0];
        let endTime = timeParts[1];
        
        let startParts = startTime.split(":");
        let endParts = endTime.split(":");
        
        let startHour = parseInt(startParts[0]);
        let startMinute = parseInt(startParts[1]);

        let endHour = parseInt(endParts[0]);
        let endMinute = parseInt(endParts[1]);
        
        let tempEndHour = endHour;
        let tempEndMinute = endMinute;

        if (endMinute < startMinute) {
            tempEndHour -= 1;
            tempEndMinute += 60;
        }

        let minDiff = tempEndMinute - startMinute;
        let hourDiff = tempEndHour - startHour;

        return {
            startHour: startHour,
            startMinute: startMinute,
            endHour: endHour,
            endMinute: endMinute,
            minDiff: minDiff,
            hourDiff: hourDiff
        }
    }

    render() {
        let rowCells = [];
        this.days.forEach(
            (day, index) => {
                let planDay = this.props.plan[day];
                let offering = null;
                planDay.forEach(
                    o => {
                        let oTime = this.parseTime(o.time);
                        if (oTime.startHour === this.props.time) {
                            offering = o;
                        }
                    }
                );
                let  offeringTime = null;
                if (offering)
                    offeringTime = this.parseTime(offering.time);
                rowCells.push(
                    <PlanCell offering={offering} time={offeringTime} key={index} />
                );
            }
        );
        return (
            <tr>
                <td className="pure-plan-cell dummy">۵۵ - ۵۵</td>
                {rowCells}
            </tr>
        );
    }
}

export default PlanRow;