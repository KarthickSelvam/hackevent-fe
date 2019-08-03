import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import io from 'socket.io-client';
import { SocketProvider } from 'socket.io-react';
import { ThemeProvider } from '@material-ui/styles';
import { Login, Signup, Homepage, GameOne, NotFound } from './views';
import Auth from './modules/Auth';

const socket = io.connect('http://localhost:3001/');
const browserHistory = createBrowserHistory();

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.isUserAuthenticated() ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const LoggedOutRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.isUserAuthenticated() ? (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location }
          }}
        />
      ) : (
        <Component {...props} {...rest} />
      )
    }
  />
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    };
  }

  toggleAuthenticateStatus() {
    // check authenticated status and toggle state based on that
    this.setState({ authenticated: Auth.isUserAuthenticated() });
  }

  componentDidMount() {
    // check if user is logged in on refresh
    this.toggleAuthenticateStatus();
  }

  render() {
    return (
      <SocketProvider socket={socket}>
        <ThemeProvider>
          <Router history={browserHistory}>
            <Switch>
              <PrivateRoute
                component={Homepage}
                exact
                path="/"
                toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()}
              />
              <LoggedOutRoute
                component={Login}
                exact
                path="/login"
                toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()}
              />
              <LoggedOutRoute
                component={Signup}
                exact
                path="/signup"
                toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()}
              />
              <Route component={GameOne} exact path="/game-one" />
              <Route component={NotFound} exact path="/not-found" />
              <Redirect to="/not-found" />
            </Switch>
          </Router>
        </ThemeProvider>
      </SocketProvider>
    );
  }
}

export default App;
