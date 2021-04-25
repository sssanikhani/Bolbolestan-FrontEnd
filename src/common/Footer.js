import React from 'react';

import CopyRight from '../static/SRC/copy-right.png';
import FaceBook from '../static/SRC/facebook.png';
import Linkedin from '../static/SRC/linkedin.png';
import Instagram from '../static/SRC/instagram.png';
import Twitter from '../static/SRC/twitter.png';


class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div className="rightside">
                    <img src={CopyRight} className="icon" />
                    <div>
                        <p>دانشگاه تهران - سامانه ی جامع بلبل ستان</p>
                    </div>
                </div>
                <div className="leftside">
                    <a href='https://facebook.com/bolbolestan'><img src={FaceBook} className="icon" /></a>
                    <a href='https://linkedin.com/bolbolestan'><img src={Linkedin} className="icon" /></a>
                    <a href='https://instagram.com/bolbolestan'><img src={Instagram} className="icon" /></a>
                    <a href='https://twitter.com/bolbolestan'><img src={Twitter} className="icon" /></a>
                </div>
            </footer>
        );
    };
}

export default Footer;