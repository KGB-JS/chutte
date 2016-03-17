import {expect} from 'chai';
import * as actions from '../../client/src/actions/actionsUserAuth';
import * as types from '../../client/src/actions/actionConstants';

describe('actionsUserAuth', function(){
  it('should create an action on user login', function(){
    let user = 'test@test.com';
    let expectedAction = {
      type: types.USER_LOGIN,
      userName: user
    };

    expect(actions.userLogin(user)).to.eql(expectedAction);
  });

  it('should create an action on user login failure', function(){
    let error = 'Something went wrong';
    let expectedAction = {
      type: types.USER_LOGIN_FAILURE,
      err: error
    };

    expect(actions.userLoginFailure(error)).to.eql(expectedAction);
  });

  // it('should create an action on user logout', function(){
  //   let expectedAction = {
  //     type: types.USER_LOGOUT
  //   };
  //
  //   expect(actions.userLogout()).to.eql(expectedAction);
  // });
});
