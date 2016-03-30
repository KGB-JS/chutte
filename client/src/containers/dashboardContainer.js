import {connect} from 'react-redux';
import Dashboard from '../components/dashboard';
import {postListing} from './../actions/actionsCreateListing';
import {userLogout} from './../actions/actionsUserAuth';

function mapDispatchToProps(dispatch){
  return {
    submitListing: function(item, token) {
      dispatch(postListing(item, token));
    },
    submitSignout: function(){
       dispatch(userLogout());
    },
  }
}

function mapStateToProps(state){
  return {
    userAuth: state.userStore.userAuth
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
