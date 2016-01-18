import React from 'react';
import ProductImage from './productImage';

class ProductCard extends React.Component {
  render() {
    return (
      <div>
      //Needed for this page
        <ProductImage/>
        <div className="productBio">
          <p>{this.props.productBio}</p>
        </div>

        //time
        <div className="productTime">
          {this.props.productTime}
          //parent container will need to take in 
          //product Time from server side
        </div>
        
        //quantity
        <div className="productQuantity">
          {this.props.productQuantity}
          //parent container will need to take in 
          //product Quantity from server side
        </div> 

       //price
        <div className="productPrice">
          {this.props.productPrice}
          //parent container will need to take in 
          //product information from server side
        </div>

        //buy button
      </div>
    );
  }
};

export default ProductCard;
