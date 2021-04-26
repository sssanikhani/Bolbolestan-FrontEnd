import React from 'react';
import './plan.css';

class PlanCell extends React.Component {

    getLengthClassName(time) {
        let minDiff = time.minDiff;
        let hourDiff = time.hourDiff;

        let totalMin = 60 * hourDiff + minDiff;
        switch(totalMin) {
            case 90:
                return "len-0130";
            case 120:
                return "len-0200";
            case 180:
                return "len-0300";
            default:
                return "len-0130";
        }
    }

    getHalfZeroClassName(time) {
        if (time.startMinute === 0)
            return "start-zero";
        return "start-half";
    }

    getOfferingTypeClassName(offering) {
        let type = offering.course.type;
        switch(type) {
            case "Asli":
                return "asli";
            case "Takhasosi":
                return "takhasosi";
            case "Paaye":
                return "paye";
            case "Umumi":
                return "umumi";
            default:
                return "asli";
        }
    }

    getTimeText(time) {
        let startHour = time.startHour.toString();
        let startMinute = time.startMinute.toString();
        let endHour = time.endHour.toString();
        let endMinute = time.endMinute.toString();

        if (startHour.length < 2)
            startHour = "0" + startHour;
        if (startMinute.length < 2)
            startMinute = "0" + startMinute;
        if (endHour.length < 2)
            endHour = "0" + endHour;
        if (endMinute.length < 2)
            endMinute = "0" + endMinute;
        
        let startStr = startHour + ":" + startMinute;
        let endStr = endHour + ":" + endMinute;

        return startStr + " - " + endStr;
    }

    getTypeText(offering) {
        let type = offering.course.type;
        switch(type) {
            case "Asli":
                return "اصلی";
            case "Takhasosi":
                return "تخصصی";
            case "Paaye":
                return "پایه";
            case "Umumi":
                return "عمومی";
            default:
                return "اصلی";
        }
    }

    render() {
        let offering = null;
        if (this.props.offering !== null) {
            
            let classNames = ["course-plan"];
            classNames.push(this.getHalfZeroClassName(this.props.time));
            classNames.push(this.getLengthClassName(this.props.time));
            classNames.push(this.getOfferingTypeClassName(this.props.offering));
            let cellClassName = classNames.join(' ');
            let offeringTime = this.getTimeText(this.props.time);
            let offeringType = this.getTypeText(this.props.offering);
            let offeringName = this.props.offering.course.name;

            offering = (
                <div className={cellClassName}>
                    <div dir="ltr" className="course-time text-truncate">{offeringTime}</div>
                    <div className="course-name text-truncate">{offeringName}</div>
                    <div className="course-type text-truncate">{offeringType}</div>
                </div>
            );
        }

        return (
            <td className="pure-plan-cell">
                {offering}
            </td>
        );
    }
}

export default PlanCell;