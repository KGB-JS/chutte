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
           user={this.props.userAuth}/>
        <ProfileSideNavBar/>
        <CreateListing submitListing={this.props.submitListing} productListing={this.props.productListing} />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    submitListing: function(item) {
      dispatch(postListing(item));
    },
    submitSignout: function(){
       dispatch(userLogout());
    }
  }
}

function mapStateToProps(state){
  return {
<<<<<<< 12873c1af6d4bf736f0501e7b001950611ff920d
    products: state.productStore.products,
    userAuth: state.userStore.userAuth
=======
    productListing: state.productStore.createListing

>>>>>>> [feat]: check form is filled out
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
