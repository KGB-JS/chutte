import fetch from 'isomorphic-fetch';
import {checkStatus, parseJSON} from './actionsHelper';
import {GET_PRODUCTS, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE, UPDATE_PRODUCT, POST_BUY, POST_BUY_SUCCESS, POST_BUY_FAILURE, PRODUCT_CATEGORY_FILTER, POST_BUY_RESET_MSG, REMOVE_PRODUCT} from './actionConstants';

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

export function postBuyResetMsg(){
  return {
    type: POST_BUY_RESET_MSG
  };
}

export function removeProduct(product){
  return {
    type: REMOVE_PRODUCT,
    product: product
  }
}

export function filterByCategory(category){
  return {
    type: PRODUCT_CATEGORY_FILTER,
    category: category
  };
}

export function filterByCategory(category){
  return {
    type: PRODUCT_CATEGORY_FILTER,
    category: category
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

export function postBuy(purchaseDetails, token){
  console.log(purchaseDetails)
  return function(dispatch){
    dispatch(postingBuy(purchaseDetails));
    return fetch('/api/items/buyItem', {
      method: 'post',
      body: JSON.stringify(purchaseDetails),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(function(response){
      dispatch(postBuySuccess());
    })
    .catch(function(err){
      dispatch(postBuyFailure(err));
    });
  };
}
