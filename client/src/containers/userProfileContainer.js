import {connect} from 'react-redux';
import UserProfile from '../components/userProfile';
import {postUpdateProfile} from './../actions/actionsUserSignup';

function mapDispatchToProps(dispatch){
  return {
    updateProfile: function(user, token){
      dispatch(postUpdateProfile(user, token))
    }
  }
};

function mapStateToProps(state){
  return {
    userDetail: state.userStore.userAuth
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
