import fetch from 'isomorphic-fetch';
import {checkStatus, parseJSON} from './actionsHelper';
import {GET_PRODUCTS, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE, UPDATE_PRODUCT, POST_BUY, POST_BUY_SUCCESS, POST_BUY_FAILURE} from './actionConstants';

export function updateProduct(product){
  return {
    type: UPDATE_PRODUCT,
    product: product
  };
}

export function getProducts(){
  return {
    type: GET_PRODUCTS
  };
}

export function getProductsSuccess(products){
  return {
    type: GET_PRODUCTS_SUCCESS,
    products: products
  };
}

export function getProductsFailure(err){
  return {
    type: GET_PRODUCTS_FAILURE,
    err: err
  };
}

export function postingBuy(purchaseDetails){
  return {
    type: POST_BUY,
    product: purchaseDetails
  };
}

export function postBuySuccess(){
  return {
    type: POST_BUY_SUCCESS
  };
}

export function postBuyFailure(err){
  return {
    type: POST_BUY_FAILURE,
    err: err
  };
}

export function fetchProducts(){
  return function(dispatch){
    dispatch(getProducts());
      return fetch('/api/items/')
      .then(checkStatus)
      .then(parseJSON)
      .then(function(parsedJson){
        dispatch(getProductsSuccess(parsedJson));
      })
      .catch(function(err){
        dispatch(getProductsFailure(err));
      });
  };
}

export function postBuy(purchaseDetails){
  console.log(purchaseDetails)
  return function(dispatch){
    dispatch(postingBuy(purchaseDetails));
    return fetch('/api/items/buyItem', {
      method: 'post',
      body: JSON.stringify(purchaseDetails),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(function(response){
      //return response.json();
      dispatch(postBuySuccess());
    })
    // .then(function(parsedJson){
    //   dispatch(postBuySuccess(parsedJson));
    // })
    .catch(function(err){
      dispatch(postBuyFailure(err));
    });
  };
}
