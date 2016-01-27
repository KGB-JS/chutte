import fetch from 'isomorphic-fetch';
import {checkStatus, parseJSON} from './actionsHelper';
import {CREATE_LISTING, CREATE_LISTING_SUCCESS, CREATE_LISTING_FAILURE} from './actionConstants';


export function createListing(){
  return {
    type: CREATE_LISTING
  };
}

export function createListingSuccess(productListed){
  return {
    type: CREATE_LISTING_SUCCESS,
    itemListed: productListed
  };
}

export function createListingFailure(err){
  return {
    type: CREATE_LISTING_FAILURE,
    err: err
  };
}

export function postListing(product){
  return function(dispatch){
    dispatch(createListing());
      return fetch('/api/items/', {
        method: 'post',
        body: JSON.stringify(product),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(checkStatus)
      .then(parseJSON)
      .then(function(response){
        dispatch(createListingSuccess(response));
      })
      .catch(function(err){
        dispatch(createListingFailure(err));
      });
  };
}
