import React, { Component } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/styles';
import { Homepage, NotFound } from './views';
const browserHistory = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <ThemeProvider>
        <Router history={browserHistory}>
          <Switch>
            <Route path='/' exact component={Homepage} />
            <Route path='/not-found' exact component={NotFound} />
            <Redirect to='/not-found' />
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
