import {checkStatus, parseJSON} from './actionsHelper';
import {USER_SIGNUP, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAILURE, USER_PROFILE_UPDATE, USER_PROFILE_UPDATE_ERR } from './actionConstants';

export function userSignup(userName){
  return {
    type: USER_SIGNUP,
    userName: userName
  };
};

export function userSignupSuccess(token){
  localStorage.setItem('token', token);
  return {
    type: USER_SIGNUP_SUCCESS,
    token: token,
    meta: {
        transition: (state, action) => ({
          pathname: 'browse'
        })
    }
  };
};

export function userSignupFailure(err){
  return {
    type: USER_SIGNUP_FAILURE,
    err: err
  };
};

export function userProfileUpdate(user){
  localStorage.setItem('token', user.token);
  return {
    type: USER_PROFILE_UPDATE,
    user: user
  };
}

export function userProfileUpdateErr(err){
  return {
    type: USER_PROFILE_UPDATE_ERR,
    err: err
  };
}



export function postUserSignup(user){
    return function(dispatch){
    dispatch(userSignup(user.username));
    let newUser = {
      username: user.username,
      password: user.password,
    }
    return fetch('/api/users/signup', {
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
      dispatch(userSignupSuccess(response.token));
    })
    .catch(function(error){
      dispatch(userSignupFailure(error));
    });
  };
};

export function postUpdateProfile(user, token){
  return function(dispatch){
    let userUpdated = {
      username: user.userName,
      password: user.password,
      firstname: user.firstName,
      lastname: user.lastName,
      phone: user.phone,
      streetAddress: user.address,
      stateRegion: user.state,
      city: user.city,
      zip: user.zip
    };
    return fetch('/api/users/userUpdate', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify(userUpdated)
    }).then(checkStatus)
    .then(parseJSON)
    .then(function(response){
      dispatch(userProfileUpdate(response));
    })
    .catch(function(error){
      dispatch(userProfileUpdateErr(error));
    });
  };
}
