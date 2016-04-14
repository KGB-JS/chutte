import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import productReducer from './productReducer';
import userAuthReducer from './userReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  productStore: productReducer,
  userStore: userAuthReducer
});

export default rootReducer;
