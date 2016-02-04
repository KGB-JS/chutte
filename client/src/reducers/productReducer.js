import {combineReducers} from 'redux';
import {GET_PRODUCTS, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE, UPDATE_PRODUCT, CREATE_LISTING, CREATE_LISTING_SUCCESS, CREATE_LISTING_FAILURE, PRODUCT_CATEGORY_FILTER, REMOVE_SOLDOUT_PRODUCT, REMOVE_ENDED_AUCTION_PRODUCT} from './../actions/actionConstants';
import {stateContainsProduct, filterProductsByCategory, filterActiveAuctions} from './reducerHelpers';

const initialState = {
  productList: [],
  isFetchingProducts: false,
  fetchedProducts: false,
  fetchStatus: '',
  isPostingProduct: false,
  postedProduct: false,
  postErrorMSG: false,
  categoryFilter: 'All Products',
  filteredProductList: []
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
      let index = stateContainsProduct(state.productList, action.product);
      if(index > -1){
        return Object.assign({}, state, {
          productList: [
            ...state.productList.slice(0, index),
            Object.assign({}, state.productList[index], {
              quantity: action.product.quantity,
              price: action.product.price
            }),
            ...state.productList.slice(index + 1)
          ]
        });
      } else {
        return Object.assign({}, state, {
          productList: [
            ...state.productList.slice(),
            Object.assign({}, action.product)
          ]
        });
      }
      case PRODUCT_CATEGORY_FILTER:
       let filterList = filterProductsByCategory(state.productList, action.category);
       return Object.assign({}, state, {
         categoryFilter: action.category,
         filteredProductList: [...filterList.slice()]
       });
       case REMOVE_SOLDOUT_PRODUCT:
        let removeIndex = stateContainsProduct(state.productList, action.product);
        return Object.assign({}, state, {
          productList: [
            ...state.productList.slice(0, removeIndex),
            ...state.productList.slice(removeIndex + 1)
          ]
        });
      case REMOVE_ENDED_AUCTION_PRODUCT:
        let activeAuctionsList = filterActiveAuctions(state.productList);
        return Object.assign({}, state, {
          productList: [...activeAuctionsList.slice()]
        });
    default:
      return state;
  }
};


function createListing(state = initialState, action){

  switch(action.type){
    case CREATE_LISTING:
      return Object.assign({}, state, {
        isPostingProduct: true,
        postErrorMSG: false
      });
    case CREATE_LISTING_SUCCESS:
      return Object.assign({}, state, {
        isPostingProduct: false,
        postedProduct: true,
        productList: [
          ...state.productList.slice(),
          Object.assign({}, action.product)
        ]
      });
    case CREATE_LISTING_FAILURE:
      return Object.assign({}, state, {
        isFetchingProducts: false,
        postErrorMSG: true
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
