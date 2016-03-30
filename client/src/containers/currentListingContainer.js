import {connect} from 'react-redux';
import CurrentListing from '../components/currentListing';

function mapStateToProps(state){
  return {
    products: state.userStore.userListings.currentListing
  };
}

export default connect(mapStateToProps)(CurrentListing)
