import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import {syncHistory, routeReducer} from 'redux-simple-router';
import App from './containers/app';
import Browse from './containers/browse';
import Dashboard from './containers/dashboard';

const reduxRouterMiddleware = syncHistory(browserHistory);

const app = document.createElement('div');
document.body.appendChild(app);

ReactDOM.render(
  <Provider>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <Route path="browse" component={Browse}/>
        <Route path="dashboard" component={Dashboard}/>
      </Route>
    </Router>
  </Provider>, app);
