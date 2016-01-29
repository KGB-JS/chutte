import {combineReducers} from 'redux';
import {GET_PRODUCTS, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE, UPDATE_PRODUCT, CREATE_LISTING, CREATE_LISTING_SUCCESS, CREATE_LISTING_FAILURE} from './../actions/actionConstants';

const initialState = {
  productList: [],
  isFetchingProducts: false,
  fetchedProducts: false,
  fetchStatus: '',
  isPostingProduct: false,
  postedProduct: false,
  postStatus: ''
};

function products(state = initialState, action){

  switch(action.type){
    case GET_PRODUCTS:
      return Object.assign({}, state, {
        isFetchingProducts: true
      });
    case GET_PRODUCTS_SUCCESS:
      return Object.assign({}, state, {
        isFetchingProducts: false,
        fetchedProducts: true,
        productList: [...action.products]
      });
    case GET_PRODUCTS_FAILURE:
      return Object.assign({}, state, {
        isFetchingProducts: false,
        fetchedProducts: false,
        fetchStatus: action.err
      });
    case UPDATE_PRODUCT:
      var index = stateContainsProduct(state.productList, action.product);
      if(index > -1){
        return Object.assign({}, state, {
          productList: [
            ...state.productList.slice(0, index),
            Object.assign({}, state.productList[index],{
              price: action.product.price,
              timeRemaining: action.product.timeRemaining,
              quantity: action.product.quantity
            }),
            ...state.productList.slice(index + 1)
          ]
        });
      } else {
        return Object.assign({}, state, {
          productList: [
            ...state.productList.slice(),
            action.product
          ]
        });
      }
    default:
      return state;
  }
};

function stateContainsProduct(productList, product){
  var productIndex = - 1;

  for(var index = 0; index < productList.length; index++){
    if(productList[index]._id === product._id){
      productIndex = index;
    }
  }

  return productIndex;
}

function createListing(state = initialState, action){

  switch(action.type){
    case CREATE_LISTING:
      return Object.assign({}, state, {
        isPostingProduct: true
      });
    case CREATE_LISTING_SUCCESS:
      return Object.assign({}, state, {
        isPostingProduct: false,
        postedProduct: true,
        productList: [
          ...state.productList.slice(),
          action.productedListed
        ]
      });
    case CREATE_LISTING_FAILURE:
      return Object.assign({}, state, {
        isFetchingProducts: false,
        postStatus: action.err
      });
    default:
      return state;
  }
};

const productReducer = combineReducers({
  products,
  createListing
});

export default productReducer;
