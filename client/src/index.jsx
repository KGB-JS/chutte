import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, Redirect, browserHistory} from 'react-router';
import {createStore, applyMiddleware, compose} from 'redux';
import {syncHistory} from 'react-router-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import persistState from 'redux-localstorage';
import storeEnhancer from 'redux-history-transitions';
import rootReducer from './reducers/rootReducer';
import socket from './socket/socket';
import App from './containers/app';
import HomeContainer from './containers/HomeContainer';
import BrowseContainer from './containers/BrowseContainer';
import DashboardContainer from './containers/DashboardContainer';
import DevTools from './containers/devTools';
import UserProfileContainer from './containers/UserProfileContainer';
import CurrentListingContainer from './containers/currentListingContainer';
import CreateListingContainer from './containers/CreateListingContainer';
import {fetchProducts, removeEndedAuction} from './actions/actionsProducts';

const history = browserHistory;

const reduxRouterMiddleware = syncHistory(history);

const finalCreateStore = compose(
  applyMiddleware(reduxRouterMiddleware),
  applyMiddleware(thunk),
  applyMiddleware(createLogger()),
  persistState(),
  storeEnhancer(history),
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

let state;

if(window.localStorage.getItem('redux')){
  state = JSON.parse(window.localStorage.getItem('redux'));
} else {
  state = window.__INITIAL__STATE__;
}

const store = configureStore(state);

store.dispatch(removeEndedAuction());
store.dispatch(fetchProducts());

socket(store);

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
       <Route path='/' component={App}>
        <IndexRoute component={HomeContainer}/>
        <Route path='browse' component={BrowseContainer}></Route>
        <Route path='dashboard' component={DashboardContainer}>
          <IndexRoute component={UserProfileContainer}/>
          <Route path='create' component={CreateListingContainer} />
          <Route path='current' component={CurrentListingContainer} />
        </Route>
        <Redirect from='*' to='/' />
      </Route>
    </Router>
  </Provider>, app);
