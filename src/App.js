import $ from 'jquery';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import './common.css';
import Header from './Header';
import './normalize.css';
import NotFound from './NotFound';
import Plan from './plan/Plan';
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
          <Route path="/home">
            <Header page="home" />
            <div>home</div>
          </Route>
          <Route path="/login">
          </Route>
          <Route path="/courses">
            <Header page="courses" />
            <div>courses</div>
          </Route>
          <Route path="/plan">
            <Plan />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
