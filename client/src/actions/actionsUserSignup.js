import {fetch} from 'isomorphic-fetch';
import {USER_SIGNUP, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAILURE} from './actionConstants';

export function userSignup(userName){
  return {
    type: USER_SIGNUP,
    userName: userName
  };
};

export function userSignupSuccess(token){
  return {
    type: USER_SIGNUP_SUCCESS,
    token: token
  };
};

export function userSignupFailure(err){
  return {
    type: USER_SIGNUP_FAILURE,
    err: err
  };
};

export function postUserSignup(user){
  return function(dispatch){
    dispatch(userSignup(user.userName));
    return fetch('/api/users/signup', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(function(response){
      dispatch(userLoginSuccess(response.token));
    })
    .catch(function(error){
      dispatch(userLoginFailure(error));
    });
  };
}
