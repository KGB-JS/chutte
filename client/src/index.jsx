import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, Redirect, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import configureStore from './store/storeConfig';
import socket from './socket/socket';
import App from './containers/app';
import HomeContainer from './containers/HomeContainer';
import BrowseContainer from './containers/BrowseContainer';
import DashboardContainer from './containers/DashboardContainer';
import UserProfileContainer from './containers/UserProfileContainer';
import CurrentListingContainer from './containers/currentListingContainer';
import CreateListingContainer from './containers/CreateListingContainer';
import {fetchProducts, removeEndedAuction} from './actions/actionsProducts';

const store = configureStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

store.dispatch(fetchProducts());

socket(store);

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
  </Provider>, document.getElementById('app'));
