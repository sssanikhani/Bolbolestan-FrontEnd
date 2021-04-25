import React from 'react';
import Header from './common/Header';

class NotFound extends React.Component {

    componentDidMount() {
        document.title = "یافت نشد";
    }

    render() {
        return (
            <React.Fragment>
                <Header page="plan" />
                <h1>۴۰۴</h1>
                <h2>یافت نشد</h2>
            </React.Fragment>
        );
    }
}

export default NotFound;