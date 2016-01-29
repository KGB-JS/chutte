import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createHistory, useBasename} from 'history';
import {Router, Route, IndexRoute, Redirect} from 'react-router';
import {createStore, applyMiddleware, compose} from 'redux';
import {syncHistory} from 'react-router-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers/rootReducer';
import socket from './socket/socket';
import App from './containers/app';
import Home from './containers/home';
import Browse from './containers/browse';
import Dashboard from './containers/dashboard';
import ProductDetail from './components/productDetail';
import ProductList from './components/productList';
import UserAuth from './components/userAuth';
import UserSignup from './components/UserSignup';
import DevTools from './containers/DevTools';
import {fetchProducts} from './actions/actionsProducts';

const history = useBasename(createHistory)({
  basename: '/'
});

const reduxRouterMiddleware = syncHistory(history);

const finalCreateStore = compose(
  applyMiddleware(reduxRouterMiddleware),
  applyMiddleware(thunk),
  applyMiddleware(createLogger()),
  DevTools.instrument()
)(createStore);

export default function configureStore(initialState){
  const store = finalCreateStore(rootReducer, initialState);

  if(module.hot){
    module.hot.accept('./reducers/rootReducer', () => {
      const nextRootReducer = require('./reducers/rootReducer');
      store.replaceReducer(nextRootReducer);
    })
  }
  return store;
}

const store = configureStore();

store.dispatch(fetchProducts());

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
