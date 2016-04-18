import {createStore, applyMiddleware, combineReducers,compose} from 'redux';
import thunk from 'redux-thunk';
import {routerMiddleware, routerReducer} from 'react-router-redux';
import storeEnhancer from 'redux-history-transitions';
import rootReducer from './../reducers/rootReducer';

export default function configureStore(history, initialState = {}){
  const enhancer = compose(applyMiddleware(thunk, routerMiddleware(history)), storeEnhancer(history));

  const store = createStore(rootReducer, initialState, enhancer);

  return store;
}
