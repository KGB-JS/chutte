import fetch from 'isomorphic-fetch';
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
  console.log(product, "products")
  // return function(dispatch){
    // dispatch(createListing());
      return fetch('/api/items/', {
        method: 'post',
        body: {product:{
              productName: "Shiny Car",
            createdBy: "SuperMan",
            category: "Car",
            quantity: 30,
            price: 30000,
            minPrice: 4500,
            auctionEnds: "2016-1-27 17",
            description: "Best car ever"
        }},
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(function(response){
        dispatch(createListingSuccess(response));
      })
      .catch(function(err){
        dispatch(createListingFailure(err));
      });
  // };
}
