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
    postErrorMSG: this.state.productStore.products.postErrorMSG
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateListing);
