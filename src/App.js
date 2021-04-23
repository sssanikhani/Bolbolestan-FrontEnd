import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Plan from './plan/Plan';
import React from 'react';
import axios from 'axios';
import Header from './Header';
import Spinner from './Spinner';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  redirectIfNotSignedIn() {
    if (window.location.pathname !== '/login') {
      axios.get('http://localhost:8080/student')
        .then(
          (response) => {
            console.log(response.status);
          }
        )
        .catch(
          (error) => {
            if (error.response) {
              let status = error.response.status;
              if (status === 401) {
                window.location.href = "/login";
              }
            }
          }
        );
    }
    else {
      this.setState({ loading: false });
    }
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.redirectIfNotSignedIn();
  }

  render() {
    if (this.state.loading) {
      return <Spinner />;
    }
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
            <Header page="plan" />
            <Plan />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
