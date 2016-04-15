import {connect} from 'react-redux';
import Dashboard from '../components/dashboard';
import {postListing} from './../actions/actionsCreateListing';
import {userLogout, authenticateUser} from './../actions/actionsUserAuth';
import {postUserSignup} from './../actions/actionsUserSignup';


function mapDispatchToProps(dispatch){
  return {
    submitListing: function(item, token) {
      dispatch(postListing(item, token));
    },
    submitSignout: function(){
       dispatch(userLogout());
    },
    signInUser: function(user) {
      dispatch(authenticateUser(user));
    },
    signupUser: function(user) {
      dispatch(postUserSignup(user));
    }
  }
}

function mapStateToProps(state){
  return {
    userAuth: state.userStore.userAuth
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
