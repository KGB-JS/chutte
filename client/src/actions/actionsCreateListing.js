import fetch from 'isomorphic-fetch';
import {checkStatus, parseJSON} from './actionsHelper';
import {CREATE_LISTING, CREATE_LISTING_SUCCESS, CREATE_LISTING_FAILURE, ADD_TO_USER_LISTINGS} from './actionConstants';


export function createListing(){
  return {
    type: CREATE_LISTING
  };
}

export function createListingSuccess(productListed){
  return {
    type: CREATE_LISTING_SUCCESS,
    itemListed: productListed,
    meta: {
        transition: (state, action) => ({
          pathname: 'browse'
        })
    }
  };
}

export function createListingFailure(err){
  return {
    type: CREATE_LISTING_FAILURE,
    err: err
  };
}

export function addToUserListings(product){
  return {
    type: ADD_TO_USER_LISTINGS,
    product: product
  };
}

export function postListing(product, token){
  return function(dispatch){
    dispatch(createListing());
      return fetch('/api/items/', {
        method: 'post',
        body: JSON.stringify(product),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      })
      .then(checkStatus)
      .then(parseJSON)
      .then(function(response){
        dispatch(createListingSuccess(response));
        dispatch(addToUserListings(product));
      })
      .catch(function(err){
        dispatch(createListingFailure(err));
      });
  };
}
