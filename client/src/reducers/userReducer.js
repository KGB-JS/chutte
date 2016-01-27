import {combineReducers} from 'redux';
import {USER_LOGIN, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE, USER_SIGNUP, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAILURE, POST_BUY, POST_BUY_SUCCESS, POST_BUY_FAILURE} from './../actions/actionConstants';

const initialState = {
  userName: '',
  token: '',
  loggingIn: false,
  signingUp: false,
  authErrorMessage: '',
  purchasedProducts: [],
  postingBuy: false,
  postedBuy: false,
  postBuyErrorMessage: ''
};

function userAuth(state, action){
  state = state || initialState;
  let newState = Object.assign({}, state);

  switch (action.type) {
    case USER_LOGIN:
      newState.userName = action.userName;
      newState.loggingIn = true;
      newState.authErrorMessage = '';
      return newState;
    case USER_LOGIN_SUCCESS:
      newState.token = action.token;
      newState.loggingIn = false;
      newState.authErrorMessage = '';
      return newState;
    case USER_LOGIN_FAILURE:
      newState.loggingIn = false;
      newState.AuthErrorMessage = action.err;
      return newState;
    case USER_SIGNUP:
      newState.userName = action.userName;
      newState.signingUp = true;
      newState.authErrorMessage = '';
      return newState;
    case USER_SIGNUP_SUCCESS:
      newState.token = action.token;
      newState.signingUp = false;
      newState.authErrorMessage = '';
      return newState;
    case USER_SIGNUP_FAILURE:
      newState.signingUp = false;
      newState.authErrorMessage = action.err;
      return newState;
    default:
      return state;
  }
}

function userPurchases(state, action){
  state = state || initialState;
  let newState = Object.assign({}, state);

  switch (action.type) {
    case POST_BUY:
      newState.postingBuy = true;
      newState.purchasedProducts.push(action.product);
      return newState;
    case POST_BUY_SUCCESS:
      newState.postingBuy = false;
      newState.postedBuy = true;
      return newState;
    case POST_BUY_FAILURE:
      newState.postingBuy = false;
      newState.postBuyErrorMessage = action.err;
      return newState;
    default:
      return state;
  }
}

const userAuthReducer = combineReducers({
  userAuth,
  userPurchases
});

export default userAuthReducer;
