import {combineReducers} from 'redux';
import {routeReducer as router} from 'redux-simple-router';
import productReducer from './productReducer';

const rootReducer = combineReducers({
  router,
  products: productReducer
});

export default rootReducer;
