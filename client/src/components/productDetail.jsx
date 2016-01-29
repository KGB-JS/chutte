import React from 'react';
import {connect} from 'react-redux';
import numeral from 'numeral';
import ProductImage from './productImage';
import Navbar from './navbar';
import Timer from './timer';
import {postBuy} from './../actions/actionsProducts';

class ProductDetail extends React.Component {
  constructor (props) {
    super(props)
    this.productIndex = null;
  }
  findIndex() {
    for(var i = 0; i < this.props.products.length; i++){
      if(this.props.products[i]._id === this.props.params.id){
        this.productIndex = i;
      }
    }
  }
  handleBuy() {
    var purchaseDetails = {
      _id: this.props.products[this.productIndex]._id,
      quantity: Number(this.refs.purchaseQuantity.value),
      price: this.props.products[this.productIndex].price
    }
    this.props.buyProduct(purchaseDetails)
  }
  componentWillMount() {
    this.findIndex();
  }
  render() {
    let milliseconds = this.props.products[this.productIndex].timeRemaining || 1200;
    let secondsRemaining = (milliseconds / 100);

    return (
      <div>
        <Navbar/>
        <div className="container-fluid">
          <div className="row">
          <div className="detailList">
          <div className="panel panel-default">
          <div className="panel-body">
            <div className="productCard" id={this.props.products[this.productIndex]._id}>
              <ProductImage image={this.props.products[this.productIndex].image}/>
            <div className="productName">
              <p>Product: {this.props.products[this.productIndex].productName}</p>
            </div>

            <div className="productTime">
              <Timer secondsRemaining={secondsRemaining}/>
            </div>

            <div className="productQuantity">
              <p className="productinfo">Quantity: {this.props.products[this.productIndex].quantity}</p>
            </div>

            <div className="productPrice">
              <p className="productinfo">Price: {numeral(this.props.products[this.productIndex].price).format('$0,0[.]00')}</p>
            </div>
            <div className="input-group">
              <input className="form-control" type="number" ref="purchaseQuantity" placeholder="Select Quantity"/>
              <span className="input-group-btn">
                <button className="btn btn-default" type="button" onClick={this.handleBuy.bind(this)}>Confirm</button>
              </span>
            </div>
            </div>
          </div>
        </div>
        </div>
        </div>
        </div>
        </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return {
    buyProduct: function(item) {
      dispatch(postBuy(item));
    }
  };
}

function mapStateToProps(state){
  return {products: state.productStore.products.productList};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
