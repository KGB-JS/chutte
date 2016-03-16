import {expect} from 'chai';
import * as actions from '../../client/src/actions/actionsUserSignup';
import * as types from '../../client/src/actions/actionConstants';

describe('actionsUserSignup', function(){
  it('should create an action on user signup', function(){
    let user = 'test@test.com';
    let expectedAction = {
      type: types.USER_SIGNUP,
      userName: user
    };

    expect(actions.userSignup(user)).to.eql(expectedAction);
  });

  it('should create an action on user signup failure', function(){
    let error = 'Something went wrong';
    let expectedAction = {
      type: types.USER_SIGNUP_FAILURE,
      err: error
    };

    expect(actions.userSignupFailure(error)).to.eql(expectedAction);
  });

  it('should create an action on user profile update error', function(){
    let error = 'Something went wrong';
    let expectedAction = {
      type: types.USER_PROFILE_UPDATE_ERR,
      err: error
    };

    expect(actions.userProfileUpdateErr(error)).to.eql(expectedAction);
  })
});
