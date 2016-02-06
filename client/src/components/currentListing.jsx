import React from 'react';
import {connect} from 'react-redux';
import ProductList from './../components/productList';
import DefaultNavBar from '../components/navbar';
import ProfileSideNavBar from './../components/profileSideBar';
import {userLogout} from './../actions/actionsUserAuth';

class CurrentListing extends React.Component {
  render(){
    return (
    <div>
      <DefaultNavBar submitSignout={this.props.submitSignout}
         user={this.props.userAuth} />
      <ProfileSideNavBar/>
        <div className="container-fluid">
          <row>
            <div className="col-xs-offset-2 col-sm-offset-2 col-sm-10 col-md-10 col-md-offset-2">
              <ProductList products={this.props.products}/>
            </div>
          </row>
        </div>
    </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    submitSignout: function(){
       dispatch(userLogout());
    }
  }
}

function mapStateToProps(state){
  return {
    products: state.userStore.userListings.currentListing,
    userAuth: state.userStore.userAuth
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentListing);
