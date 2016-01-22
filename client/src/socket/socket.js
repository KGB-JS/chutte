import actions from './../actions/actionsProducts';

export default function(store){
  var socket = io();

  socket.on('productUpdate', function(obj){
    store.dispatch(actions.updateProduct(obj));
  });
}
