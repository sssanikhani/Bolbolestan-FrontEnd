import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import NotFound from './NotFound';
import Plan from './plan/Plan';
import $ from 'jquery';
import './common.css';
import './static/Fonts/vazir-fonts/fonts.css';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.routes = ['/login', '/courses', '/plan', '/home'];
  }

  componentDidMount() {
    $('body').attr('dir', 'rtl');
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Header page="home" />
            <div>home</div>
          </Route>
          <Route exact path="/login">
          </Route>
          <Route exact path="/courses">
            <Header page="courses" />
            <div>courses</div>
          </Route>
          <Route exact path="/plan" component={Plan} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
