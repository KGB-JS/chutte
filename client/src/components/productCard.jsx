import React from 'react';
import {Link} from 'react-router';
import ProductImage from './productImage';
import Timer from './timer';
import BuyButton from './buyButton';

class ProductCard extends React.Component {
  render() {
    let secondsRemaining = this.props.productDetail.timeRemaining || 1200;

    return (
      <div className="col-md-4 portfolio-item">
      <div className="productCard" id={this.props.productDetail._id}>
        <div className="productName">
          <Link to={`browse/product/${this.props.productDetail._id}`}> {this.props.productDetail.productName} </Link>
        </div>

        <ProductImage className="productImage" image={this.props.productDetail.image}/>

        <row>
          <div className="productTime">
            <Timer secondsRemaining={secondsRemaining}/>
          </div>

          <div className="productQuantity">
            <p className="productinfo">Quantity: {this.props.productDetail.quantity}</p>
          </div>

          <div className="productPrice">
            <p className="productinfo">Price: ${this.props.productDetail.price}</p>
          </div>
        </row>
        <row>
        <div className="text-center">
        <Link to={`browse/product/${this.props.productDetail._id}`}><button type="button" className="btn btn-primary center-block"><h5>Buy Now</h5></button></Link>
        </div>
        </row>

      </div>
      </div>
    );
  }
};

export default ProductCard;
