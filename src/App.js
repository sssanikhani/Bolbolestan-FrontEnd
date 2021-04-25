import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import NotFound from './NotFound';
import Plan from './plan/Plan';
import Login from './login/Login';
import $ from 'jquery';
import './normalize.css';
import './common.css';
import './static/Fonts/vazir-fonts/fonts.css';
import Home from './home/Home';


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
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
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
