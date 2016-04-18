import {connect} from 'react-redux';
import Home from '../components/home';
import {userLogout, authenticateUser} from './../actions/actionsUserAuth';
import {postUserSignup} from './../actions/actionsUserSignup';

function mapDispatchToProps(dispatch){
  return {
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
};

function mapStateToProps(state){
  return {
    userAuth: state.userStore.userAuth
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
