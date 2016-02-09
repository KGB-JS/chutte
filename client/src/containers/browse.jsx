import React from 'react';
import {connect} from 'react-redux';
import DefaultNavbar from './../components/navbar';
import SearchBar from './../components/search';
import ProductCard from './../components/productCard';
import BrowseSideBar from './../components/BrowseSideBar';
import ProductList from './../components/productList';
import {filterByCategory, postBuyResetMsg} from './../actions/actionsProducts';
import {CategoryFilters} from './../actions/actionConstants';
import {userLogout} from './../actions/actionsUserAuth';

class BrowsePage extends React.Component {
  render(){
    let products = this.props.products.categoryFilter !== CategoryFilters[0] ? this.props.products.filteredProductList : this.props.products.productList;
    return (
    <div className="BG">
      <DefaultNavbar submitSignout={this.props.submitSignout}
         user={this.props.userAuth}/>
        <div className="container-fluid BG">
        <BrowseSideBar className="col-xs-2 col-sm-2 col-md-2" filter={this.props.filter}/>
          <row>
            <div className="col-sm-10 col-md-10 col-lg-10 col-sm-offset-2 col-md-offset-2 col-lg-offset-2 productList bumpDown">
              <ProductList products={products} userPurchases={this.props.userPurchases} resetBuyMsg={this.props.resetBuyMsg}/>
            </div>
          </row>
        </div>
    </div>
    )
  }
}

function mapDispatchToProps(dispatch){
   return {
     filter: function(category){
       dispatch(filterByCategory(category));
     },
     submitSignout: function(){
        dispatch(userLogout());
    },
    resetBuyMsg: function(){
      dispatch(postBuyResetMsg());
    }
  }
}

function mapStateToProps(state){
  return {
    products: state.productStore.products,
    userAuth: state.userStore.userAuth,
    userPurchases: state.userStore.userPurchases
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowsePage);
