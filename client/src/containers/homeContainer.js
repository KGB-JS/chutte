import {connect} from 'react-redux';
import Home from '../components/home';
import {userLogout} from './../actions/actionsUserAuth';

function mapDispatchToProps(dispatch){
  return {
    submitSignout: function(){
      dispatch(userLogout());
    }
  }
};

function mapStateToProps(state){
  return {
    userAuth: state.userStore.userAuth
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
