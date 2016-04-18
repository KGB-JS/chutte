import React from 'react';
import ProductList from './../components/productList';

const CurrentListing = function({products}){
  return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-offset-2 col-sm-offset-2 col-sm-10 col-md-10 col-md-offset-2">
            <ProductList products={products}/>
          </div>
        </div>
      </div>
  )
};

export default CurrentListing;
