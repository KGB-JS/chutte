import React from 'react';
import ProductImage from './productImage';
import BuyButton from './buyButton';

class ProductCard extends React.Component {
  render() {
    return (
      <div>
        <ProductImage/>
        <div className="productName">
          <p>{this.props.productName}</p>
        </div>

        <div className="productTime">
          {this.props.priceReduces}
        </div>

        <div className="productQuantity">
          {this.props.quantity}
        </div>

        <div className="productPrice">
          {this.props.price}
        </div>
      </div>
    );
  }
};

export default ProductCard;
