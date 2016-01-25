import React from 'react';
import {connect} from 'react-redux';
import ProductImage from './productImage';
import BuyButton from './buyButton';

class ProductDetail extends React.Component {
  constructor (props) {
    super(props)
    this.productIndex = this.props.products.reduce((prevVal, product, index) =>{
      if(product._id === this.props.params.id){
        prevVal = index;
      }
    });
  }

  render() {
    return (
      <div className="productCard" id={this.props.products[this.productIndex]._id}>
        <ProductImage image={this.props.products[this.productIndex].imageURL}/>
        <div className="productName">
          <p>Product: {this.props.products[this.productIndex].productName}</p>
        </div>

        <div className="productTime">
          <p>Time Remaining: {this.props.products[this.productIndex].priceReduces}</p>
        </div>

        <div className="productQuantity">
          <p>Quantity: {this.props.products[this.productIndex].quantity}</p>
        </div>

        <div className="productPrice">
          <p>Price: ${this.props.products[this.productIndex].price}</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {products: state.productStore.products.productList};
}

export default connect(mapStateToProps)(ProductDetail)
