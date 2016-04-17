import {connect} from 'react-redux';
import Browse from '../components/browse';
import {userLogout, actionsUserAuth} from './../actions/actionsUserAuth';
import {postUserSignup} from './../actions/actionsUserSignup';
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
    },
    signInUser: function(user) {
      dispatch(authenticateUser(user));
    },
    signupUser: function(user) {
      dispatch(postUserSignup(user));
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
