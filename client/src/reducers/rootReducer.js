import {combineReducers} from 'redux';
import {routeReducer} from 'react-router-redux';
import productReducer from './productReducer';
import userAuthReducer from './userReducer';

const rootReducer = combineReducers({
  router: routeReducer,
  productStore: productReducer,
  userStore: userAuthReducer
});

export default rootReducer;
