import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './NotFound';
import Plan from './plan/Plan';
import Login from './login/Login';
import $ from 'jquery';
import './common/normalize.css';
import './common/common.css';
import './static/Fonts/vazir-fonts/fonts.css';
import Home from './home/Home';
import Courses from './courses/Courses';
import SignUp from './signup/Signup';
import ForgetPassword from './forgetPassword/ForgetPassword';



class App extends React.Component {

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
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/forgetpassword" component={ForgetPassword} />

          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
