import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createHistory, useBasename} from 'history';
import {Router, Route, IndexRoute, Redirect} from 'react-router';
import {syncReduxAndRouter} from 'redux-simple-router';
import configureStore from './store/configStore';
import socket from './socket/socket';
import App from './containers/app';
import Home from './containers/home';
import Browse from './containers/browse';
import Dashboard from './containers/dashboard';
import ProductDetail from './components/productDetail';
import ProductList from './components/productList';
import UserAuth from './components/userAuth';
import UserSignup from './components/UserSignup';

const history = useBasename(createHistory)({
  basename: '/'
});

const store = configureStore();

syncReduxAndRouter(history, store, (state) => state.router);

socket(store);

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
       <Route path='/' component={App}>
        <IndexRoute component={Home}/>
        <Route path='browse' component={Browse}/>
        <Route path='browse/product/:id' component={ProductDetail}/>
        <Route path='dashboard' component={Dashboard}/>
        <Route path='signin' component={UserAuth}/>
        <Route path='signup' component={UserSignup}/>
        <Redirect from='*' to='/' />
      </Route>
    </Router>
  </Provider>, app);
