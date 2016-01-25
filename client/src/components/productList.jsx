import React from 'react';
import ProductCard from './../components/productCard';

export default class ProductList extends React.Component{
  renderProductCards(){
    if(this.props.products){
      return this.props.products.map((product, index) => {
        return <ProductCard key={index} productDetail={product} />
      })
    }
  }

  render(){
    return(
        <div>
          {this.renderProductCards()}
        </div>
    )
  }
};
