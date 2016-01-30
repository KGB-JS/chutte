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

function userAuth(state = initialState, action){
  let newState = Object.assign({}, state);

  switch (action.type) {
    case USER_LOGIN:
      return Object.assign({}, state, {
        userName: action.userName,
        loggingIn: true,
        authErrorMessage: ''
      });
    case USER_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        token: action.token,
        loggingIn: false,
        authErrorMessage: ''
      });
    case USER_LOGIN_FAILURE:
      return Object.assign({}, state, {
        loggingIn: false,
        authErrorMessage: action.err,
      });
    case USER_SIGNUP:
      return Object.assign({}, state, {
        userName: action.userName,
        signingUp: true,
        authErrorMessage: ''
      });
    case USER_SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        token: action.token,
        signingUp: false,
        authErrorMessage: ''
      });
    case USER_SIGNUP_FAILURE:
      return Object.assign({}, state, {
        signingUp: false,
        authErrorMessage: action.err
      });
    default:
      return state;
  }
}

function userPurchases(state, action){
  state = state || initialState;
  let newState = Object.assign({}, state);

  switch (action.type) {
    case POST_BUY:
      return Object.assign({}, state, {
        postingBuy: true,
        purchasedProducts: [
          ...state.purchasedProducts.slice(),
          action.product
        ]
      });
    case POST_BUY_SUCCESS:
      return Object.assign({}, state, {
        postingBuy: false,
        postedBuy: true
      });
    case POST_BUY_FAILURE:
      return Object.assign({}, state, {
        postingBuy: false,
        postBuyErrorMessage: action.err
      });
    default:
      return state;
  }
}

const userAuthReducer = combineReducers({
  userAuth,
  userPurchases
});

export default userAuthReducer;
