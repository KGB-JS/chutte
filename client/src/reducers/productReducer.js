import {combineReducers} from 'redux';
import {List, Map} from 'immutable';

const initialState = Map({
  products: List(),
  isFetchingProducts: false,
  fetchedProducts: false,
  fetchStatus: '',
  isPostingProduct: false,
  postedProduct: false,
  postStatus: ''
});

function products(state = initialState, action){
  let newState = state;

  switch(action.type){
    case GET_PRODUCTS:
      newState.set('isFetchingProducts', true);
      return newState;
    case GET_PRODUCTS_SUCCESS:
      newState.set('isFetchingProducts', false);
      newState.set('fetchedProducts', true);
      newState.set('products', List(action.products));
      return newState;
    case GET_PRODUCTS_FAILURE:
      newState.set('isFetchingProducts', false);
      newState.set('fetchedProducts', false);
      newState.set('fetchStatus', action.err);
      return newState;
    default:
      return state;
  }
};

function createListing(state = initialState, action){
  let newState = state;

  switch(action.type){
    case CREATE_LISTING:
      newState.set('isPostingProduct', true);
      return newState;
    case CREATE_LISTING_SUCCESS:
      newState.set('isPostingProduct', false);
      newState.set('postedProduct', true);
      newState.updateIn('products', newState.get('products').push(action.productedListed));
      return newState;
    case CREATE_LISTING_FAILURE:
      newState.set('isFetchingProducts', false);
      newState.set('postStatus', action.err);
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
