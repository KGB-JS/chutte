import React from 'react';
import {Link} from 'react-router';
import ProductImage from './productImage';
import BuyButton from './buyButton';

class ProductCard extends React.Component {
  render() {
    return (
      <div className="productCard col-sm-6 col-md-4" id={this.props.productDetail._id}>
        <div className="productName">
          <Link to={`browse/product/${this.props.productDetail._id}`}> {this.props.productDetail.productName} </Link>
        </div>

        <ProductImage className="productImage" image={this.props.productDetail.imageURL}/>

        <row>
          <div className="productTime col-md-4">
            <p className="productinfo">Time Left: {this.props.productDetail.priceReduces}</p>
          </div>

          <div className="productQuantity col-md-4">
            <p className="productinfo">Quantity: {this.props.productDetail.quantity}</p>
          </div>

          <div className="productPrice col-md-4">
            <p className="productinfo">Price: ${this.props.productDetail.price}</p>
          </div>
        </row>
      </div>
    );
  }
};

export default ProductCard;
