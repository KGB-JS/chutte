import React from 'react';
import {connect} from 'react-redux';
import ProductImage from './productImage';
import BuyButton from './buyButton';

class ProductDetail extends React.Component {
  constructor (props) {
    super(props)
    this.productId = this.props.params.id;
  }

  render() {
    return (
      <div className="productCard" id={this.props.products[this.productId]._id}>
        <ProductImage image={this.props.products[this.productId].imageURL}/>
        <div className="productName">
          <p>Product: {this.props.products[this.productId].productName}</p>
        </div>

        <div className="productTime">
          <p>Time Remaining: {this.props.products[this.productId].priceReduces}</p>
        </div>

        <div className="productQuantity">
          <p>Quantity: {this.props.products[this.productId].quantity}</p>
        </div>

        <div className="productPrice">
          <p>Price: ${this.props.products[this.productId].price}</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {products: state.productStore.products.productList};
}

export default connect(mapStateToProps)(ProductDetail)
