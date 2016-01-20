import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import CoreLayout from './core-layout/core-layout';
import Home from './containers/home';
import Browse from './containers/browse';
import Dashboard from './containers/dashboard';

export default (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={Home}/>
    <Route path='browse' component={Browse}/>
    <Route path='dashboard' component={Dashboard}/>
    <Redirect from='*' to='/' />
  </Route>
);
