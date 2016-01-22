import {combineReducers} from 'redux';
import {routeReducer as router} from 'redux-simple-router';
import productReducer from './productReducer';
import userAuthReducer from './userReducer';

const rootReducer = combineReducers({
  router,
  productStore: productReducer,
  userStore: userAuthReducer
});

export default rootReducer;
