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

function products(state, action){
  state = state || initialState;
  let newState = Object.assign({}, state);
  switch(action.type){
    case GET_PRODUCTS:
      newState.isFetchingProducts = true;
      return newState;
    case GET_PRODUCTS_SUCCESS:
      newState.isFetchingProducts = false;
      newState.fetchedProducts = true;
      newState.productList = action.products.slice();
      return newState;
    case GET_PRODUCTS_FAILURE:
      newState.isFetchingProducts = false;
      newState.fetchedProducts = false;
      newState.fetchStatus = action.err;
      return newState;
    case UPDATE_PRODUCT:
      newState.productList = newState.productList.map(function(product){
        if(product._id === action.product.itemId){
          product.price = action.product.price;
          product.quantity = action.product.quantity;
        }
      });
      return newState;
    default:
      return state;
  }
};

function createListing(state, action){
  state = state || initialState;
  let newState = Object.assign({}, state);

  switch(action.type){
    case CREATE_LISTING:
      newState.isPostingProduct = true;
      return newState;
    case CREATE_LISTING_SUCCESS:
      newState.isPostingProduct = false;
      newState.postedProduct = true;
      newState.productList.push(action.productedListed);
      return newState;
    case CREATE_LISTING_FAILURE:
      newState.isFetchingProducts = false;
      newState.postStatus = action.err;
      return newState;
    default:
      return state;
  }
};

const productReducer = combineReducers({
  products,
  createListing
});

export default productReducer;
