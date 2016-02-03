import React from 'react';
import {Link} from 'react-router';
import {Grid, Thumbnail, Button,Row, Col } from 'react-bootstrap';
import numeral from 'numeral';
import ProductImage from './productImage';
import Timer from './timer';
import BuyButton from './buyButton';
import ProductDetailModal from './productDetailModal';

class ProductCard extends React.Component {
  render() {
    return (
        <Col xs={6} md={3} className="portfolio-item">
          <div className="productCard" id={this.props.productDetail._id}>
            <div className="productName">
               {this.props.productDetail.productName}
            </div>
            <ProductImage className="productImage" image={this.props.productDetail.image}/>

            <row>
              <div className="productTime">
                <Timer nextUpdateTime={this.props.productDetail.timeRemaining}/>
              </div>

              <div className="productQuantity">
                <p className="productinfo">Quantity: {this.props.productDetail.quantity}</p>
              </div>

              <div className="productPrice">
                <p className="productinfo">Price: {numeral(this.props.productDetail.price).format('$0,0[.]00')}</p>
              </div>
            </row>

            <row>
              <div className="text-center">
                <ProductDetailModal items={this.props.productDetail._id} resetBuyMsg={this.props.resetBuyMsg}/>
              </div>
            </row>
          </div>
        </Col>
    );
  }
};

export default ProductCard;
