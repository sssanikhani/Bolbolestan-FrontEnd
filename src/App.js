import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './common/Header';
import NotFound from './NotFound';
import Plan from './plan/Plan';
import Login from './login/Login';
import $ from 'jquery';
import './common/normalize.css';
import './common/common.css';
import './static/Fonts/vazir-fonts/fonts.css';
import Home from './home/Home';
import Courses from './courses/Courses';


class App extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $('body').attr('dir', 'rtl');
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/courses" component={Courses} />
          <Route exact path="/plan" component={Plan} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
