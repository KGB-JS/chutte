import {combineReducers} from 'redux';
import {USER_LOGIN, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE, USER_SIGNUP, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAILURE} from './../actions/actionConstants';

const initialState = {
  userName: '',
  token: '',
  loggingIn: false,
  signingUp: false,
  errorMessage: ''
};

function userLogin(state, action){
  state = state || initialState;
  let newState = Object.assign({}, state);

  switch (action.type) {
    case USER_LOGIN:
      newState.userName = action.userName;
      newState.loggingIn = true;
      return newState;
    case USER_LOGIN_SUCCESS:
      newState.token = action.token;
      newState.loggingIn = false;
      return newState;
    case USER_LOGIN_FAILURE:
      newState.loggingIn = false;
      newState.errorMessage = action.err;
      return newState;
    default:
      return state;
  }
}

function userSignUp(state, action){
  state = state || initialState;
  let newState = Object.assign({}, state);

  switch (action.type) {
    case USER_SIGNUP:
      newState.userName = action.userName;
      newState.signingUp = true;
      return newState;
    case USER_SIGNUP_SUCCESS:
      newState.token = token;
      newState.signingUp = false;
      return newState;
    case USER_SIGNUP_FAILURE:
      newState.signingUp = false;
      newState.errorMessage = action.err;
      return newState;
    default:
      return state;
  }
}

const userAuthReducer = combineReducers({
  userLogin,
  userSignUp
});

export default userAuthReducer;
