import {updateProduct} from './../actions/actionsProducts';
var socket = require('socket.io-client')();

export default function(store){

  socket.on('productUpdate', function(obj){
    store.dispatch(updateProduct(obj));
  });
}
