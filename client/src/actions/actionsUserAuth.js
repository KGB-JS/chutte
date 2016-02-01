import fetch from 'isomorphic-fetch';
import {routeActions} from 'react-router-redux';
import {checkStatus, parseJSON} from './actionsHelper';
import {USER_LOGIN, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE, USER_LOGOUT} from './actionConstants';

export function userLogin(userName){
  return {
    type: USER_LOGIN,
    userName: userName
  };
};

export function userLoginSuccess(token){
  localStorage.setItem('token', token);
  return {
    type: USER_LOGIN_SUCCESS,
    token: token,
    meta: {
        transition: (state, action) => ({
          pathname: 'browse'
        })
    }
  };
};

export function userLoginFailure(err){
  return {
    type: USER_LOGIN_FAILURE,
    err: err
  };
};

export function userLogout(){
  localStorage.removeItem('token');
  localStorage.removeItem('redux');
  return {
    type: USER_LOGOUT
  };
};

export function authenticateUser(user){
  return function(dispatch){
    dispatch(userLogin(user.userName));
    return fetch('/api/users/signin', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(function(response){
      dispatch(userLoginSuccess(response.token));
      dispatch(routeActions.push({pathname: 'browse'}));
    })
    .catch(function(error){
      dispatch(userLoginFailure(error));
    });
  };
};
