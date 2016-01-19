import React from 'react';
import ProductImage from './productImage';
import BuyButton from './buyButton';

class ProductCard extends React.Component {
  render() {
    return (
      <div>
        <ProductImage/>
        <div className="productBio">
          <p>{this.props.productBio}</p>
        </div>

        <div className="productTime">
          {this.props.productTime}
        </div>
        
        <div className="productQuantity">
          {this.props.productQuantity}
        </div> 

        <div className="productPrice">
          {this.props.productPrice}
        </div>

        <BuyButton />
      </div>
    );
  }
};

export default ProductCard;
