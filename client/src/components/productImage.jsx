import React from 'react';

class ProductImage extends React.Component {
  render(){
    return (
      <div><img src={this.props.image} alt="ProductImage" className="product-image"/></div>
    )
  }
}

export default ProductImage;
