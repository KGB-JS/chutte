import {combineReducers} from 'redux';
import {USER_LOGIN, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE, USER_SIGNUP, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAILURE, POST_BUY, POST_BUY_SUCCESS, POST_BUY_FAILURE, USER_LOGOUT, POST_BUY_RESET_MSG, ADD_TO_USER_LISTINGS, USER_PROFILE_UPDATE, USER_PROFILE_UPDATE_ERR} from './../actions/actionConstants';

const initialState = {
  userName: '',
  token: '',
  firstName: '',
  lastName: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  loggingIn: false,
  signingUp: false,
  authErrorMessage: '',
  updateProfileError: '',
  purchasedProducts: [],
  postingBuy: false,
  postedBuy: false,
  postBuyErrorMessage: false,
  currentListing: []
};

function userAuth(state = initialState, action){

  switch (action.type) {
    case USER_LOGIN:
      return Object.assign({}, state, {
        userName: action.userName,
        loggingIn: true,
        authErrorMessage: ''
      });
    case USER_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        token: action.user.token,
        userName: action.user.username,
        firstName: action.user.firstName,
        lastName: action.user.lastName,
        phone: action.user.phone,
        address: action.user.streetAddress,
        city: action.user.city,
        state: action.user.stateRegion,
        zip: action.user.zip,
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
        firstName: action.user.firstName,
        lastName: action.user.lastName,
        phone: action.user.phone,
        address: action.user.address,
        city: action.user.city,
        state: action.user.state,
        zip: action.user.zip,
        signingUp: false,
        authErrorMessage: ''
      });
    case USER_SIGNUP_FAILURE:
      return Object.assign({}, state, {
        signingUp: false,
        authErrorMessage: action.err
      });
    case USER_LOGOUT:
      return Object.assign({}, state, {
        userName: '',
        token: '',
        loggingIn: false,
        signingUp: false,
        authErrorMessage: '',
        purchasedProducts: [],
        postingBuy: false,
        postedBuy: false,
        postBuyErrorMessage: ''
      });
    case USER_PROFILE_UPDATE:
      return Object.assign({}, state, {
        token: action.user.token,
        firstName: action.user.firstName,
        lastName: action.user.lastName,
        phone: action.user.phone,
        address: action.user.address,
        city: action.user.city,
        state: action.user.state,
        zip: action.user.zip
      });
    case USER_PROFILE_UPDATE_ERR:
      return Object.assign({}, state, {
        updateProfileError: action.err
      })
    default:
      return state;
  }
}

function userPurchases(state = initialState, action){

  switch (action.type) {
    case POST_BUY:
      return Object.assign({}, state, {
        postingBuy: true,
        postBuyErrorMessage: false,
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
        postedBuy: false,
        postBuyErrorMessage: true
      });
    case POST_BUY_RESET_MSG:
      return Object.assign({}, state, {
        postedBuy: false
      });
    default:
      return state;
  }
}

function userListings(state = initialState, action){
  switch (action.type) {
    case ADD_TO_USER_LISTINGS:
      return Object.assign({}, state, {
        currentListing: [
          ...state.currentListing.slice(),
          Object.assign({}, action.product)
        ]
      })
    default:
      return state;
  }
}

const userAuthReducer = combineReducers({
  userAuth,
  userPurchases,
  userListings
});

export default userAuthReducer;
