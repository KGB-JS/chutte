import {connect} from 'react-redux';
import CreateListing from '../components/createListing';
import {postListing} from './../actions/actionsCreateListing';

function mapDispatchToProps(dispatch){
  return {
    submitListing: function(item, token) {
      dispatch(postListing(item, token));
    }
  }
};

function mapStateToProps(state){
  return {
    postErrorMSG: state.productStore.products.postErrorMSG,
    user: state.userStore.userAuth
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateListing);
