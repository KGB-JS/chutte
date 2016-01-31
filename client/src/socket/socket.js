import {updateProduct} from './../actions/actionsProducts';
var socket = require('socket.io-client')();

export default function(store){

  socket.on('productUpdate', function(obj){
  	console.log(obj)
    store.dispatch(updateProduct(obj));
  });
  socket.on('quantityUpdate', function(obj){
  	console.log('buy', obj)
    store.dispatch(updateProduct(obj));
  });
}
