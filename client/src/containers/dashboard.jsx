import React from 'react';
import {connect} from 'react-redux';
import NavBar from '../components/navbar';
import CreateListing from '../components/createListing';
import ProfileSideNavBar from './../components/profileSideBar';
import {postListing} from './../actions/actionsCreateListing';
import {userLogout} from './../actions/actionsUserAuth';

class Dashboard extends React.Component {
  render(){
    return (
      <div>
        <NavBar submitSignout={this.props.submitSignout}
           user={this.props.userAuth} />
        <ProfileSideNavBar/>
        <CreateListing submitListing={this.props.submitListing} productListing={this.props.productListing} user={this.props.userAuth}/>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    submitListing: function(item, token) {
      dispatch(postListing(item, token));
    },
    submitSignout: function(){
       dispatch(userLogout());
    }
  }
}

function mapStateToProps(state){
  return {
    userAuth: state.userStore.userAuth,
    productListing: state.productStore.createListing
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
