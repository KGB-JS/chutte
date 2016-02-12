import {updateProduct, removeProduct, removeSoldoutProduct} from './../actions/actionsProducts';
var socket = require('socket.io-client')();

export default function(store){
  socket.on('getAllProducts', function(products){
    store.dispatch(getProductsSuccess(products));
  });

  socket.on('productUpdate', function(obj){
    store.dispatch(updateProduct(obj));
  });
  
  socket.on('quantityUpdate', function(obj){
  	if(obj.quantity > 0){
      store.dispatch(updateProduct(obj));
    } else {
      store.dispatch(removeSoldoutProduct(obj));
    }
  });
}
