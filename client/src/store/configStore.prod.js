import {createStore, applyMiddleware, compose} from 'redux';
import DevTools from '../containers/DevTools';
import routes from '../routes';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

const finalCreateStore = compose(
  applyMiddleware(thunk)
)(createStore);

export default function configureStore(initialState){
  return finalCreateStore(rootReducer, initialState);
}
