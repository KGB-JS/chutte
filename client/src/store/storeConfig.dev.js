import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';
import creatLogger from 'redux-logger';
import rootReducer from './../reducers/rootReducer';
import storeEnhancer from 'redux-history-transitions';
import DevTools from './../containers/devTools';

export default function configureStore(history, initialState = {}){
  const enhancer = compose(
    applyMiddleware(thunk, routerMiddleware(history), creatLogger()),
    storeEnhancer(history),
    DevTools.instrument()
  );

  const store = createStore(rootReducer, initialState, enhancer);

    if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./../reducers/rootReducer', () => {
      const nextRootReducer = require('./../reducers/rootReducer').default
      store.replaceReducer(nextRootReducer)
    })
  }

    return store;
}
