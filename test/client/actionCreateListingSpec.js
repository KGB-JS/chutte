import {expect} from 'chai';
import * as actions from '../../client/src/actions/actionsCreateListing';
import * as types from '../../client/src/actions/actionConstants';

describe('actionsCreateListing', function(){
  it('should create an action on create listing', function(){
    let expectedAction = {
      type: types.CREATE_LISTING
    };

    expect(actions.createListing()).to.eql(expectedAction);
  });

  it('should create an action on create listing failure', function(){
    let error = 'failed to create listing';

    let expectedAction = {
      type: types.CREATE_LISTING_FAILURE,
      err: error
    };

    expect(actions.createListingFailure(error)).to.eql(expectedAction);
  });

  it('should create an action on add listing to user', function(){
    let product = {
      _id: 1,
      quantity: 1,
      price: 20
    };

    let expectedAction = {
      type: types.ADD_TO_USER_LISTINGS,
      product: product
    };

    expect(actions.addToUserListings(product)).to.eql(expectedAction);
  });
});
