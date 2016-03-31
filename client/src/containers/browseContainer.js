import {connect} from 'react-redux';
import Browse from '../components/browse';
import {userLogout} from './../actions/actionsUserAuth';
import {filterByCategory, postBuyResetMsg} from './../actions/actionsProducts';

function mapDispatchToProps(dispatch){
   return {
     filter: function(category){
       dispatch(filterByCategory(category));
     },
     submitSignout: function(){
        dispatch(userLogout());
    },
    resetBuyMsg: function(){
      dispatch(postBuyResetMsg());
    }
  }
};

function mapStateToProps(state){
  return {
    products: state.productStore.products,
    userAuth: state.userStore.userAuth,
    userPurchases: state.userStore.userPurchases
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Browse);
