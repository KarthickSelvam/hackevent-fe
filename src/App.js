import React, { Component } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import io from 'socket.io-client';
import { SocketProvider } from 'socket.io-react';
import { ThemeProvider } from '@material-ui/styles';
import { Homepage, NotFound } from './views';

const socket = io.connect('http://localhost:3001/');
const browserHistory = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <SocketProvider socket={socket}>
        <ThemeProvider>
          <Router history={browserHistory}>
            <Switch>
              <Route component={Homepage} exact path="/" />
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