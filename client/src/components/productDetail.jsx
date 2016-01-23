import React from 'react';
import ProductImage from './productImage';
import BuyButton from './buyButton';

class ProductDetail extends React.Component {
  render() {
    return (
      <div className="productCard" id={this.props.productDetail._id}>
        <ProductImage image={this.props.productDetail.imageURL}/>
        <div className="productName">
          <p>Product: {this.props.productDetail.productName}</p>
        </div>

        <div className="productTime">
          <p>Time Remaining: {this.props.productDetail.priceReduces}</p>
        </div>

        <div className="productQuantity">
          <p>Quantity: {this.props.productDetail.quantity}</p>
        </div>

        <div className="productPrice">
          <p>Price: ${this.props.productDetail.price}</p>
        </div>
      </div>
    );
  }
};

export default ProductDetail;
