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
    product: productListed,
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
    fetch('/api/items/create', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify(product)
      })
      .then(checkStatus)
      .then(parseJSON)
      .then(function(response){
        dispatch(createListingSuccess(response));
        dispatch(addToUserListings(response));
      })
      .catch(function(err){
        dispatch(createListingFailure(err));
      });
  };
}
