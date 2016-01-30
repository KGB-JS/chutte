import React from 'react';
import {connect} from 'react-redux';
import NavBar from '../components/navbar';
import CreateListing from '../components/createListing';
import ProfileSideNavBar from './../components/profileSideBar';
import {postListing} from './../actions/actionsCreateListing';
import CurrentListing from './../components/currentListing';

class Dashboard extends React.Component {
  render(){
    return (
      <div>
        <NavBar/>
        <ProfileSideNavBar/>
        <CreateListing submitListing={this.props.submitListing}/>
        <CurrentListing  />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    submitListing: function(item) {
      dispatch(postListing(item));
    }
  }
}

function mapStateToProps(state){
  return {
    products: state.productStore.products.productList
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
