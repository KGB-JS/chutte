import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createHistory, useBasename} from 'history';
import {syncReduxAndRouter} from 'redux-simple-router';
import configureStore from './store/configStore';
import App from './containers/app';

const history = useBasename(createHistory)({
  basename: '/'
});

const store = configureStore(window.__INITIAL_STATE__);

syncReduxAndRouter(history, store, (state) => state.router);

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<App store={store} history={history} routes={routes} />, app);
