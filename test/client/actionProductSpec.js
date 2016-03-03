import {expect} from 'chai';
import * as actions from '../../client/src/actions/actionsProducts';
import * as types from '../../client/src/actions/actionConstants';

describe('actionsProducts', function(){
  it('should create action to update product listing', function(){
    let product = {
      _id: 1,
      quantity: 2,
      price: 100
    };

    let expectedAction = {
      type: types.UPDATE_PRODUCT,
      product: product
    };

    expect(actions.updateProduct(product)).to.eql(expectedAction);
  });

  it('should create action to get products', function(){
    let expectedAction = {
      type: types.GET_PRODUCTS
    };

    expect(actions.getProducts()).to.eql(expectedAction);
  });

  it('should create an action on get products success', function(){
    let products = [
      {_id: 1, quantity: 1, price: 20},
      {_id: 2, quantity: 1, price: 100}
    ];

    let expectedAction = {
      type: types.GET_PRODUCTS_SUCCESS,
      products: products
    };

    expect(actions.getProductsSuccess(products)).to.eql(expectedAction);
  });

  it('should create an action on get products failure', function(){
    let error = 'error fetching products';

    let expectedAction = {
      type: types.GET_PRODUCTS_FAILURE,
      err: error
    };

    expect(actions.getProductsFailure(error)).to.eql(expectedAction);
  });

  it('should create an action on posting buy', function(){
    let product = {
      _id: 1,
     quantity: 1,
     price: 20
   };

   let expectedAction = {
     type: types.POST_BUY,
     product: product
   };

   expect(actions.postingBuy(product)).to.eql(expectedAction);
 });

 it('should create an action on success of posting buy', function(){
   let expectedAction = {
     type: types.POST_BUY_SUCCESS
   };

   expect(actions.postBuySuccess()).to.eql(expectedAction);
 });

 it('should create an action on failure of posting buy', function(){
   let error = 'failed to post buy';

   let expectedAction = {
     type: types.POST_BUY_FAILURE,
     err: error
   };

   expect(actions.postBuyFailure(error)).to.eql(expectedAction);
 });

 it('should create an action to reset post buy message', function(){
   let expectedAction = {
     type: types.POST_BUY_RESET_MSG
   };

   expect(actions.postBuyResetMsg()).to.eql(expectedAction);
 });

 it('should create an action to remove sold out products', function(){
   let product = {
     _id: 1,
    quantity: 1,
    price: 20
  };

  let expectedAction = {
    type: types.REMOVE_SOLDOUT_PRODUCT,
    product: product
  };

  expect(actions.removeSoldoutProduct(product)).to.eql(expectedAction);
 });

 it('should create an action to remove ended auctions', function(){
   let expectedAction = {
     type: types.REMOVE_ENDED_AUCTION_PRODUCT
   };

   expect(actions.removeEndedAuction()).to.eql(expectedAction);
 });

 it('should create an action to filter by category', function(){
   let category = types.CategoryFilters[0];

   let expectedAction = {
     type: types.PRODUCT_CATEGORY_FILTER,
     category: category
   };

   expect(actions.filterByCategory(category)).to.eql(expectedAction);
 });
});
