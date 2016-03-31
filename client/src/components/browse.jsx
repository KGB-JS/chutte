import React from 'react';
import {connect} from 'react-redux';
import Navbar from './../components/navbar';
import SearchBar from './../components/search';
import ProductCard from './../components/productCard';
import BrowseSideBar from './../components/BrowseSideBar';
import ProductList from './../components/productList';
import {CategoryFilters} from './../actions/actionConstants';


const Browse = function({filter, submitSignout, resetBuyMsg, products, userAuth, userPurchases}) {
  let productList = products.categoryFilter !== CategoryFilters[0] ? products.filteredProductList : products.productList;

  return (
  <div>
    <Navbar submitSignout={submitSignout}
       user={userAuth}/>
      <div className="container-fluid BG">
      <BrowseSideBar className="col-xs-2 col-sm-2 col-md-2" filter={filter}/>
        <row>
          <div className="col-sm-10 col-md-10 col-lg-10 col-sm-offset-2 col-md-offset-2 col-lg-offset-2 productList bumpDown">
            <ProductList products={productList} userPurchases={userPurchases} resetBuyMsg={resetBuyMsg}/>
          </div>
        </row>
      </div>
  </div>)
};



export default Browse;
