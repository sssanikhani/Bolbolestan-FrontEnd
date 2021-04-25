import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './common.css';

class Spinner extends React.Component {

    render () {
        return (
            <div className="spinner-container">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }
}


export default Spinner;